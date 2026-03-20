from rest_framework.permissions import BasePermission
from users.models import CustomUser

class IsResearcher(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == CustomUser.RESEARCHER