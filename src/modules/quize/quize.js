$(document).on('change', '.file__field', (e) => {
  const file = e.target.files;
  $(e.target).parent().find('.file__text').text(file[0].name);
});
