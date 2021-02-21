from django.urls import path

from . import views

urlpatterns = [
    path('calender/', views.calender),
    path('calender/data', views.get_data)
]