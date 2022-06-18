from django.shortcuts import render
from .serializers import TaskSerializer, ListSerializer, UserSerializer, UserSerializerWithToken
from .models import Task, List
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@api_view(['GET'])
def getAllTasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getAllLists(request):
    lists = List.objects.all()
    serializer = ListSerializer(lists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTaskById(request, id):
    task = Task.objects.get(_id=id)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getListById(request, id):
    list = List.objects.get(_id=id)
    serializer = ListSerializer(list, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createList(request):
    data = request.data
    if request.user:
        user=request.user
    else:
        user=None
    list = List.objects.create(
        name=data['name'],
        user=user
    )
    serializer = ListSerializer(list, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createTask(request):
    data = request.data
    
    if request.user:
        user=request.user
    else:
        user=None
    
    try:
        list = List.objects.get(_id=data['listId'])
    except:
        list=None
    task = Task.objects.create(
        name=data['name'],
        user=user,
        list=list
    )
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['firstName'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            last_name=data['lastName']
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except IntegrityError:
        message = {'detail': 'User with email or phone number already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)