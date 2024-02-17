import { deleteCard, toggleLike } from './api.js';
import { openModal, closeModal } from './modals.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = document.querySelector('.places__list');
const popupConfirmDelete = document.querySelector('.popup_type_сonfirm-delete');
const confirmDeleteCardButton = popupConfirmDelete.querySelector('.popup__button');
let cardToDelete;
let idCardToDelete;

function getCardTemplate() {
  const cloneTemplateCard = cardTemplate.querySelector('.card').cloneNode(true);
  return cloneTemplateCard;
}

export function createCard(card, handleLikeCard, handleClickImage, profileId) {
  const cardItem = getCardTemplate();
  const countOfLikes = cardItem.querySelector('.card__like-count');
  const deteleButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector(".card__like-button");
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector('.card__title');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  countOfLikes.textContent = card.likes.length;

  if (isLikedCard(card, profileId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  if (isOwnerCard(card.owner._id, deteleButton, profileId)) {
    deteleButton.addEventListener('click', (evt) => {
      idCardToDelete = card._id;
      cardToDelete = evt.target.closest('.card');
      openModal(popupConfirmDelete);
    });
  }
  
  likeButton.addEventListener('click', (evt) => {
    handleLikeCard(evt, card, countOfLikes, profileId);
  });
  cardImage.addEventListener('click', handleClickImage);

  return cardItem;
};

function handleDeleteCard() {
  deleteCard(idCardToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupConfirmDelete);
    })
    .catch((err) => {
      console.log(err);
    });
}

confirmDeleteCardButton.addEventListener('click', handleDeleteCard);

function isLikedCard(card, profileId) {
  const likedCard = card.likes.some((like) => {
    return like._id === profileId;
  });
  return likedCard;
}

function isOwnerCard(cardOwnerId, button, profileId) {
  if (cardOwnerId === profileId) {
    button.classList.add('card__delete-button_active');
    return true;
  }
}

function handleLikeCard(evt, card, countOfLikes, profileId) {
  switch (isLikedCard(card, profileId)) {
    case true:
      toggleLike(card._id, 'DELETE')
        .then(({ likes }) => {
          evt.target.classList.remove('card__like-button_is-active');
          card.likes = likes;
          countOfLikes.textContent = likes.length;
        })
        .catch((err) => console.log(err));
      break;
    case false:
      toggleLike(card._id, 'PUT')
        .then(({ likes }) => {
          evt.target.classList.add('card__like-button_is-active');
          card.likes = likes;
          countOfLikes.textContent = likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      break;
  }
}

export function renderCard(card, handleClickImage, profileId, position) {
  const newCard = createCard(card, handleLikeCard, handleClickImage, profileId);
  switch (position) {
    case 'start':
      cardElement.prepend(newCard);
      break;
    default:
      cardElement.append(newCard);
  }
}

