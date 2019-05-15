import DoubleSlider from 'double-slider';
import 'normalize.css';
import './styles/theme.scss';

let multiple = 1,
    minRange = 0,
    maxRange = 1000,
    outputArr = [];

const multipleInput = document.querySelector('.multi-input');
const rangeInput = document.querySelector('.slider');
const minRangeLabel = document.querySelector('.slider-item--1');
const maxRangeLabel = document.querySelector('.slider-item--2');

const outputContainer = document.querySelector('.output-inner-container');
const copyIcon = document.querySelector('.copy-icon');
const totalLabel = document.querySelector('.total span');

multipleInput.addEventListener('keyup', () => {
    multiple = multipleInput.value;
    calcMultiples();
});

// initialize the double slider
const mySlider = new DoubleSlider(rangeInput);
mySlider.addEventListener('slider:change', () => {
    const { min, max } = mySlider.value;

    minRange = min;
    maxRange = max;
    minRangeLabel.innerText = min;
    maxRangeLabel.innerText = max;

    calcMultiples(min, max);
});

const calcMultiples = () => {
    // clear the array of any previous values if any
    outputArr = [];

    for(let i = minRange; i <= maxRange; i++) {
        if(i !== 0 && i % multiple === 0) {
            outputArr.push(i);
        } 
    }
    genOutputs();
}

const genOutputs = () => {
    // clear the ouput panel of previous values
    outputContainer.innerHTML = '';
    if(outputArr.length <= 0) {
        outputContainer.innerHTML = `<h1 class='empty-prompt'>No Multiples In Given Range :/</h1>`;
    }

    outputArr.forEach(item => {
        const outerLink = document.createElement('a');
        outerLink.setAttribute('href', `https://en.wikipedia.org/wiki/AD_${item}`);
        outerLink.setAttribute('target', '_blank');

        const outputCircle = document.createElement('div');
        outputCircle.className = 'output-circle';
        outerLink.append(outputCircle);
        const output = document.createElement('h1');
        
        output.innerText = item;
        outputCircle.append(output);
        
        outputContainer.append(outerLink);
    });

    totalLabel.innerText = outputArr.length;
}

// Copies numbers to the users clipboard
copyIcon.addEventListener('click', () => {
    if(outputArr.length <= 0) return;

    const multipleOutput = outputArr.join(' ');

    navigator.clipboard.writeText(multipleOutput)
        .then(() => {
            copyIcon.classList.add('copy-icon--copied');
            setTimeout(() => copyIcon.classList.remove('copy-icon--copied'), 1000);
        }, 
        err => console.error('Async: Could not copy text: ', err));
});