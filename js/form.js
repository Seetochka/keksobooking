'use strict';

(function () {
  var mapPinMainCoordinates = window.map.getMapPinMainCoordinates();

  var formFields = Array.from(window.utils.adForm.elements).concat(Array.from(window.utils.filters.elements));

  formFields.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });

  window.utils.adForm.elements.address.value = Math.round((mapPinMainCoordinates.x + window.utils.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((mapPinMainCoordinates.y + window.utils.MAP_PIN_MAIN_HEIGHT / 2));

  var updateAddress = function () {
    window.utils.adForm.elements.address.value = Math.round((mapPinMainCoordinates.x + window.utils.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(mapPinMainCoordinates.y + window.utils.MAP_PIN_MAIN_HEIGHT + window.utils.POINTER_HEIGHT);
  };

  var validateCapacity = function (numberGuests) {
    Array.from(window.utils.adForm.elements.capacity.children).forEach(function (element) {
      if (!numberGuests.includes(element.value)) {
        element.setAttribute('hidden', 'hidden');
      } else {
        element.removeAttribute('hidden');
      }
    });
  };

  validateCapacity(['1']);

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

    window.utils.adForm.elements.capacity.value = '';
  };

  window.utils.adForm.elements.rooms.addEventListener('change', onRoomsChange);

  var validatePrice = function (min) {
    window.utils.adForm.elements.price.min = min;
    window.utils.adForm.elements.price.placeholder = min;
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

  window.utils.adForm.elements.type.addEventListener('change', onTypeChange);

  var onTimeinChange = function (evt) {
    var value = evt.target.value;

    window.utils.adForm.elements.timeout.value = value;
  };

  var onTimeoutChange = function (evt) {
    var value = evt.target.value;

    window.utils.adForm.querySelector('#timein').value = value;
  };

  window.utils.adForm.elements.timein.addEventListener('change', onTimeinChange);
  window.utils.adForm.elements.timeout.addEventListener('change', onTimeoutChange);

  var mapPinMainHandler = function () {
    window.utils.adForm. classList.remove('ad-form--disabled');

    formFields.forEach(function (element) {
      element.removeAttribute('disabled');
    });

    updateAddress();
  };

  window.map.addMapPinMainHandler(mapPinMainHandler);
})();
