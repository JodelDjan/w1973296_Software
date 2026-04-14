from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Post, Application
from .serializers import PostSerializer, ApplicationSerializer
from .permissions import IsResearcher
from users.models import CustomUser

class PostListView(generics.ListAPIView):
    """Any logged in user can view posts and guests can too"""
    queryset           = Post.objects.all().order_by('-created_at')
    serializer_class   = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Post.objects.all().order_by('-created_at')
        return Post.objects.all().order_by('-created_at')[:3] #Limit to 3 posts
    
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
    
class ApplyToPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        """Only general users can apply"""
        if request.user.role != CustomUser.GENERAL_USER:
            return Response(
                {'error': 'Only general users can apply to posts.'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response(
                {'error': 'Post not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # check if already applied
        if Application.objects.filter(post=post, user=request.user).exists():
            return Response(
                {'error': 'You have already applied to this post.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        application = Application.objects.create(
            post=post,
            user=request.user
        )
        serializer = ApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)