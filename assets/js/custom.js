// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vh-start', `${vh}px`);

let options = {
    rootMargin: '0px',
    threshold: 0.1
}

let padding = [];
padding[320] = 10;
padding[375] = 23;

let partnersCarouselOffset = [1, 3, 5];

// фикс 100vh, эта функция будет привязана к resize
function setHeight() {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

jQuery(document).ready(function ($) {
    $(window).resize(function () {
        setHeight()

        //
    });

    // покажем заголовок
    $('.start-animation').each(function (index, element) {
        setTimeout(function () {
            element.classList.add("animate__animated");
            element.classList.add("animate__fadeInUp");
        }, 100 * index)
    });


    let darkSlide = [false, true, false, true, true, true, false, true, true];
    let dark = false;
    let body = $('body');
    let html = $('html');
    let $headerbg = $('header .bg');
    let header = $('header');

    function setDark(flag) {
        if (flag) {
            body.addClass('dark');
            dark = true;
        } else {
            body.removeClass('dark');
            dark = false;
        }
    }

    $(window).scroll(function () {
        if (window.scrollY > 16) {
            $headerbg.removeClass('opacity-0');
            header.addClass('white');
        } else {
            $headerbg.addClass('opacity-0');
            header.removeClass('white');
        }
    });

    $('.menu-button').click(function () {
        body.toggleClass('menu-active');
    });

    if (document.documentElement.scrollWidth < 1200) {
        // мобильные
        let firstCarousel = $('#first').find('.mobile').find('.owl-carousel');
        let progressText = $('.progress-text');
        let progressBarStroke = $('.progress-bar .stroke');

        firstCarousel.on('initialized.owl.carousel', function (event) {
            progressBarStroke.css("width", (1 / event.item.count * 100) + "%");
        });

        firstCarousel.owlCarousel({
            dots: false,
            loop: true,
            margin: 0,
            nav: false,
            smartSpeed: 2000,
            items: 1
        });

        $('#first').find('.mobile').find('.prev-slide').click(function () {
            firstCarousel.trigger('prev.owl.carousel');
        });

        $('#first').find('.mobile').find('.next-slide').click(function () {
            firstCarousel.trigger('next.owl.carousel');
        });

        firstCarousel.on('translate.owl.carousel', function (event) {
            // loop fix
            let itemIndex = event.item.index - 4;
            console.log(itemIndex);
            console.log('count' + itemIndex - 1);
            // progress bar
            progressBarStroke.css("width", (itemIndex / event.item.count * 100) + "%");
            // progress text
            progressText.text('0' + itemIndex);
            if (darkSlide[itemIndex - 1]) {
                setDark(true);
            } else {
                setDark(false);
            }
        });
    } else {
        // десктоп
        let firstCarouselDesktop = $('#first').find('.desktop').find('.owl-carousel');
        let progressText = $('#first').find('.desktop').find('.progress-text');
        let progressBarStroke = $('#first').find('.desktop').find('.progress-bar .stroke');
        let firstCarouselDirectionNext = 1;
        let slideNow = 2;
        firstCarouselDesktop.on('initialized.owl.carousel', function (event) {
            progressBarStroke.css("width", (1 / event.item.count * 100) + "%");
        });

        firstCarouselDesktop.owlCarousel({
            dots: false,
            loop: true,
            margin: 16,
            nav: false,
            items: 3,
            mouseDrag: false,
            touchDrag: false,
            smartSpeed: 1000,
            startPosition: 1,
            slideTransition: 'ease-in-out',
            //  URLhashListener:true
        });

        let dNextSlide = $('#first').find('.desktop').find('.next-slide');

        dNextSlide.on('click', function () {
            firstCarouselDesktop.trigger('next.owl.carousel');
        });

        let dPrevSlide = $('#first').find('.desktop').find('.prev-slide');

        dPrevSlide.on('click', function () {
            firstCarouselDirectionNext = 0;
            console.log('backwards!');
            firstCarouselDesktop.trigger('prev.owl.carousel');
        });

        firstCarouselDesktop.on('translate.owl.carousel', function (event) {
            dNextSlide.off('click');
            dPrevSlide.off('click');

            let mainContainer = $('#first').find('.main-container');

            // loop fix
            let itemIndex = event.item.index - 4;
            console.log('current index is' + itemIndex);
            console.log('count' + event.item.count);
            console.log('direction is ' + firstCarouselDirectionNext);

            // progress bar
            progressBarStroke.css("width", (((itemIndex - 2 + event.item.count) % event.item.count + 1) / event.item.count * 100) + "%");

            // если она идёт вперед
            if (firstCarouselDirectionNext) {

                // progress text
                if (itemIndex === 1) {
                    progressText.text('0' + event.item.count);
                } else {
                    progressText.text('0' + (itemIndex - 1));
                }
                if (darkSlide[(itemIndex - 2 + event.item.count) % event.item.count]) {
                    setDark(true);
                } else {
                    setDark(false);
                }

                // let flyingPicture = $('<img>', {
                //     src: firstCarouselDesktop.find('.slide img').attr();
                // })

                let nextSlideIndex = (event.item.index + event.item.count - 1) % event.item.count;

                console.log(firstCarouselDesktop.find('.slide img').eq(nextSlideIndex).attr('src'));
                let newbg = $('<img class="amazing-bg appeared pos-' + ((itemIndex - slideNow + event.item.count) % event.item.count) + '" src="' + firstCarouselDesktop.find('.slide img').eq(nextSlideIndex).attr('src') + '" alt="">');
                mainContainer.before(newbg);

                slideNow = itemIndex;
                setTimeout(function () {
                    newbg.removeClass('appeared');
                }, 50);

                mainContainer.html($('#first').find('.mobile .s-' + (((itemIndex - 2 + event.item.count) % event.item.count + 1) + "")).html());
                let allElements = mainContainer.find('*');
                if (darkSlide[((itemIndex - 2 + event.item.count) % event.item.count)])
                    mainContainer.parent().addClass('dark');
                else
                    mainContainer.parent().removeClass('dark');
                allElements.addClass('opacity-0');

                setTimeout(function () {
                    allElements.removeClass('opacity-0');
                    allElements.addClass('animate__animated');
                    allElements.addClass('animate__fadeInUp');
                }, 700);

                setTimeout(function () {
                    $('.amazing-bg')[0].remove();
                }, 1000);

            } else {
                // progress text
                if (itemIndex === 0) {
                    progressText.text('0' + (event.item.count - 1));
                } else if (itemIndex === 1) {
                    progressText.text('0' + event.item.count);
                } else {
                    progressText.text('0' + (itemIndex - 1));
                }
                if (darkSlide[(itemIndex - 2 + event.item.count) % event.item.count]) {
                    setDark(true);
                } else {
                    setDark(false);
                }

                // let flyingPicture = $('<img>', {
                //     src: firstCarouselDesktop.find('.slide img').attr();
                // })

                let prevSlideIndex = (event.item.index + event.item.count - 1) % event.item.count;

                console.log(firstCarouselDesktop.find('.slide img').eq(prevSlideIndex).attr('src'));
                let newbg = $('<img class="amazing-bg" src="' + firstCarouselDesktop.find('.slide img').eq(prevSlideIndex).attr('src') + '" alt="">');
                let bg = $('#first').find('.amazing-bg');

                bg.before(newbg);
                bg.addClass('opacity-0');

                mainContainer.html($('#first').find('.mobile .s-' + (((itemIndex - 2 + event.item.count) % event.item.count + 1) + "")).html());
                let allElements = mainContainer.find('*');
                if (darkSlide[((itemIndex - 2 + event.item.count) % event.item.count)])
                    mainContainer.parent().addClass('dark');
                else
                    mainContainer.parent().removeClass('dark');
                allElements.addClass('opacity-0');

                setTimeout(function () {
                    allElements.removeClass('opacity-0');
                    allElements.addClass('animate__animated');
                    allElements.addClass('animate__fadeInUp');
                }, 700);

                setTimeout(function () {
                    $('.amazing-bg.opacity-0')[0].remove();
                }, 1000);
            }

            setTimeout(function () {
                dNextSlide.off('click');
                dPrevSlide.off('click');

                dNextSlide.on('click', function () {
                    firstCarouselDesktop.trigger('next.owl.carousel');
                });

                dPrevSlide.on('click', function () {
                    console.log('backwards!');
                    firstCarouselDirectionNext = 0;
                    firstCarouselDesktop.trigger('prev.owl.carousel');
                });
            }, 1500);

            setTimeout(function () {
                firstCarouselDirectionNext = 1;
            }, 500);
        });

        // создание картинки при переходе
        // firstCarouselDesktop.find('.slide').on('click', function() {
        //     console.log($(this)[0].getBoundingClientRect());
        // });

        let programs = $('.program');

        // наведение на карточки программ

        programs.hover(function () {
            programs.removeClass('active');
            $(this).addClass('active');
        }, function () {

        });

        // abit.html
        let openDaysCarousel = $('#open-days .owl-carousel');

        openDaysCarousel.owlCarousel({
            dots: false,
            margin: 30,
            nav: false,
            loop: true,
            mouseDrag: false,
            touchDrag: false,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1,
                },
                1200: {
                    items: 3
                }
            }
        });

        $('#open-days .prev-slide').click(function () {
            openDaysCarousel.trigger('prev.owl.carousel');
        });

        $('#open-days .next-slide').click(function () {
            openDaysCarousel.trigger('next.owl.carousel');
        });
    }

    $(window).scroll();

    let graduatesCarousel = $('#graduates .owl-carousel');

    graduatesCarousel.owlCarousel({
        dots: false,
        margin: 30,
        nav: false,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 3
            }
        }
    });

    $('#graduates .prev-slide').click(function () {
        graduatesCarousel.trigger('prev.owl.carousel');
    });

    $('#graduates .next-slide').click(function () {
        graduatesCarousel.trigger('next.owl.carousel');
    });

    let expertsCarousel = $('.experts .owl-carousel');

    expertsCarousel.owlCarousel({
        dots: false,
        margin: 30,
        nav: false,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 3
            }
        }
    });

    $('.experts .prev-slide').click(function () {
        expertsCarousel.trigger('prev.owl.carousel');
    });

    $('.experts .next-slide').click(function () {
        expertsCarousel.trigger('next.owl.carousel');
    });

    let tutorsCarousel = $('.tutors .owl-carousel');

    tutorsCarousel.owlCarousel({
        dots: false,
        margin: 30,
        nav: false,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 3
            }
        }
    });

    $('.tutors .prev-slide').click(function () {
        tutorsCarousel.trigger('prev.owl.carousel');
    });

    $('.tutors .next-slide').click(function () {
        tutorsCarousel.trigger('next.owl.carousel');
    });

    let announceCarousel = $('.announce .owl-carousel');

    announceCarousel.owlCarousel({
        dots: false,
        margin: 30,
        nav: false,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 2
            }
        }
    });

    $('.announce .prev-slide').click(function () {
        announceCarousel.trigger('prev.owl.carousel');
    });

    $('.announce .next-slide').click(function () {
        announceCarousel.trigger('next.owl.carousel');
    });

    let recommendationsCarousel = $('.recommendations .owl-carousel');

    recommendationsCarousel.owlCarousel({
        dots: false,
        margin: 30,
        nav: false,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 3
            }
        }
    });

    $('.recommendations .prev-slide').click(function () {
        recommendationsCarousel.trigger('prev.owl.carousel');
    });

    $('.recommendations .next-slide').click(function () {
        recommendationsCarousel.trigger('next.owl.carousel');
    });

    // увеличение картинки в карусели партнеров
    // document.getElementById("partners").getElementsByClassName("slide")[0].getBoundingClientRect();

    // анимации
    const animateCSS = (element, animation, prefix = 'animate__') =>
        // We create a Promise and return it
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = document.querySelector(element);

            node.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, {once: true});
        });

    function fadeInRightAnimation($element) {
        $element.each(function () {
            // проверка на докрутку до определенного элемента
            let offset = $(this).offset().top - 50 * vh;
            //если мы докрутили до нужного элемента
            if ($(window).scrollTop() > offset) {
                $(this).find('img').each(function (index, element) {
                    setTimeout(function () {
                        element.classList.add("animate__fadeInRight");
                    }, 500 * index)
                });
            } else {

            }
        });
    }

    function fadeInLeftAnimation($element) {
        $element.each(function () {
            // проверка на докрутку до определенного элемента
            let offset = $(this).offset().top - 50 * vh;
            //если мы докрутили до нужного элемента
            if ($(window).scrollTop() > offset) {
                $(this).find('img').each(function (index, element) {
                    setTimeout(function () {
                        element.classList.add("animate__fadeInLeft");
                    }, 1000 - 500 * index)
                });
            } else {

            }
        });
    }

    function advantagesAppearance(mainContainer) {
        let advantages = mainContainer.find('.advantage');
        advantages.each(function (index, element) {
            if ($(window).scrollTop() > element.offsetTop - 50 * vh) {
                // .querySelector('.img-wrapper')
                element.classList.add("show")
            }
        });
    }

    $(window).scroll(function () {
        // fadeInRightAnimation($('#special-programs').find('.msi-fade-in-right-pictures'));
        fadeInRightAnimation($('main').find('.msi-fade-in-right-pictures'));
        if (document.documentElement.scrollWidth < 1200) {
            fadeInRightAnimation($('main').find('.document-pictures'));
        } else {
            fadeInRightAnimation($('main').find('.document-pictures:odd'));
            fadeInLeftAnimation($('main').find('.document-pictures:even'));
        }
        advantagesAppearance($('.advantages'))
    });

    function secondTransition(main) {
        // data-transition-style
        let first = main.find('.first');
        let second = main.find('.second');
        let changer = main.find('.bottom');
        let window = main.find('.window');
        let condition = true; // true means first displayed

        function change() {
            changer.off('click');
            main.addClass('changing');
            setTimeout(function () {
                if (condition) {
                    main.addClass('second');
                    main.removeClass('first');
                } else {
                    main.addClass('first');
                    main.removeClass('second');
                }
                condition = !condition;
            }, 750);


            setTimeout(function () {
                main.removeClass('changing');
            }, 1500);


            setTimeout(function () {
                changer.on('click', function () {
                    change();
                })
            }, 1000);
        }

        changer.on('click', function (e) {
            change();
        })

    }

    secondTransition($('#higher-edu'));

    $('.feedback').submit(function () {
        let form = $(this);
        let height = form.height() + 32;
        form.css('height', height);
        $.post(
            'post.php', // адрес обработчика
            $(this).serialize(), // отправляемые данные

            function (msg) { // получен ответ сервера
                console.log('yes');
                // $(this).hide('slow');
                form.html(msg);
                form.addClass('done');
            }
        );
        return false;
    });

    $('[data-fancybox="form"]').fancybox({
        touch: false
    });

    $(window).trigger("scroll")
});

