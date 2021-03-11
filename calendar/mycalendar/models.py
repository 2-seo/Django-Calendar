from django.db import models

class Calendar(models.Model):
    title = models.CharField(max_length=100)
    start = models.CharField(max_length=30)
    end = models.CharField(max_length=30)

    def __str__(self):
        return self.title
