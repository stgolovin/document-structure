document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  const tooltips = Array.from(document.querySelectorAll('.has-tooltip'));
  tooltips.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const tooltipText = link.getAttribute('title');
      tooltip.textContent = tooltipText;

      const linkPosition = link.getBoundingClientRect();
      tooltip.style.left = linkPosition.left + 'px';
      tooltip.style.top = linkPosition.bottom + 'px';

      tooltip.classList.toggle('tooltip_active');

      const removeTooltip = (e) => {
      if (!tooltip.contains(e.target) && !link.contains(e.target)) {
        tooltip.classList.remove('tooltip_active');
        document.removeEventListener('click', removeTooltip);
      }
      };    
      document.addEventListener('click', removeTooltip);
    });
  });
});