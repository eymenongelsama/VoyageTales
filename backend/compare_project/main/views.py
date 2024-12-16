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


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # Varsayılan sayfa boyutu
    page_size_query_param = 'page_size'
    max_page_size = 100


class GetMatchingCountries(generics.ListAPIView):
    """
    Tüm ülkeleri listeler ve sayfalama, filtreleme, arama özellikleri sunar.
    Kriterler dahil edilmez.
    """
    queryset = Country.objects.all()  # prefetch_related('criteria') kaldırıldı
    serializer_class = CountryListSerializer  # Yeni serializer kullanıldı
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name', 'match_percentage', 'overall_score']  # Filtreleme için kullanılacak alanlar
    search_fields = ['name', 'description', 'tags']  # Arama için kullanılacak alanlar
    ordering_fields = ['name', 'match_percentage', 'overall_score']  # Sıralama için kullanılacak alanlar
    ordering = ['name']  # Varsayılan sıralama


class CalculateMatch(APIView):
    """
    Kullanıcının sağladığı kriterlere göre ülkelerin eşleşme yüzdesini hesaplar.
    """
    def post(self, request):
        user_criteria = request.data.get('criteria')  # Beklenen format: {"1": 5, "2": 7}
        
        if not user_criteria:
            return Response({"error": "No criteria provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not isinstance(user_criteria, dict):
            return Response({"error": "Criteria should be a dictionary."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Kriter değerlerini doğrulama
        for criteria_id, score in user_criteria.items():
            if not criteria_id.isdigit():
                return Response({"error": f"Invalid criteria ID: {criteria_id}."}, status=status.HTTP_400_BAD_REQUEST)
            try:
                score = int(score)
                if not (0 <= score <= 10):
                    return Response({"error": f"Score for criteria {criteria_id} must be between 0 and 10."}, status=status.HTTP_400_BAD_REQUEST)
            except ValueError:
                return Response({"error": f"Invalid score value for criteria {criteria_id}."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Veritabanı sorgularını optimize etme
        countries = Country.objects.all().prefetch_related(
            Prefetch(
                'countrycriteria_set',
                queryset=CountryCriteria.objects.select_related('criteria')
            )
        )
        
        results = []
        
        for country in countries:
            total_score = 0
            max_score = 0
            country_criteria = country.countrycriteria_set.all()
            
            for cc in country_criteria:
                criteria_id = str(cc.criteria.id)
                if criteria_id in user_criteria:
                    user_score = user_criteria[criteria_id]
                    max_score += 10  # Maksimum kriter puanı
                    total_score += 10 - abs(cc.score - user_score)
            
            match_percentage = (total_score / max_score) * 100 if max_score else 0
            results.append({
                "country": country.name,
                "description": country.description,
                "match_percentage": round(match_percentage, 2)
            })
        
        return Response(results, status=status.HTTP_200_OK)