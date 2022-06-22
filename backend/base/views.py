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
from django.utils import timezone
from dateutil.parser import parse
from dateutil.parser._parser import ParserError
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
def getListById(request, pk):
    list = List.objects.get(_id=pk)
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
        description=data['description'],
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
    try:
        completionTime=timezone.make_aware(parse(data['completedTime']), timezone.get_current_timezone())
    except:
        completionTime=None
    
    try:
        endTime=timezone.make_aware(parse(data['endTime']), timezone.get_current_timezone())
    except:
        endTime=None
    
    try:
        startTime=timezone.make_aware(parse(data['startTime']), timezone.get_current_timezone())
    except:
        startTime=None
    
    task = Task.objects.create(
        name=data['name'],
        description=data['description'],
        startTime=startTime,
        endTime=endTime,
        completedTime=completionTime,
        important=data['important'],
        completed=data['completed'],
        user=user
    )
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTasks(request):
    try:
        data = request.data
        taskList = list()
        print(data)
        for i in data:
            task = Task.objects.get(_id=i['_id'])
            if i['attribute'] =='startTime' or i['attribute'] =='endTime' or i['attribute'] =='completedTime':
                setattr(task, i['attribute'], (timezone.make_aware(parse(i['value']), timezone.get_current_timezone())))
            elif i['attribute'] =='list':
                _list = List.objects.get(_id=int(i['value']))
                setattr(task, i['attribute'], _list)
            else :
                setattr(task, i['attribute'], i['value'])
            task.save()
            taskList.append(task)
        
        serializer=TaskSerializer(taskList, many=True)
        
        
        return Response(serializer.data)
    except ParserError:
        message = {'detail': 'Please enter a valid date and time format'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def deleteTasks(request):
    data = request.data
    for i in data:
        task = Task.objects.get(_id=i['_id'])
        task.delete()
    return Response('Tasks Deleted')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def markTask(request):
    data = request.data
    
    task = Task.objects.get(_id=data['taskId'])
    taskValue = getattr(task, data['attribute'])
    setattr(task, data['attribute'], not taskValue)
    task.save()
    
    
    serializer=TaskSerializer(task, many=False)
    
    
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
            last_name=data['lastName'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except IntegrityError:
        message = {'detail': 'User with given email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateLists(request):
    data = request.data
    listList = list()
    print(data)
    for i in data:
        _list = List.objects.get(_id=i['_id'])
        setattr(_list, i['attribute'], i['value'])
        _list.save()
        listList.append(_list)
    
    serializer=ListSerializer(listList, many=True)
    
    
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def deleteLists(request):
    data = request.data
    for i in data:
        list = List.objects.get(_id=i['_id'])
        list.delete()
    return Response('Lists Deleted')