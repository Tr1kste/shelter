// --- MOBILE MENU --- //
const pageBody = document.querySelector('.body');

const mobileMenu = {
  'burger': document.querySelector('.burger'),
  'menu': document.querySelector('.nav'),
  'logo': document.querySelector('.header__logo'),
  'shadow': document.querySelector('.wrap__nav'),
  'open': function () {
    this.burger.classList.add('burger--open');
    this.menu.classList.add('nav--open');
    this.logo.classList.add('header__logo--open');
    this.shadow.classList.add('header__nav--open');
  },
  'close': function () {
    this.burger.classList.remove('burger--open');
    this.menu.classList.remove('nav--open');
    this.logo.classList.remove('header__logo--open');
    this.shadow.classList.remove('header__nav--open');
  }
}

mobileMenu.burger.addEventListener('click', () => {
  pageBody.classList.toggle('body--no-scroll');
  mobileMenu.burger.classList.contains('burger--open') ? mobileMenu.close() : mobileMenu.open();
});

mobileMenu.shadow.addEventListener('click', (e) => {
  let shadow = e.target;
  if (!shadow.classList.contains('header__nav--open')) return;
  pageBody.classList.remove('body--no-scroll');
  mobileMenu.close();
});

mobileMenu.menu.addEventListener('click', (e) => {
  let link = e.target.closest('a');
  if (!link) return;
  pageBody.classList.remove('body--no-scroll');
  mobileMenu.close();
});

// --- POPUP --- //

const popup = {
  'shadow': document.querySelector('.popup'),
  'overlay': document.querySelector('popup__overlay'),
  'window': document.querySelector('.popup__window'),
  'close': document.querySelector('.popup__close'),
  'img': document.querySelector('.popup__img'),
  'title': document.querySelector('.popup__title'),
  'subtitle': document.querySelector('.popup__subtitle'),
  'description': document.querySelector('.popup__description'),
  'feature': document.querySelector('.popup__feature'),
  'age': document.querySelector('.popup__age'),
  'inoculations': document.querySelector('.popup__inoculations'),
  'diseases': document.querySelector('.popup__diseases'),
  'parasites': document.querySelector('.popup__parasites'),
  'addContent': function (obj, namePet) {
    popup.shadow.style.display = 'flex';
    popup.img.src = document.querySelector('.slider').classList.contains('slider--pets-page') ? '../' + obj[`${namePet}`].img : obj[`${namePet}`].img;
    popup.title.textContent = obj[`${namePet}`].name;
    popup.subtitle.textContent = obj[`${namePet}`].type + ' - ' + obj[`${namePet}`].breed;
    popup.description.textContent = obj[`${namePet}`].description;
    popup.age.innerHTML = '<b>Age: </b>' + obj[`${namePet}`].age;
    popup.inoculations.innerHTML = '<b>Inoculations: </b>' + (obj[`${namePet}`].inoculations).join(', ');
    popup.diseases.innerHTML = '<b>Diseases: </b>' + (obj[`${namePet}`].diseases).join(', ');
    popup.parasites.innerHTML = '<b>Parasites: </b>' + (obj[`${namePet}`].parasites).join(', ');
    pageBody.classList.add('body--no-scroll');
  },
  'closePopup': function () {
    popup.shadow.style.display = 'none';
    pageBody.classList.remove('body--no-scroll');
  }
};

document.querySelector('.slider').addEventListener('click', (e) => {
  if (e.target.className === 'pet-card') {
    let namePet = e.target.querySelector('.pet-card__subtitle').textContent;
    popup.addContent(pets, namePet);
  }
  else if (e.target.parentElement.className === 'pet-card') {
    let namePet = e.target.parentElement.querySelector('.pet-card__subtitle').textContent;
    popup.addContent(pets, namePet);
  }
});

popup.shadow.addEventListener('click', (e) => {
  let clickTarget = e.target;
  if (!clickTarget.classList.contains('popup__close') && !clickTarget.classList.contains('popup__overlay')) return;
  popup.closePopup();
});