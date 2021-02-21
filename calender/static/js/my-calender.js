document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('calendar');

  let events = []
  let calendar

  $.ajax({
    type: "GET",
    url: '/calender/data',
  }).done(function (response) {

    response.map(item => events.push(item.fields))
    console.log(events)

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
    events: events

    });

    calendar.render();

  }).fail(function (error) {
    console.log(error);
  });

});