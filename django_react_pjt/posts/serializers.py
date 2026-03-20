from rest_framework import serializers
from .models import Post, Application
from django.utils import timezone
from users.models import TAG_CHOICES

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_role = serializers.SerializerMethodField()

    class Meta:
        model  = Post
        fields = [
            'id',
            'title',
            'body',
            'tags',
            'start_date',
            'max_participants',
            'state',
            'created_at',
            'author_name',
            'author_role'
        ]

    def get_author_name(self, obj):
        return f"{obj.author.first_name} {obj.author.last_name}"

    def get_author_role(self, obj):
        return obj.author.role
    
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = [
            'id',
            'post',
            'user',
            'has_read_post',
            'has_consented',
            'created_at'
        ]
        read_only_fields = ['user', 'post']

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'title', 'body', 'start_date', 'max_participants',
            'tags', 'state'
        ]

def validate_start_date(self, value):
    if value < timezone.now().date():
        raise serializers.ValidationError("Start date cannot be in the past.")
    return value

def validate_tags(self, value):
    valid_tags = [tag[0] for tag in TAG_CHOICES]
    for tag in value:
        if tag not in valid_tags:
            raise serializers.ValidationError(f"{tag} is not a valid tag.")
    return value