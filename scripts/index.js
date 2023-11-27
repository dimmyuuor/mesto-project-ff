// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



const cardElement = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;

function createCard(card, deleteCard) {
  const templateElement = template.querySelector('.places__item').cloneNode(true);
  templateElement.querySelector('.card__image').src = card.link;
  templateElement.querySelector('.card__image').alt = card.name;
  templateElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return templateElement;
}

function deleteCard(event) {
  const card = event.target.closest('.card')
  card.remove();
}

initialCards.forEach((card) => {
  const place = createCard(card, deleteCard);
  cardElement.append(place);
});