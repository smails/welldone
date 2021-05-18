const moreCalendarDate = $('.calendar__btn');
const calendarDate = $('.calendar__item');
if (moreCalendarDate !== undefined && moreCalendarDate !== null) {
  moreCalendarDate.click(() => {
    calendarDate.slideDown();
    moreCalendarDate.remove();
  });
}
