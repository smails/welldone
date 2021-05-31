$(document).on('change', '.form__file', (e) => {
  const file = e.target.files;
  $(e.target).parent().find('.form__add-file').text(file[0].name);
});

let step = 1;
$('.reg-team__add-pers').click(() => {
  if (step !== 7) {
    $('.reg-team__team').append(`<form class="form">
    <p class="form__title">Игрок №${step}
    </p>
    <div class="form__group">
      <p class="form__caption">Фамилия
      </p><input class="form__field" type="text" placeholder="Ваша фамилия">
    </div>
    <div class="form__group">
      <p class="form__caption">Имя
      </p><input class="form__field" type="text" placeholder="Ваше имя">
    </div>
    <div class="form__group">
      <p class="form__caption">Город
      </p><input class="form__field" type="text" placeholder="Из какого вы города">
    </div>
    <div class="form__group">
      <p class="form__caption">E-mail
      </p><input class="form__field" type="email" placeholder="Ваш E-mail">
    </div>
    <div class="form__group">
      <p class="form__caption">Номер телефона
      </p><input class="form__field" type="text" placeholder="+7(___) __-__-__">
    </div>
    <button class="form__btn btn-register">зарегистрироваться
    </button>
  </form>`);
    step += 1;
  }
});
