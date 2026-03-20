from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer
from .permissions import IsResearcher

class PostListView(generics.ListAPIView):
    """Any logged in user can view posts"""
    queryset           = Post.objects.all().order_by('-created_at')
    serializer_class   = PostSerializer
    permission_classes = [IsAuthenticated]


class PostCreateView(generics.CreateAPIView):
    """Only researchers can create posts"""
    serializer_class   = PostSerializer
    permission_classes = [IsAuthenticated, IsResearcher]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostSearchView(generics.ListAPIView):
    """Search posts by content"""
    serializer_class   = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        return Post.objects.filter(content__icontains=query).order_by('-created_at')