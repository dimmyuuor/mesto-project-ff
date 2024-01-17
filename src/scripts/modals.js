//открытие модальных окон
export function openModal(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeModalEsc);
    document.addEventListener("mousedown", closeModalOverlay);
};
//закрытие модальных окон
export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalEsc);
    document.removeEventListener("mousedown", closeModalOverlay);
};
//закрытие модального окна по эскейт
function closeModalEsc(evt) {
    if(evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_is-opened");
        closeModal(popupOpened);
    }
};
//закрытие модального окна по оверлею
function closeModalOverlay(evt) {
    if(evt.target.classList.contains("popup_is-opened")) {
        closeModal(evt.target);
    }
};