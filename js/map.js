'use strict';

(function () {
  var mapPinMainInteractionHandlers = [];

  var mocks = window.data.createMockData();

  var getMapPinMainCoordinates = function () {
    return {x: parseInt(window.utils.button.style.left, 10), y: parseInt(window.utils.button.style.top, 10)};
  };

  var onMapPinMainInteraction = function () {
    window.utils.map.classList.remove('map--faded');

    if (mapPinMainInteractionHandlers.length) {
      mapPinMainInteractionHandlers.forEach(function (handler) {
        handler();
      });
    }

    window.mapPin.renderPins(mocks);
  };

  window.utils.button.addEventListener('mousedown', onMapPinMainInteraction);
  window.utils.button.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      onMapPinMainInteraction();
    }
  });

  window.map = {
    getMapPinMainCoordinates: getMapPinMainCoordinates,
    addMapPinMainHandler: function (handler) {
      mapPinMainInteractionHandlers.push(handler);
    },
    removeMapPinMainHandler: function (handler) {
      mapPinMainInteractionHandlers = mapPinMainInteractionHandlers
                .filter(function (a) {
                  return a !== handler;
                });
    },
    onMapPinMainInteraction: onMapPinMainInteraction
  };
})();
