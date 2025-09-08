
const links = [
  // MOI ET les Catégories
  { from: 'moi', to: 'developpement' },
  { from: 'moi', to: 'entreprendre' },
  { from: 'moi', to: 'competences' },

  // Développement
  { from: 'developpement', to: 'fwClient' },
  { from: 'developpement', to: 'fwServeur' },
  { from: 'developpement', to: 'hebergement' },
  { from: 'developpement', to: 'dispositifs' },
  { from: 'developpement', to: 'composants' },

  // Entreprendre
  { from: 'entreprendre', to: 'concevoir' },
  { from: 'entreprendre', to: 'piloter' },
  { from: 'entreprendre', to: 'defendre' },
  { from: 'entreprendre', to: 'maitriser' },

  // Compétences métiers
  { from: 'competences', to: 'realiser' },
  { from: 'competences', to: 'etablir' },
  { from: 'competences', to: 'retraduire' },

  // Liens entre compétences
  { from: 'fwClient', to: 'fwServeur' },
  { from: 'fwClient', to: 'composants' },
  { from: 'hebergement', to: 'fwServeur' },
  { from: 'dispositifs', to: 'composants' },
  { from: 'piloter', to: 'concevoir' },
  { from: 'maitriser', to: 'concevoir' },
  { from: 'etablir', to: 'retraduire' },
  { from: 'realiser', to: 'etablir' }
];


const canvas = document.getElementById('canvas');
const svg = canvas.querySelector('svg');

function getCenter(el) {
  const r = el.getBoundingClientRect();
  const svgR = svg.getBoundingClientRect();
  return {
    x: r.left - svgR.left + r.width / 2,
    y: r.top - svgR.top + r.height / 2
  };
}

function drawLines() {
  svg.innerHTML = "";
  links.forEach(({ from, to }) => {
    const el1 = document.getElementById(from);
    const el2 = document.getElementById(to);
    if (!el1 || !el2) return;

    const { x: x1, y: y1 } = getCenter(el1);
    const { x: x2, y: y2 } = getCenter(el2);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#024959");
    line.setAttribute("stroke-width", 2);
    svg.appendChild(line);
  });
}

// Drag & Drop
let current = null, offsetX = 0, offsetY = 0;

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("node")) {
    current = e.target;
    offsetX = e.clientX - current.offsetLeft;
    offsetY = e.clientY - current.offsetTop;
    current.style.zIndex = 1000;
  }
});

document.addEventListener("mousemove", (e) => {
  if (!current) return;
  current.style.left = (e.clientX - offsetX) + "px";
  current.style.top = (e.clientY - offsetY) + "px";
  drawLines();
});

document.addEventListener("mouseup", () => {
  if (current) current.style.zIndex = "";
  current = null;
});

window.addEventListener("resize", drawLines);
window.addEventListener("load", drawLines);

