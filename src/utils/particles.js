export function showParticles(event) {
  const elementPosition = event.target.getBoundingClientRect();
  for (let i = 0; i < 60; i++) {
    createParticle(elementPosition.left, elementPosition.top);
  }
}

function createParticle (x, y) {
  const particle = document.createElement('particle');
  document.body.appendChild(particle);

  const width = Math.random() * 5 + 4;
  const height = width;
  const destinationX = (Math.random() - 0.5) * 300;
  const destinationY = (Math.random() - 0.5) * 300;
  const rotation = Math.random() * 520;
  const delay = Math.random() * 200;
  const color = `hsl(${Math.random() * 46 + 46}, 100%, 60%)`;

  particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
  particle.style.background = color;
  particle.style.borderRadius = '50%';
  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
  particle.style.position = 'fixed';
  particle.style.top = 0;
  particle.style.left = 0;

  const animation = particle.animate([
    {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
      opacity: 1
    },
    {
      transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
      opacity: 0
    }
  ], {
    duration: Math.random() * 1000 + 5000,
    easing: 'cubic-bezier(0, .9, .57, 1)',
    delay: delay
  });

  animation.onfinish = removeParticle;
}

function removeParticle (event) {
  event.srcElement.effect.target.remove();
}
