from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignUpView, LoginView, ProfileView, ResearcherDirectoryView, PublicResearcherProfileView

urlpatterns = [
    path('register/', SignUpView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/<int:user_id>/', PublicResearcherProfileView.as_view(), name='public-profile'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('directory/',   ResearcherDirectoryView.as_view(), name='directory'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]