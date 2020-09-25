'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var disableFormFields = function () {
    Array.from(adForm.elements).forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var enableFormFields = function () {
    Array.from(adForm.elements).forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var disableForm = function () {
    adForm.reset();
    disableFormFields();
    adForm.classList.add('ad-form--disabled');
  };

  var validateCapacity = function (numberGuests) {
    Array.from(adForm.elements.capacity.children).forEach(function (element) {
      if (!numberGuests.includes(element.value)) {
        element.setAttribute('hidden', 'hidden');
      } else {
        element.removeAttribute('hidden');
      }
    });
  };

  var onRoomsChange = function (evt) {
    var value = evt.target.value;

    switch (value) {
      case '1':
        validateCapacity(['1']);
        break;
      case '2':
        validateCapacity(['1', '2']);
        break;
      case '3':
        validateCapacity(['1', '2', '3']);
        break;
      case '100':
        validateCapacity(['0']);
        break;
    }

    adForm.elements.capacity.value = '';
  };

  var validatePrice = function (min) {
    adForm.elements.price.min = min;
    adForm.elements.price.placeholder = min;
  };

  var onTypeChange = function (evt) {
    var value = evt.target.value;

    switch (value) {
      case 'palace':
        validatePrice(10000);
        break;
      case 'flat':
        validatePrice(1000);
        break;
      case 'house':
        validatePrice(5000);
        break;
      case 'bungalo':
        validatePrice(0);
        break;
    }
  };

  var onTimeinChange = function (evt) {
    var value = evt.target.value;

    adForm.elements.timeout.value = value;
  };

  var onTimeoutChange = function (evt) {
    var value = evt.target.value;

    adForm.querySelector('#timein').value = value;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.data.createOffer(new FormData(adForm));
  };

  var onFormReset = function () {
    disableForm();
    window.mapCard.closeCard();
    window.mapPin.removePins();
    window.map.disableMap();
  };

  var mapPinMainInteractionHandler = function () {
    adForm. classList.remove('ad-form--disabled');
    enableFormFields();
  };

  var mapPinMainCoordinatesChange = function (coordinates) {
    adForm.elements.address.value = coordinates.x + ', ' + coordinates.y;
  };

  var createOfferSuccessHandler = function () {
    disableForm();
  };

  var mapPinMainCoordinates = window.map.getMapPinMainCoordinates();
  var address = Math.round((mapPinMainCoordinates.x + window.utils.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((mapPinMainCoordinates.y + window.utils.MAP_PIN_MAIN_HEIGHT / 2));

  adForm.elements.address.setAttribute('value', address);

  validateCapacity(['1']);
  disableFormFields();

  adForm.addEventListener('submit', onFormSubmit);
  adForm.addEventListener('reset', onFormReset);
  adForm.elements.type.addEventListener('change', onTypeChange);
  adForm.elements.rooms.addEventListener('change', onRoomsChange);
  adForm.elements.timein.addEventListener('change', onTimeinChange);
  adForm.elements.timeout.addEventListener('change', onTimeoutChange);

  window.map.addMapPinMainInteractionHandler(mapPinMainInteractionHandler);
  window.mapPinMain.addMapPinMainCoordinatesChangeHandler(mapPinMainCoordinatesChange);
  window.data.addCreateOfferSuccessHandlers(createOfferSuccessHandler);
})();
