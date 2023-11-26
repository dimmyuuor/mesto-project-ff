// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу





initialCards.forEach(function (card) {
  const template = document.querySelector('#card-template').content;
  const templateElement = template.querySelector('.places__item').cloneNode(true);
  const cardElement = document.querySelector('.places__list');
  templateElement.querySelector('.card__image').src = card.link;
  templateElement.querySelector('.card__image').alt = card.name;
  templateElement.querySelector('.card__title').textContent = card.name;
  cardElement.append(templateElement);
});

document.querySelector('body').onclick = function(e) {
  if(e.target.className != 'card__delete-button') return
  const item = e.target.closest('.card');
  item.remove()
}