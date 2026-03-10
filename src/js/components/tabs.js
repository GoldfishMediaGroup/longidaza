window.$ = window.jQuery = require('jquery');

function tabs() {
  const section = document.querySelector('.tabs');
  if (!section) return;

  const triggers = section.querySelectorAll('[data-trigger]');
  const lists = section.querySelectorAll('[data-list]');
  const links = section.querySelectorAll('[data-link]');
  const tabs = section.querySelectorAll('[data-tab]');

  [triggers, lists, links, tabs].forEach((group) => group[0]?.classList.add('isActive'));

  section.addEventListener('click', (e) => {
    const target = e.target;

    const accItem = target.closest('.faq-acc__item');
    if (accItem) {
      const $accItem = $(accItem);

      // const $otherItems = $(section).find('.faq-acc__item').not($accItem);
      // $otherItems.removeClass('isOpen').find('.faq-acc__info').stop(true, true).slideUp();

      $accItem.toggleClass('isOpen');
      $accItem.find('.faq-acc__info').stop(true, true).slideToggle();
      return;
    }


    const link = target.closest('[data-link]');
    const trigger = target.closest('[data-trigger]');

    if (link || trigger) {
      const $allArticles = $(section).find('.faq-acc__item');
      $allArticles.removeClass('isOpen').find('.faq-acc__info').stop(true, true).slideUp();

      if (link) {
        const triggerId = link.dataset.link;
        const targetTab = section.querySelector(`[data-tab="${triggerId}"]`);

        links.forEach((l) => l.classList.toggle('isActive', l === link));
        tabs.forEach((t) => t.classList.toggle('isActive', t === targetTab));
      }

      if (trigger) {
        const dataTrigger = trigger.dataset.trigger;
        const targetList = section.querySelector(`[data-list="${dataTrigger}"]`);
        const targetLink = targetList?.querySelector('[data-link]');
        const targetTabId = targetLink?.dataset.link;
        const targetTab = section.querySelector(`[data-tab="${targetTabId}"]`);

        triggers.forEach((t) => t.classList.toggle('isActive', t === trigger));
        lists.forEach((l) => l.classList.toggle('isActive', l === targetList));
        links.forEach((l) => l.classList.toggle('isActive', l === targetLink));
        tabs.forEach((t) => t.classList.toggle('isActive', t === targetTab));
      }
    }
  });
}

export default tabs;
