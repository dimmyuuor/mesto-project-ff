const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: 'b9412615-41d7-47b6-9651-f14f2c4f684c'
    },
};

const sendRequest = (method, path, body) => {
  const options = { method, headers: config.headers };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }
  return fetch(`${config.baseUrl}${path}`, options).then(handleResponse);
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Ошибка при получении данных с сервера. Ошибка ${res.status}`
  );
};

const getUserInfo = sendRequest('GET', '/users/me');
const getInitialCards = sendRequest('GET', '/cards');

const getInitialData = () => {
  const loadCardsSuccess = [getUserInfo, getInitialCards];
  return Promise.all(loadCardsSuccess);
};

const setUserInfo = (name, about) =>
  sendRequest('PATCH', '/users/me', { name, about });

const addNewCard = (name, link) =>
  sendRequest('POST', '/cards', { name, link });

const deleteCard = (cardId) => 
  sendRequest('DELETE', `/cards/${cardId}`);

const toggleLike = (cardId, method) =>
  sendRequest(method, `/cards/likes/${cardId}`);

const setUserAvatar = (avatar) =>
  sendRequest('PATCH', '/users/me/avatar', { avatar });

const isLinkImage = (url) => {
  return fetch(`https://corsproxy.org/?${url}`, {
    method: 'HEAD',
  }).then((res) => {
    if (res.ok) {
      return res.headers.get('Content-Type').startsWith('image');
    }
    return Promise.reject(
      `Ссылка на изображение недействительна. Ошибка ${res.status}`
    );
  });
};

export {
  setUserInfo,
  getInitialData,
  addNewCard,
  deleteCard,
  toggleLike,
  setUserAvatar,
  isLinkImage,
};