const toolbarElement = document.getElementById('toolbar');
const rowContainerElement = document.getElementById('row-container');

const colors = [ 
    'rgb(0, 0, 0)',
    'rgb(128, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 128, 0)',
    'rgb(255, 255, 0)',
    'rgb(255, 255, 128)',
    'rgb(255, 255, 255)'
 ];
const rowCount = 10;

let selectedColorElement;

colors.map(color => {
    const colorElement = document.createElement('a');
    colorElement.href = '#';
    colorElement.className = 'color';
    colorElement.style.backgroundColor = color;
    colorElement.addEventListener('click', onSelectColor);
    toolbarElement.appendChild(colorElement);
});

for(let i = 0; i < rowCount; i++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'row';
    rowElement.addEventListener('click', onPaint);
    rowContainerElement.appendChild(rowElement);
}

function onSelectColor(e) {
    e.preventDefault();
    if(selectedColorElement) {
        selectedColorElement.classList.remove('--selected');
    }
    selectedColorElement = e.target;
    selectedColorElement.classList.add('--selected');
}

function onPaint(e) {
    e.target.style.backgroundColor = selectedColorElement.style.backgroundColor;
}
