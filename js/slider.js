let buttonLeft = document.querySelector('.slider__left');
let buttonRight = document.querySelector('.slider__right');
let slider = document.querySelector('.slider__content');

const slideLeft = document.querySelector('#slideLeft');
const slideCenter = document.querySelector('#slideCenter');
const slideRight = document.querySelector('#slideRight');

const arrCards = [];

const generationGroup = {
    'first': 0,
    'second': 0,
    'threed': 0,
    'lastFirst': 0,
    'lastSecond': 0,
    'lastThreed': 0,
    'createNewGroup': function () {
        let group = '';
        let count = 3;
        while (count !== 0) {
            let currentEl = Math.floor(Math.random() * 8);
            if (currentEl != this.first &&
                currentEl != this.second &&
                currentEl != this.threed &&
                currentEl != this.lastFirst &&
                currentEl != this.lastSecond) {
                if (count === 3) {
                    this.first = currentEl;
                } else if (count === 2) {
                    this.second = currentEl;
                } else if (count === 1) {
                    this.threed = currentEl;
                }
                group += arrCards[currentEl].outerHTML;
                count--;
            }
        }
        this.lastFirst = this.first;
        this.lastSecond = this.second;
        return group;
    }
}

for (let pet in pets) {
    let card = document.createElement('div');
    let img = document.createElement('img');
    let subtitle = document.createElement('span');
    let btn = document.createElement('button');

    card.className = 'pet-card';
    img.className = 'pet-card__img';
    subtitle.className = 'pet-card__subtitle';
    btn.className = 'pet-card__button button-wihtout-bg';

    img.src = pets[`${pet}`].img;
    subtitle.textContent = pets[`${pet}`].name;
    btn.textContent = 'Learn more';
    card.append(img, subtitle, btn);
    arrCards.push(card);
}

function moveRight() {
    slider.classList.add('transition-right');
    buttonLeft.removeEventListener('click', moveLeft);
    buttonRight.removeEventListener('click', moveRight);
    slideRight.innerHTML = generationGroup.createNewGroup();
}

function moveLeft() {
    slider.classList.add('transition-left');
    buttonLeft.removeEventListener('click', moveLeft);
    buttonRight.removeEventListener('click', moveRight);
    slideLeft.innerHTML = generationGroup.createNewGroup();
}

buttonRight.addEventListener('click', moveRight);
buttonLeft.addEventListener('click', moveLeft);

slider.addEventListener('animationend', (event) => {
    if (event.animationName === 'slide-left') {
        slider.classList.remove('transition-left');
        buttonLeft.addEventListener('click', moveLeft);
        buttonRight.addEventListener('click', moveRight);
        slideCenter.innerHTML = slideLeft.innerHTML;
    }
    if (event.animationName === 'slide-right') {
        slider.classList.remove('transition-right');
        buttonLeft.addEventListener('click', moveLeft);
        buttonRight.addEventListener('click', moveRight);
        slideCenter.innerHTML = slideRight.innerHTML;
    }
})