const humb = $('.header__burger');
const menu = $('.header__box');
if (humb !== undefined && humb !== null) {
  humb.click(() => {
    humb.toggleClass('open');
    menu.slideToggle();
  });
}


$('.nav__link').click((e) => {
  e.preventDefault();
  const hash = e.target.getAttribute('href');
  $('html, body').animate({
    scrollTop: $(hash).offset().top - window.innerHeight / 5,
  });
  $('.nav__link').removeClass('active');
  $(e.target).addClass('active');
  if (window.innerWidth < 1200 && humb !== undefined && humb !== null) {
    humb.removeClass('open');
    menu.slideUp();
  }
});
