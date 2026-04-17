from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, ResearcherProfile, GeneralProfile

#Handles password hashing from admin panel using built in UserAdmin form
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display  = ['email', 'first_name', 'last_name', 'role', 'is_staff']
    ordering      = ['email']
    fieldsets = (
        (None,           {'fields': ('email', 'password', 'role')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions',  {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'role', 'password1', 'password2'),
        }),
    )


admin.site.register(CustomUser) 
admin.site.register(ResearcherProfile) 
admin.site.register(GeneralProfile) 

