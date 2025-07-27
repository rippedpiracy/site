  document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('sidebar-checkbox');

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const minSwipe = 75;

      if (swipeDistance > minSwipe) {
        checkbox.checked = false;
      } else if (swipeDistance < -minSwipe) {
        checkbox.checked = true;
      }
    }
  });
