"use strict";

(function () {
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function forEach(callback, thisArg) {
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            var array = this;
            thisArg = thisArg || this;
            for (var i = 0, l = array.length; i !== l; ++i) {
                callback.call(thisArg, array[i], i, array);
            }
        };
    }
})();

function qs(query) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return root.querySelector(query);
}

function qsAll(query) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return root.querySelectorAll(query);
}

document.addEventListener("DOMContentLoaded", function (event) {
    window.site = {};
    window.site.obj = {
        pathParams: function pathParams(id) {
            var pathItem = $('.mapRussia path[id="' + id + '"]'),
                pathItemOffset = pathItem.offset(),
                pathItemOffsetTop = parseInt(pathItemOffset.top, 10),
                pathItemOffsetLeft = parseInt(pathItemOffset.left, 10),
                pathItemWidth = parseInt(pathItem[0].getBoundingClientRect().width, 10),
                pathItemHeight = parseInt(pathItem[0].getBoundingClientRect().height, 10),
                pathCenterY = pathItemOffsetTop + pathItemHeight / 2,
                pathCenterX = pathItemOffsetLeft + pathItemWidth / 2;
            return [pathCenterY, pathCenterX];
        },
        popupPosition: function popupPosition() {
            var _self = this;

            var popups = $('.projects__popup');
            popups.each(function () {
                var popup = $(this),
                    parOffset = popup.parents('.projects__map').offset(),
                    parHeight = popup.parents('.projects__map').outerHeight(true),
                    parWidht = popup.parents('.projects__map').outerWidth(),
                    idPopup = popup.data('popup-id');

                if ($('.mapRussia path[id="' + idPopup + '"]').length) {
                    var popupHeight = popup.outerHeight(true);

                    var pathParamsArr = _self.pathParams(idPopup);

                    var halfWidthPopup = $(this).width() / 2;

                    if (parOffset.top + parHeight - pathParamsArr[0] < popupHeight) {
                        popup.css({
                            'top': pathParamsArr[0] - parOffset.top - popupHeight - 50 + 'px'
                        }).addClass('arrow-bottom');
                    } else {
                        popup.css({
                            'top': pathParamsArr[0] - parOffset.top + 12 + 'px'
                        });
                    }

                    if (pathParamsArr[1] - parOffset.left < halfWidthPopup) {
                        popup.css({
                            'left': pathParamsArr[1] - parOffset.left - 18 + 'px'
                        }).addClass('arrow-left');
                    } else if (parOffset.left + parWidht - pathParamsArr[1] < halfWidthPopup) {
                        popup.css({
                            'left': pathParamsArr[1] - parOffset.left - halfWidthPopup * 2 + 18 + 'px'
                        }).addClass('arrow-right');
                    } else {
                        popup.css({
                            'left': pathParamsArr[1] - parOffset.left - halfWidthPopup + 'px'
                        });
                    }
                }
            });
        },
        swiperGallery: function swiperGallery() {
            var gallerySwiper = new Swiper('.js-swiper-gallery', {
                loop: false,
                speed: 750,
                slidesPerView: 1,
                spaceBetween: 0,
                // mousewheel: false,
                // grabCursor: false,
                // keyboard: false,
                // simulateTouch: false,
                // allowSwipeToNext: false,
                // allowSwipeToPrev: false,
                autoHeight: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });
        },
        customScroll: function customScroll() {
            if ($('.js-customScroll').length) {
                $('.js-customScroll').each(function () {
                    $(this).mCustomScrollbar({
                        theme: "dark",
                        axis: "y",
                        advanced: {
                            autoScrollOnFocus: false
                        }
                    });
                });
            }
        },
        clearProjectsListItem: function clearProjectsListItem() {
            $('.projects__popups').empty()
            //$('.projects__list-item').removeClass('hidden');
            //$('.projects__popup-top').fadeOut(0);
        },
        closePrjPopup: function closePrjPopup() {
            var _self = this;

            $('body').on('click', '.js-close-prj-popup', function (e) {
                //$(this).parents('.projects__popup').removeClass('show');
                $('.mapRussia path[id^="RU"]').attr('class', '');
                _self.clearProjectsListItem();
                e.preventDefault();
            });

        },
        sortPopup: function sortPopup() {

            let countCategory;

            $('body').on('click', '.js-sort-popup', function (e) {
                var _t = $(this),
                    parentData = _t.parent('.projects__list-item').data('category'),
                    headParent = _t.parents('.projects__popups');
                countCategory = 0;
                headParent.find('.projects__list-item').each(function () {
                    if ($(this).data('category') != parentData) {
                        countCategory += 1;
                        $(this).addClass('hidden');
                    } else {
                        $(this).removeClass('hidden');
                    }
                });
                if (countCategory > 0){
                    headParent.find('.projects__popup-back').text(_t.text());
                    headParent.find('.projects__popup-top').fadeIn(350);
                }
                e.preventDefault();
            });

            $('body').on('click', '.js-reset-sort', function (e) {

                var _tPar = $(this).parents('.projects__popups');
                _tPar.find('.projects__list-item').removeClass('hidden');
                _tPar.find('.projects__popup-top').fadeOut(0);
                countCategory = 0;
                e.preventDefault();
            });

        },
        showDirPopup: function showDirPopup() {
            var _self = this;

            $('.js-show-dir-popup').on('click', function (e) {
                var _t = $(this),
                    _tData = _t.data('dir-id');

                var popupDirTmplt = '',
                    projectsList = '';

                function showPop() {
                    $('.projects__popup').removeClass('show');
                    $('.projects__popup[data-popup-dir="' + _tData + '"]').addClass('show');
                    _self.customScroll();
                }

                if (!$('.projects__popup[data-popup-dir="' + _tData + '"]').length) {

                    try {
                        $.ajax({
                            url: "https://static.b-2-b.su/api/categoryItemData/" + _tData + "/",
                                    success: function success(data) {
                                    var data = JSON.parse(data);
                                    if (data && data.projects.length) {
                                        popupDirTmplt = '<div class="projects__popup" data-popup-dir="' + data.idCategory + '">' + '   <button class="projects__popup-close js-close-prj-popup" type="button"></button>' + '    <div class="projects__popup-content js-customScroll">' + '        <ul class="projects__list">';
                                        data.projects.forEach(function (item) {
                                            projectsList = projectsList + '<li class="projects__list-item" data-dir="' + item.idProject + '">' + '  <a class="projects__list-item-author js-mfp-open" href="#big-popup_' + item.idProject + '"><span>' + item.author + '</span></a>' + '  <a class="projects__list-item-href js-mfp-open" href="#big-popup_' + item.idProject + '"><span>' + item.nameProject + '</span></a>' + '</li>';
                                        });
                                        popupDirTmplt = popupDirTmplt + projectsList + '</ul></div></div>';
                                        $('.projects__popups--directions').append(popupDirTmplt);

                                        showPop();
                                    }
                            }
                        });
                    } catch (err) {
                        console.log('Error project directions request...;(');
                        console.log(err);
                    }

                } else {
                    if ($('.projects__popup[data-popup-dir="' + _tData + '"]').length) {
                        showPop();
                    }
                }

                e.preventDefault();
            });
        },
        showMapPopup: function showMapPopup() {
            var _self = this;

            $('.mapRussia path[id^="RU"]').on('click', function (e) {
                var _t = $(this),
                    _tId = _t.attr('id');

                var popupPinTmplt = '',
                    projectsList = '';

                _self.clearProjectsListItem();

                function showPop() {
                    $('.mapRussia path[id^="RU"]').attr("class", "");
                    _t.attr("class", "selected");
                    $('.projects__popup').removeClass('show');
                    $('.projects__popup[data-popup-id="' + _tId + '"]').addClass('show');
                    _self.customScroll();
                    _self.popupPosition();
                }

                if (!$('.projects__popup[data-popup-id="' + _tId + '"]').length) {

                    try {
                        $.ajax({
                            url: "./json/municipalitiesMin.json",
                            dataType: 'json',
                            success: function success(data) {

                                console.log(data);
                                for (let i = 0; i < data.length; i++){
                                    if (data[i].ID === _tId) {
                                        popupPinTmplt = '<div class="projects__popup" data-popup-id="' + _tId + '">' + '   <button class="projects__popup-close js-close-prj-popup" type="button"></button>' + '   <div class="projects__popup-top">' + '       <a class="projects__popup-back js-reset-sort" href="#"></a>' + '   </div>' + '   <div class="projects__popup-content js-customScroll">' +'<h2 class="regionName">' + data[i].Name + '</h2>' + ' <ul class="projects__list">';
                                        data[i].Municipalities.forEach(function (item) {
                                            console.log(item);
                                            projectsList = projectsList + '<li class="projects__list-item" data-category="' + item.ID + '"> ' + ' <a class="projects__list-item-author js-mfp-open" href="#big-popup_"> '+item.Name+' </a></li>';
                                        });
                                        popupPinTmplt = popupPinTmplt + projectsList + '</ul></div></div>';
                                        console.log(popupPinTmplt);
                                        $('.projects__popups:not(.projects__popups--directions)').append(popupPinTmplt);

                                        showPop();
                                    }
                                }

                                // if (data && data.length) {
                                //     popupPinTmplt = '<div class="projects__popup" data-popup-id="' + _tId + '">' + '   <button class="projects__popup-close js-close-prj-popup" type="button"></button>' + '   <div class="projects__popup-top">' + '       <a class="projects__popup-back js-reset-sort" href="#"></a>' + '   </div>' + '   <div class="projects__popup-content js-customScroll">' + '       <ul class="projects__list">';
                                //     data.forEach(function (item) {
                                //         projectsList = projectsList + '<li class="projects__list-item" data-category="' + item.idCategory + '" data-dir="' + item.idProject + '">' + '  <a class="projects__list-item-author js-mfp-open" href="#big-popup_' + item.idProject + '"><span>' + item.author + '</span></a>' + '  <a class="projects__list-item-sort js-sort-popup" href="#"><span>' + item.nameCategory + '</span></a>' + '  <a class="projects__list-item-href js-mfp-open" href="#big-popup_' + item.idProject + '"><span>' + item.nameProject + '</span></a>' + '</li>';
                                //     });
                                //     popupPinTmplt = popupPinTmplt + projectsList + '</ul></div></div>';
                                //     $('.projects__popups:not(.projects__popups--directions)').append(popupPinTmplt);
                                //
                                //     showPop();
                                // }
                            }
                        });
                    } catch (err) {
                        console.log('Error project directions request...;(');
                        console.log(err);
                    }

                } else {
                    if ($('.projects__popup[data-popup-id="' + _tId + '"]').length) {
                        showPop();
                    }
                }

                e.preventDefault();
            });
        },
        projectItemPopup: function projectItemPopup() {
            var _self = this;

            var bigPopupTmplt = '',
                projectsGallery,
                projectsGallerySlides,
                authorInfo = '',
                href;

            $('body').on('click', '.js-mfp-open', function (e) {
                var _t = $(this);

                projectsGallery = '';
                projectsGallerySlides = '';

                href = _t.attr('href');

                function showPop() {
                    if ($('.popup[id="' + href.substring(1) + '"]').length) {
                        $.magnificPopup.open({
                            items: {
                                src: href
                            },
                            tClose: 'Закрыть',
                            type: 'inline',
                            midClick: true,
                            mainClass: 'mfp-fade',
                            closeBtnInside: true,
                            callbacks: {
                                open: function open() {
                                    if (qs('.js-swiper-gallery')) _self.swiperGallery();
                                },
                                close: function() {
                                    if ($('.js-swiper-gallery').length) $('.js-swiper-gallery')[0].swiper.destroy(true, true);
                                    if ($('.hidden-block').length) $('.hidden-block').empty();
                                }
                            }
                        }, 0);
                    }
                }

                try {
                    $.ajax({
                        url: "https://static.b-2-b.su/api/projectItemData/" + _t.parents('.projects__list-item').data('dir') + "/",
                        beforeSend: function() {
                            $('.lds-dual-ring').addClass('show');
                        },
                        success: function success(data) {
                            var data = JSON.parse(data);
                            if (data) {
                                var authorPhoto = data.authorPhoto ? data.authorPhoto : '',
                                    authorStatus = data.authorStatus ? data.authorStatus : '',
                                    mainH3 = data.textBottom.indexOf('<h3>') + 1 ? '' : '<h3>' + data.nameProject + '</h3>';

                                if (authorPhoto && authorPhoto != '' || authorStatus && authorStatus != '') {
                                    if (authorPhoto && authorPhoto) {
                                        authorInfo = '<div class="projects-info__photo"><img class="projects-info__photo-item" src="' + authorPhoto + '" alt="" role="presentation"></div>';
                                    }
                                    if (authorStatus && authorStatus != '') {
                                        authorInfo = authorInfo + '<p class="projects-info__status">' + authorStatus + '</p>';
                                    }
                                }

                                bigPopupTmplt = '<div class="popup popup--big-popup" id="' + href.substring(1) + '">' + '  <div class="popup__container">' + '     <div class="popup__top">' + '         <h3 class="popup__title">Информация о проекте</h3>' + '     </div>' + '     <div class="popup__content">' + '         <div class="projects-info">' + '             <div class="projects-info__top">' + '                 <div class="projects-info__left">' + '                     <div class="projects-info__left-top">' + '                         <p class="projects-info__author">' + data.author + '</p>' + '                         <p class="projects-info__region">' + data.region + '</p>' + '                     </div>' + '                     <div class="projects-info__text">' + mainH3 + data.textBottom + '</div>' + '                 </div>' + '                 <div class="projects-info__right">' + authorInfo + '</div></div>';
                                
                                if (data.imgArr && data.imgArr != '') {
                                    projectsGallery = '<div class="projects-info__gallery">' + '<div class="swiper-container js-swiper-gallery">' + '    <div class="swiper-wrapper">';
                                    data.imgArr.forEach(function (item) {
                                        projectsGallerySlides = projectsGallerySlides + '<div class="swiper-slide">' + '<div class="projects-info__gallery-overimg">' + '    <img class="projects-info__gallery-img" src="' + item + '" alt="" role="presentation">' + '</div></div>';
                                    });
                                    projectsGallery = projectsGallery + projectsGallerySlides + '        </div>' + '        <div class="swiper-buttons">' + '            <div class="swiper-button-prev"></div>' + '            <div class="swiper-button-next"></div>' + '        </div>' + '    </div>' + '</div>';
                                }
                                
                                bigPopupTmplt = bigPopupTmplt + projectsGallery + '<div class="projects-info__text">' + data.textTop + '</div></div></div></div></div>';
                                
                                $('.hidden-block').append(bigPopupTmplt);

                                showPop();

                                $('.lds-dual-ring').removeClass('show');
                            }
                        }
                    });
                } catch (err) {
                    console.log('Error popup data request...;(');
                    console.log(err);
                }

                e.preventDefault();
            });
        },
        projectsDirections: function projectsDirections() {
            var _self = this;

            var projectsDirectionsHtml = '';

            try {
                $.ajax({
                    url: "https://static.b-2-b.su/api/projectsDirectionsData/",
                    success: function success(data) {
                        if (data) {
                            JSON.parse(data).forEach(function (item) {
                                projectsDirectionsHtml = projectsDirectionsHtml + ' <li class="projects__directions-item">' + '   <a class="projects__directions-item-href js-show-dir-popup" href="#" data-dir-id="' + item.idCategory + '">' + '     <span class="projects__directions-item-overico">' + '       <img class="projects__directions-item-ico" src="' + item.img + '" alt="" role="presentation">' + '     </span>' + '     <span class="projects__directions-item-text">' + '       <span>' + item.nameCategory + '</span>' + '     </span>' + '   </a>' + ' </li>';
                            });
                            $('.projects__directions').append(projectsDirectionsHtml);

                            _self.showDirPopup();
                        }
                    }
                });
            } catch (err) {
                console.log('Error directions request...;(');
                console.log(err);
            }

        },
        pins: function pins() {
            var _self = this;

            var htmlPins = "";

            function positionPins() {
                var elems = $('.projects__map-pin');
                elems.each(function () {
                    var pin = $(this),
                        parOffset = pin.parents('.projects__map').offset(),
                        idPin = pin.data('pin-id');

                    if ($('.mapRussia path[id="' + idPin + '"]').length) {
                        var pathParamsArr = _self.pathParams(idPin);

                        pin.css({
                            'left': pathParamsArr[1] - parOffset.left - 11 + 'px',
                            'top': pathParamsArr[0] - parOffset.top - 15 + 'px'
                        });
                    }

                    if (!--elems.length) {
                        $('.projects__map-pins').addClass('show-pin');
                    }
                });
            }

            try {
                console.log(this);
                $.ajax({
                    url: "./json/municipalitiesMin.json",
                    dataType: 'json',
                    success: function success(data) {
                        console.log(data);
                        if (data) {
                            data.forEach(function (item) {
                                var htmlPinsTmpl = "<div class='projects__map-pin' data-pin-id='" + item.ID + "'>" + item.MunicipalitiesCount + "</div>";
                                htmlPins += htmlPinsTmpl;
                            })
                            qs('.projects__map-pins').innerHTML = htmlPins;
                            positionPins();
                        }
                    }
                });
            } catch (err) {
                console.log('Error pins data request...;(');
                console.log(err);
            }
        },
        map: function map() {
            var _self = this;

            this.projectsDirections();
            this.projectItemPopup();
            this.showMapPopup();
            this.sortPopup();
            this.closePrjPopup();

            $(window).resize(function (event) {
                _self.pins();

                if ($(window).width() > 768) {
                    _self.popupPosition();
                } else {
                    if ($('.projects__popup').length) {
                        $('.projects__popup').each(function () {
                            $(this).removeClass('arrow-left arrow-right arrow-bottom').removeAttr('style');
                        });
                    }
                }
            });
            $(document).on('click', function (e) {
                if (!$(e.target).closest('.projects__popup').length && !$(e.target).closest('.mapRussia').length && $('.projects__popup.show').length && !$(e.target).closest('.projects__directions-item-href').length) {
                    $('.projects__popup.show').removeClass('show');
                    $('.mapRussia path[id^="RU"]').attr('class', '');
                    $('.projects__list-item').removeClass('hidden');
                    e.preventDefault();
                }
            });
        },
        init: function init() {
            var _th = this;

            if (htmlSvgMap !== undefined && htmlSvgMap != '' && qs('.mapRussia')) {
                qs('.mapRussia').innerHTML = htmlSvgMap;

                _th.map();
            }

            var eventResize;

            try {
                eventResize = new Event('resize');
            } catch (e) {
                eventResize = document.createEvent('Event');
                eventResize.initEvent('scroll', false, false);
            }

            window.dispatchEvent(eventResize);
            var eventScroll;

            try {
                eventScroll = new Event('scroll');
            } catch (e) {
                eventScroll = document.createEvent('Event');
                eventScroll.initEvent('scroll', false, false);
            }

            window.dispatchEvent(eventScroll);
            return this;
        }
    }.init();
});