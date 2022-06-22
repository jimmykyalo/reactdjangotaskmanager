from .models import Task, List
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model=Task
        fields = '__all__'

class ListSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=List
        fields = '__all__'

    
    def get_tasks(self, obj):
        taskItems = obj.task_set.all()
        serializer = TaskSerializer(taskItems, many=True)
        return serializer.data

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    isActive = serializers.SerializerMethodField(read_only=True)
    initials = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'isActive','initials']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_isActive(self, obj):
        return obj.is_active

    def get_name(self, obj):
        name = obj.get_full_name()
        if name == '':
            name = 'John Doe'
        
        return name

    def get_initials(self, obj):
        if obj.get_full_name()=='':
            fullName= 'John Doe'
        else:
            fullName=obj.get_full_name()
        name_list = fullName.split()

        userInitials = ""

        for name in name_list:  # go through each name
            userInitials += name[0].upper()  # append the initial

        return userInitials


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    


    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token','initials']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    
