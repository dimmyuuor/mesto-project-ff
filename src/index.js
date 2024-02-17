import "./pages/index.css";
import { renderCard } from "./scripts/card.js";
import {
  openModal,
  closeModal,
  showPopupError
} from "./scripts/modals.js";
import { clearValidation, enableValidation } from "./scripts/validation.js";
import {     
  setUserInfo,
  getInitialData,
  addNewCard,
  setUserAvatar,
  isLinkImage,
 } from './scripts/api.js'

 let profileId;
 const editButton = document.querySelector(".profile__edit-button"); 
 const editPopup = document.querySelector(".popup_type_edit"); 
 const addButton = document.querySelector(".profile__add-button"); 
 const addCardPopup = document.querySelector(".popup_type_new-card"); 
 const closePopupButtons = document.querySelectorAll(".popup__close"); 
 const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
 const profileTitle = document.querySelector(".profile__title");
 const profileDescription = document.querySelector(".profile__description");
 const profileAvatar = document.querySelector(".profile__image");
 
 const popupImage = document.querySelector(".popup_type_image");
 const imageСaption = popupImage.querySelector(".popup__caption");
 const image = popupImage.querySelector(".popup__image");
 
 const formEditAvatar = document.forms["edit-avatar"];
 const avatarLinkInput = formEditAvatar.elements.link;
 const editAvatarSubmitButton = formEditAvatar.querySelector(".popup__button");
 
 const formEditProfile = document.forms["edit-profile"];
 const nameProfile = formEditProfile.elements.name;
 const jobInput = formEditProfile.elements.description; 
 const editProfileSubmitButton = formEditProfile.querySelector(".popup__button");
 
 const newPlaceForm = document.forms["new-place"];
 const newCardName = newPlaceForm.elements["place-name"];
 const newCardLink = newPlaceForm.elements.link;
 const addCardSubmitButton = newPlaceForm.querySelector(".popup__button");

const validationConfig = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 



function renderProfileInfo(userName, userAbout) {
  profileTitle.textContent = userName;
  profileDescription.textContent = userAbout;
}

function renderProfileAvatar(avatar) {
  profileAvatar.style['background-image'] = `url("${avatar}")`;
}

const renderInitialCards = (cards) => {
  cards.forEach((card) => {
    renderCard(card, handleClickImage, profileId);
  });
}

getInitialData()
  .then(([profile, cards]) => {
    profileId = profile._id;
    renderProfileInfo(profile.name, profile.about);
    renderProfileAvatar(profile.avatar);
    renderInitialCards(cards);
  })
  .catch((err) => {
    showPopupError(err)
    console.log(err);
  })

function handleClickImage(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageСaption.textContent = evt.target.alt;
  openModal(popupImage);
}

function changeSubmitButtonText(button) {
  switch (button.textContent) {
    case 'Сохранение...':
      setTimeout(() => {
        button.textContent = 'Сохранить';
      }, 500);
      break;
    default:
      button.textContent = 'Сохранение...';
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  changeSubmitButtonText(editProfileSubmitButton);
  setUserInfo(nameProfile.value, jobInput.value)
    .then((user) => {
      renderProfileInfo(user.name, user.about);
      closeModal(editPopup);
      changeSubmitButtonText(editProfileSubmitButton);
    })
    .catch((err) => {
      changeSubmitButtonText(editProfileSubmitButton);
      showPopupError(err)
      console.log(err);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  changeSubmitButtonText(addCardSubmitButton);
  isLinkImage(newCardLink.value)
    .then(() => {
      addNewCard(newCardName.value, newCardLink.value)
        .then((cardData) => {
          const position = 'start';
          renderCard(cardData, handleClickImage, profileId, position);
          closeModal(addCardPopup);
          changeSubmitButtonText(addCardSubmitButton);
          newPlaceForm.reset();
        })
        .catch((err) => {
          changeSubmitButtonText(addCardSubmitButton);
          showPopupError(err)
          console.log(err);
        });
    })
    .catch((err) => {
      changeSubmitButtonText(addCardSubmitButton);
      showPopupError(err)
      console.log(err);
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  changeSubmitButtonText(editAvatarSubmitButton);
  isLinkImage(avatarLinkInput.value)
    .then(() => {
      setUserAvatar(avatarLinkInput.value)
        .then(({ avatar }) => {
          renderProfileAvatar(avatar);
          closeModal(popupEditAvatar);
          changeSubmitButtonText(editAvatarSubmitButton);
          formEditAvatar.reset();
        })
        .catch((err) => {
          changeSubmitButtonText(editAvatarSubmitButton);
          showPopupError(err)
          console.log(err);
        });
    })
    .catch((err) => {
      changeSubmitButtonText(editAvatarSubmitButton);
      showPopupError(err)
      console.log(err);
    });
}

profileAvatar.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupEditAvatar);
})

editButton.addEventListener('click', () => {
  nameProfile.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(editPopup);
})


addButton.addEventListener('click', () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(addCardPopup);
})

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handleAddCardFormSubmit);
formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);
closePopupButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
})

enableValidation(validationConfig)