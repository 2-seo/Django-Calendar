from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Calender

def calender(request):
    return render(request, 'calender.html', {})

def get_data(request):
    # events = [
    #     {
    #         'title': '명지대 멋사 지원서 접수',
    #         'start': '2021-02-22T12:00:00',
    #         'end': '2021-03-07T23:59:59',
    #         'constraint': 'businessHours'
    #     },
    #     {
    #         'title': 'Meeting',
    #         'start': '2020-09-13T11:00:00',
    #         'constraint': 'availableForMeeting',
    #         'color': '#257e4a'
    #     },
    #     {
    #         'title': 'Conference',
    #         'start': '2020-09-18',
    #         'end': '2020-09-20'
    #     },
    #     {
    #         'title': 'Party',
    #         'start': '2020-09-29T20:00:00'
    #     },
    #     {
    #         'groupId': 'availableForMeeting',
    #         'start': '2020-09-11T10:00:00',
    #         'end': '2020-09-11T16:00:00',
    #         'display': 'background'
    #     },
    #     {
    #         'groupId': 'availableForMeeting',
    #         'start': '2020-09-13T10:00:00',
    #         'end': '2020-09-13T16:00:00',
    #         'display': 'background'
    #     },
    #     {
    #         'start': '2021-02-10',
    #         'end': '2021-02-11',
    #         'overlap': 'false',
    #         'display': 'background',
    #         'color': '#ff9f89'
    #     },
    #     {
    #         'start': '2021-02-01',
    #         'end': '2021-02-02',
    #         'overlap': 'false',
    #         'display': 'background',
    #         'color': '#ff9f89'
    #     }
    # ]
    events = Calender.objects.all()
    data = serializers.serialize('json', events)
    return HttpResponse(data, content_type='text/json-comment-filtered')

@csrf_exempt
def update_data(request, pk):
    event = Calender.objects.get(pk=pk)
    event.title = request.POST.get('title')
    event.start = request.POST.get('startDay')
    event.end = request.POST.get('endDay')
    event.save()

    return JsonResponse({'message': 'SUCCESS'}, status=200)

@csrf_exempt
def delete_data(request, pk):
    event = Calender.objects.get(pk=pk)
    event.delete()

    return JsonResponse({'message': 'SUCCESS'}, status=200)