# urls.py
from django.urls import path
from main.views import GetMatchingCountries, CalculateMatch, CountryDetailView, ObtainTokenView

urlpatterns = [
    path('api/get-token/', ObtainTokenView.as_view(), name='get-token'),
    path('api/matching-countries/', GetMatchingCountries.as_view(), name='country-list'),
    path('api/calculate-match/', CalculateMatch.as_view(), name='calculate-match'),
    path('api/country/<int:pk>/', CountryDetailView.as_view(), name='country-detail'),
]

