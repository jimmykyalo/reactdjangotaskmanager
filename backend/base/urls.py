from django.urls import path
from . import views
urlpatterns = [
    path('tasks/', views.getAllTasks, name='all-tasks'),
    path('lists/', views.getAllLists, name='all-lists'),
    path('lists/<str:pk>/', views.getListById, name='list-details'),
    path('tasks/<str:pk>/', views.getTaskById, name='task-details'),
    path('tasks/create/', views.createTask, name='create-task'),
    path('lists/create/', views.createList, name='create-list'),
    path('users/login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    path('users/<str:pk>/', views.getUserById, name='user'),
   
]