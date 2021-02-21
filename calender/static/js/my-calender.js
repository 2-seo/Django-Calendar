document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.querySelector('#calendar');

  let calendar
  let events = []

  $.ajax({
    type: "GET",
    url: '/calender/data',
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

        detailEvent(eventId, title, startDay, endDay)

        console.log(id, title);
      },

      select: function(event) {
        // console.log(event);
      }
    });

    calendar.render();

  }).fail(function (error) {
    console.log(error);
  });

});

function detailEvent(eventId ,title, startDay, endDay) {
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
      updateEvent()
    } else if (result.isDenied) {
      deleteEvent(eventId)
    }
  })
}

function updateEvent() {
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
      const answers = JSON.stringify(result.value)
      Swal.fire({
        title: 'All done!',
        html: `
          Your answers:
          <pre><code>${answers}</code></pre>
        `,
        confirmButtonText: 'Lovely!'
      })
    }
  });
}

function deleteEvent(eventId) {
  $.ajax({
    type: "DELETE",
    url: '/calender/data/' + eventId,
  }).done(function (response) {
    Swal.fire({
        icon: 'success',
        title: '삭제 완료!',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/calender';
        }
      })
  }).fail(function (error) {
    console.log(error);
  });
}