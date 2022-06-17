from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class List(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=1000)
    createdAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    completed = models.BooleanField(default=False)
    deadline = models.DateTimeField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

class Task(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=1000)
    createdAt = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    deadline = models.DateTimeField(blank=True, null=True)
    list = models.ForeignKey(List, on_delete=models.PROTECT, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    important = models.BooleanField(default=False)
