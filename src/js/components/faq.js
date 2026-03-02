window.$ = window.jQuery = require('jquery');

function faq() {
  //   const items = document.querySelectorAll('.faq__item');
  //   const infos = document.querySelectorAll('.faq__info');
  //     if (items.length <= 0 || infos.length <= 0) return;
  //   items.forEach((item, i) => {
  //     item.addEventListener('click', () => {
  //         item.classList.toggle('isActive');
  //       $(infos[i]).slideToggle();
  //     });
  //   });

  const $section = $('.faq');
  if (!$section) return;

  $section.on('click', '.acc', function () {
    const $item = $(this);
    const $content = $item.find('.acc__info');

    $section.find('.acc').not($item).removeClass('isOpen').find('.acc__info').slideUp();

    $item.toggleClass('isOpen');
    $content.stop(true, true).slideToggle();
  });
}

export default faq;
