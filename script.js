let lastScrollY = window.pageYOffset;
let ticking = false;

function onScroll() {
  lastScrollY = window.pageYOffset;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
  }
  ticking = true;
}

function updateParallax() {
  var layers = document.querySelectorAll('.parallax-layer');
  layers.forEach(function(layer) {
    var depthY = layer.getAttribute('data-depth');
    var verticalMovement = -(lastScrollY * depthY) / 10;
    var depthX = layer.getAttribute('data-depth-x') || 0;
    var horizontalMovement = -(lastScrollY * depthX) / 10;

    var translate3d = `translate3d(${horizontalMovement}px, ${verticalMovement}px, 0)`;
    layer.style.transform = translate3d;
  });
  ticking = false;
}

document.addEventListener('scroll', onScroll);
