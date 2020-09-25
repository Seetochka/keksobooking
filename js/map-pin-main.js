'use strict';

(function () {
  var mapPinMainCoordinatesChangeHandlers = [];

  var callMapPinMainCoordinatesChangeHandlers = function (coordinates) {
    if (mapPinMainCoordinatesChangeHandlers.length) {
      mapPinMainCoordinatesChangeHandlers.forEach(function (handler) {
        handler(coordinates);
      });
    }
  };

  var getMapPinMainCoordinates = function () {
    var coordinates = {
      x: Math.round(parseInt(window.utils.mapPinMain.style.left, 10) + window.utils.MAP_PIN_MAIN_WIDTH / 2),
      y: parseInt(window.utils.mapPinMain.style.top, 10) + window.utils.MAP_PIN_MAIN_HEIGHT + window.utils.POINTER_HEIGHT
    };

    return coordinates;
  };

  window.utils.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var topShift = window.utils.mapPinMain.offsetTop - shift.y;
      var leftShift = window.utils.mapPinMain.offsetLeft - shift.x;
      window.utils.mapPinMain.style.top = Math.max(Math.min(topShift, window.utils.MAP_PIN_MAX_Y_POSITION - window.utils.MAP_PIN_MAIN_HEIGHT - window.utils.POINTER_HEIGHT), window.utils.MAP_PIN_MIN_Y_POSITION - window.utils.MAP_PIN_MAIN_HEIGHT - window.utils.POINTER_HEIGHT) + 'px';
      window.utils.mapPinMain.style.left = Math.max(Math.min(leftShift, (window.utils.MAP_WIDTH - window.utils.MAP_PIN_MAIN_WIDTH / 2)), (-window.utils.MAP_PIN_MAIN_WIDTH / 2)) + 'px';

      var mapPinMainCoordinates = getMapPinMainCoordinates();

      callMapPinMainCoordinatesChangeHandlers(mapPinMainCoordinates);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!dragged) {
        var mapPinMainCoordinates = getMapPinMainCoordinates();

        callMapPinMainCoordinatesChangeHandlers(mapPinMainCoordinates);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mapPinMain = {
    addMapPinMainCoordinatesChangeHandler: function (handler) {
      mapPinMainCoordinatesChangeHandlers.push(handler);
    }
  };
})();
