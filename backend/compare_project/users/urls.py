# backend/compare_project/main/urls.py
from django.urls import path
from users.views import UserCreateView, UserDetailView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('users/', UserCreateView.as_view(), name='user-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('api-token-auth/', obtain_auth_token),  # Token almak için endpoint
]
