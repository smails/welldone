document.querySelectorAll('.swiper-container').forEach((elem) => {
  const slider = new Swiper(elem, {
    speed: 400,
    spaceBetween: 30,
    loop: true,
    slidesPerView: 3,
    navigation: {
      nextEl: elem.nextElementSibling.nextElementSibling,
      prevEl: elem.nextElementSibling,
    },
    breakpoints: {
      575: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
});

$('.js-open-quiz').click(() => {
  $('.modal-quiz').fadeIn();
});

$(window).click((e) => {
  if (e.target.classList.contains('modal-quiz') && e.target.style.display == 'block') {
    $('.modal-quiz').fadeOut();
  }
});
$('.js-open-callback').click(() => {
  $('.modal-callback').fadeIn();
});

$(window).click((e) => {
  if (e.target.classList.contains('modal-callback') && e.target.style.display == 'block') {
    $('.modal-callback').fadeOut();
  }
});
