from django.urls import path
from . import views
urlpatterns = [
    path('tasks/', views.getAllTasks, name='all-tasks'),
    path('tasks/create/', views.createTask, name='create-task'),
    path('tasks/mark/', views.markTask, name='update-tasks'),
    path('tasks/update/', views.updateTasks, name='update-tasks'),
    path('tasks/<str:pk>/', views.getTaskById, name='task-details'),
    path('lists/', views.getAllLists, name='all-lists'),
    path('lists/create/', views.createList, name='create-list'),
    path('lists/<str:pk>/', views.getListById, name='list-details'),
    path('users/login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    path('users/<str:pk>/', views.getUserById, name='user'),
   
]