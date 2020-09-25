'use strict';

(function () {
  var dataLoadHandlers = [];
  var createOfferSuccessHandlers = [];
  var offers = [];

  var callDataLoadHandlers = function (data) {
    if (dataLoadHandlers.length) {
      dataLoadHandlers.forEach(function (handler) {
        handler(data);
      });
    }
  };

  var callCreateOfferSuccessHandlers = function (data) {
    if (createOfferSuccessHandlers.length) {
      createOfferSuccessHandlers.forEach(function (handler) {
        handler(data);
      });
    }
  };

  var load = function (url, method, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.utils.REQUEST_TIMEOUT;

    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var getOffers = function () {
    load('https://javascript.pages.academy/keksobooking/data', 'GET', null, function (response) {
      offers = response;

      callDataLoadHandlers(offers);
    }, function (errorText) {
      window.overLay.showOverlay('error', errorText, 'Попробовать снова', function () {
        getOffers();
      });
    });
  };

  var createOffer = function (offer) {
    load('https://javascript.pages.academy/keksobooking', 'POST', offer, function () {
      window.overLay.showOverlay('success', 'Ваше объявление успешно размещено!');
      callCreateOfferSuccessHandlers();
    }, function (errorText) {
      window.overLay.showOverlay('error', errorText, 'Попробовать снова', function () {
        createOffer(offer);
      });
    });
  };

  getOffers();

  window.data = {
    addDataLoadHandler: function (handler) {
      dataLoadHandlers.push(handler);
    },
    createOffer: createOffer,
    addCreateOfferSuccessHandlers: function (handler) {
      createOfferSuccessHandlers.push(handler);
    }
  };
})();
