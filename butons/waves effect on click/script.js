const buttons = document.getElementsByClassName('butt');

for (const e of buttons) {
    e.addEventListener('click', addElement);
};

function addElement(e) {
    const addDiv = document.createElement('div'),
        mValue = Math.max(this.clientWidth, this.clientHeight),
        rect = this.getBoundingClientRect();
        sDiv = addDiv.style;

    sDiv.width = sDiv.height = mValue + 'px';
    sDiv.left = e.clientX - rect.left - (mValue / 2) + 'px';
    sDiv.top = e.clientY - rect.top - (mValue / 2) + 'px';

    addDiv.classList.add('pulse');
    this.appendChild(addDiv);
};