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

  var REQUEST_TIMEOUT = 10000;
  var MAX_PIN_COUNT = 5;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.utils = {
    MAP_WIDTH: MAP_WIDTH,
    MAP_PIN_MIN_Y_POSITION: MAP_PIN_MIN_Y_POSITION,
    MAP_PIN_MAX_Y_POSITION: MAP_PIN_MAX_Y_POSITION,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    POINTER_HEIGHT: POINTER_HEIGHT,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    REQUEST_TIMEOUT: REQUEST_TIMEOUT,
    MAX_PIN_COUNT: MAX_PIN_COUNT,
    map: map,
    mapPinMain: mapPinMain
  };
})();