window.onload = () => {
    console.log("window is loaded");

    function showPartnersCarousel() {
        if ($("#partners").length > 0) {
            let callback = (entries, observer) => {
                entries.forEach(entry => {

                    if (entry.intersectionRatio > 0) {
                        let partnerCarousel = $("#partners .owl-carousel");

                        let pcOffset = 1;

                        function makeCenterBigger(event) {
                            if (document.documentElement.scrollWidth >= 1200) {
                                pcOffset = 4;
                            } else if (document.documentElement.scrollWidth >= 460) {
                                pcOffset = 2;
                            } else
                                pcOffset = 1;
                            let itemIndex = event.item.index + pcOffset;
                            let slideImages = $('#partners').find('.slide').find('img');
                            slideImages.removeClass('center-item');
                            slideImages.removeClass('side-item');
                            slideImages.eq(itemIndex).addClass('center-item');
                            if (document.documentElement.scrollWidth >= 1200) {
                                slideImages.eq(itemIndex - 1).addClass('side-item');
                                slideImages.eq(itemIndex + 1).addClass('side-item');
                            }
                        }

                        partnerCarousel.on('initialized.owl.carousel', function (event) {
                            makeCenterBigger(event);
                        });

                        partnerCarousel.on('translate.owl.carousel', function (event) {
                            makeCenterBigger(event);
                        });

                        partnerCarousel.on('resize.owl.carousel', function (event) {
                            makeCenterBigger(event);
                        });

                        partnerCarousel.owlCarousel({
                            dots: false,
                            margin: 0,
                            nav: false,
                            loop: true,
                            responsive: {
                                0: {
                                    items: 3,
                                    margin: 60
                                },
                                460: {
                                    items: 5,
                                    margin: 80
                                },
                                1200: {
                                    items: 9,
                                    margin: 80
                                },
                                1400: {
                                    items: 9,
                                    margin: 80
                                },
                                1700: {
                                    items: 9,
                                    margin: 80
                                }
                            }
                        });

                        $('#partners .prev-slide').click(function () {
                            partnerCarousel.trigger('prev.owl.carousel');
                        });

                        $('#partners .next-slide').click(function () {
                            partnerCarousel.trigger('next.owl.carousel');
                        });

                        observer.unobserve(target);
                    }
                });
            };

            let observer = new IntersectionObserver(callback, options);

            let target = document.querySelector('#partners');

            observer.observe(target);
        }
    }


    showPartnersCarousel();

    function showMap() {
        if ($("#map").length > 0) {
            let callback = (entries, observer) => {
                entries.forEach(entry => {

                    if (entry.intersectionRatio > 0) {
                        ymaps.ready(init);

                        function init() {
                            let myMap = new ymaps.Map("map", {
                                    center: [55.665477, 37.473303],
                                    zoom: 15
                                }),

                                // Создаем метку с помощью вспомогательного класса.
                                myPlacemark1 = new ymaps.Placemark([55.665477, 37.473303], {
                                    // Свойства.
                                    // Содержимое хинта.
                                    hintContent: 'Надпись, которая всплывает при наведении на метку. Она вообще тут нужна?'
                                }, {
                                    // Опции
                                    // Своё изображение иконки метки.
                                    iconImageHref: '/assets/img/map-marker.svg',
                                    // Размеры метки.
                                    iconImageSize: [80, 80],
                                    // Смещение левого верхнего угла иконки относительно
                                    // её "ножки" (точки привязки).
                                    iconImageOffset: [-38, -70]
                                })


                            // Добавляем все метки на карту.
                            myMap.geoObjects
                                .add(myPlacemark1)

                        }

                        observer.unobserve(target);
                    }
                });
            };

            let observer = new IntersectionObserver(callback, options);
            let target = document.querySelector('#map');
            observer.observe(target);
        }
    }

    showMap();

    function showNewsBlock() {
        if ($("#news-block").length > 0) {
            let callback = (entries, observer) => {
                entries.forEach(entry => {

                    if (entry.intersectionRatio > 0) {
                        let newsCarousel = $('#news-block .owl-carousel');

                        newsCarousel.owlCarousel({
                            dots: false,
                            margin: 30,
                            nav: false,
                            loop: true,
                            mouseDrag: false,
                            touchDrag: false,
                            smartSpeed: 1000,
                            responsive: {
                                0: {
                                    items: 1,
                                },
                                1200: {
                                    items: 3
                                }
                            }
                        });

                        $('#news-block .prev-slide').click(function () {
                            newsCarousel.trigger('prev.owl.carousel');
                        });

                        $('#news-block .next-slide').click(function () {
                            newsCarousel.trigger('next.owl.carousel');
                        });

                        observer.unobserve(target);
                    }
                });
            };

            let observer = new IntersectionObserver(callback, options);
            let target = document.querySelector('#news-block');
            observer.observe(target);
        }
    }

    showNewsBlock();

    function showGallery() {
        if ($(".gallery").length > 0) {
            let callback = (entries, observer) => {
                entries.forEach(entry => {

                    if (entry.intersectionRatio > 0) {
                        let galleryCarouselTop = $('.gallery .owl-carousel-top');

                        galleryCarouselTop.owlCarousel({
                            dots: false,
                            margin: 30,
                            nav: false,
                            loop: true,
                            mouseDrag: false,
                            touchDrag: false,
                            smartSpeed: 1000,
                            items: 1,
                            lazyLoad: true
                        });

                        let galleryCarouselBottom = $('.gallery .owl-carousel-bottom');

                        galleryCarouselBottom.owlCarousel({
                            dots: false,
                            margin: 16,
                            nav: false,
                            loop: true,
                            mouseDrag: false,
                            touchDrag: false,
                            smartSpeed: 1000,
                            responsive: {
                                0: {
                                    items: 4,
                                    margin: 16
                                },
                                1200: {
                                    items: 6,
                                    margin: 32
                                }
                            }
                        });

                        $('.gallery .prev-slide').click(function () {
                            galleryCarouselTop.trigger('prev.owl.carousel');
                            galleryCarouselBottom.trigger('prev.owl.carousel');
                        });

                        $('.gallery .next-slide').click(function () {
                            galleryCarouselTop.trigger('next.owl.carousel');
                            galleryCarouselBottom.trigger('next.owl.carousel');
                        });

                        observer.unobserve(target);
                    }
                });
            };

            let observer = new IntersectionObserver(callback, options);
            let target = document.querySelector('.gallery');
            observer.observe(target);
        }
    }

    showGallery();
}