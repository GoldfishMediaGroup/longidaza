function header() {
  function headerDesk() {
    const allModals = document.querySelectorAll('[data-modal]');
    const allTriggers = document.querySelectorAll('[data-trigger]');

    if (allModals.length === 0 || allTriggers.length === 0) return;

    allModals.forEach((modal) => modal.classList.add('isTransition'));

    toggleModals();
    initTabs();

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

  function headerMob() {}

  window.innerWidth > 768 ? headerDesk() : headerMob();
}

export default header;
