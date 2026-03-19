import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const burgerBtn = document.getElementById('burgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

  const bindActiveNav = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a');
      if (!link || !container.contains(link)) return;

      e.preventDefault();

      const current = container.querySelector('a.active');
      if (current && current !== link) current.classList.remove('active');
      link.classList.add('active');
    });
  };

  
  bindActiveNav('.sub-header-nav');
  bindActiveNav('.top-nav');

  if (!userBtn || !userDropdown || !burgerBtn || !sidebar || !overlay) return;

    const closeUserDropdown = () => userDropdown.classList.remove('show');
    const openSidebar = () => {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('no-scroll');
    };
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    };

    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSidebar();
    });

    overlay.addEventListener('click', () => {
        closeUserDropdown();
        closeSidebar();
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof Node) {
            if (!userBtn.contains(target) && !userDropdown.contains(target)) closeUserDropdown();
            if (!sidebar.contains(target) && !burgerBtn.contains(target)) closeSidebar();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeUserDropdown();
            closeSidebar();
        }
    });
});
