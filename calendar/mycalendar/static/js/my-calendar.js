document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.querySelector('#calendar');

  let calendar
  let events = []

  $.ajax({
    type: "GET",
    url: '/calendar/data',
  }).done(function (response) {
    response.map(item => {
      item.fields['publicId'] = item.pk
      events.push(item.fields)
    })

    calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      // initialDate: '2020-09-12',
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: false,
      selectable: true,
      events: events,
      // events: [
      //   {
      //  event._def.extendedProps.publicId
      //     'publicId': 1,
      //     'title': '명지대 멋사 지원서 접수',
      //     'start': '2021-02-22T12:00:00',
      //     'end': '2021-03-07T23:59:59',
      //     'constraint': 'businessHours'
      //   }
      // ],

      dateClick: function(event) {
        // console.log(event)
      },

      // 캘린더 요소 클릭 시 이벤트
      eventClick: function (event) {
        let eventId = event.event._def.extendedProps.publicId
        let title = event.event._def.title
        let startDay = event.event.startStr
        let endDay = event.event.endStr

        detailModal(eventId, title, startDay, endDay)
      },

      select: function(event) {
        createEventModal();
      }
    });

    calendar.render();

  }).fail(function (error) {
    console.log(error);
  });

});

function createEventModal() {
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      title: '일정을 입력해주세요.',
    },
    {
      title: '시작일을 입력해주세요.',
      text: '예시: 2021-02-22T12:00:00'
    },
    {
      title: '종료일을 입력해주세요.',
      text: '예시: 2021-02-22T12:00:00'
    }
  ]).then((result) => {
    if (result.value) {
      const answers = result.value;
      const title = answers[0];
      const startDay = answers[1];
      const endDay = answers[2];

      createEvent(title, startDay, endDay);
    }
  });
}

function detailModal(eventId , title, startDay, endDay) {
  Swal.fire({
    title: title,
    html: `<p>시작일: ${startDay}</p><p>종료일: ${endDay}</p>`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `수정`,
    denyButtonText: `삭제`,
    cancelButtonText: '취소'
  }).then((result) => {
    if (result.isConfirmed) {
      updateModal(eventId)
    } else if (result.isDenied) {
      deleteEvent(eventId)
    }
  })
}

function updateModal(eventId) {
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      title: '일정을 입력해주세요.',
    },
    {
      title: '시작일을 입력해주세요.',
      text: '예시: 2021-02-22T12:00:00'
    },
    {
      title: '종료일을 입력해주세요.',
      text: '예시: 2021-02-22T12:00:00'
    }
  ]).then((result) => {
    if (result.value) {
      const answers = result.value;
      const title = answers[0];
      const startDay = answers[1];
      const endDay = answers[2];

      updateEvent(eventId, title, startDay, endDay);
    }
  });
}

function createEvent(title, startDay, endDay) {
  let data = {
    title: title,
    startDay: startDay,
    endDay: endDay
  }

  $.ajax({
    type: "POST",
    url: '/calendar/create/',
    data: data,
    dataType: 'json'
  }).done(function (response) {
    Swal.fire({
        icon: 'success',
        title: '추가 완료!',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/calendar';
        }
      })
  }).fail(function (error) {
    console.log(error);
  });
}

function updateEvent(eventId, title, startDay, endDay) {
  let data = {
    title: title,
    startDay: startDay,
    endDay: endDay
  }

  $.ajax({
    type: "POST",
    url: '/calendar/update/' + eventId,
    data: data,
    dataType: 'json'
  }).done(function (response) {
    Swal.fire({
        icon: 'success',
        title: '수정 완료!',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/calendar';
        }
      })
  }).fail(function (error) {
    console.log(error);
  });
}

function deleteEvent(eventId) {
  $.ajax({
    type: "DELETE",
    url: '/calendar/delete/' + eventId,
  }).done(function (response) {
    Swal.fire({
        icon: 'success',
        title: '삭제 완료!',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/calendar';
        }
      })
  }).fail(function (error) {
    console.log(error);
  });
}