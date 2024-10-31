
from django.contrib import admin
from django.urls import path
from app.views import get_filtered_data, get_csrf

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get_filtered_data/', get_filtered_data),
    path('get_csrf/', get_csrf)
]
