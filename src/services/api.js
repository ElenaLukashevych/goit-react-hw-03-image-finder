import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '26561926-b4a1cd5696abc50a17fae36e8';

async function getPictures(name, page) {
 const response = await axios.get(
    `?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}

const api = {
  getPictures,
};

export default api;