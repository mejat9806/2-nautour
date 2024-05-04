/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const updateSettingData = async (data, type) => {
  console.log(data, type);

  try {
    const result = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${type === 'user' ? 'updateYourData' : 'updateMyPassword'}`,
      data,
    });
    if (result.data.status === 'success') {
      showAlert('success', 'update successfully ');
      window.setTimeout(() => {
        location.reload(true);
      }, 100);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
