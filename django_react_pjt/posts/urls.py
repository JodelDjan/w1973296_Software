from django.urls import path
from .views import PostListView, PostCreateView, PostSearchView, ApplyToPostView, ResearcherDashboardView

urlpatterns = [
    path('',        PostListView.as_view(),   name='post-list'),
    path('create/', PostCreateView.as_view(), name='post-create'),
    path('search/', PostSearchView.as_view(), name='post-search'),
    path('<int:post_id>/apply/', ApplyToPostView.as_view(), name='post-apply'),
    path('dashboard/', ResearcherDashboardView.as_view(), name='dashboard'),
]