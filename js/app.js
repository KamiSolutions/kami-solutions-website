// Boot: render config-driven content first, then attach behaviour.
document.addEventListener('DOMContentLoaded', () => {
  KamiComponents.init();
  KamiAnim.init();
});
