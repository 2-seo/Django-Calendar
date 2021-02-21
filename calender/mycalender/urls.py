from django.urls import path
from . import views

urlpatterns = [
    path('calender/', views.calender),
    path('calender/data', views.get_data),
    path('calender/update/<int:pk>', views.update_data),
    path('calender/delete/<int:pk>', views.delete_data),
]