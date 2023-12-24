export const popupTypeImage  = document.querySelector(".popup_type_image");
//функция создания карточки
export function createCard(card, deleteCard, likeCard, watchImageCard) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template.querySelector(".places__item").cloneNode(true);
  templateElement.querySelector(".card__image").src = card.link;
  templateElement.querySelector(".card__image").alt = card.name;
  templateElement.querySelector(".card__title").textContent = card.name;
  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  const likeButton = templateElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  const cardImage = templateElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    watchImageCard(popupTypeImage, card.link, card.name);
  });
  return templateElement;
};
//функция удаления карточки
export function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
};
//функция лайка карточек
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};