import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
    createCard, 
    deleteCard, 
    likeCard,
    popupTypeImage
} from "./scripts/card.js";
import {
    openModal,
    closeModal
} from "./scripts/modals.js";

const editButton = document.querySelector(".profile__edit-button"); //кнопка редактировать профиль
const editPopup = document.querySelector(".popup_type_edit"); //попап редактировать профиль
const addButton = document.querySelector(".profile__add-button"); //кнопка добавить
const addCardPopup = document.querySelector(".popup_type_new-card"); //попап добавления карточки
const closePopupButton = document.querySelectorAll(".popup__close"); //кнопка закрыть попапы
const cardElement = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const formElement = document.forms["edit-profile"];
const nameProfile = formElement.elements.name;
const jobInput = formElement.elements.description; 
const newPlaceForm = document.forms["new-place"];
const newCardName = newPlaceForm.elements["place-name"];
const newCardLink = newPlaceForm.elements.link;
//добавление карточек из массива
initialCards.forEach((card) => {
    const place = createCard(card, deleteCard, likeCard, watchImageCard);
    cardElement.append(place);
});
//обработчик на модальное окно редактирования профиль 
editButton.addEventListener("click", () => {
    openModal(editPopup);
    nameProfile.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
//обработчик на модальное окно добавить карточку
addButton.addEventListener("click", () => {
    openModal(addCardPopup);
});
//функция закрытия модального окна по клику на крестик
function closeOpenModal() {
    const popupOpened = document.querySelector(".popup_is-opened");
    popupOpened.classList.remove("popup_is-opened");
};
//обработчик закрытия модального окна по клику крестик
closePopupButton.forEach((button) => {
    button.addEventListener("click", closeOpenModal)
});
//функция редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameProfile.value;
    profileJob.textContent = jobInput.value;
    closeModal(editPopup);
};
//отправка формы редактирования профиля
formElement.addEventListener("submit", handleFormSubmit);
//функция просмотра картинки карточки
function watchImageCard(popup, link, name) {
    openModal(popupTypeImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
};
//функция добавления карточки
function handlerFormSubmitAdd(evt) {
    evt.preventDefault();
    const newCard = createCard({ name: newCardName.value, link: newCardLink.value }, deleteCard, likeCard, watchImageCard);
    cardElement.prepend(newCard);
    newPlaceForm.reset();
    closeModal(addCardPopup);
};
//обработчик формы добавления карточки
newPlaceForm.addEventListener("submit", handlerFormSubmitAdd);