# Generated by Django 4.0.5 on 2022-06-19 05:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_rename_deadline_task_completedat_task_endtime_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='completedAt',
            new_name='completedTime',
        ),
    ]
