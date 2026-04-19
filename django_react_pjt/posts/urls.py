from django.urls import path
from .views import PostListView, PostCreateView, PostSearchView, ApplyToPostView, ResearcherDashboardView, EditPostView, ClosePostView

urlpatterns = [
    path('',        PostListView.as_view(),   name='post-list'),
    path('create/', PostCreateView.as_view(), name='post-create'),
    path('search/', PostSearchView.as_view(), name='post-search'),
    path('<int:post_id>/apply/', ApplyToPostView.as_view(), name='post-apply'),
    path('dashboard/', ResearcherDashboardView.as_view(), name='dashboard'),
    path('<int:post_id>/edit/',     EditPostView.as_view(),            name='post-edit'),
    path('<int:post_id>/close/',    ClosePostView.as_view(),           name='post-close'),
]