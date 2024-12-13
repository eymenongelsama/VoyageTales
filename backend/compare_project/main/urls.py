from django.urls import path
from main.views import GetMatchingCountries, CalculateMatch

urlpatterns = [
    path('api/matching-countries/', GetMatchingCountries.as_view(), name='get_matching_countries'),
    path('api/calculate-match/', CalculateMatch.as_view(), name='calculate_match'),
]