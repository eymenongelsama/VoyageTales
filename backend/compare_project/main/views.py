# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from main.models import Country, CountryCriteria
from main.serializers import CountrySerializer, CountryListSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Prefetch
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from users.models import CustomUser
from django.core.exceptions import FieldError



class ObtainTokenView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        unique_id = request.data.get('unique_id')

        if not unique_id:
            return Response(
                {'error': 'unique_id sağlanmalıdır.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # unique_id'yi kullanıcı adı olarak kullanarak kullanıcıyı al veya oluştur
        user, created = CustomUser.objects.get_or_create(username=unique_id)

        # Kullanıcı için token oluştur veya mevcut olanı al
        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key}, status=status.HTTP_200_OK)
    
    
    
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # Varsayılan sayfa boyutu
    page_size_query_param = 'page_size'
    max_page_size = 100


class GetMatchingCountries(generics.ListAPIView):
    """
    Tüm ülkeleri listeler ve sayfalama, filtreleme, arama özellikleri sunar.
    Kriterler dahil edilmez.
    """
    permission_classes = [AllowAny] 
    queryset = Country.objects.all()  # prefetch_related('criteria') kaldırıldı
    serializer_class = CountryListSerializer  # Yeni serializer kullanıldı
    pagination_class = StandardResultsSetPagination
    def get_serializer_context(self):
        return {'request': self.request}  # Tam URL için gerekli
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name', 'match_percentage', 'overall_score']  # Filtreleme için kullanılacak alanlar
    search_fields = ['name', 'description', 'tags']  # Arama için kullanılacak alanlar
    ordering_fields = ['name', 'match_percentage', 'overall_score']  # Sıralama için kullanılacak alanlar
    ordering = ['name']  # Varsayılan sıralama


class CountryDetailView(APIView):
    """
    Belirli bir ülkenin detaylarını döndürür.
    """
    permission_classes = [AllowAny] 
    def get(self, request, pk):
        try:
            country = Country.objects.get(pk=pk)
            serializer = CountrySerializer(country)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Country.DoesNotExist:
            return Response({"error": "Country not found"}, status=status.HTTP_404_NOT_FOUND)
        


class CalculateMatch(APIView):
    """
    Kullanıcının sağladığı kriterlere göre ülkelerin eşleşme yüzdesini hesaplar.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        user_criteria = request.data.get('criteria')  # Beklenen format: {"1": 5, "2": 7}

        # Gelen kriterlerin doğruluğunu kontrol et
        if not user_criteria or not isinstance(user_criteria, dict):
            return Response({"error": "Invalid criteria format."}, status=status.HTTP_400_BAD_REQUEST)

        for criteria_id, score in user_criteria.items():
            try:
                criteria_id = int(criteria_id)
                score = int(score)
                if not (0 <= score <= 10):
                    return Response({"error": f"Score for criteria {criteria_id} must be between 0 and 10."},
                                    status=status.HTTP_400_BAD_REQUEST)
            except ValueError:
                return Response({"error": f"Invalid criteria ID or score: {criteria_id}."},
                                status=status.HTTP_400_BAD_REQUEST)

        # Ülke ve kriter bilgilerini optimize edilmiş sorgularla çek
        countries = Country.objects.prefetch_related(
            Prefetch(
                'countrycriteria_set',
                queryset=CountryCriteria.objects.select_related('criteria').only('criteria__id', 'score')
            )
        ).only('name', 'description', 'image')

        results = []

        for country in countries:
            total_score = 0
            max_score = 0
            country_criteria = list(country.countrycriteria_set.values('criteria_id', 'score'))

            for cc in country_criteria:
                criteria_id = str(cc['criteria_id'])
                if criteria_id in user_criteria:
                    user_score = user_criteria[criteria_id]
                    max_score += 10
                    difference = abs(cc['score'] - user_score)
                    
                    # Yeni skor hesaplama yöntemi: Fark arttıkça skor daha hızlı düşer
                    # Örneğin, fark 0 için 10, fark 1 için 8, fark 2 için 6, ..., fark >=5 için 0
                    if difference == 0:
                        score = 10
                    elif difference == 1:
                        score = 8
                    elif difference == 2:
                        score = 6
                    elif difference == 3:
                        score = 4
                    elif difference == 4:
                        score = 2
                    else:
                        score = 0

                    total_score += score

            match_percentage = (total_score / max_score) * 100 if max_score else 0
            
            # features alanını liste olarak alın
            try:
                features = list(country.features.values_list('feature', flat=True))  # 'feature' mevcut alandır
            except FieldError:
                features = []  # Eğer hata alırsa boş liste döndür

            results.append({
                "country": country.name,
                "description": country.description,
                "match_percentage": round(match_percentage, 2),
                "features": features,
                "image": country.image.url if country.image else "/media/defaults/default_world_image.jpg",  # URL ekle
            })

        # Sıralamayı match_percentage'a göre yap
        results = sorted(results, key=lambda x: x["match_percentage"], reverse=True)

        return Response({
            "count": len(results),
            "results": results
        }, status=status.HTTP_200_OK)