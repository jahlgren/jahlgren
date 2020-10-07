const toolbarElement = document.getElementById('toolbar');
const pixelCanvasElement = document.getElementById('pixel-canvas');
let selectedColorElement;
let mouseIsDown = false;

const colors = [ 
    'rgb(0, 0, 0)',
    'rgb(128, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 128, 0)',
    'rgb(255, 255, 0)',
    'rgb(255, 255, 128)',
    'rgb(255, 255, 255)'
 ];

const gridSize = 8;

colors.map(color => {
    const colorElement = document.createElement('a');
    colorElement.href = '#';
    colorElement.className = 'color';
    colorElement.style.backgroundColor = color;
    colorElement.addEventListener('click', onSelectColor);
    toolbarElement.appendChild(colorElement);
});

pixelCanvasElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
const cellCount = gridSize * gridSize;
for(let i = 0; i < cellCount; i++) {
    const pixelElement = document.createElement('div');
    pixelElement.classList.add('pixel');
    pixelElement.addEventListener('mousedown', onPaint);
    pixelElement.addEventListener('mouseover', onPaint);
    pixelCanvasElement.appendChild(pixelElement);
}

window.addEventListener('mousedown', () => { mouseIsDown = true });
window.addEventListener('mouseup', () => { mouseIsDown = false });
window.addEventListener('resize', resizePixelGrid);
resizePixelGrid();

function onSelectColor(e) {
    e.preventDefault();
    if(selectedColorElement) {
        selectedColorElement.classList.remove('--selected');
    }
    selectedColorElement = e.target;
    selectedColorElement.classList.add('--selected');
}

function onPaint(e) {
    if(mouseIsDown || e.which > 0) {
        e.target.style.backgroundColor = selectedColorElement.style.backgroundColor;
    }
}

function resizePixelGrid() {
    const size = 0.9 * Math.min(pixelCanvasElement.parentElement.clientWidth, pixelCanvasElement.parentElement.clientHeight);
    pixelCanvasElement.style.width = `${size}px`;
    pixelCanvasElement.style.height = `${size}px`;
}