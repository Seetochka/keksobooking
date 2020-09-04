'use strict';

(function () {
  var MAP_WIDTH = 1200;
  var MAP_PIN_MIN_Y_POSITION = 130;
  var MAP_PIN_MAX_Y_POSITION = 630;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var POINTER_HEIGHT = 22;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var button = document.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters');

  window.utils = {
    MAP_WIDTH: MAP_WIDTH,
    MAP_PIN_MIN_Y_POSITION: MAP_PIN_MIN_Y_POSITION,
    MAP_PIN_MAX_Y_POSITION: MAP_PIN_MAX_Y_POSITION,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    POINTER_HEIGHT: POINTER_HEIGHT,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    map: map,
    pins: pins,
    filtersContainer: filtersContainer,
    adForm: adForm,
    button: button,
    filters: filters
  };
})();
