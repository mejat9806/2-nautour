/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  // 1) get checkout session from API
  try {
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`, {
      params: {
        tourId: tourId,
      },
    });
    // 2) create checkout form + change credit card
    window.location.assign(session.data.session.url);

    // Add your code here for creating the checkout form and handling credit card changes
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
