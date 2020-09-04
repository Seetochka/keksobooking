'use strict';

(function () {
    var renderPins = function (data) {
        var template = document.querySelector('#pin').content.querySelector('button');
        var fragment = document.createDocumentFragment();

        for (var item of data) {
            var pin = template.cloneNode(true);

            pin.style.left = item.location.x + 'px';
            pin.style.top = item.location.y + 'px';
            pin.children[0].src = item.author.avatar;
            pin.children[0].alt = item.offer.title;

            fragment.appendChild(pin);

            (function (item) {
                pin.addEventListener('click', function () {
                    window.mapCard.closeCard();

                    var newPopup = window.mapCard.createCard(item);

                    window.addEventListener('keydown', function(evt) {
                        if (evt.keyCode === window.utils.ESC_KEYCODE) {
                            window.mapCard.closeCard();
                        }
                    });

                    window.utils.map.insertBefore(newPopup, window.utils.filtersContainer);
                });
            })(item);
        }

        window.utils.pins.appendChild(fragment);
    };

    window.mapPin = {
        renderPins: renderPins
    };
})();
