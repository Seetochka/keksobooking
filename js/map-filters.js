'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  var filtersChangeHandlers = [];
  var filterList = [];
  var offers = null;

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

    var typeHousing = offersToFilter.filter(function (offer) {
      return offer.offer.type === type;
    });

    return typeHousing;
  };

  var filterHousingPrice = function (offersToFilter) {
    return offersToFilter;
  };

  var filterHousingRooms = function (offersToFilter) {
    return offersToFilter;
  };

  var filterHousingGuests = function (offersToFilter) {
    return offersToFilter;
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

  mapFilters.addEventListener('change', onMapFiltersChange);

  window.mapFilters = {
    addFiltersChangeHandler: function (handler) {
      filtersChangeHandlers.push(handler);
    }
  };
})();