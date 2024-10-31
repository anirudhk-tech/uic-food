from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse
from . import models
from .models import *
from django.views.decorators.csrf import csrf_exempt
import json

def get_csrf(request):
    token = get_token(request)
    return HttpResponse("Cookie sent.")

@csrf_exempt
def get_filtered_data(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        return_filtered_data(body)
        return JsonResponse(body.get('categories', ['All']), safe=False)
