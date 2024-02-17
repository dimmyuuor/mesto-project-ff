export function openModal(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeModalEsc);
    document.addEventListener("mousedown", closeModalOverlay);
};

export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalEsc);
    document.removeEventListener("mousedown", closeModalOverlay);
};

function closeModalEsc(evt) {
    if(evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_is-opened");
        closeModal(popupOpened);
    }
};

function closeModalOverlay(evt) {
    if(evt.target.classList.contains("popup_is-opened")) {
        closeModal(evt.target);
    }
};




export function showPopupError(description) {
    const popupError = document.querySelector('.popup-error');
    const popupErrorDesctiption = popupError.querySelector('.popup-error__description');
    popupErrorDesctiption.textContent = description;
    setTimeout(() => popupError.classList.add('popup-error_is-opened'), 400);
    setTimeout(() => popupError.classList.remove('popup-error_is-opened'), 4000);
}