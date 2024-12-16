# urls.py
from django.urls import path
from main.views import GetMatchingCountries, CalculateMatch

urlpatterns = [
    path('api/matching-countries/', GetMatchingCountries.as_view(), name='country-list'),
    path('api/calculate-match/', CalculateMatch.as_view(), name='calculate-match'),
    # Diğer URL'ler...
]

