/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const updateUserData = async (name, email) => {
  try {
    const result = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateYourData',
      data: { email, name },
    });
    if (result.data.status === 'success') {
      showAlert('success', 'update successfully ');
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
