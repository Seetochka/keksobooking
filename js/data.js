'use strict';

(function () {
  var dataLoadHandlers = [];
  var offers = [];
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  var callDataLoadHandlers = function (data) {
    if (dataLoadHandlers.length) {
      dataLoadHandlers.forEach(function (handler) {
        handler(data);
      });
    }
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('error', ('Статус ответа: ' + xhr.status + ' ' + xhr.statusText), 'Попробовать снова', buttonHandler);
      }
    });

    xhr.addEventListener('error', function () {
      onError('error', 'Произошла ошибка соединения', 'Попробовать снова', buttonHandler);
    });
    xhr.addEventListener('timeout', function () {
      onError('error', ('Запрос не успел выполниться за ' + xhr.timeout + 'мс'), 'Попробовать снова', buttonHandler);
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };

  var buttonHandler = function () {
    load(successHandler, window.overLay.showOverlay);
  };

  var successHandler = function (response) {
    offers = response;

    callDataLoadHandlers(offers);
  };

  load(successHandler, window.overLay.showOverlay);

  window.data = {
    addDataLoadHandler: function (handler) {
      dataLoadHandlers.push(handler);
    },
    removeDataLoadHandler: function (handler) {
      dataLoadHandlers = dataLoadHandlers
              .filter(function (a) {
                return a !== handler;
              });
    }
  };
})();
