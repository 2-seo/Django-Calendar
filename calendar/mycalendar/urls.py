from django.urls import path
from . import views

urlpatterns = [
    path('', views.calendar),
    path('data', views.get_data),
    path('create/', views.create_data),
    path('update/<int:pk>', views.update_data),
    path('delete/<int:pk>', views.delete_data),
]