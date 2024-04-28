import 'regenerator-runtime/runtime';

import { login, logout } from './login';

import { displayMap } from './mapBox';

/* eslint-disable no-undef */

// DOM elements
const mapbox = document.getElementById('map');
const logOutButton = document.querySelector('.nav__el--logout');
//values
//delegation
if (mapbox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  displayMap(locations);
}
if (document.querySelector('.form')) {
  document.querySelector('.form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    email, password;
    ('hello');
    login(email, password);
  });
}

if (logOutButton) {
  logOutButton.addEventListener('click', logout);
}
('hello from parcel');
