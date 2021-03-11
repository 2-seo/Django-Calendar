from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Calendar

def calendar(request):
    return render(request, 'calendar.html', {})

@csrf_exempt
def create_data(request):
    title = request.POST.get('title')
    start = request.POST.get('startDay')
    end = request.POST.get('endDay')
    Calendar.objects.create(title=title, start=start, end=end)

    return JsonResponse({'message': 'SUCCESS'}, status=200)


def get_data(request):
    events = Calendar.objects.all()
    data = serializers.serialize('json', events)

    return HttpResponse(data, content_type='text/json-comment-filtered')

@csrf_exempt
def update_data(request, pk):
    event = Calendar.objects.get(pk=pk)
    event.title = request.POST.get('title')
    event.start = request.POST.get('startDay')
    event.end = request.POST.get('endDay')
    event.save()

    return JsonResponse({'message': 'SUCCESS'}, status=200)

@csrf_exempt
def delete_data(request, pk):
    event = Calendar.objects.get(pk=pk)
    event.delete()

    return JsonResponse({'message': 'SUCCESS'}, status=200)