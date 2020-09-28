'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  var filtersChangeHandlers = [];
  var filterList = [];
  var offers = null;
  var features = [];

  var callFiltersChangeHandlers = function (filteredOffers) {
    if (filtersChangeHandlers.length) {
      filtersChangeHandlers.forEach(function (handler) {
        handler(filteredOffers);
      });
    }
  };

  var filterHousingType = function (offersToFilter) {
    var type = mapFilters.elements['housing-type'].value;

    if (type === 'any') {
      return offersToFilter;
    }

    var housingType = offersToFilter.filter(function (offer) {
      return offer.offer.type === type;
    });

    return housingType;
  };

  var filterHousingPrice = function (offersToFilter) {
    var priceType = mapFilters.elements['housing-price'].value;

    if (priceType === 'any') {
      return offersToFilter;
    }

    var typeToPrice = {
      'middle': [10000, 50000],
      'low': [0, 10000],
      'high': [50000, Infinity]
    };

    var housingPrice = offersToFilter.filter(function (offer) {
      return (offer.offer.price > typeToPrice[priceType][0] && offer.offer.price < typeToPrice[priceType][1]);
    });

    return housingPrice;
  };

  var filterHousingRooms = function (offersToFilter) {
    var roomsCount = mapFilters.elements['housing-rooms'].value;

    if (roomsCount === 'any') {
      return offersToFilter;
    }

    var housingRooms = offersToFilter.filter(function (offer) {
      return offer.offer.rooms === Number(roomsCount);
    });

    return housingRooms;
  };

  var filterHousingGuests = function (offersToFilter) {
    var guestsCount = mapFilters.elements['housing-guests'].value;

    if (guestsCount === 'any') {
      return offersToFilter;
    }

    var housingGuests = offersToFilter.filter(function (offer) {
      return offer.offer.guests === Number(guestsCount);
    });

    return housingGuests;
  };

  var filterHousingFeatures = function (offersToFilter) {
    if (!features.length) {
      return offersToFilter;
    }

    var housingFeatures = offersToFilter.filter(function (offer) {
      return window.utils.contains(offer.offer.features, features);
    });

    return housingFeatures;
  };

  var selectToFilter = {
    'housing-type': filterHousingType,
    'housing-price': filterHousingPrice,
    'housing-rooms': filterHousingRooms,
    'housing-guests': filterHousingGuests
  };

  var getFilterList = function () {
    Array.from(mapFilters.children).slice(0, 4).forEach(function (select) {
      if (!filterList.includes(selectToFilter[select.name])) {
        filterList.push(selectToFilter[select.name]);
      }
    });

    features = [];

    Array.from(mapFilters.elements['housing-features'].children).forEach(function (item) {
      if (item.checked === true) {
        features.push(item.value);
      }
    });

    if (features.length) {
      filterList.push(filterHousingFeatures);
    }
  };

  var filter = function (offersToFilter) {
    var filteredOffers = offersToFilter;

    if (filterList.length) {
      filterList.forEach(function (handler) {
        filteredOffers = handler(filteredOffers);
      });
    }

    return filteredOffers;
  };

  var dataLoadHandler = function (data) {
    offers = data;
  };

  var onMapFiltersChange = function () {
    getFilterList();
    callFiltersChangeHandlers(filter(offers.slice()));
  };

  window.data.addDataLoadHandler(dataLoadHandler);

  mapFilters.addEventListener('change', window.utils.debounce(onMapFiltersChange));

  window.mapFilters = {
    addFiltersChangeHandler: function (handler) {
      filtersChangeHandlers.push(handler);
    }
  };
})();