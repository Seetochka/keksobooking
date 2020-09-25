'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('div');
  var successTemplate = document.querySelector('#success').content.querySelector('div');
  var renderedOverlay = null;

  var closeOverlay = function () {
    if (renderedOverlay !== null) {
      renderedOverlay.remove();
      renderedOverlay = null;
    }
  };

  var showOverlay = function (type, message, buttonText, buttonHandler) {
    var overlay = null;

    var onEscKeyDown = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        if (buttonHandler !== undefined) {
          buttonHandler();
        }

        closeOverlay();

        window.removeEventListener('keydown', onEscKeyDown);
      }
    };

    var onEmptySpaceClick = function (evt) {
      if (
        !evt.target.classList.contains('success__message') &&
        !evt.target.classList.contains('error__message') &&
        !evt.target.classList.contains('error__button')
      ) {
        if (buttonHandler !== undefined) {
          buttonHandler();
        }

        closeOverlay();
      }
    };

    if (type === 'error') {
      overlay = errorTemplate.cloneNode(true);

      var button = overlay.querySelector('.error__button');

      overlay.querySelector('.error__message').textContent = message;
      button.textContent = buttonText;

      button.addEventListener('click', function () {
        buttonHandler();
        closeOverlay();
        window.removeEventListener('keydown', onEscKeyDown);
      });
    }

    if (type === 'success') {
      overlay = successTemplate.cloneNode(true);

      overlay.querySelector('.success__message').textContent = message;
    }

    window.addEventListener('keydown', onEscKeyDown);
    overlay.addEventListener('click', onEmptySpaceClick);

    document.querySelector('main').appendChild(overlay);

    renderedOverlay = overlay;
  };

  window.overLay = {
    showOverlay: showOverlay
  };
})();
