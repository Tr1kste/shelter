const firstPage = document.querySelector('#firstPage');
const prePage = document.querySelector('#prePage');
const currentPage = document.querySelector('#currentPage');
const nextPage = document.querySelector('#nextPage');
const lastPage = document.querySelector('#lastPage');

const widthContainer = document.querySelector('.container').clientWidth;
const sliderContent = document.querySelector('.slider__content');

const slideDesktop = new Map();
const slideTablet = new Map();
const slideMobile = new Map();

function pageGenerator(cardsInPage) {
    let namePets = Object.keys(pets);
    let pageHTML = '';
    for (let i = 0; i < cardsInPage; i++) {
        let randomCard = Math.floor(Math.random() * 8);
        let name = namePets[randomCard];
        if (namePets[randomCard] !== undefined) {
            let card = document.createElement('div');
            let img = document.createElement('img');
            let subtitle = document.createElement('span');
            let btn = document.createElement('button');

            card.className = 'pet-card';
            img.className = 'pet-card__img';
            subtitle.className = 'pet-card__subtitle';
            btn.className = 'pet-card__button button-wihtout-bg';

            img.src = '../' + pets[`${name}`].img;
            subtitle.textContent = pets[`${name}`].name;
            btn.textContent = 'Learn more';
            card.append(img, subtitle, btn);
            pageHTML += card.outerHTML;
            delete namePets[randomCard];
        } else {
            i--;
        }
    }
    return pageHTML;
}

function countPage() {
    for (let i = 1; i <= 16; i++) {
        if (i >= 1 && i <= 6) {
            slideDesktop.set(i, pageGenerator(8));
            slideTablet.set(i, pageGenerator(6));
            slideMobile.set(i, pageGenerator(3));
        } else if (i >= 7 && i <= 8) {
            slideTablet.set(i, pageGenerator(6));
            slideMobile.set(i, pageGenerator(3));
        } else if (i >= 9 && i <= 16) {
            slideMobile.set(i, pageGenerator(3));
        }
    }
}
countPage();

window.addEventListener('load', () => {
    if (widthContainer > 1279) {
        sliderContent.innerHTML = slideDesktop.get(1);
    } else if (widthContainer <= 1279 && widthContainer > 768) {
        sliderContent.innerHTML = slideTablet.get(1);
    } else if (widthContainer <= 767) {
        sliderContent.innerHTML = slideMobile.get(1);
    }
})

function funcNextPage() {
    currentPage.textContent = +currentPage.textContent + 1;
    if (+currentPage.textContent > 1) {
        prePage.addEventListener('click', funcPreviousPage);
        firstPage.addEventListener('click', funcStartPage);
        prePage.classList.remove('slider__move--disable');
        firstPage.classList.remove('slider__move--disable');
    }
    if (widthContainer > 1279) {
        if (+currentPage.textContent === 6) {
            nextPage.removeEventListener('click', funcNextPage);
            nextPage.classList.add('slider__move--disable');
            lastPage.classList.add('slider__move--disable');
        }
        sliderContent.innerHTML = slideDesktop.get(+currentPage.textContent);
    } else if (widthContainer <= 1279 && widthContainer >= 768) {
        if (+currentPage.textContent === 8) {
            nextPage.removeEventListener('click', funcNextPage);
            nextPage.classList.add('slider__move--disable');
            lastPage.classList.add('slider__move--disable');
        }
        sliderContent.innerHTML = slideTablet.get(+currentPage.textContent);
    } else if (widthContainer <= 767) {
        if (+currentPage.textContent === 16) {
            nextPage.removeEventListener('click', funcNextPage);
            nextPage.classList.add('slider__move--disable');
            lastPage.classList.add('slider__move--disable');
        }
        sliderContent.innerHTML = slideMobile.get(+currentPage.textContent);
    }
}

function funcPreviousPage() {
    currentPage.textContent = +currentPage.textContent - 1;
    if (+currentPage.textContent === 1) {
        firstPage.removeEventListener('click', funcStartPage);
        prePage.removeEventListener('click', funcPreviousPage);
        prePage.classList.add('slider__move--disable');
        firstPage.classList.add('slider__move--disable');
    }
    if (widthContainer > 1279) {
        if (+currentPage.textContent < 6) {
            nextPage.addEventListener('click', funcNextPage);
            lastPage.addEventListener('click', funcLastPage);
            nextPage.classList.remove('slider__move--disable');
            lastPage.classList.remove('slider__move--disable');
        }
        sliderContent.innerHTML = slideDesktop.get(+currentPage.textContent);
    } else if (widthContainer <= 1279 && widthContainer >= 768) {
        if (+currentPage.textContent < 8) {
            nextPage.addEventListener('click', funcNextPage);
            lastPage.addEventListener('click', funcLastPage);
            nextPage.classList.remove('slider__move--disable');
            lastPage.classList.remove('slider__move--disable');
        }
        sliderContent.innerHTML = slideTablet.get(+currentPage.textContent);
    } else if (widthContainer <= 767) {
        if (+currentPage.textContent < 16) {
            nextPage.addEventListener('click', funcNextPage);
            lastPage.addEventListener('click', funcLastPage);
            nextPage.classList.remove('slider__move--disable');
            lastPage.classList.remove('slider__move--disable');
        }
        sliderContent.innerHTML = slideMobile.get(+currentPage.textContent);
    }
}

function funcStartPage() {
    if (+currentPage.textContent > 1) {
        nextPage.addEventListener('click', funcNextPage);
        lastPage.addEventListener('click', funcLastPage);
        prePage.removeEventListener('click', funcPreviousPage);
        firstPage.removeEventListener('click', funcStartPage);
        currentPage.textContent = 1;
        if (widthContainer > 1279) {
            sliderContent.innerHTML = slideDesktop.get(1);
        } else if (widthContainer <= 1279 && widthContainer >= 768) {
            sliderContent.innerHTML = slideTablet.get(1);
        } else if (widthContainer <= 767) {
            sliderContent.innerHTML = slideMobile.get(1);
        }
        prePage.classList.add('slider__move--disable');
        firstPage.classList.add('slider__move--disable');
        nextPage.classList.remove('slider__move--disable');
        lastPage.classList.remove('slider__move--disable');
    }
}

function funcLastPage() {
    if (!lastPage.classList.contains('slider__move--disable')) {
        prePage.classList.remove('slider__move--disable');
        firstPage.classList.remove('slider__move--disable');
        prePage.addEventListener('click', funcPreviousPage);
        firstPage.addEventListener('click', funcStartPage);
        if (widthContainer > 1279) {
            currentPage.textContent = 6;
            sliderContent.innerHTML = slideDesktop.get(6);
        } else if (widthContainer <= 1279 && widthContainer >= 768) {
            currentPage.textContent = 8;
            sliderContent.innerHTML = slideTablet.get(8);
        } else if (widthContainer <= 767) {
            currentPage.textContent = 16;
            sliderContent.innerHTML = slideMobile.get(16);
        }
        nextPage.classList.add('slider__move--disable');
        lastPage.classList.add('slider__move--disable');
        lastPage.removeEventListener('click', funcLastPage);
        nextPage.removeEventListener('click', funcNextPage);
    }
}

nextPage.addEventListener('click', funcNextPage);
lastPage.addEventListener('click', funcLastPage);