from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main.models import Country, CountryCriteria
from main.serializers import CountrySerializer

class GetMatchingCountries(APIView):
    def get(self, request):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CalculateMatch(APIView):
    def get(self, request):
        user_criteria = request.query_params.get('criteria')  # Örnek: {"1": 5, "2": 7}
        if not user_criteria:
            return Response({"error": "No criteria provided."}, status=status.HTTP_400_BAD_REQUEST)

        import json
        user_criteria = json.loads(user_criteria)  # String -> Dictionary

        countries = Country.objects.all()
        results = []

        for country in countries:
            total_score = 0
            max_score = 0
            country_criteria = CountryCriteria.objects.filter(country=country)

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
                "match": round(match_percentage, 2)
            })

        return Response(results, status=status.HTTP_200_OK)