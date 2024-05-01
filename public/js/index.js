import 'regenerator-runtime/runtime';

import { login, logout } from './login';

import { displayMap } from './mapBox';
import { updateSettingData } from './updateSetting';
import { async } from 'regenerator-runtime';

/* eslint-disable no-undef */

// DOM elements
const mapbox = document.getElementById('map');
const logOutButton = document.querySelector('.nav__el--logout');
const loginForm = document.querySelector('.form--login');
const updateUserForm = document.querySelector('.form-user-data');
const updatePassForm = document.querySelector('.form-user-password');
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
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    // const email = document.getElementById('email').value;
    // const name = document.getElementById('name').value;
    // const photo = document.getElementById('photo').value;
    console.log(form);
    updateSettingData(form, 'user');
  });
}
if (updatePassForm) {
  updatePassForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'updating';
    // const form = new FormData();
    // form.append('email', document.getElementById('email').value);
    // form.append('name', document.getElementById('name').value);
    // console.log(form);
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirmed = document.getElementById('password-confirm').value;
    const data = { passwordCurrent, password, passwordConfirmed };
    await updateSettingData(data, 'password');

    document.getElementById('password-current').textContent = '';
    document.getElementById('password').textContent = '';
    document.getElementById('password-confirm').textContent = '';
    document.querySelector('.btn--save-password').textContent = 'save password';
  });
}
