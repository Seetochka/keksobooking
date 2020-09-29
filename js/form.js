'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = adForm.querySelector('.ad-form-header__preview').children[0];
  var fileChooserPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
  var formPhoto = adForm.querySelector('.ad-form__photo');
  formPhoto.remove();
  var containerPhoto = adForm.querySelector('.ad-form__photo-container');

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

  var guestToRoom = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var onRoomsChange = function (evt) {
    var value = evt.target.value;

    validateCapacity(guestToRoom[value]);

    adForm.elements.capacity.value = '';
  };

  var validatePrice = function (min) {
    adForm.elements.price.min = min;
    adForm.elements.price.placeholder = min;
  };

  var priceToTypeHousing = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0,
  };

  var onTypeChange = function (evt) {
    var value = evt.target.value;

    validatePrice(priceToTypeHousing[value]);
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

  var loadPhoto = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      return reader;
    }

    return false;
  };

  var onAvatarChange = function () {
    var file = fileChooserAvatar.files[0];

    var reader = loadPhoto(file);

    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
    });
  };

  var onPhotoChange = function () {
    Array.from(fileChooserPhoto.files).forEach(function (file, index) {
      var reader = loadPhoto(file);

      reader.addEventListener('load', function () {
        var newPhoto = formPhoto.cloneNode(true);

        containerPhoto.appendChild(newPhoto);

        var previewPhoto = document.createElement('img');

        previewPhoto.src = reader.result;
        previewPhoto.alt = 'Фото квартиры №' + (index + 1);
        previewPhoto.style.width = '70px';
        previewPhoto.style.height = '70px';

        newPhoto.appendChild(previewPhoto);
      });
    });
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
  fileChooserAvatar.addEventListener('change', onAvatarChange);
  fileChooserPhoto.addEventListener('change', onPhotoChange);

  window.map.addMapPinMainInteractionHandler(mapPinMainInteractionHandler);
  window.mapPinMain.addMapPinMainCoordinatesChangeHandler(mapPinMainCoordinatesChange);
  window.data.addCreateOfferSuccessHandlers(createOfferSuccessHandler);
})();
