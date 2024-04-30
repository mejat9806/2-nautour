import 'regenerator-runtime/runtime';

import { login, logout } from './login';

import { displayMap } from './mapBox';
import { updateUserData } from './updateSetting';

/* eslint-disable no-undef */

// DOM elements
const mapbox = document.getElementById('map');
const logOutButton = document.querySelector('.nav__el--logout');
const loginForm = document.querySelector('.form--login');
const updateUserForm = document.querySelector('.form-user-data');
//values
//delegation
if (mapbox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  displayMap(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (logOutButton) {
  logOutButton.addEventListener('click', logout);
}

if (updateUserForm) {
  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const form = new FormData();
    // form.append('email', document.getElementById('email').value);
    // form.append('name', document.getElementById('name').value);
    // console.log(form);
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    updateUserData(name, email);
  });
}
