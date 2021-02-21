from django.db import models

# Create your models here.
class Calender(models.Model):
    title = models.CharField(max_length=100)
    start = models.CharField(max_length=30)
    end = models.CharField(max_length=30)

    def __str__(self):
        return self.title
