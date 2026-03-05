function header() {
  const header = document.querySelector('.header');

  if (!header) return;
  function headerDesk() {
    const allModals = header.querySelectorAll('[data-modal]');
    const allTriggers = header.querySelectorAll('[data-trigger]');

    if (allModals.length === 0 || allTriggers.length === 0) return;

    allModals.forEach((modal) => modal.classList.add('isTransition'));

    toggleModals();
    initTabs();
    initSearch();

    function closeEverything() {
      allModals.forEach((m) => m.classList.remove('isOpen'));
      allTriggers.forEach((t) => t.classList.remove('isOpen'));
    }

    function toggleModals() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-trigger]');
        const modalClick = e.target.closest('[data-modal]');

        if (trigger) {
          const targetId = trigger.dataset.trigger;
          const targetModal = document.querySelector(`[data-modal="${targetId}"]`);

          allModals.forEach((modal) => {
            if (modal !== targetModal) {
              modal.classList.remove('isOpen');
              const otherId = modal.dataset.modal;
              document.querySelectorAll(`[data-trigger="${otherId}"]`).forEach((btn) => btn.classList.remove('isOpen'));
            }
          });

          if (targetModal) {
            const isNowOpen = targetModal.classList.toggle('isOpen');
            document.querySelectorAll(`[data-trigger="${targetId}"]`).forEach((btn) => btn.classList.toggle('isOpen', isNowOpen));
          }
          return;
        }

        if (!modalClick) {
          closeEverything();
        }
      });
    }

    function initTabs() {
      const tabs = document.querySelectorAll('[data-tab]');
      const contents = document.querySelectorAll('[data-content]');
      let hideTimeout;

      if (!tabs.length || !contents.length) return;

      const showContent = (id) => {
        clearTimeout(hideTimeout);
        contents.forEach((content) => {
          content.classList.toggle('isOpen', content.dataset.content === id);
        });
        tabs.forEach((tab) => {
          tab.classList.toggle('isOpen', tab.dataset.tab === id);
        });
      };

      const hideAll = () => {
        hideTimeout = setTimeout(() => {
          contents.forEach((c) => c.classList.remove('isOpen'));
          tabs.forEach((t) => t.classList.remove('isOpen'));
        }, 100);
      };

      tabs.forEach((tab) => {
        tab.addEventListener('mouseenter', () => showContent(tab.dataset.tab));
        tab.addEventListener('mouseleave', hideAll);
      });

      contents.forEach((content) => {
        content.addEventListener('mouseenter', () => {
          clearTimeout(hideTimeout);
        });
        content.addEventListener('mouseleave', hideAll);
      });
    }
  }

  function headerMob() {
    const burger = header.querySelector('.burger');
    const burgerModal = header.querySelector('.burger-modal');
    const asides = header.querySelectorAll('.burger-modal__aside');
    burger.addEventListener('click', () => {
      const isOpening = !header.classList.contains('isBurger');
      header.classList.toggle('isBurger', isOpening);

      if (window.innerWidth <= 768 && isOpening) {
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('lock');

        scrollToTop();
      }

      isOpening && header.classList.remove('isSearch');
      if (!isOpening) {
        asides.forEach((item) => item.classList.remove('isOpen'));
      }
    });

    burgerModal.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-burger-trigger]');
      const back = e.target.closest('[data-burger-back]');

      if (trigger) {
        const targetId = trigger.dataset.burgerTrigger;
        const targetModal = document.querySelector(`[data-burger-aside="${targetId}"]`);

        if (targetId) {
          targetModal.classList.add('isOpen');
        }
        return;
      }

      if (back) {
        back.closest('[data-burger-aside]').classList.remove('isOpen');
      }
    });
  }

  function initSearch() {
    const search = header.querySelector('.search');
    if (!search) return;
    const searchInput = search.querySelector('input');

    const searchClear = search.querySelector('.search__clear');
    const searchModal = search.querySelector('.search__modal');

    searchModal.classList.add('isTransition');
    document.addEventListener('click', (e) => {
      const isOpenBtn = e.target.closest('.search__open');
      const isInsideSearch = e.target.closest('.search');
      const closeBtn = e.target.closest('.search__close-btn');
      if (isOpenBtn) {
        header.classList.add('isSearch');
        header.classList.remove('isBurger');

        header.querySelectorAll('.burger-modal__aside').forEach((item) => item.classList.remove('isOpen'));

        searchInput.focus();
        if (window.innerWidth <= 768) {
          document.body.classList.add('no-scroll');
          document.documentElement.classList.add('lock');

          scrollToTop();
        }
      }
      if ((!isInsideSearch && window.innerWidth > 768) || closeBtn) {
        header.classList.remove('isSearch');
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('lock');
      }
    });

    searchInput.addEventListener('input', (e) => {
      let value = e.target.value.trim().toLowerCase();

      if (value.length > 0) {
        search.classList.add('isFilled');
      } else {
        search.classList.remove('isFilled');
      }
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      search.classList.remove('isFilled');
    });
  }

  function scrollToTop(duration = 400) {
    const start = window.pageYOffset;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, start * (1 - progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  initSearch();
  window.innerWidth > 768 ? headerDesk() : headerMob();
}

export default header;
