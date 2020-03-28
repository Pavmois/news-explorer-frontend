import "./pages/index.css";

const header = document.querySelector('.header');

header.addEventListener('click', function (event) {
  const navigation = header.querySelector('.header__nav');
  const hamburgerBtn = header.querySelector('#hamburger');

  if (event.target.closest('#hamburger')) {
    const logo = header.querySelector('.header__logo');

    hamburgerBtn.classList.toggle('header__toogle_open');
    navigation.classList.toggle('header__nav_is-open');
    logo.classList.toggle('header__logo_is-open-menu');
  }

  if (event.target.closest('#login')) {
    navigation.classList.add('header__nav_is-auth');
  }

    if (event.target.closest('#logout')) {
      navigation.classList.remove('header__nav_is-auth');
    }
});