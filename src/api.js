import axios from 'axios';

export async function getDataList() {
  const response = await axios.get(
      'http://210.109.63.117:5000'
  );
  return response.data;
}