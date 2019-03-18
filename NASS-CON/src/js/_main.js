/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */
(function ($) {
  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function () {
        // JavaScript to be fired on all pages
      },
      finalize: function () {
        // JavaScript to be fired on all pages, after page specific JS is fired

        //Polyfills and Global Functions
        objectFitImages();
        objectFitVideos();
        createVariables();
        cssVars();

        //Dynamic CSS Variables
        function createVariables() {
          var headerHeight = $('header.floater').outerHeight();

          vein.inject(':root', {
            '--headerHeight': headerHeight + 'px'
          });
          if ($('.margin-left').length) {
            var marginLeft = $('.margin-left h3').offset().left;

            vein.inject(':root', {
              '--margin-left': marginLeft + 'px'
            });
          }
          if ($('.timeline').length) {
            var items = $('.timeline li').length;

            vein.inject(':root', {
              '--items': items
            });
          }
          if ($('.container').length) {
            var containerWidth = $('.container').outerWidth();

            vein.inject(':root', {
              '--container': containerWidth + 'px'
            });
          }
          if ($('.headshot').length) {
            var headshotLeft = $('.headshot').offset().left;

            vein.inject(':root', {
              '--headshot-left': headshotLeft + 'px'
            });
          }
          if ($('.banner').length) {
            var bannerHeight = $('.banner').not('.process').outerHeight();

            vein.inject(':root', {
              '--banner-height': bannerHeight + 'px'
            });
          }
        }

        //Resize debounce founction
        var resizeTimer;

        $(window).on('resize', function (e) {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            $('.btn').each(function () {
              var base = $('html').css('font-size').replace('px', '');
              var width = $(this).outerWidth() - 4.125 * base;

              if (width * -1 > $(this).outerWidth()) {
                var width = width / 2;
              }
              $(this).attr('style', ' --width: -' + width + 'px');
            });
            createVariables();
          }, 250);
        });

        //FA Icon Replacements
        $('.social-bar li a').each(function () {
          var type = $(this).find('i').attr('class');
          var name = type.replace('fa fa-', '');

          $(this).find('i').remove();
          //          console.log(type);
          //          console.log(name);
          $(this).text(name);
        });
        $('.fa-envelope').each(function () {
          $(this).before('<svg width="27px" height="20px" viewBox="0 0 27 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs></defs> <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Header/Nassal/Mobile" transform="translate(-144.000000, -27.000000)" fill="#231F20"> <g id="Group"> <g transform="translate(144.000000, 20.000000)"> <g id="Contact-Icon/Black" transform="translate(0.000000, 7.000000)"> <g id="Shape"> <path d="M24.8972805,0 L2.10275045,0 C0.946562005,0 0,0.953622438 0,2.11843493 L0,17.8815651 C0,19.0463776 0.946562005,20 2.10275045,20 L24.8959635,20 C26.053436,20 26.998714,19.0463776 26.998714,17.8815651 L27,2.11843493 C27,0.952328829 26.053438,0 24.8972495,0 L24.8972805,0 Z M23.7668056,15.7229951 C24.0600324,16.000272 24.0741798,16.4641338 23.7989578,16.7608348 C23.6549157,16.9150198 23.4620146,16.9927624 23.2677966,16.9927624 C23.0890297,16.9927624 22.910276,16.9266822 22.768802,16.7932281 L16.7858716,11.136174 L14.1956829,13.680903 C14.0542122,13.8208384 13.8715867,13.8895092 13.6876672,13.8895092 C13.5089003,13.8895092 13.3288626,13.8234289 13.1886726,13.6899749 L10.2332262,10.8951811 L4.24140639,16.7827632 C4.09993571,16.9226985 3.91731015,16.9913693 3.73210665,16.9913693 C3.54305105,16.9913693 3.35400863,16.9162205 3.20996659,16.7698072 C2.92959986,16.4795742 2.93474257,16.0157323 3.22282732,15.7319674 L9.16855367,9.88982759 L3.23336296,4.27688884 C2.94013616,3.99961192 2.92470144,3.53575006 3.19992546,3.24034271 C3.47514947,2.94363179 3.93557698,2.93067579 4.23008123,3.20665579 L13.6762762,12.1378689 L22.7560282,3.21594324 C23.0428249,2.93218832 23.50452,2.93866632 23.786184,3.22890023 C24.0665507,3.51913315 24.061408,3.9829751 23.7733229,4.26673997 L17.8302305,10.1102066 L23.7668056,15.7229951 Z" fill-rule="nonzero"></path> </g> </g> </g> </g> </g> </g></svg>');
          var link = $(this).parents('a').attr('href'),
            link = link.replace('http://', '');

          $(this).parents('a').attr('href', link);
          $(this).parents('li').addClass('svg');
          $(this).remove();
        });

        //Create SVG Button
        $('.btn').each(function () {
          var svg = '<svg x="0px" y="0px" width="66px" height="46px" viewBox="0 0 66 46" style="enable-background:new 0 0 66 46;" xml:space="preserve"><g><circle class="st0 bg" cx="43.069" cy="23.133" r="22.5"></circle></g><g><path class="st0 circle" d="M42.932,45.633c-11.147,0-20.494-7.979-22.226-18.973L20.7,26.593l-0.132-5.962 C21.833,9.201,31.446,0.632,42.932,0.632c12.406,0,22.5,10.093,22.5,22.5S55.338,45.633,42.932,45.633z M21.699,26.537 c1.667,10.487,10.592,18.096,21.232,18.096c11.855,0,21.5-9.646,21.5-21.5s-9.645-21.5-21.5-21.5 c-10.976,0-20.161,8.186-21.366,19.042L21.699,26.537z"/><polygon id="Shape" class="shape st1" points="41.171,14.632 39.569,16.24 47.36,23.604 39.739,31.081 41.402,32.632 50.569,23.55 "/><rect x="0.569" y="22.632" class="st1 line" width="47" height="2"/></g></svg>';
          var text = $(this).text();
          var base = $('html').css('font-size').replace('px', '');
          var width = $(this).outerWidth() - 4.125 * base;
          var link = $(this).attr('href');
          //          $(this).append('<span>' + text + '</span>' + svg);
          //          $(this).attr('style', '--width: -' + width + 'px');

          if (width * -1 > $(this).outerWidth()) {
            var width = width / 2;
          }
          if ($(this).hasClass('right')) {
            $(this).after('<div class="row"><div class="col-auto ml-md-auto"><a class="btn right" href="' + link + '" style="--width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
            $(this).remove();
          } else {
            $(this).after('<div class="row"><div class="col-auto"><a class="btn left" href="' + link + '" style=" --width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
            $(this).remove();
          }
        });

        //TCON Hero Slider
        var tconAutoplay = 20000;
        var tconTimeleft = '';

        function tcondownloadTimer() {
          //          setInterval(function(){
          //            console.log(--timeleft);
          --tconTimeleft;
          if (tconTimeleft <= 0) {
            tconTimeleft = 20;
          }
          //          },1000);
        }

        function tconupdateTimer() {
          tconslideTimer = setInterval(tcondownloadTimer, 1000);
        }
        var tconSwiper = new Swiper('.tcon.hero-slider', {
          //                    pagination: '.swiper-pagination',
          //                    paginationClickable: true,
          //                    watchSlidesProgress: true,
          //                    watchSlidesVisibility: true,
          speed: 1000,
          autoplay: {
            delay: tconAutoplay
          },
          loop: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          autoHeight: true,
          //          autoHeight: true,
          on: {
            init: function () {
              var elem = $('.progress');

              elem.addClass('started');
              tconTimeleft = 10;
              tconupdateTimer();
            },
            transitionEnd: function () {
              var elem = $('.progress');

              elem.addClass('started');
              //              timeleft = 10;
            },
            transitionStart: function () {
              var elem = $('.progress');

              elem.removeClass('started');
              //              timeleft = 10;
            }
          }
        });

        // Global Click Functions
        $('.contact.toggle, .modal .close').click(function () {
          if ($('body').hasClass('modal-open')) {
            $('body').removeClass('modal-open');
          } else {
            $('.menu-toggle').removeClass('menu-open');
            $('.menu-toggle span.label').text('Menu');
            $('body').removeClass('menu-open');
            $('body').addClass('modal-open');
          }
          return false;
        });

        $('body').on('click', '.video-toggle .btn', function (e) {
          //        if ($('.vjs-controls-enabled').length) {
          //            $('.modal').removeClass('playing');
          //            videojs('player_html5_api').dispose();
          //            $('.modal').prepend('<video autoplay class="video-js vjs-rdv-skin" id="player"></video>');
          //
          //        }

          e.preventDefault();
          var source = $(this).attr('href');

          videojs('player', {
            controls: true,
            autoplay: true,
            preload: 'auto',
            //            poster: '' + poster + '',
            sources: [{
              src: '' + source + '',
              type: 'video/mp4'
            }]
          });
          videojs('player').play();
          setTimeout(function () {
            $('.modal.video').addClass('playing');
            $('.menu-toggle').addClass('playing').find('span.label').text('Close');
            $('body').addClass('playing');
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
              $('#player .vjs-big-play-button').trigger('click');
            }
          }, 500);
          tconSwiper.autoplay.stop();
          console.log(tconTimeleft);
          clearInterval(tconslideTimer);
          $('.progress').css('transform', 'scaleX(.' + tconTimeleft + ')');
          tconTimeleft = tconTimeleft;
          videojs('player').on('ended', function () {
            $('.modal.video').removeClass('playing');
            $('.menu-toggle').removeClass('playing');
            $('body').removeClass('playing');
            videojs('player').pause();
            tconSwiper.autoplay.start();
            $('.progress').attr('style', '');
            tconupdateTimer();
          });
          return false;
        });

        $('.toggle.search').click(function () {

          if ($('.menu-toggle').hasClass('search-open')) {

            $('.menu-toggle').find('span.label').text('Menu');
            $('body').removeClass('search-open');
            $('.menu-toggle').removeClass('menu-open search-open');

          } else {

            $('.menu-toggle').addClass('menu-open search-open');
            $('body').addClass('search-open');
            $('.menu-toggle').find('span.label').text('Close');

          }

          return false;
        });

        $('.menu-toggle').click(function () {

          if ($(this).hasClass('search-open')) {

            $('.menu-toggle').find('span.label').text('Menu');
            $('body').removeClass('search-open menu-open');
            $('.menu-toggle').removeClass('menu-open search-open');

          } else if ($(this).hasClass('playing')) {
            $('.menu-toggle').find('span.label').text('Menu');
            $('.modal.video').removeClass('playing');
            $('.menu-toggle').removeClass('playing');
            $('body').removeClass('playing');
            videojs('player').pause();
            tconSwiper.autoplay.start();
            $('.progress').attr('style', '');
            tconupdateTimer();
          } else {
            if ($('body').hasClass('menu-open')) {
              $('.menu-toggle').removeClass('menu-open');
              $('.menu-toggle').find('span.label').text('Menu');
              $('body').removeClass('menu-open');
            } else {
              $('body').removeClass('modal-open');
              $('.menu-toggle').addClass('menu-open');
              $('.menu-toggle').find('span.label').text('Close');
              $('body').addClass('menu-open');
            }
          }
          return false;
        });

        //Search Input Function

        $('.search-field input').blur(function () {
          tmpval = $(this).val();
          if (tmpval == '') {
            $(this).addClass('empty');
            $(this).removeClass('not-empty');
          } else {
            $(this).addClass('not-empty');
            $(this).removeClass('empty');
          }
        });

        $(document).on('click', '.shares a', function (e) {
          e.preventDefault();
          var poplink = $(this).attr('href');

          newwindow = window.open(poplink, 'name', 'height=800,width=1024');
          if (window.focus) {
            newwindow.focus();
          }
          return false;
        });

        $('.socials a, .social-links a, .directions').not('.shares a, a[href^="mailto:"]').click(function () {
          var poplink = $(this).attr('href');

          newwindow = window.open(poplink, 'name', 'height=1200,width=1200');
          if (window.focus) {
            newwindow.focus();
          }
          return false;
        });

        //Header Scroll Funciton

        var $document = $(document),
          $element = $('body'),
          className = 'scrolled';
        //          var headerHeight = ($('.home-hero').outerHeight() - $('header').outerHeight());

        $document.scroll(function () {
          $element.toggleClass(className, $document.scrollTop() > $(window).height());
        });

        //Scroll to Hash

        $('a[href^="#"]').click(function () {
          var target = $(this).attr('href');

          if ($(target).length) {
            $('html, body').animate({
              scrollTop: $(target).offset().top
            }, 1000);
          }
          return false;
        });

        //Share Toggle

        new ClipboardJS('.share-toggle');
        $('.share-toggle').click(function () {
          $(this).attr('aria-label', 'URL Copied!');
        });

        $(document).on('mouseleave', '.share-toggle', function () {
          $('.share-toggle').attr('aria-label', 'Click to Copy URL');
        });

        //Default Template Section Gallery

        $('.section-gallery').magnificPopup({
          type: 'image',
          removalDelay: 300,
          mainClass: 'mfp-fade',
          gallery: {
            enabled: true
          },
          image: {
            titleSrc: 'title'
          }
        });

        //WYSIWYG Lightbox
        $('.editor-lightbox, .editor figure a').magnificPopup({
          type: 'image',
          removalDelay: 300,
          mainClass: 'mfp-fade',
          gallery: {
            enabled: true
          },
          image: {
            titleSrc: 'title'
          }
        });

      }
    }, // Home page
    'page_id_5': {
      finalize: function () {

        //Subsites sliders
        var swiperCompany = new Swiper('.company-slider', {
          //                    pagination: '.swiper-pagination',
          //                    paginationClickable: true,
          //                    watchSlidesProgress: true,
          //                    watchSlidesVisibility: true,
          speed: 1000,
          autoplay: {
            delay: 10000
          },
          loop: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          on: {
            init: function () {
              var elem = $('.card');

              elem.addClass('started');
            },
            transitionEnd: function () {
              var elem = $('.card');

              setTimeout(function () {
                elem.addClass('started');
              }, 300);
            },
            transitionStart: function () {
              var elem = $('.card');

              elem.removeClass('started');
              //              elem.addClass('started');
            }
          }
        });

      }
    },
    'home': {
      finalize: function () {

        //Set up Hero Slider and Variables

        var timeleft = '';

        function downloadTimer() {
          //          setInterval(function(){
          //            console.log(--timeleft);
          --timeleft;
          if (timeleft <= 0) {
            timeleft = 10;
          }
          //          },1000);
        }

        function updateTimer() {
          slideTimer = setInterval(downloadTimer, 1000);
        }

        var swiper = new Swiper('.subsites.hero-slider', {
          //                    pagination: '.swiper-pagination',
          //                    paginationClickable: true,
          //                    watchSlidesProgress: true,
          //                    watchSlidesVisibility: true,
          speed: 1000,
          autoplay: {
            delay: 10000
          },
          loop: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          //          autoHeight: true,
          on: {
            init: function () {
              var elem = $('.progress');

              elem.addClass('started');
              timeleft = 10;
              updateTimer();
            },
            transitionEnd: function () {
              var elem = $('.progress');

              elem.addClass('started');
              //              timeleft = 10;
            },
            transitionStart: function () {
              var elem = $('.progress');

              elem.removeClass('started');
              //              timeleft = 10;
            }
          }
        });

        //Hover effect

        $(document).on('mouseenter', '.mask .swiper-slide-active .bg-image', function () {
          $('body').addClass('hover');
          swiper.autoplay.stop();
          console.log(timeleft);
          clearInterval(slideTimer);
          $('.progress').css('transform', 'scaleX(.' + timeleft + ')');
          timeleft = timeleft;
        });
        $(document).on('mouseleave', '.mask .swiper-slide-active .bg-image', function () {
          //            console.log(swiper.progress);
          $('body').removeClass('hover');
          swiper.autoplay.start();
          $('.progress').attr('style', '');
          updateTimer();
          //            console.log(timeleft);
          //            clearInterval(slideTimer);
        });

        //Case Study Slider

        var caseStudies = new Swiper('.case-slider', {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
          freeMode: true,
          mousewheel: {

            forceToAxis: true,
            invert: true

          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          breakpoints: {
            // when window width is <= 320px
            723: {
              slidesPerView: 1,
              spaceBetween: 30,
              slidesPerGroup: 1,
              freeMode: true
            },
            576: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              freeMode: false,
              spaceBetween: 0
            }
          }
          //          setWrapperSize: true
        });

      }
    },
    'single_portfolio': {
      init: function () {
        // JavaScript to be fired on the home page
      },
      finalize: function () {
        // JavaScript to be fired on the home page, after the init JS

        if ($('.project-slider').length) {

          var projects = new Swiper('.project-slider', {
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            }
            //          setWrapperSize: true
          });

        }

        if ($('.textarea').length) {

          $('.textarea p').each(function () {
            var p = $(this).html(),
              p = p.replace(/<br>/g, '</p><p>');

            p = '<p>' + p + '</p>';
            //          console.log(list);
            $(this).before(p);
            $(this).remove();
          });

        }

        //Horizontal scroll & Lightbox Functions

        var isDragging = false;

        $(function () {
          $('.gallery-popup')
            .mousedown(function () {
              $(window).mousemove(function () {
                isDragging = true;
                $(window).unbind('mousemove');
                console.log('dragging');
                $(this).off('click');
              });
            })
            .click(function () {
              var wasDragging = isDragging;

              isDragging = false;
              $(window).unbind('mousemove');
              //              alert('click');
              if (!wasDragging) {
                return false;
              }
              return false;
            });
        });
        $('.gallery-popup').magnificPopup({
          //                  items: {
          //                    src: image
          //                  },
          //                  removalDelay: 300,
          //                  mainClass: 'mfp-fade',
          //                  items: {
          //                    src: '<div class="mfp-figure"><button title="Close (Esc)" type="button" class="mfp-close">×</button><figure><img class="mfp-img" src="' + image + '" style="max-height: 986px;"><figcaption><div class="mfp-bottom-bar"><div class="mfp-title">' + title + '</div><div class="mfp-counter"></div></div></figcaption></figure></div>',
          //                  },
          //                  type: 'inline'
          type: 'image',
          removalDelay: 300,
          mainClass: 'mfp-fade',
          gallery: {
            enabled: true
          },
          image: {
            titleSrc: 'title'
            // this tells the script which attribute has your caption
          },
          disableOn: function () {
            if (isDragging) {
              return false;
            }
            return true;
          }
        });

      }
    },
    'page_template_archive_portfolio': {
      init: function () {
        // JavaScript to be fired on the home page
      },
      finalize: function () {
        // JavaScript to be fired on the home page, after the init JS
        function projectsLoader() {
          //          console.log((loaded + 9));
          $('#projects-load').after('<div class="row loader"><div class="col-auto mx-auto mt-4 mb-4"><svg width="50px"  height="50px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="var(--brand-secondary)" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(173.907 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg></div></div>');
        }

        function caseLoader() {
          //          console.log((loaded + 9));
          $('#case-ajax').before('<div class="row case-loader"><div class="col-auto mx-auto mt-5 mb-5"><svg width="50px"  height="50px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="var(--brand-secondary)" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(173.907 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg></div></div>');
        }

        function loadProjects() {
          //          projectsLoader();
          $('#projects-load').addClass('loading');
          var loaded = $('.single-card').length;

          $('#projects-load').load(location.href + ' #projects-load>*', function () {
            $('#projects-load .btn').each(function () {
              var svg = '<svg x="0px" y="0px" width="66px" height="46px" viewBox="0 0 66 46" style="enable-background:new 0 0 66 46;" xml:space="preserve"><g><circle class="st0 bg" cx="43.069" cy="23.133" r="22.5"></circle><path class="st0 circle" d="M42.932,45.633c-11.147,0-20.494-7.979-22.226-18.973L20.7,26.593l-0.132-5.962 C21.833,9.201,31.446,0.632,42.932,0.632c12.406,0,22.5,10.093,22.5,22.5S55.338,45.633,42.932,45.633z M21.699,26.537 c1.667,10.487,10.592,18.096,21.232,18.096c11.855,0,21.5-9.646,21.5-21.5s-9.645-21.5-21.5-21.5 c-10.976,0-20.161,8.186-21.366,19.042L21.699,26.537z"/><polygon id="Shape" class="shape st1" points="41.171,14.632 39.569,16.24 47.36,23.604 39.739,31.081 41.402,32.632 50.569,23.55 "/><rect x="0.569" y="22.632" class="st1 line" width="47" height="2"/></g></svg>';
              var text = $(this).text();
              var base = $('html').css('font-size').replace('px', '');
              var width = $(this).outerWidth() - 4.125 * base;
              var link = $(this).attr('href');
              //          $(this).append('<span>' + text + '</span>' + svg);
              //          $(this).attr('style', '--width: -' + width + 'px');

              if (width * -1 > $(this).outerWidth()) {
                var width = width;
              }
              if ($(this).hasClass('right')) {
                $(this).after('<div class="row"><div class="col-auto ml-md-auto"><a class="btn right" href="' + link + '" style="--width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
                $(this).remove();
              } else {
                $(this).after('<div class="row"><div class="col-auto"><a class="btn left" href="' + link + '" style=" --width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
                $(this).remove();
              }
            });
            //          $('.loader').remove();
            var updated = $('.single-card').length;

            if (loaded + 9 > updated) {
              Cookies.set('no_posts', updated, {
                expires: 1,
                path: ''
              });
              $('.loader').remove();
              $('#projects-load').removeClass('loading');
            } else {
              Cookies.set('no_posts', loaded + 9, {
                expires: 1,
                path: ''
              });
              $('.loader').remove();
              $('#projects-load').removeClass('loading');
            }
          });
        }

        function loadCases() {
          caseLoader();
          $('#case-ajax').fadeOut(500);
          Cookies.set('no_posts', 9, {
            expires: 1,
            path: ''
          });
          $('#case-ajax').load(location.href + ' #case-ajax>*', function () {
            $('#case-ajax .filterable .btn').each(function () {
              var svg = '<svg x="0px" y="0px" width="66px" height="46px" viewBox="0 0 66 46" style="enable-background:new 0 0 66 46;" xml:space="preserve"><g><circle class="st0 bg" cx="43.069" cy="23.133" r="22.5"></circle><path class="st0 circle" d="M42.932,45.633c-11.147,0-20.494-7.979-22.226-18.973L20.7,26.593l-0.132-5.962 C21.833,9.201,31.446,0.632,42.932,0.632c12.406,0,22.5,10.093,22.5,22.5S55.338,45.633,42.932,45.633z M21.699,26.537 c1.667,10.487,10.592,18.096,21.232,18.096c11.855,0,21.5-9.646,21.5-21.5s-9.645-21.5-21.5-21.5 c-10.976,0-20.161,8.186-21.366,19.042L21.699,26.537z"/><polygon id="Shape" class="shape st1" points="41.171,14.632 39.569,16.24 47.36,23.604 39.739,31.081 41.402,32.632 50.569,23.55 "/><rect x="0.569" y="22.632" class="st1 line" width="47" height="2"/></g></svg>';
              var text = $(this).text();
              var base = $('html').css('font-size').replace('px', '');
              var width = $(this).outerWidth() - 4.125 * base;
              var link = $(this).attr('href');
              //          $(this).append('<span>' + text + '</span>' + svg);
              //          $(this).attr('style', '--width: -' + width + 'px');

              if (width * -1 > $(this).outerWidth()) {
                var width = width * -1.75;

                console.log('width is neg');
              }
              if ($(this).hasClass('right')) {
                $(this).after('<div class="row"><div class="col-auto ml-md-auto"><a class="btn right" href="' + link + '" style="--width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
                $(this).remove();
              } else {
                $(this).after('<div class="row"><div class="col-auto"><a class="btn left" href="' + link + '" style=" --width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
                $(this).remove();
              }
            });
            $('#case-ajax').fadeIn(500);
            $('.case-loader').remove();
          });
        }
        //        console.log(Cookies.get('no_posts'));
        $('.load-more').click(function () {
          var loaded = $('.single-card').length;

          Cookies.set('no_posts', loaded + 9, {
            expires: 1,
            path: ''
          });
          console.log('load more projects');
          projectsLoader();
          loadProjects();
          return false;
        });
        $('body').on('click', '.load-more', function () {
          var loaded = $('.single-card').length;

          Cookies.set('no_posts', loaded + 9, {
            expires: 1,
            path: ''
          });
          console.log('load more projects');
          projectsLoader();
          loadProjects();
          return false;
        });
        $('.dropdown a').click(function (e) {
          e.stopPropagation();
          var dropdown = $('.dropdown');
          var toggle = $('.dropdown > a');
          var data = $(this).attr('data-toggle');
          var filter = $('.filterable');

          if (dropdown.hasClass('open')) {
            dropdown.removeClass('open');
            if ($(this).hasClass('current')) {} else {
              toggle.text($(this).text());
              toggle.attr($(this).attr('data-toggle'));
              if (data == 'all') {
                console.log('all');
                var href = location.href;
                var href = href.match(/([^\/]*)\/*$/)[1];
                //                $('.featured-post').slideDown(500);

                Cookies.remove('' + href + '', {
                  path: ''
                });
                //                Cookies.remove('projects');
                loadCases();
                loadProjects();
              } else {
                var href = location.href;
                var href = href.match(/([^\/]*)\/*$/)[1];

                Cookies.set('' + href + '', data, {
                  expires: 1,
                  path: ''
                });
                //                filter.not('.filterable[data-src="' + data + '"]').slideUp(500);
                //                $('.filterable[data-src="' + data + '"]').slideDown(500);
                loadCases();
                loadProjects();
              }
            }
          } else {
            dropdown.addClass('open');
          }
          return false;
        });
        $('body').click(function (e) {
          var dropdown = $('.dropdown');

          e.stopPropagation();
          if (dropdown.hasClass('open')) {
            dropdown.removeClass('open');
          }
        });

      }
    },
    'category_insights': {
      init: function () {
        // JavaScript to be fired on the home page
      },
      finalize: function () {
        // JavaScript to be fired on the home page, after the init JS
        $('.cat-item').each(function () {
          var data = $(this).find('a').attr('href');
          var data2 = data.split('/', -1);
          var anchor = $(this).find('a');

          console.log(data2[data2.length-1]);
          $(anchor).attr('data-toggle', data2[data2.length-1]);
//          $(anchor).attr('href', '#');
        });
        $('.dropdown a').click(function (e) {
          e.stopPropagation();
          var dropdown = $('.dropdown');
          var toggle = $('.dropdown > a');
          var data = $(this).attr('data-toggle');
          var filter = $('.filterable');
          var box = $('.single-card');

          if (dropdown.hasClass('open')) {
            dropdown.removeClass('open');
            if ($(this).not(toggle)) {
              toggle.text($(this).text());
              toggle.attr('data-toggle', data);
              if (data == 'all') {
                $(box).fadeIn(300);
              } else {
                $(box).fadeOut(300);
                $('.' + data).delay(350).fadeIn(300);
              }
            }
          } else {
            dropdown.addClass('open');
          }
          return false;
        });
        $('body').click(function (e) {
          var dropdown = $('.dropdown');

          e.stopPropagation();
          if (dropdown.hasClass('open')) {
            dropdown.removeClass('open');
          }
        });

      }
    },
    'single_services': {
      init: function () {
        // JavaScript to be fired on the home page
      },
      finalize: function () {
        // JavaScript to be fired on the home page, after the init JS
        function projectsLoader() {
          //          console.log((loaded + 9));
          $('#projects-load').after('<div class="row loader"><div class="col-auto mx-auto mt-4 mb-4"><svg width="50px"  height="50px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="var(--brand-secondary)" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(173.907 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg></div></div>');
        }

        function loadProjects() {
          //          projectsLoader();
          $('#projects-load').addClass('loading');
          var loaded = $('.single-card').length;

          $('#projects-load').load(location.href + ' #projects-load>*', function () {
            $('#projects-load .btn').each(function () {
              var svg = '<svg x="0px" y="0px" width="66px" height="46px" viewBox="0 0 66 46" style="enable-background:new 0 0 66 46;" xml:space="preserve"><g><circle class="st0 bg" cx="43.069" cy="23.133" r="22.5"></circle><path class="st0 circle" d="M42.932,45.633c-11.147,0-20.494-7.979-22.226-18.973L20.7,26.593l-0.132-5.962 C21.833,9.201,31.446,0.632,42.932,0.632c12.406,0,22.5,10.093,22.5,22.5S55.338,45.633,42.932,45.633z M21.699,26.537 c1.667,10.487,10.592,18.096,21.232,18.096c11.855,0,21.5-9.646,21.5-21.5s-9.645-21.5-21.5-21.5 c-10.976,0-20.161,8.186-21.366,19.042L21.699,26.537z"/><polygon id="Shape" class="shape st1" points="41.171,14.632 39.569,16.24 47.36,23.604 39.739,31.081 41.402,32.632 50.569,23.55 "/><rect x="0.569" y="22.632" class="st1 line" width="47" height="2"/></g></svg>';
              var text = $(this).text();
              var base = $('html').css('font-size').replace('px', '');
              var width = $(this).outerWidth() - 4.125 * base;
              var link = $(this).attr('href');
              //          $(this).append('<span>' + text + '</span>' + svg);
              //          $(this).attr('style', '--width: -' + width + 'px');

              if (width * -1 > $(this).outerWidth()) {
                var width = width;
              }
              if ($(this).hasClass('right')) {
                $(this).after('<div class="row"><div class="col-auto ml-md-auto"><a class="btn right" href="' + link + '" style="--width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
                $(this).remove();
              } else {
                $(this).after('<div class="row"><div class="col-auto"><a class="btn left" href="' + link + '" style=" --width: -' + width + 'px">' + text + '<span>' + text + '</span>' + svg + '</a></div></div>');
                $(this).remove();
              }
            });
            //          $('.loader').remove();
            var updated = $('.single-card').length;

            if (loaded + 9 > updated) {
              Cookies.set('no_posts', updated, {
                expires: 1,
                path: ''
              });
              $('.loader').remove();
              $('#projects-load').removeClass('loading');
            } else {
              Cookies.set('no_posts', loaded + 9, {
                expires: 1,
                path: ''
              });
              $('.loader').remove();
              $('#projects-load').removeClass('loading');
            }
          });
        }
        //        console.log(Cookies.get('no_posts'));
        $('.load-more').click(function () {
          var loaded = $('.single-card').length;

          Cookies.set('no_posts', loaded + 9, {
            expires: 1,
            path: ''
          });
          console.log('load more projects');
          projectsLoader();
          loadProjects();
          return false;
        });
      }
    },
    'single_team': {
      finalize: function () {
        // JavaScript to be fired on the about us page
        $('.headshot').hcSticky({
          stickTo: '.bio',
          stickyClass: 'sticky',
          top: $('header.floater').outerHeight(),
          responsive: {
            993: {
              disable: true
            }
          }
        });
        $('.bio-lists p').each(function () {
          var list = $(this).html(),
            list = list.replace(/<br>/g, '</li><li>'),
            list = '<li>' + list + '</li>';

          console.log(list);
          $(this).before(list);
          $(this).remove();
        });
        $('.bio-lists ul').each(function () {
          if ($($(this).children('li')).length < 6) {
            $(this).addClass('single-col');
          }
        });
      }
    },
    'page_template_archive_team': {
      finalize: function () {
        $('.cat-item').each(function () {
          var data = $(this).find('a').attr('href');
          var data = data.split('/');
          var anchor = $(this).find('a');

          console.log(data[4]);
          $(anchor).attr('data-toggle', data[4]);
          $(anchor).attr('href', '#');
        });
        $('.dropdown a').click(function (e) {
          e.stopPropagation();
          var dropdown = $('.dropdown');
          var toggle = $('.dropdown > a');
          var data = $(this).attr('data-toggle');
          var filter = $('.filterable');
          var box = $('.single-team-box');

          if (dropdown.hasClass('open')) {
            dropdown.removeClass('open');
            if ($(this).not(toggle)) {
              toggle.text($(this).text());
              toggle.attr('data-toggle', data);
              if (data == 'all') {
                $(box).fadeIn(300);
              } else {
                $(box).fadeOut(300);
                $('.' + data).delay(350).fadeIn(300);
              }
            }
          } else {
            dropdown.addClass('open');
          }
          return false;
        });
        $('body').click(function (e) {
          var dropdown = $('.dropdown');

          e.stopPropagation();
          if (dropdown.hasClass('open')) {
            dropdown.removeClass('open');
          }
        });
      }
    },
    'page_template_locations': {
      finalize: function () {

        //Input functions for Material Label+Input Styling
        $('.gform_body input').blur(function () {
          tmpval = $(this).val();
          if (tmpval == '') {
            $(this).addClass('empty');
            $(this).removeClass('not-empty');
          } else {
            $(this).addClass('not-empty');
            $(this).removeClass('empty');
          }
        });
        //Move label to after input
        $(window).load(function () {
          $('.gfield_label').not('.gfield_label_before_complex').each(function () {
            var label = $(this).html();
            var inputfor = $(this).attr('for');

            $('#' + inputfor + '').after('<label class="gfield_label below dynamic">' + label + '</label>');
          });
        });
      }
    },
    'error404': {
      finalize: function () {
        // JavaScript to be fired on the about us page
        /*
         * Lazy Line Painter - Path Object
         * Generated using 'SVG to Lazy Line Converter'
         *
         * http://lazylinepainter.info
         * Copyright 2013, Cam O'Connell
         *
         */
        var grid = {
          'grid-path': {
            'strokepath': [
              {
                'path': 'M20.5,189.5h1559.1',
                'duration': 600
              },
              {
                'path': 'M20.5,106.5h1559.1',
                'duration': 600
              },
              {
                'path': 'M20.5,242.5h1559.1',
                'duration': 600
              },
              {
                'path': 'M285.5,728.5v-707',
                'duration': 600
              },
              {
                'path': 'M338.5,728.5v-707',
                'duration': 600
              },
              {
                'path': 'M678.5,728.5v-707',
                'duration': 600
              },
              {
                'path': 'M731.5,728.5v-707',
                'duration': 600
              },
              {
                'path': 'M20.5,582.5h1559.1',
                'duration': 600
              },
              {
                'path': 'M20.5,635.5h1559.1',
                'duration': 600
              }
            ],
            'dimensions': {
              'width': 1600,
              'height': 750
            }
          }
        };
        var chisel = {
          'chisel-path': {
            'strokepath': [
              {
                'path': 'M820.5,728.5l-670-706',
                'duration': 750
              },
              {
                'path': 'M795.5,736.5l-684-717',
                'duration': 750
              },
              {
                'path': 'M795.5,736.5l-456-714',
                'duration': 750
              },
              {
                'path': 'M820.5,728.5l-449-706',
                'duration': 750
              }
            ],
            'dimensions': {
              'width': 1600,
              'height': 750
            }
          }
        };
        var circles = {
          'circles-path': {
            'strokepath': [
              {
                'path': 'M312,698c48.6,0,88-39.4,88-88s-39.4-88-88-88s-88,39.4-88,88S263.4,698,312,698z',
                'duration': 750,
                'strokeDash': '10, 10'
              },
              {
                'path': 'M701,307c48.6,0,88-39.4,88-88s-39.4-88-88-88s-88,39.4-88,88S652.4,307,701,307z',
                'duration': 750,
                'strokeDash': '10, 10'
              }
            ],
            'dimensions': {
              'width': 1600,
              'height': 750
            }
          }
        };
        var iconpath = {
          'icon-path': {
            'strokepath': [
              {
                'path': 'M512.3,242.3h166.2v267l52.9,84.3V189.5H478.9L512.3,242.3z',
                'duration': 800
              },
              {
                'path': 'M647.7,582.3H338.4v-324l-52.9-56v432.8h411.1L647.7,582.3z',
                'duration': 800
              }
            ],
            'dimensions': {
              'width': 1600,
              'height': 750
            }
          }
        };
        var text = {
          'text-path': {
            'strokepath': [
              {
                'path': 'M789.776,458.508h4.928l4.676,7.896l4.647-7.896h4.9l-7.42,12.32v7.672h-4.396v-7.784L789.776,458.508z',
                'duration': 600
              },
              {
                'path': 'M806.465,468.126c0.354-0.942,0.857-1.745,1.512-2.408c0.652-0.662,1.438-1.176,2.352-1.54  c0.914-0.363,1.941-0.546,3.08-0.546s2.17,0.183,3.094,0.546c0.924,0.364,1.713,0.878,2.366,1.54  c0.653,0.663,1.157,1.466,1.513,2.408c0.354,0.942,0.531,1.993,0.531,3.15s-0.178,2.202-0.531,3.136  c-0.355,0.934-0.859,1.731-1.513,2.394c-0.653,0.663-1.442,1.172-2.366,1.526s-1.955,0.532-3.094,0.532s-2.166-0.178-3.08-0.532  s-1.699-0.863-2.352-1.526c-0.654-0.662-1.158-1.46-1.512-2.394c-0.355-0.934-0.533-1.979-0.533-3.136  S806.109,469.068,806.465,468.126z M810.076,472.97c0.111,0.551,0.303,1.046,0.574,1.484c0.27,0.438,0.63,0.789,1.078,1.05  c0.447,0.262,1.008,0.393,1.68,0.393s1.236-0.131,1.693-0.393c0.458-0.261,0.822-0.611,1.093-1.05s0.462-0.934,0.573-1.484  c0.113-0.55,0.168-1.115,0.168-1.693c0-0.579-0.055-1.148-0.168-1.708c-0.111-0.561-0.303-1.055-0.573-1.484  c-0.271-0.429-0.635-0.779-1.093-1.05c-0.457-0.271-1.021-0.406-1.693-0.406s-1.232,0.136-1.68,0.406  c-0.448,0.271-0.809,0.621-1.078,1.05c-0.271,0.43-0.463,0.924-0.574,1.484c-0.111,0.56-0.168,1.129-0.168,1.708  C809.908,471.854,809.965,472.42,810.076,472.97z',
                'duration': 1800
              },
              {
                'path': 'M832.588,478.5v-2.016h-0.084c-0.504,0.84-1.158,1.446-1.96,1.819c-0.803,0.373-1.624,0.561-2.464,0.561  c-1.064,0-1.938-0.141-2.618-0.42c-0.682-0.28-1.218-0.677-1.61-1.19c-0.392-0.513-0.668-1.139-0.826-1.876s-0.237-1.554-0.237-2.45  v-8.903h3.976v8.176c0,1.194,0.187,2.086,0.561,2.674c0.373,0.588,1.035,0.882,1.988,0.882c1.082,0,1.865-0.322,2.352-0.966  c0.484-0.644,0.729-1.703,0.729-3.178v-7.588h3.975V478.5H832.588z',
                'duration': 800
              },
              {
                'path': 'M849.639,464.024v1.96h0.057c0.522-0.747,1.152-1.325,1.89-1.736c0.737-0.41,1.582-0.616,2.534-0.616  c0.914,0,1.75,0.178,2.506,0.532s1.33,0.979,1.723,1.876c0.429-0.635,1.012-1.194,1.75-1.68c0.736-0.485,1.609-0.729,2.617-0.729  c0.766,0,1.475,0.094,2.129,0.28c0.652,0.187,1.213,0.485,1.68,0.896c0.467,0.411,0.83,0.948,1.092,1.61  c0.262,0.663,0.393,1.461,0.393,2.394v9.688h-3.977v-8.204c0-0.485-0.02-0.942-0.057-1.372c-0.037-0.429-0.14-0.802-0.308-1.12  c-0.168-0.317-0.415-0.569-0.741-0.756c-0.328-0.187-0.771-0.28-1.33-0.28c-0.561,0-1.014,0.108-1.358,0.322  c-0.346,0.215-0.616,0.495-0.812,0.84c-0.197,0.346-0.328,0.738-0.393,1.177c-0.065,0.438-0.098,0.882-0.098,1.329v8.064h-3.977  v-8.12c0-0.429-0.01-0.854-0.027-1.273c-0.02-0.421-0.099-0.808-0.238-1.162c-0.141-0.354-0.374-0.64-0.7-0.854  c-0.327-0.214-0.808-0.322-1.442-0.322c-0.187,0-0.434,0.042-0.742,0.126c-0.308,0.084-0.606,0.243-0.896,0.477  c-0.29,0.233-0.536,0.569-0.741,1.008c-0.207,0.438-0.309,1.013-0.309,1.722v8.4h-3.977v-14.476H849.639z',
                'duration': 1800
              },
              {
                'path': 'M870.555,461.784v-3.276h3.977v3.276H870.555z M874.531,464.024V478.5h-3.977v-14.476H874.531z',
                'duration': 600
              },
              {
                'path': 'M890.645,479.564c-0.158,0.746-0.499,1.441-1.021,2.086c-0.523,0.644-1.279,1.189-2.268,1.638  c-0.99,0.448-2.315,0.672-3.977,0.672c-0.709,0-1.433-0.089-2.17-0.266c-0.737-0.178-1.41-0.453-2.016-0.826  c-0.607-0.374-1.111-0.854-1.512-1.442c-0.402-0.588-0.631-1.293-0.687-2.114h3.948c0.186,0.747,0.551,1.265,1.092,1.555  c0.541,0.289,1.166,0.434,1.876,0.434c1.12,0,1.937-0.336,2.45-1.008c0.513-0.672,0.76-1.521,0.742-2.548v-1.904h-0.057  c-0.43,0.766-1.041,1.33-1.834,1.694s-1.629,0.546-2.506,0.546c-1.083,0-2.016-0.191-2.8-0.574  c-0.784-0.382-1.429-0.905-1.933-1.567c-0.504-0.663-0.873-1.438-1.105-2.324c-0.234-0.887-0.35-1.824-0.35-2.814  c0-0.933,0.135-1.834,0.406-2.702c0.27-0.867,0.666-1.633,1.189-2.296c0.522-0.662,1.171-1.189,1.945-1.582  c0.775-0.392,1.666-0.588,2.674-0.588c0.953,0,1.788,0.178,2.507,0.532c0.718,0.354,1.32,0.952,1.806,1.792h0.057v-1.932h3.779  v13.552C890.883,478.155,890.803,478.817,890.645,479.564z M885.199,474.748c0.43-0.224,0.783-0.522,1.064-0.896  c0.279-0.373,0.489-0.798,0.629-1.273c0.141-0.477,0.211-0.976,0.211-1.498c0-0.598-0.057-1.162-0.168-1.694  c-0.112-0.532-0.299-1.003-0.561-1.414c-0.262-0.41-0.607-0.737-1.036-0.979s-0.971-0.364-1.624-0.364  c-0.56,0-1.041,0.112-1.441,0.336c-0.402,0.225-0.738,0.527-1.008,0.91c-0.271,0.383-0.467,0.821-0.588,1.316  c-0.122,0.494-0.183,1.013-0.183,1.554c0,0.522,0.052,1.041,0.153,1.554c0.104,0.514,0.281,0.976,0.533,1.386  c0.252,0.411,0.582,0.747,0.994,1.009c0.41,0.262,0.924,0.392,1.539,0.392C884.275,475.084,884.77,474.972,885.199,474.748z',
                'duration': 1800
              },
              {
                'path': 'M897.351,458.508v7.532h0.084c0.505-0.84,1.148-1.451,1.933-1.834c0.783-0.383,1.549-0.574,2.295-0.574  c1.064,0,1.938,0.145,2.619,0.435c0.681,0.289,1.218,0.69,1.609,1.203c0.393,0.514,0.668,1.14,0.826,1.877s0.238,1.554,0.238,2.449  v8.904h-3.977v-8.176c0-1.194-0.187-2.086-0.56-2.674c-0.374-0.589-1.036-0.883-1.988-0.883c-1.083,0-1.866,0.322-2.353,0.967  c-0.484,0.644-0.728,1.703-0.728,3.178v7.588h-3.976v-19.992H897.351z',
                'duration': 800
              },
              {
                'path': 'M917.23,464.024v2.659h-2.912v7.168c0,0.673,0.112,1.12,0.336,1.345c0.225,0.224,0.672,0.336,1.344,0.336  c0.225,0,0.439-0.01,0.645-0.028s0.401-0.046,0.588-0.084v3.08c-0.336,0.056-0.709,0.093-1.119,0.112  c-0.412,0.019-0.812,0.027-1.205,0.027c-0.615,0-1.199-0.042-1.75-0.126s-1.035-0.247-1.455-0.489  c-0.42-0.243-0.752-0.589-0.994-1.036c-0.243-0.448-0.364-1.036-0.364-1.765v-8.54h-2.408v-2.659h2.408v-4.341h3.976v4.341H917.23z',
                'duration': 800
              },
              {
                'path': 'M929.494,458.508v7.28h0.057c0.484-0.746,1.143-1.292,1.974-1.638c0.83-0.346,1.694-0.519,2.59-0.519  c0.728,0,1.446,0.149,2.156,0.448c0.709,0.299,1.349,0.756,1.918,1.372s1.031,1.404,1.386,2.366c0.354,0.961,0.532,2.104,0.532,3.43  s-0.178,2.469-0.532,3.43c-0.354,0.962-0.816,1.75-1.386,2.366s-1.209,1.073-1.918,1.372c-0.71,0.299-1.429,0.448-2.156,0.448  c-1.063,0-2.017-0.168-2.856-0.504s-1.475-0.905-1.903-1.708h-0.056v1.848h-3.78v-19.992H929.494z M935.935,469.512  c-0.131-0.56-0.337-1.054-0.616-1.483s-0.63-0.771-1.05-1.022c-0.421-0.252-0.929-0.378-1.526-0.378  c-0.578,0-1.082,0.126-1.512,0.378s-0.784,0.593-1.064,1.022c-0.279,0.43-0.485,0.924-0.615,1.483  c-0.131,0.561-0.196,1.148-0.196,1.765c0,0.598,0.065,1.176,0.196,1.735c0.13,0.561,0.336,1.055,0.615,1.484  c0.28,0.43,0.635,0.77,1.064,1.021s0.934,0.379,1.512,0.379c0.598,0,1.105-0.127,1.526-0.379c0.42-0.252,0.771-0.592,1.05-1.021  s0.485-0.924,0.616-1.484c0.13-0.56,0.196-1.138,0.196-1.735C936.131,470.66,936.064,470.072,935.935,469.512z',
                'duration': 1800
              },
              {
                'path': 'M946.182,475.028c0.598,0.578,1.457,0.868,2.576,0.868c0.803,0,1.494-0.201,2.072-0.603  s0.934-0.826,1.064-1.274h3.5c-0.561,1.736-1.42,2.979-2.576,3.725c-1.158,0.747-2.559,1.12-4.2,1.12  c-1.139,0-2.165-0.183-3.08-0.546c-0.915-0.364-1.689-0.883-2.324-1.555s-1.124-1.474-1.47-2.407s-0.518-1.96-0.518-3.08  c0-1.083,0.177-2.091,0.531-3.024s0.858-1.74,1.512-2.422c0.654-0.682,1.434-1.218,2.338-1.61c0.906-0.392,1.909-0.588,3.011-0.588  c1.231,0,2.306,0.238,3.22,0.714c0.914,0.477,1.666,1.116,2.254,1.918c0.588,0.803,1.013,1.718,1.274,2.744  c0.261,1.027,0.354,2.101,0.28,3.22h-10.444C945.258,473.516,945.584,474.449,946.182,475.028z M950.676,467.412  c-0.476-0.522-1.199-0.784-2.17-0.784c-0.635,0-1.162,0.107-1.582,0.322s-0.756,0.48-1.008,0.798s-0.43,0.653-0.531,1.008  c-0.104,0.354-0.164,0.672-0.183,0.952h6.468C951.483,468.7,951.152,467.935,950.676,467.412z',
                'duration': 1800
              },
              {
                'path': 'M964.214,468.476c0.056-0.933,0.289-1.708,0.7-2.323c0.41-0.616,0.933-1.11,1.567-1.484  c0.635-0.373,1.349-0.639,2.142-0.798c0.794-0.158,1.592-0.238,2.395-0.238c0.729,0,1.465,0.052,2.212,0.154  s1.429,0.304,2.044,0.602c0.616,0.299,1.12,0.714,1.512,1.246c0.393,0.532,0.588,1.237,0.588,2.114v7.532  c0,0.653,0.037,1.278,0.113,1.876c0.074,0.598,0.205,1.045,0.391,1.344h-4.031c-0.074-0.224-0.136-0.452-0.182-0.686  c-0.047-0.233-0.08-0.472-0.099-0.715c-0.635,0.654-1.382,1.111-2.239,1.372c-0.859,0.262-1.736,0.393-2.633,0.393  c-0.69,0-1.334-0.084-1.932-0.252s-1.12-0.43-1.568-0.784c-0.447-0.354-0.798-0.803-1.05-1.344  c-0.252-0.542-0.378-1.186-0.378-1.933c0-0.821,0.145-1.498,0.434-2.029c0.289-0.532,0.662-0.957,1.121-1.274  c0.457-0.317,0.979-0.556,1.567-0.714s1.181-0.284,1.778-0.378c0.597-0.094,1.185-0.168,1.764-0.225  c0.578-0.056,1.092-0.14,1.54-0.252c0.448-0.111,0.802-0.274,1.063-0.489s0.383-0.527,0.364-0.938c0-0.429-0.069-0.77-0.21-1.021  c-0.14-0.253-0.326-0.448-0.561-0.589c-0.232-0.14-0.504-0.232-0.812-0.279s-0.64-0.07-0.993-0.07c-0.785,0-1.4,0.168-1.849,0.504  s-0.71,0.896-0.784,1.68H964.214z M973.397,471.416c-0.168,0.149-0.378,0.266-0.63,0.35s-0.523,0.154-0.812,0.21  c-0.289,0.057-0.592,0.104-0.91,0.141c-0.316,0.037-0.635,0.084-0.951,0.14c-0.299,0.056-0.593,0.131-0.883,0.225  c-0.289,0.093-0.541,0.219-0.756,0.378c-0.215,0.158-0.387,0.359-0.518,0.602c-0.131,0.243-0.195,0.551-0.195,0.924  c0,0.355,0.064,0.654,0.195,0.896s0.309,0.434,0.532,0.573c0.224,0.141,0.485,0.238,0.784,0.295  c0.299,0.056,0.605,0.084,0.924,0.084c0.783,0,1.391-0.131,1.82-0.393c0.429-0.261,0.746-0.574,0.951-0.938  c0.205-0.364,0.332-0.732,0.379-1.106c0.046-0.373,0.069-0.672,0.069-0.896V471.416z',
                'duration': 1800
              },
              {
                'path': 'M990.926,458.508V478.5h-3.977v-19.992H990.926z',
                'duration': 600
              },
              {
                'path': 'M993.473,461.784v-3.276h3.977v3.276H993.473z M997.449,464.024V478.5h-3.977v-14.476H997.449z',
                'duration': 600
              },
              {
                'path': 'M1007.837,464.024v2.659h-2.912v7.168c0,0.673,0.112,1.12,0.337,1.345c0.223,0.224,0.672,0.336,1.344,0.336  c0.224,0,0.438-0.01,0.644-0.028c0.205-0.019,0.401-0.046,0.588-0.084v3.08c-0.336,0.056-0.71,0.093-1.12,0.112  c-0.41,0.019-0.812,0.027-1.203,0.027c-0.617,0-1.2-0.042-1.75-0.126c-0.551-0.084-1.037-0.247-1.457-0.489  c-0.42-0.243-0.751-0.589-0.994-1.036c-0.242-0.448-0.363-1.036-0.363-1.765v-8.54h-2.408v-2.659h2.408v-4.341h3.976v4.341H1007.837  z',
                'duration': 1000
              },
              {
                'path': 'M1016.992,464.024v2.659h-2.912v7.168c0,0.673,0.113,1.12,0.337,1.345c0.224,0.224,0.672,0.336,1.344,0.336  c0.224,0,0.438-0.01,0.644-0.028s0.402-0.046,0.588-0.084v3.08c-0.336,0.056-0.709,0.093-1.119,0.112  c-0.411,0.019-0.812,0.027-1.204,0.027c-0.616,0-1.2-0.042-1.75-0.126c-0.551-0.084-1.036-0.247-1.456-0.489  c-0.42-0.243-0.752-0.589-0.994-1.036c-0.242-0.448-0.363-1.036-0.363-1.765v-8.54h-2.408v-2.659h2.408v-4.341h3.975v4.341H1016.992  z',
                'duration': 800
              },
              {
                'path': 'M1022.285,458.508V478.5h-3.977v-19.992H1022.285z',
                'duration': 600
              },
              {
                'path': 'M1028.977,475.028c0.598,0.578,1.456,0.868,2.576,0.868c0.803,0,1.493-0.201,2.072-0.603  c0.578-0.401,0.933-0.826,1.063-1.274h3.5c-0.56,1.736-1.419,2.979-2.576,3.725c-1.157,0.747-2.558,1.12-4.2,1.12  c-1.139,0-2.165-0.183-3.08-0.546c-0.914-0.364-1.689-0.883-2.324-1.555s-1.124-1.474-1.469-2.407  c-0.346-0.934-0.519-1.96-0.519-3.08c0-1.083,0.177-2.091,0.532-3.024c0.354-0.934,0.857-1.74,1.512-2.422  c0.653-0.682,1.433-1.218,2.338-1.61c0.905-0.392,1.908-0.588,3.01-0.588c1.232,0,2.306,0.238,3.221,0.714  c0.914,0.477,1.666,1.116,2.254,1.918c0.588,0.803,1.012,1.718,1.273,2.744c0.262,1.027,0.354,2.101,0.28,3.22h-10.444  C1028.053,473.516,1028.379,474.449,1028.977,475.028z M1033.471,467.412c-0.477-0.522-1.199-0.784-2.17-0.784  c-0.635,0-1.162,0.107-1.582,0.322s-0.756,0.48-1.008,0.798s-0.43,0.653-0.532,1.008s-0.164,0.672-0.183,0.952h6.469  C1034.277,468.7,1033.946,467.935,1033.471,467.412z',
                'duration': 1800
              },
              {
                'path': 'M1051.264,458.508V478.5h-3.976v-19.992H1051.264z',
                'duration': 600
              },
              {
                'path': 'M1053.784,468.126c0.354-0.942,0.858-1.745,1.512-2.408c0.653-0.662,1.438-1.176,2.353-1.54  c0.914-0.363,1.941-0.546,3.08-0.546c1.138,0,2.17,0.183,3.094,0.546c0.924,0.364,1.712,0.878,2.365,1.54  c0.654,0.663,1.158,1.466,1.513,2.408s0.532,1.993,0.532,3.15s-0.178,2.202-0.532,3.136s-0.858,1.731-1.513,2.394  c-0.653,0.663-1.441,1.172-2.365,1.526s-1.956,0.532-3.094,0.532c-1.139,0-2.166-0.178-3.08-0.532  c-0.915-0.354-1.699-0.863-2.353-1.526c-0.653-0.662-1.157-1.46-1.512-2.394s-0.532-1.979-0.532-3.136  S1053.43,469.068,1053.784,468.126z M1057.396,472.97c0.111,0.551,0.303,1.046,0.574,1.484c0.27,0.438,0.629,0.789,1.077,1.05  c0.448,0.262,1.009,0.393,1.681,0.393s1.236-0.131,1.693-0.393c0.457-0.261,0.821-0.611,1.092-1.05s0.463-0.934,0.574-1.484  c0.112-0.55,0.168-1.115,0.168-1.693c0-0.579-0.056-1.148-0.168-1.708c-0.111-0.561-0.304-1.055-0.574-1.484  c-0.271-0.429-0.635-0.779-1.092-1.05s-1.021-0.406-1.693-0.406s-1.232,0.136-1.681,0.406s-0.808,0.621-1.077,1.05  c-0.271,0.43-0.463,0.924-0.574,1.484c-0.112,0.56-0.168,1.129-0.168,1.708C1057.229,471.854,1057.284,472.42,1057.396,472.97z',
                'duration': 1800
              },
              {
                'path': 'M1073.453,474.902c0.178,0.308,0.406,0.56,0.687,0.756c0.28,0.195,0.603,0.341,0.966,0.434  c0.364,0.094,0.742,0.141,1.135,0.141c0.279,0,0.573-0.033,0.881-0.099c0.309-0.065,0.588-0.168,0.841-0.308  c0.252-0.141,0.462-0.326,0.63-0.561c0.168-0.232,0.252-0.526,0.252-0.882c0-0.597-0.396-1.045-1.189-1.344  c-0.795-0.299-1.9-0.598-3.318-0.896c-0.579-0.13-1.145-0.284-1.694-0.462c-0.551-0.177-1.04-0.41-1.47-0.699  c-0.43-0.29-0.775-0.653-1.036-1.093c-0.262-0.438-0.392-0.975-0.392-1.609c0-0.934,0.182-1.698,0.545-2.296  c0.365-0.598,0.846-1.068,1.443-1.414c0.597-0.346,1.269-0.588,2.016-0.729c0.746-0.14,1.512-0.21,2.296-0.21  s1.544,0.075,2.282,0.225c0.736,0.149,1.395,0.401,1.974,0.756c0.578,0.354,1.06,0.826,1.442,1.414  c0.382,0.588,0.611,1.33,0.686,2.226h-3.78c-0.056-0.766-0.345-1.283-0.868-1.554c-0.522-0.271-1.139-0.406-1.848-0.406  c-0.225,0-0.467,0.014-0.729,0.042s-0.499,0.089-0.713,0.182c-0.215,0.094-0.397,0.229-0.547,0.406  c-0.149,0.178-0.224,0.416-0.224,0.714c0,0.355,0.13,0.645,0.392,0.868s0.603,0.406,1.022,0.546c0.42,0.141,0.9,0.267,1.442,0.378  c0.541,0.112,1.092,0.234,1.651,0.364c0.579,0.131,1.144,0.29,1.694,0.476c0.551,0.188,1.04,0.435,1.47,0.742  c0.429,0.309,0.774,0.691,1.036,1.148s0.393,1.021,0.393,1.693c0,0.952-0.192,1.75-0.574,2.395  c-0.383,0.644-0.883,1.162-1.498,1.554c-0.616,0.393-1.321,0.668-2.114,0.826c-0.794,0.158-1.601,0.238-2.422,0.238  c-0.841,0-1.661-0.084-2.464-0.252s-1.518-0.448-2.143-0.84c-0.625-0.393-1.139-0.91-1.539-1.555  c-0.402-0.644-0.621-1.451-0.658-2.422h3.779C1073.188,474.226,1073.275,474.594,1073.453,474.902z',
                'duration': 1800
              },
              {
                'path': 'M1092.396,464.024v2.659h-2.912v7.168c0,0.673,0.112,1.12,0.337,1.345c0.223,0.224,0.672,0.336,1.344,0.336  c0.224,0,0.438-0.01,0.644-0.028c0.205-0.019,0.401-0.046,0.588-0.084v3.08c-0.336,0.056-0.71,0.093-1.12,0.112  c-0.41,0.019-0.812,0.027-1.203,0.027c-0.617,0-1.2-0.042-1.75-0.126c-0.551-0.084-1.037-0.247-1.457-0.489  c-0.42-0.243-0.751-0.589-0.994-1.036c-0.242-0.448-0.363-1.036-0.363-1.765v-8.54h-2.408v-2.659h2.408v-4.341h3.976v4.341H1092.396  z',
                'duration': 1000
              },
              {
                'path': 'M1098.191,474.188v4.312c0,0.635-0.117,1.218-0.351,1.75s-0.546,0.994-0.938,1.386  c-0.392,0.393-0.854,0.714-1.385,0.966c-0.533,0.252-1.098,0.425-1.695,0.519v-2.017c0.281-0.056,0.547-0.168,0.799-0.336  s0.471-0.368,0.658-0.602c0.186-0.233,0.326-0.495,0.42-0.784c0.093-0.289,0.13-0.583,0.111-0.882h-2.016v-4.312H1098.191z',
                'duration': 600
              },
              {
                'path': 'M1115.719,464.024v2.659h-2.912v7.168c0,0.673,0.113,1.12,0.337,1.345c0.224,0.224,0.672,0.336,1.344,0.336  c0.224,0,0.438-0.01,0.644-0.028s0.402-0.046,0.588-0.084v3.08c-0.336,0.056-0.709,0.093-1.119,0.112  c-0.411,0.019-0.812,0.027-1.204,0.027c-0.616,0-1.2-0.042-1.75-0.126c-0.551-0.084-1.036-0.247-1.456-0.489  c-0.42-0.243-0.752-0.589-0.994-1.036c-0.242-0.448-0.363-1.036-0.363-1.765v-8.54h-2.408v-2.659h2.408v-4.341h3.975v4.341H1115.719  z',
                'duration': 800
              },
              {
                'path': 'M1120.703,464.024v2.688h0.057c0.186-0.448,0.438-0.863,0.756-1.246c0.316-0.382,0.681-0.709,1.092-0.979  c0.41-0.271,0.85-0.48,1.316-0.63c0.466-0.149,0.951-0.225,1.455-0.225c0.262,0,0.551,0.047,0.868,0.141v3.695  c-0.187-0.037-0.411-0.069-0.672-0.098c-0.262-0.028-0.514-0.042-0.756-0.042c-0.728,0-1.345,0.121-1.849,0.364  c-0.504,0.242-0.91,0.573-1.218,0.993c-0.308,0.421-0.527,0.91-0.657,1.471c-0.131,0.56-0.197,1.167-0.197,1.819v6.524h-3.975  v-14.476H1120.703z',
                'duration': 1000
              },
              {
                'path': 'M1132.463,482.812c-0.766,0.505-1.83,0.757-3.192,0.757c-0.411,0-0.817-0.015-1.218-0.042  c-0.402-0.028-0.808-0.062-1.219-0.099v-3.275c0.373,0.037,0.756,0.074,1.148,0.111s0.784,0.047,1.176,0.028  c0.523-0.056,0.91-0.262,1.162-0.616s0.379-0.747,0.379-1.176c0-0.317-0.057-0.616-0.168-0.896l-5.068-13.579h4.228l3.276,9.911  h0.056l3.164-9.911h4.116l-6.049,16.268C1133.824,481.468,1133.228,482.308,1132.463,482.812z',
                'duration': 800
              },
              {
                'path': 'M1161.709,479.564c-0.159,0.746-0.5,1.441-1.022,2.086c-0.522,0.644-1.278,1.189-2.269,1.638  c-0.989,0.448-2.314,0.672-3.976,0.672c-0.71,0-1.433-0.089-2.17-0.266c-0.737-0.178-1.409-0.453-2.017-0.826  c-0.605-0.374-1.11-0.854-1.512-1.442s-0.629-1.293-0.686-2.114h3.947c0.188,0.747,0.551,1.265,1.093,1.555  c0.541,0.289,1.167,0.434,1.876,0.434c1.12,0,1.937-0.336,2.449-1.008c0.514-0.672,0.762-1.521,0.742-2.548v-1.904h-0.056  c-0.429,0.766-1.04,1.33-1.834,1.694s-1.628,0.546-2.506,0.546c-1.083,0-2.017-0.191-2.8-0.574  c-0.784-0.382-1.428-0.905-1.932-1.567c-0.504-0.663-0.873-1.438-1.106-2.324s-0.351-1.824-0.351-2.814  c0-0.933,0.136-1.834,0.406-2.702c0.271-0.867,0.668-1.633,1.19-2.296c0.522-0.662,1.171-1.189,1.946-1.582  c0.773-0.392,1.666-0.588,2.674-0.588c0.951,0,1.787,0.178,2.506,0.532s1.32,0.952,1.806,1.792h0.056v-1.932h3.781v13.552  C1161.947,478.155,1161.867,478.817,1161.709,479.564z M1156.263,474.748c0.429-0.224,0.784-0.522,1.063-0.896  c0.28-0.373,0.49-0.798,0.631-1.273c0.14-0.477,0.209-0.976,0.209-1.498c0-0.598-0.056-1.162-0.168-1.694  c-0.111-0.532-0.299-1.003-0.56-1.414c-0.262-0.41-0.606-0.737-1.036-0.979s-0.971-0.364-1.624-0.364  c-0.56,0-1.04,0.112-1.442,0.336c-0.4,0.225-0.736,0.527-1.008,0.91c-0.271,0.383-0.467,0.821-0.588,1.316  c-0.121,0.494-0.182,1.013-0.182,1.554c0,0.522,0.051,1.041,0.154,1.554c0.102,0.514,0.279,0.976,0.531,1.386  c0.252,0.411,0.584,0.747,0.994,1.009s0.924,0.392,1.54,0.392C1155.338,475.084,1155.833,474.972,1156.263,474.748z',
                'duration': 1800
              },
              {
                'path': 'M1164.522,468.126c0.354-0.942,0.858-1.745,1.512-2.408c0.653-0.662,1.438-1.176,2.353-1.54  c0.914-0.363,1.941-0.546,3.08-0.546c1.138,0,2.17,0.183,3.094,0.546c0.924,0.364,1.712,0.878,2.365,1.54  c0.654,0.663,1.158,1.466,1.513,2.408s0.532,1.993,0.532,3.15s-0.178,2.202-0.532,3.136s-0.858,1.731-1.513,2.394  c-0.653,0.663-1.441,1.172-2.365,1.526s-1.956,0.532-3.094,0.532c-1.139,0-2.166-0.178-3.08-0.532  c-0.915-0.354-1.699-0.863-2.353-1.526c-0.653-0.662-1.157-1.46-1.512-2.394s-0.532-1.979-0.532-3.136  S1164.168,469.068,1164.522,468.126z M1168.135,472.97c0.111,0.551,0.303,1.046,0.574,1.484c0.27,0.438,0.629,0.789,1.077,1.05  c0.448,0.262,1.009,0.393,1.681,0.393s1.236-0.131,1.693-0.393c0.457-0.261,0.821-0.611,1.092-1.05s0.463-0.934,0.574-1.484  c0.112-0.55,0.168-1.115,0.168-1.693c0-0.579-0.056-1.148-0.168-1.708c-0.111-0.561-0.304-1.055-0.574-1.484  c-0.271-0.429-0.635-0.779-1.092-1.05s-1.021-0.406-1.693-0.406s-1.232,0.136-1.681,0.406s-0.808,0.621-1.077,1.05  c-0.271,0.43-0.463,0.924-0.574,1.484c-0.112,0.56-0.168,1.129-0.168,1.708C1167.967,471.854,1168.022,472.42,1168.135,472.97z',
                'duration': 1800
              },
              {
                'path': 'M1180.958,461.784v-3.276h3.976v3.276H1180.958z M1184.934,464.024V478.5h-3.976v-14.476H1184.934z',
                'duration': 600
              },
              {
                'path': 'M1191.15,464.024v2.016h0.084c0.504-0.84,1.156-1.451,1.959-1.834s1.625-0.574,2.465-0.574  c1.063,0,1.936,0.145,2.617,0.435c0.682,0.289,1.219,0.69,1.61,1.203c0.392,0.514,0.667,1.14,0.826,1.877  c0.158,0.737,0.237,1.554,0.237,2.449v8.904h-3.975v-8.176c0-1.194-0.188-2.086-0.561-2.674c-0.373-0.589-1.036-0.883-1.988-0.883  c-1.082,0-1.867,0.322-2.352,0.967c-0.486,0.644-0.729,1.703-0.729,3.178v7.588h-3.976v-14.476H1191.15z',
                'duration': 800
              },
              {
                'path': 'M1216.951,479.564c-0.158,0.746-0.499,1.441-1.021,2.086c-0.523,0.644-1.279,1.189-2.268,1.638  c-0.99,0.448-2.315,0.672-3.977,0.672c-0.709,0-1.433-0.089-2.17-0.266c-0.737-0.178-1.41-0.453-2.016-0.826  c-0.607-0.374-1.111-0.854-1.512-1.442c-0.402-0.588-0.631-1.293-0.687-2.114h3.948c0.186,0.747,0.551,1.265,1.092,1.555  c0.541,0.289,1.166,0.434,1.876,0.434c1.12,0,1.937-0.336,2.45-1.008c0.513-0.672,0.76-1.521,0.742-2.548v-1.904h-0.057  c-0.43,0.766-1.041,1.33-1.834,1.694s-1.629,0.546-2.506,0.546c-1.083,0-2.016-0.191-2.8-0.574  c-0.784-0.382-1.429-0.905-1.933-1.567c-0.504-0.663-0.873-1.438-1.105-2.324c-0.234-0.887-0.35-1.824-0.35-2.814  c0-0.933,0.135-1.834,0.406-2.702c0.27-0.867,0.666-1.633,1.189-2.296c0.522-0.662,1.171-1.189,1.945-1.582  c0.775-0.392,1.666-0.588,2.674-0.588c0.953,0,1.788,0.178,2.507,0.532c0.718,0.354,1.32,0.952,1.806,1.792h0.057v-1.932h3.779  v13.552C1217.189,478.155,1217.109,478.817,1216.951,479.564z M1211.506,474.748c0.43-0.224,0.783-0.522,1.064-0.896  c0.279-0.373,0.489-0.798,0.629-1.273c0.141-0.477,0.211-0.976,0.211-1.498c0-0.598-0.057-1.162-0.168-1.694  c-0.112-0.532-0.299-1.003-0.561-1.414c-0.262-0.41-0.607-0.737-1.036-0.979s-0.971-0.364-1.624-0.364  c-0.56,0-1.041,0.112-1.441,0.336c-0.402,0.225-0.738,0.527-1.008,0.91c-0.271,0.383-0.467,0.821-0.588,1.316  c-0.122,0.494-0.183,1.013-0.183,1.554c0,0.522,0.052,1.041,0.153,1.554c0.104,0.514,0.281,0.976,0.533,1.386  c0.252,0.411,0.582,0.747,0.994,1.009c0.41,0.262,0.924,0.392,1.539,0.392C1210.582,475.084,1211.076,474.972,1211.506,474.748z',
                'duration': 1800
              },
              {
                'path': 'M1230.741,458.508v7.532h0.084c0.505-0.84,1.148-1.451,1.933-1.834c0.783-0.383,1.549-0.574,2.295-0.574  c1.064,0,1.938,0.145,2.619,0.435c0.681,0.289,1.218,0.69,1.609,1.203c0.393,0.514,0.668,1.14,0.826,1.877s0.238,1.554,0.238,2.449  v8.904h-3.977v-8.176c0-1.194-0.187-2.086-0.56-2.674c-0.374-0.589-1.036-0.883-1.988-0.883c-1.083,0-1.866,0.322-2.353,0.967  c-0.484,0.644-0.728,1.703-0.728,3.178v7.588h-3.976v-19.992H1230.741z',
                'duration': 800
              },
              {
                'path': 'M1242.754,468.126c0.354-0.942,0.857-1.745,1.512-2.408c0.652-0.662,1.438-1.176,2.352-1.54  c0.914-0.363,1.941-0.546,3.08-0.546s2.17,0.183,3.094,0.546c0.924,0.364,1.713,0.878,2.366,1.54  c0.653,0.663,1.157,1.466,1.513,2.408c0.354,0.942,0.531,1.993,0.531,3.15s-0.178,2.202-0.531,3.136  c-0.355,0.934-0.859,1.731-1.513,2.394c-0.653,0.663-1.442,1.172-2.366,1.526s-1.955,0.532-3.094,0.532s-2.166-0.178-3.08-0.532  s-1.699-0.863-2.352-1.526c-0.654-0.662-1.158-1.46-1.512-2.394c-0.355-0.934-0.533-1.979-0.533-3.136  S1242.398,469.068,1242.754,468.126z M1246.365,472.97c0.111,0.551,0.303,1.046,0.574,1.484c0.27,0.438,0.63,0.789,1.078,1.05  c0.447,0.262,1.008,0.393,1.68,0.393s1.236-0.131,1.693-0.393c0.458-0.261,0.822-0.611,1.093-1.05s0.462-0.934,0.573-1.484  c0.113-0.55,0.168-1.115,0.168-1.693c0-0.579-0.055-1.148-0.168-1.708c-0.111-0.561-0.303-1.055-0.573-1.484  c-0.271-0.429-0.635-0.779-1.093-1.05c-0.457-0.271-1.021-0.406-1.693-0.406s-1.232,0.136-1.68,0.406  c-0.448,0.271-0.809,0.621-1.078,1.05c-0.271,0.43-0.463,0.924-0.574,1.484c-0.111,0.56-0.168,1.129-0.168,1.708  C1246.197,471.854,1246.254,472.42,1246.365,472.97z',
                'duration': 1800
              },
              {
                'path': 'M1262.941,464.024v1.96h0.056c0.522-0.747,1.152-1.325,1.89-1.736c0.737-0.41,1.582-0.616,2.534-0.616  c0.915,0,1.75,0.178,2.506,0.532c0.757,0.354,1.33,0.979,1.722,1.876c0.43-0.635,1.013-1.194,1.75-1.68  c0.738-0.485,1.61-0.729,2.619-0.729c0.765,0,1.474,0.094,2.127,0.28c0.654,0.187,1.213,0.485,1.68,0.896  c0.467,0.411,0.831,0.948,1.093,1.61c0.261,0.663,0.392,1.461,0.392,2.394v9.688h-3.976v-8.204c0-0.485-0.019-0.942-0.056-1.372  c-0.038-0.429-0.141-0.802-0.309-1.12c-0.168-0.317-0.416-0.569-0.742-0.756s-0.77-0.28-1.33-0.28c-0.56,0-1.012,0.108-1.357,0.322  c-0.346,0.215-0.616,0.495-0.812,0.84c-0.195,0.346-0.326,0.738-0.392,1.177s-0.099,0.882-0.099,1.329v8.064h-3.976v-8.12  c0-0.429-0.009-0.854-0.028-1.273c-0.018-0.421-0.098-0.808-0.237-1.162s-0.374-0.64-0.7-0.854  c-0.326-0.214-0.808-0.322-1.441-0.322c-0.188,0-0.435,0.042-0.742,0.126c-0.309,0.084-0.607,0.243-0.896,0.477  s-0.537,0.569-0.742,1.008s-0.308,1.013-0.308,1.722v8.4h-3.976v-14.476H1262.941z',
                'duration': 1800
              },
              {
                'path': 'M1288,475.028c0.598,0.578,1.457,0.868,2.576,0.868c0.803,0,1.494-0.201,2.072-0.603  s0.934-0.826,1.064-1.274h3.5c-0.561,1.736-1.42,2.979-2.576,3.725c-1.158,0.747-2.559,1.12-4.2,1.12  c-1.139,0-2.165-0.183-3.08-0.546c-0.915-0.364-1.689-0.883-2.324-1.555s-1.124-1.474-1.47-2.407s-0.518-1.96-0.518-3.08  c0-1.083,0.177-2.091,0.531-3.024s0.858-1.74,1.512-2.422c0.654-0.682,1.434-1.218,2.338-1.61c0.906-0.392,1.909-0.588,3.011-0.588  c1.231,0,2.306,0.238,3.22,0.714c0.914,0.477,1.666,1.116,2.254,1.918c0.588,0.803,1.013,1.718,1.274,2.744  c0.261,1.027,0.354,2.101,0.28,3.22h-10.444C1287.076,473.516,1287.402,474.449,1288,475.028z M1292.494,467.412  c-0.476-0.522-1.199-0.784-2.17-0.784c-0.635,0-1.162,0.107-1.582,0.322s-0.756,0.48-1.008,0.798s-0.43,0.653-0.531,1.008  c-0.104,0.354-0.164,0.672-0.183,0.952h6.468C1293.302,468.7,1292.971,467.935,1292.494,467.412z',
                'duration': 1800
              },
              {
                'path': 'M1303.681,474.188v4.312h-4.396v-4.312H1303.681z',
                'duration': 600
              },
              {
                'path': 'M792.304,401.672v-18.72L836.08,324.2h18.288v60.624h13.392v16.848h-13.392V425h-19.44v-23.328H792.304z   M834.496,349.832l-26.064,34.992h26.496v-34.992H834.496z',
                'duration': 600
              },
              {
                'path': 'M873.16,349.472c1.967-6.671,4.631-12.023,7.992-16.056c3.359-4.032,7.271-6.912,11.736-8.64  c4.463-1.729,9.19-2.593,14.184-2.593c5.087,0,9.863,0.864,14.328,2.593c4.464,1.728,8.398,4.607,11.808,8.64  c3.407,4.032,6.095,9.385,8.063,16.056c1.967,6.674,2.953,14.904,2.953,24.696c0,10.08-0.986,18.504-2.953,25.272  c-1.969,6.768-4.656,12.168-8.063,16.199c-3.409,4.032-7.344,6.912-11.808,8.641c-4.465,1.728-9.241,2.592-14.328,2.592  c-4.993,0-9.721-0.864-14.184-2.592c-4.465-1.729-8.377-4.608-11.736-8.641c-3.361-4.031-6.025-9.432-7.992-16.199  c-1.969-6.769-2.952-15.192-2.952-25.272C870.208,364.376,871.191,356.146,873.16,349.472z M890.943,384.608  c0.191,4.081,0.793,8.017,1.801,11.808c1.008,3.794,2.614,7.033,4.824,9.72c2.207,2.689,5.375,4.032,9.504,4.032  c4.223,0,7.463-1.343,9.72-4.032c2.255-2.687,3.888-5.926,4.896-9.72c1.009-3.791,1.607-7.727,1.801-11.808  c0.191-4.08,0.287-7.561,0.287-10.44c0-1.728-0.023-3.816-0.071-6.264c-0.05-2.448-0.241-4.969-0.576-7.561  c-0.337-2.592-0.816-5.159-1.44-7.704c-0.625-2.542-1.561-4.823-2.808-6.84c-1.249-2.016-2.833-3.647-4.752-4.896  c-1.921-1.247-4.272-1.872-7.056-1.872c-2.785,0-5.112,0.625-6.984,1.872c-1.871,1.248-3.408,2.88-4.607,4.896  c-1.201,2.017-2.138,4.298-2.809,6.84c-0.672,2.545-1.152,5.112-1.439,7.704c-0.289,2.592-0.457,5.112-0.504,7.561  c-0.05,2.447-0.072,4.536-0.072,6.264C890.656,377.048,890.75,380.528,890.943,384.608z',
                'duration': 1800
              },
              {
                'path': 'M946.672,401.672v-18.72l43.776-58.752h18.288v60.624h13.392v16.848h-13.392V425h-19.439v-23.328H946.672z   M988.864,349.832l-26.063,34.992h26.496v-34.992H988.864z',
                'duration': 600
              },
              {
                'path': 'M1052.8,402.824V425h-22.608v-22.176H1052.8z',
                'duration': 600
              }
            ],
            'dimensions': {
              'width': 1600,
              'height': 750
            }
          }
        };

        $('#grid-path').lazylinepainter({
          'svgData': grid,
          'strokeWidth': 1,
          'strokeColor': '#ffffff',
          'onComplete': function () {
            $('#icon-path').lazylinepainter('paint');
            $('#grid-path').animate({
              opacity: 0.25
            });
          },
          'drawSequential': false
          //             'reverse': true
        });
        $('#chisel-path').lazylinepainter({
          'svgData': chisel,
          'strokeWidth': 1,
          'strokeColor': '#ffffff',
          //          "drawSequential": false,
          'reverse': true,
          'onComplete': function () {
            //            $('#chisel-fill').fadeIn(500);
            $('#chisel-fill').animate({
              opacity: 1
            });
            $('#text-path').lazylinepainter('paint');
            $('#chisel-path').animate({
              opacity: 0.25
            });
          }
        });
        $('#circles-path').lazylinepainter({
          'svgData': circles,
          'strokeWidth': 1,
          'strokeColor': '#ffffff'
          //          "drawSequential": false,
          //          'delay': 2500
          //             'reverse': true
        });
        $('#text-path').lazylinepainter({
          'svgData': text,
          'strokeWidth': 0.5,
          'strokeColor': '#ffffff',
          'drawSequential': false,
          'onComplete': function () {
            //            $('#text-path').fadeOut(300);
            $('#text-path').animate({
              opacity: 0
            });
            //            $('#text-fill').fadeIn(300);
            $('#text-fill').animate({
              opacity: 1
            });
            $('#shapes').animate({
              opacity: 1
            });
            //            $('#shapes').fadeIn(300);
          }
          //             'delay': 2500
          //             'reverse': true
        });
        $('#icon-path').lazylinepainter({
          'svgData': iconpath,
          'strokeWidth': 1,
          'strokeColor': '#ffffff',
          //          "drawSequential": false,
          //          'delay': 2100,
          'onComplete': function () {
            //            $('#icon-fill').fadeIn(300);
            $('#icon-fill').animate({
              opacity: 1
            });
            $('#circles-path').lazylinepainter('paint');
            $('#chisel-path').lazylinepainter('paint');
          }
          //             'reverse': true
        });
        $(window).load(function () {
          $('#grid-path').lazylinepainter('paint');
        });
        $('.banner').click(function () {
          window.location = '/';
          return false;
        });
      }
    },
    'page_template_archive_services': {
      finalize: function () {
        //        var $document = $(document),
        //          $element = $('body'),
        //          className = 'scrolled';
        //        var hasReachedprocess;
        //        var hasReachedg1;
        //        var hasReachedg2;
        //        var hasReachedg3;
        //        var hasReachedg4;
        //        var complete;
        //        var g1height;
        //        var scroll;
        //        var processHeight = $('.process-wrapper').offset().top;
        //        var processStages = $('.process-wrapper').outerHeight();
        //
        //        //          var headerHeight = ($('.home-hero').outerHeight() - $('header').outerHeight());
        //        $document.scroll(function () {
        //          //          var scroll = $('.process').offset().top;
        //          if ($document.scrollTop() > processHeight) {
        //            if (hasReachedprocess != true) {
        //              $('#grid-path').lazylinepainter('paint');
        //              hasReachedprocess = true;
        //            }
        //          }
        //          //          scroll -= $document.scrollTop();
        //          var g1steps;
        //          var percent;
        //          var stage;
        //          var less = ($('.floater').outerHeight() + $('.banner').outerHeight() + $('.nfusion-sectors').outerHeight())
        //          if ($document.scrollTop() > (processHeight + ((processStages * .9) * .2))) {
        //            if (hasReachedg1 != true) {
        //              console.log(scroll);
        //              $('#nfusion-chemistry-g1').lazylinepainter('paint');
        //              hasReachedg1 = true;
        //            }
        //          }
        //          if ($document.scrollTop() > (processHeight + ((processStages * .9) * .4))) {
        //            if (hasReachedg2 != true) {
        //              $('#nfusion-chemistry-g2').lazylinepainter('paint');
        //              hasReachedg2 = true;
        //              console.log('reached g4');
        //            }
        //          }
        //          if ($document.scrollTop() > (processHeight + ((processStages * .9) * .6))) {
        //            if (hasReachedg3 != true) {
        //              $('#nfusion-chemistry-g3').lazylinepainter('paint');
        //              hasReachedg3 = true;
        //              console.log('reached g3');
        //            }
        //          }
        //          if ($document.scrollTop() > (processHeight + ((processStages * .9) * .8))) {
        //            if (hasReachedg4 != true) {
        //              $('#nfusion-chemistry-g4').lazylinepainter('paint');
        //              hasReachedg4 = true;
        //              console.log('reached g4');
        //
        //            }
        //          }
        //          if ($document.scrollTop() > (processHeight + ((processStages * 1) * 1))) {
        //            if (complete != true) {
        //              $('.process-wrapper').addClass('complete');
        //              complete = true;
        ////              console.log('reached g4');
        //
        //            }
        //          }
        //        });
        //
        //        var grid = {
        //          "grid-path": {
        //            "strokepath": [
        //              {
        //                "path": "M20.5,189.5h1559.1",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M20.5,106.5h1559.1",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M20.5,242.5h1559.1",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M285.5,728.5v-707",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M338.5,728.5v-707",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M678.5,728.5v-707",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M731.5,728.5v-707",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M20.5,582.5h1559.1",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M20.5,635.5h1559.1",
        //                "duration": 600
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var chisel = {
        //          "chisel-path": {
        //            "strokepath": [
        //              {
        //                "path": "M820.5,728.5l-670-706",
        //                "duration": 750
        //                    },
        //              {
        //                "path": "M795.5,736.5l-684-717",
        //                "duration": 750
        //                    },
        //              {
        //                "path": "M795.5,736.5l-456-714",
        //                "duration": 750
        //                    },
        //              {
        //                "path": "M820.5,728.5l-449-706",
        //                "duration": 750
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var circles = {
        //          "circles-path": {
        //            "strokepath": [
        //              {
        //                "path": "M312,698c48.6,0,88-39.4,88-88s-39.4-88-88-88s-88,39.4-88,88S263.4,698,312,698z",
        //                "duration": 750,
        //                'strokeDash': '10, 10',
        //                    },
        //              {
        //                "path": "M701,307c48.6,0,88-39.4,88-88s-39.4-88-88-88s-88,39.4-88,88S652.4,307,701,307z",
        //                "duration": 750,
        //                'strokeDash': '10, 10',
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var iconpath = {
        //          "icon-path": {
        //            "strokepath": [
        //              {
        //                "path": "M512.3,242.3h166.2v267l52.9,84.3V189.5H478.9L512.3,242.3z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M647.7,582.3H338.4v-324l-52.9-56v432.8h411.1L647.7,582.3z",
        //                "duration": 800
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var g1 = {
        //          "nfusion-chemistry-g1": {
        //            "strokepath": [
        //              {
        //                "path": "M434.6,153.9l3.4-6.7l-0.8-0.4l-6,11.6l11.1-6.9l-0.6-0.8l-6.4,4l40.9-44.7h89.5v-1h-89.9L434.6,153.9z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M908.292,111.357c-0.884,0.373-1.777,0.559-2.678,0.559c-1.422,0-2.7-0.247-3.835-0.741    c-1.136-0.494-2.094-1.174-2.873-2.041c-0.78-0.866-1.378-1.885-1.794-3.055s-0.624-2.431-0.624-3.783    c0-1.386,0.208-2.673,0.624-3.861c0.416-1.187,1.014-2.223,1.794-3.107c0.779-0.884,1.737-1.577,2.873-2.08    c1.135-0.502,2.413-0.754,3.835-0.754c0.953,0,1.876,0.143,2.769,0.429c0.893,0.286,1.698,0.707,2.418,1.261    s1.313,1.239,1.781,2.054c0.468,0.815,0.754,1.751,0.858,2.808h-3.9c-0.243-1.04-0.711-1.82-1.404-2.34s-1.534-0.78-2.521-0.78    c-0.919,0-1.699,0.178-2.34,0.533c-0.642,0.355-1.162,0.832-1.561,1.43c-0.398,0.598-0.688,1.278-0.871,2.041    c-0.182,0.763-0.272,1.551-0.272,2.366c0,0.78,0.091,1.539,0.272,2.275c0.183,0.737,0.473,1.4,0.871,1.989    s0.919,1.062,1.561,1.417c0.641,0.355,1.421,0.533,2.34,0.533c1.352,0,2.396-0.342,3.133-1.027    c0.736-0.685,1.165-1.677,1.287-2.977h-4.108v-3.042h7.8V111.5h-2.6l-0.416-2.106C909.982,110.33,909.176,110.984,908.292,111.357    z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M921.084,111.5V99.696h-4.576v-2.782c0.642,0.018,1.261-0.03,1.859-0.143    c0.598-0.112,1.135-0.312,1.611-0.598c0.477-0.286,0.88-0.663,1.209-1.131s0.547-1.048,0.65-1.742h2.938v18.2H921.084z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M934.031,107.496v4.004h-4.082v-4.004H934.031z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M965.207,77.228c2.208,0,4.264,0.353,6.168,1.056c1.904,0.704,3.553,1.76,4.944,3.168    c1.392,1.408,2.479,3.168,3.264,5.28c0.784,2.112,1.177,4.592,1.177,7.44c0,2.496-0.32,4.8-0.96,6.912    c-0.641,2.112-1.608,3.936-2.904,5.472c-1.296,1.536-2.912,2.744-4.849,3.624c-1.937,0.88-4.216,1.32-6.84,1.32h-14.784V77.228    H965.207z M964.68,105.164c1.087,0,2.144-0.176,3.168-0.528c1.023-0.352,1.936-0.936,2.735-1.752c0.8-0.816,1.44-1.879,1.92-3.192    c0.48-1.312,0.721-2.912,0.721-4.8c0-1.728-0.168-3.288-0.504-4.68s-0.889-2.583-1.656-3.576c-0.769-0.992-1.784-1.752-3.048-2.28    c-1.265-0.528-2.825-0.792-4.681-0.792h-5.376v21.6H964.68z",
        //                "duration": 1300
        //                    },
        //              {
        //                "path": "M991.367,105.548c1.024,0.992,2.496,1.488,4.416,1.488c1.376,0,2.56-0.344,3.553-1.032    c0.991-0.688,1.6-1.416,1.823-2.184h6c-0.96,2.976-2.432,5.104-4.416,6.384c-1.984,1.28-4.384,1.92-7.199,1.92    c-1.953,0-3.713-0.312-5.28-0.936c-1.568-0.624-2.896-1.512-3.984-2.664s-1.928-2.527-2.52-4.128    c-0.593-1.6-0.889-3.36-0.889-5.28c0-1.855,0.304-3.583,0.912-5.184c0.607-1.6,1.472-2.983,2.593-4.152    c1.119-1.167,2.455-2.088,4.008-2.76c1.552-0.672,3.271-1.008,5.16-1.008c2.111,0,3.951,0.408,5.52,1.224    c1.567,0.816,2.856,1.913,3.864,3.288c1.008,1.376,1.735,2.944,2.184,4.704c0.448,1.76,0.607,3.6,0.48,5.52h-17.904    C989.783,102.956,990.343,104.557,991.367,105.548z M999.071,92.492c-0.815-0.896-2.057-1.344-3.72-1.344    c-1.088,0-1.992,0.185-2.712,0.552c-0.72,0.368-1.296,0.824-1.729,1.368c-0.432,0.544-0.736,1.121-0.912,1.728    c-0.176,0.608-0.28,1.152-0.312,1.632h11.088C1000.455,94.7,999.888,93.388,999.071,92.492z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1007.831,91.244v-4.56h4.08v-1.92c0-2.208,0.688-4.016,2.063-5.424c1.376-1.408,3.456-2.112,6.24-2.112    c0.607,0,1.216,0.024,1.824,0.072c0.607,0.048,1.2,0.089,1.776,0.12v5.088c-0.801-0.096-1.633-0.144-2.496-0.144    c-0.929,0-1.593,0.216-1.992,0.648c-0.4,0.432-0.6,1.16-0.6,2.184v1.488h4.703v4.56h-4.703V111.5h-6.816V91.244H1007.831z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1025.398,82.844v-5.616h6.815v5.616H1025.398z M1032.214,86.684V111.5h-6.815V86.684H1032.214z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1042.871,86.684v3.456h0.144c0.864-1.44,1.984-2.488,3.36-3.144c1.375-0.656,2.784-0.984,4.224-0.984    c1.824,0,3.319,0.248,4.488,0.744c1.168,0.497,2.088,1.185,2.76,2.064c0.672,0.881,1.144,1.953,1.416,3.216    c0.271,1.264,0.408,2.664,0.408,4.2V111.5h-6.816V97.484c0-2.047-0.32-3.576-0.96-4.584c-0.641-1.008-1.775-1.512-3.407-1.512    c-1.856,0-3.201,0.552-4.032,1.656c-0.833,1.104-1.248,2.92-1.248,5.448V111.5h-6.816V86.684H1042.871z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1063.846,82.844v-5.616h6.815v5.616H1063.846z M1070.661,86.684V111.5h-6.815V86.684H1070.661z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1088.47,86.684v4.56h-4.991v12.288c0,1.152,0.191,1.92,0.575,2.304c0.385,0.384,1.152,0.576,2.305,0.576    c0.384,0,0.751-0.016,1.104-0.048c0.352-0.031,0.688-0.079,1.008-0.144v5.28c-0.575,0.096-1.216,0.16-1.92,0.192    c-0.704,0.032-1.392,0.048-2.063,0.048c-1.057,0-2.057-0.072-3-0.216c-0.944-0.144-1.776-0.424-2.496-0.84    c-0.72-0.416-1.289-1.008-1.704-1.776c-0.416-0.768-0.624-1.776-0.624-3.024v-14.64h-4.128v-4.56h4.128v-7.44h6.816v7.44H1088.47z    ",
        //                "duration": 1000
        //                    },
        //              {
        //                "path": "M1090.726,82.844v-5.616h6.815v5.616H1090.726z M1097.541,86.684V111.5h-6.815V86.684H1097.541z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1101.861,93.716c0.607-1.615,1.471-2.992,2.592-4.128c1.119-1.135,2.464-2.016,4.032-2.64    c1.567-0.624,3.327-0.936,5.279-0.936s3.721,0.312,5.305,0.936c1.584,0.624,2.936,1.504,4.056,2.64    c1.12,1.136,1.983,2.513,2.592,4.128c0.607,1.616,0.912,3.417,0.912,5.4c0,1.984-0.305,3.776-0.912,5.376    c-0.608,1.6-1.472,2.968-2.592,4.104c-1.12,1.136-2.472,2.008-4.056,2.616s-3.353,0.912-5.305,0.912s-3.712-0.305-5.279-0.912    c-1.568-0.607-2.913-1.479-4.032-2.616c-1.121-1.136-1.984-2.504-2.592-4.104c-0.608-1.6-0.912-3.392-0.912-5.376    C1100.949,97.132,1101.253,95.332,1101.861,93.716z M1108.053,102.02c0.192,0.944,0.52,1.792,0.984,2.544    c0.464,0.752,1.08,1.352,1.848,1.8c0.769,0.449,1.729,0.672,2.88,0.672c1.152,0,2.12-0.224,2.904-0.672    c0.784-0.448,1.408-1.047,1.872-1.8c0.464-0.751,0.792-1.6,0.984-2.544c0.191-0.943,0.288-1.912,0.288-2.904    c0-0.992-0.097-1.968-0.288-2.928c-0.192-0.96-0.521-1.808-0.984-2.544c-0.464-0.736-1.088-1.336-1.872-1.8    s-1.752-0.696-2.904-0.696c-1.151,0-2.111,0.232-2.88,0.696c-0.768,0.464-1.384,1.064-1.848,1.8    c-0.465,0.736-0.792,1.584-0.984,2.544c-0.191,0.96-0.288,1.937-0.288,2.928C1107.765,100.108,1107.861,101.077,1108.053,102.02z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1136.325,86.684v3.456h0.144c0.864-1.44,1.984-2.488,3.36-3.144c1.375-0.656,2.784-0.984,4.224-0.984    c1.824,0,3.319,0.248,4.488,0.744c1.168,0.497,2.088,1.185,2.76,2.064c0.672,0.881,1.144,1.953,1.416,3.216    c0.271,1.264,0.408,2.664,0.408,4.2V111.5h-6.816V97.484c0-2.047-0.32-3.576-0.96-4.584c-0.641-1.008-1.775-1.512-3.407-1.512    c-1.856,0-3.201,0.552-4.032,1.656c-0.833,1.104-1.248,2.92-1.248,5.448V111.5h-6.816V86.684H1136.325z",
        //                "duration": 800
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var g2 = {
        //          "nfusion-chemistry-g2": {
        //            "strokepath": [
        //              {
        //                "path": "M519.35,288.4l3.4-6.7l-0.8-0.4l-6,11.6l11.1-6.9l-0.6-0.8l-6.4,4l40.9-44.7h89.5v-1h-89.9L519.35,288.4z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M908.292,245.857c-0.884,0.373-1.777,0.559-2.678,0.559c-1.422,0-2.7-0.247-3.835-0.741    c-1.136-0.494-2.094-1.174-2.873-2.041c-0.78-0.866-1.378-1.885-1.794-3.055s-0.624-2.431-0.624-3.783    c0-1.386,0.208-2.673,0.624-3.861c0.416-1.187,1.014-2.223,1.794-3.107c0.779-0.884,1.737-1.577,2.873-2.08    c1.135-0.502,2.413-0.754,3.835-0.754c0.953,0,1.876,0.143,2.769,0.429c0.893,0.286,1.698,0.707,2.418,1.261    s1.313,1.239,1.781,2.054c0.468,0.815,0.754,1.751,0.858,2.808h-3.9c-0.243-1.04-0.711-1.82-1.404-2.34s-1.534-0.78-2.521-0.78    c-0.919,0-1.699,0.178-2.34,0.533c-0.642,0.355-1.162,0.832-1.561,1.43c-0.398,0.598-0.688,1.278-0.871,2.041    c-0.182,0.763-0.272,1.551-0.272,2.366c0,0.78,0.091,1.539,0.272,2.275c0.183,0.737,0.473,1.4,0.871,1.989    s0.919,1.062,1.561,1.417c0.641,0.355,1.421,0.533,2.34,0.533c1.352,0,2.396-0.342,3.133-1.027    c0.736-0.685,1.165-1.677,1.287-2.977h-4.108v-3.042h7.8V246h-2.6l-0.416-2.106C909.982,244.83,909.176,245.484,908.292,245.857z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M915.91,231.895c0.277-0.893,0.693-1.672,1.248-2.34s1.252-1.187,2.093-1.56    c0.841-0.373,1.807-0.559,2.899-0.559c0.832,0,1.625,0.13,2.379,0.39c0.754,0.26,1.417,0.633,1.988,1.118    c0.572,0.486,1.027,1.083,1.365,1.794c0.338,0.711,0.507,1.508,0.507,2.392c0,0.919-0.147,1.708-0.441,2.366    c-0.295,0.659-0.686,1.244-1.17,1.755c-0.485,0.512-1.036,0.975-1.651,1.391s-1.235,0.828-1.859,1.235    c-0.624,0.408-1.23,0.845-1.819,1.313c-0.59,0.468-1.109,1.014-1.561,1.638h8.606V246H915.13c0-1.057,0.151-1.976,0.455-2.756    c0.303-0.78,0.715-1.478,1.235-2.093c0.52-0.615,1.131-1.183,1.833-1.703c0.702-0.52,1.442-1.049,2.223-1.586    c0.398-0.277,0.823-0.559,1.274-0.845c0.45-0.286,0.861-0.602,1.234-0.949c0.373-0.346,0.685-0.736,0.937-1.17    c0.251-0.433,0.377-0.927,0.377-1.482c0-0.884-0.256-1.573-0.768-2.067c-0.511-0.494-1.166-0.741-1.963-0.741    c-0.537,0-0.992,0.126-1.365,0.377c-0.372,0.251-0.672,0.581-0.896,0.988c-0.226,0.407-0.386,0.858-0.481,1.352    c-0.095,0.494-0.143,0.984-0.143,1.469h-3.536C915.511,233.754,915.633,232.788,915.91,231.895z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M934.031,241.996V246h-4.082v-4.004H934.031z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M961.031,211.728l8.016,23.568h0.097l7.584-23.568h10.607V246h-7.056v-24.288h-0.096l-8.4,24.288h-5.808    l-8.4-24.048h-0.096V246h-7.057v-34.272H961.031z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M991.751,228.816c0.097-1.6,0.496-2.928,1.2-3.984c0.703-1.056,1.6-1.903,2.688-2.544    c1.087-0.64,2.312-1.096,3.672-1.368c1.359-0.271,2.728-0.408,4.104-0.408c1.248,0,2.512,0.088,3.792,0.264    c1.279,0.176,2.448,0.521,3.504,1.032c1.057,0.512,1.92,1.224,2.593,2.136c0.672,0.912,1.008,2.121,1.008,3.624v12.912    c0,1.121,0.063,2.192,0.191,3.216c0.128,1.025,0.353,1.792,0.672,2.304h-6.911c-0.129-0.384-0.232-0.775-0.312-1.176    c-0.08-0.4-0.137-0.808-0.168-1.224c-1.088,1.121-2.368,1.904-3.84,2.352c-1.473,0.448-2.977,0.672-4.512,0.672    c-1.185,0-2.289-0.144-3.312-0.432c-1.024-0.288-1.92-0.736-2.688-1.344c-0.769-0.607-1.368-1.375-1.801-2.304    c-0.432-0.928-0.647-2.032-0.647-3.312c0-1.408,0.247-2.568,0.744-3.48c0.495-0.912,1.135-1.64,1.92-2.184    c0.783-0.543,1.68-0.952,2.688-1.224c1.009-0.272,2.023-0.488,3.048-0.648c1.024-0.16,2.032-0.288,3.024-0.384    c0.991-0.096,1.872-0.24,2.64-0.432c0.769-0.192,1.376-0.472,1.824-0.84c0.448-0.368,0.655-0.904,0.624-1.608    c0-0.736-0.12-1.32-0.359-1.752c-0.24-0.432-0.561-0.768-0.961-1.008c-0.4-0.24-0.863-0.399-1.392-0.48    c-0.528-0.08-1.097-0.12-1.704-0.12c-1.344,0-2.399,0.288-3.168,0.864c-0.768,0.576-1.217,1.536-1.344,2.88H991.751z     M1007.495,233.856c-0.288,0.256-0.647,0.456-1.08,0.6c-0.432,0.144-0.896,0.264-1.392,0.36c-0.497,0.096-1.017,0.176-1.561,0.24    c-0.544,0.064-1.088,0.144-1.632,0.24c-0.512,0.096-1.016,0.224-1.512,0.384s-0.929,0.376-1.296,0.648    c-0.368,0.272-0.665,0.616-0.888,1.032c-0.225,0.417-0.337,0.944-0.337,1.584c0,0.608,0.112,1.121,0.337,1.536    c0.223,0.417,0.527,0.744,0.911,0.984c0.385,0.24,0.832,0.408,1.345,0.504c0.511,0.096,1.039,0.144,1.584,0.144    c1.344,0,2.383-0.223,3.12-0.672c0.735-0.448,1.279-0.984,1.632-1.608c0.352-0.624,0.567-1.255,0.647-1.896    c0.08-0.64,0.12-1.152,0.12-1.536V233.856z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1024.127,239.832c0.304,0.528,0.696,0.96,1.176,1.296c0.48,0.336,1.032,0.584,1.656,0.744    c0.624,0.161,1.271,0.24,1.943,0.24c0.48,0,0.984-0.055,1.513-0.168c0.527-0.112,1.008-0.288,1.439-0.528    c0.433-0.24,0.792-0.56,1.08-0.96c0.288-0.4,0.433-0.904,0.433-1.512c0-1.023-0.681-1.792-2.04-2.304    c-1.36-0.512-3.257-1.024-5.688-1.536c-0.992-0.224-1.96-0.487-2.904-0.792c-0.943-0.304-1.784-0.704-2.52-1.2    c-0.736-0.496-1.328-1.12-1.776-1.872s-0.672-1.672-0.672-2.76c0-1.6,0.312-2.912,0.937-3.936    c0.624-1.024,1.447-1.832,2.472-2.424c1.023-0.592,2.176-1.008,3.456-1.248c1.279-0.24,2.592-0.36,3.936-0.36    c1.345,0,2.647,0.128,3.912,0.384c1.264,0.256,2.392,0.688,3.385,1.296c0.991,0.608,1.815,1.416,2.472,2.424    c0.655,1.008,1.048,2.28,1.176,3.816h-6.479c-0.097-1.312-0.593-2.2-1.488-2.664c-0.896-0.463-1.952-0.696-3.168-0.696    c-0.384,0-0.801,0.024-1.248,0.072c-0.448,0.048-0.856,0.152-1.225,0.312c-0.368,0.161-0.68,0.392-0.936,0.696    c-0.257,0.305-0.384,0.712-0.384,1.224c0,0.608,0.224,1.104,0.672,1.488c0.447,0.384,1.032,0.696,1.752,0.936    c0.72,0.24,1.544,0.456,2.472,0.648c0.928,0.192,1.872,0.4,2.832,0.624c0.992,0.225,1.96,0.497,2.904,0.816    c0.943,0.32,1.783,0.744,2.52,1.272c0.736,0.528,1.328,1.184,1.776,1.968c0.448,0.785,0.672,1.752,0.672,2.904    c0,1.632-0.328,3-0.983,4.104c-0.656,1.104-1.513,1.992-2.568,2.664c-1.056,0.672-2.265,1.145-3.624,1.416    c-1.36,0.271-2.744,0.408-4.152,0.408c-1.439,0-2.849-0.144-4.224-0.432c-1.376-0.288-2.601-0.768-3.672-1.44    c-1.072-0.672-1.952-1.56-2.641-2.664s-1.063-2.488-1.128-4.152h6.48C1023.671,238.672,1023.822,239.304,1024.127,239.832z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1056.598,221.184v4.56h-4.991v12.288c0,1.152,0.191,1.92,0.575,2.304c0.385,0.384,1.152,0.576,2.305,0.576    c0.384,0,0.751-0.016,1.104-0.048c0.352-0.031,0.688-0.079,1.008-0.144V246c-0.575,0.096-1.216,0.16-1.92,0.192    c-0.704,0.032-1.392,0.048-2.063,0.048c-1.057,0-2.057-0.072-3-0.216c-0.944-0.144-1.776-0.424-2.496-0.84    c-0.72-0.416-1.289-1.008-1.704-1.776c-0.416-0.768-0.624-1.776-0.624-3.024v-14.64h-4.128v-4.56h4.128v-7.44h6.816v7.44H1056.598    z",
        //                "duration": 1000
        //                    },
        //              {
        //                "path": "M1065.958,240.048c1.024,0.992,2.496,1.488,4.416,1.488c1.376,0,2.56-0.344,3.553-1.032    c0.991-0.688,1.6-1.416,1.823-2.184h6c-0.96,2.976-2.432,5.104-4.416,6.384c-1.984,1.28-4.384,1.92-7.199,1.92    c-1.953,0-3.713-0.312-5.28-0.936c-1.568-0.624-2.896-1.512-3.984-2.664s-1.928-2.527-2.52-4.128    c-0.593-1.6-0.889-3.36-0.889-5.28c0-1.855,0.304-3.583,0.912-5.184c0.607-1.6,1.472-2.983,2.593-4.152    c1.119-1.167,2.455-2.088,4.008-2.76c1.552-0.672,3.271-1.008,5.16-1.008c2.111,0,3.951,0.408,5.52,1.224    c1.567,0.816,2.856,1.913,3.864,3.288c1.008,1.376,1.735,2.944,2.184,4.704c0.448,1.76,0.607,3.6,0.48,5.52h-17.904    C1064.374,237.456,1064.934,239.057,1065.958,240.048z M1073.662,226.992c-0.815-0.896-2.057-1.344-3.72-1.344    c-1.088,0-1.992,0.185-2.712,0.552c-0.72,0.368-1.296,0.824-1.729,1.368c-0.432,0.544-0.736,1.121-0.912,1.728    c-0.176,0.608-0.28,1.152-0.312,1.632h11.088C1075.046,229.2,1074.479,227.888,1073.662,226.992z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1091.494,221.184v4.608h0.096c0.319-0.768,0.752-1.48,1.296-2.136c0.544-0.655,1.168-1.215,1.872-1.68    c0.703-0.463,1.456-0.824,2.256-1.08c0.8-0.256,1.632-0.384,2.496-0.384c0.448,0,0.943,0.08,1.488,0.24v6.336    c-0.32-0.063-0.704-0.12-1.152-0.168s-0.88-0.072-1.296-0.072c-1.248,0-2.304,0.208-3.168,0.624    c-0.864,0.416-1.56,0.984-2.088,1.704c-0.528,0.72-0.904,1.56-1.128,2.52c-0.225,0.96-0.336,2-0.336,3.12V246h-6.816v-24.816    H1091.494z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1108.966,221.184v3.168h0.096c0.832-1.344,1.888-2.32,3.168-2.928c1.279-0.607,2.688-0.912,4.224-0.912    c1.952,0,3.632,0.368,5.04,1.104c1.408,0.736,2.576,1.712,3.504,2.928c0.929,1.217,1.616,2.632,2.064,4.248    c0.448,1.616,0.672,3.305,0.672,5.064c0,1.664-0.224,3.264-0.672,4.8c-0.448,1.536-1.128,2.897-2.04,4.08    c-0.912,1.185-2.048,2.128-3.408,2.832s-2.952,1.056-4.775,1.056c-1.536,0-2.952-0.312-4.248-0.936s-2.36-1.543-3.192-2.76h-0.096    v11.76h-6.816v-33.504H1108.966z M1117.821,240.864c0.752-0.448,1.36-1.032,1.824-1.752c0.464-0.72,0.792-1.56,0.984-2.52    c0.191-0.96,0.288-1.936,0.288-2.928c0-0.992-0.104-1.968-0.312-2.928s-0.552-1.815-1.032-2.568    c-0.479-0.751-1.096-1.36-1.848-1.824s-1.673-0.696-2.76-0.696c-1.121,0-2.057,0.232-2.809,0.696s-1.36,1.064-1.823,1.8    c-0.465,0.736-0.792,1.584-0.984,2.544s-0.288,1.952-0.288,2.976c0,0.992,0.104,1.968,0.312,2.928    c0.207,0.96,0.543,1.8,1.008,2.52c0.463,0.72,1.08,1.304,1.848,1.752c0.768,0.449,1.696,0.672,2.784,0.672    C1116.134,241.536,1117.069,241.312,1117.821,240.864z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1137.62,211.728V246h-6.815v-34.272H1137.62z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1141.508,228.816c0.097-1.6,0.496-2.928,1.2-3.984c0.703-1.056,1.6-1.903,2.688-2.544    c1.087-0.64,2.312-1.096,3.672-1.368c1.359-0.271,2.728-0.408,4.104-0.408c1.248,0,2.512,0.088,3.792,0.264    c1.279,0.176,2.448,0.521,3.504,1.032c1.057,0.512,1.92,1.224,2.593,2.136c0.672,0.912,1.008,2.121,1.008,3.624v12.912    c0,1.121,0.063,2.192,0.191,3.216c0.128,1.025,0.353,1.792,0.672,2.304h-6.911c-0.129-0.384-0.232-0.775-0.312-1.176    c-0.08-0.4-0.137-0.808-0.168-1.224c-1.088,1.121-2.368,1.904-3.84,2.352c-1.473,0.448-2.977,0.672-4.512,0.672    c-1.185,0-2.289-0.144-3.312-0.432c-1.024-0.288-1.92-0.736-2.688-1.344c-0.769-0.607-1.368-1.375-1.801-2.304    c-0.432-0.928-0.647-2.032-0.647-3.312c0-1.408,0.247-2.568,0.744-3.48c0.495-0.912,1.135-1.64,1.92-2.184    c0.783-0.543,1.68-0.952,2.688-1.224c1.009-0.272,2.023-0.488,3.048-0.648c1.024-0.16,2.032-0.288,3.024-0.384    c0.991-0.096,1.872-0.24,2.64-0.432c0.769-0.192,1.376-0.472,1.824-0.84c0.448-0.368,0.655-0.904,0.624-1.608    c0-0.736-0.12-1.32-0.359-1.752c-0.24-0.432-0.561-0.768-0.961-1.008c-0.4-0.24-0.863-0.399-1.392-0.48    c-0.528-0.08-1.097-0.12-1.704-0.12c-1.344,0-2.399,0.288-3.168,0.864c-0.768,0.576-1.217,1.536-1.344,2.88H1141.508z     M1157.252,233.856c-0.288,0.256-0.647,0.456-1.08,0.6c-0.432,0.144-0.896,0.264-1.392,0.36c-0.497,0.096-1.017,0.176-1.561,0.24    c-0.544,0.064-1.088,0.144-1.632,0.24c-0.512,0.096-1.016,0.224-1.512,0.384s-0.929,0.376-1.296,0.648    c-0.368,0.272-0.665,0.616-0.888,1.032c-0.225,0.417-0.337,0.944-0.337,1.584c0,0.608,0.112,1.121,0.337,1.536    c0.223,0.417,0.527,0.744,0.911,0.984c0.385,0.24,0.832,0.408,1.345,0.504c0.511,0.096,1.039,0.144,1.584,0.144    c1.344,0,2.383-0.223,3.12-0.672c0.735-0.448,1.279-0.984,1.632-1.608c0.352-0.624,0.567-1.255,0.647-1.896    c0.08-0.64,0.12-1.152,0.12-1.536V233.856z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1174.628,221.184v3.456h0.144c0.864-1.44,1.984-2.488,3.36-3.144c1.375-0.656,2.784-0.984,4.224-0.984    c1.824,0,3.319,0.248,4.488,0.744c1.168,0.497,2.088,1.185,2.76,2.064c0.672,0.881,1.144,1.953,1.416,3.216    c0.271,1.264,0.408,2.664,0.408,4.2V246h-6.816v-14.016c0-2.047-0.32-3.576-0.96-4.584c-0.641-1.008-1.775-1.512-3.407-1.512    c-1.856,0-3.201,0.552-4.032,1.656c-0.833,1.104-1.248,2.92-1.248,5.448V246h-6.816v-24.816H1174.628z",
        //                "duration": 800
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var g3 = {
        //          "nfusion-chemistry-g3": {
        //            "strokepath": [
        //              {
        //                "path": "M629.6,462.9l3.4-6.7l-0.8-0.4l-6,11.6l11.1-6.9l-0.6-0.8l-6.4,4l40.9-44.7h89.5v-1h-89.9L629.6,462.9z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M908.292,420.357c-0.884,0.372-1.777,0.559-2.678,0.559c-1.422,0-2.7-0.247-3.835-0.741    c-1.136-0.493-2.094-1.174-2.873-2.041c-0.78-0.866-1.378-1.885-1.794-3.055s-0.624-2.431-0.624-3.783    c0-1.386,0.208-2.673,0.624-3.86s1.014-2.224,1.794-3.107c0.779-0.885,1.737-1.577,2.873-2.08    c1.135-0.502,2.413-0.754,3.835-0.754c0.953,0,1.876,0.143,2.769,0.429s1.698,0.706,2.418,1.261s1.313,1.24,1.781,2.055    s0.754,1.75,0.858,2.808h-3.9c-0.243-1.04-0.711-1.819-1.404-2.34s-1.534-0.78-2.521-0.78c-0.919,0-1.699,0.178-2.34,0.533    c-0.642,0.355-1.162,0.832-1.561,1.43s-0.688,1.279-0.871,2.041c-0.182,0.764-0.272,1.552-0.272,2.366    c0,0.78,0.091,1.538,0.272,2.274c0.183,0.738,0.473,1.4,0.871,1.99c0.398,0.589,0.919,1.062,1.561,1.416    c0.641,0.355,1.421,0.533,2.34,0.533c1.352,0,2.396-0.342,3.133-1.027c0.736-0.684,1.165-1.676,1.287-2.977h-4.108v-3.042h7.8    V420.5h-2.6l-0.416-2.105C909.982,419.33,909.176,419.984,908.292,420.357z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M921.786,409.658c0.45-0.035,0.871-0.135,1.261-0.299c0.39-0.165,0.711-0.403,0.962-0.715    c0.251-0.312,0.377-0.729,0.377-1.248c0-0.78-0.26-1.379-0.779-1.795c-0.521-0.416-1.118-0.623-1.795-0.623    c-0.936,0-1.642,0.308-2.118,0.922c-0.478,0.616-0.707,1.392-0.689,2.328h-3.51c0.034-0.937,0.203-1.79,0.507-2.562    c0.303-0.771,0.728-1.435,1.274-1.989c0.546-0.555,1.199-0.983,1.963-1.287c0.763-0.303,1.611-0.455,2.548-0.455    c0.728,0,1.456,0.109,2.184,0.326c0.729,0.217,1.382,0.541,1.963,0.975s1.054,0.962,1.417,1.586    c0.364,0.623,0.546,1.344,0.546,2.158c0,0.883-0.212,1.664-0.637,2.34s-1.062,1.135-1.911,1.378v0.052    c1.006,0.226,1.794,0.711,2.366,1.456s0.858,1.638,0.858,2.678c0,0.954-0.187,1.804-0.56,2.548    c-0.373,0.746-0.871,1.369-1.495,1.873c-0.624,0.502-1.343,0.883-2.157,1.144c-0.815,0.26-1.664,0.39-2.549,0.39    c-1.022,0-1.954-0.147-2.795-0.441c-0.841-0.295-1.556-0.725-2.145-1.287c-0.59-0.563-1.045-1.252-1.365-2.067    c-0.32-0.814-0.473-1.751-0.455-2.808h3.51c0.018,0.484,0.096,0.949,0.234,1.391s0.338,0.823,0.598,1.145    c0.261,0.32,0.585,0.576,0.976,0.767c0.39,0.19,0.854,0.286,1.391,0.286c0.832,0,1.534-0.256,2.106-0.768    c0.571-0.511,0.857-1.209,0.857-2.093c0-0.692-0.134-1.222-0.402-1.586c-0.27-0.364-0.611-0.628-1.027-0.793    s-0.871-0.26-1.365-0.286c-0.494-0.025-0.966-0.039-1.417-0.039v-2.6C920.91,409.693,921.335,409.693,921.786,409.658z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M934.031,416.496v4.004h-4.082v-4.004H934.031z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M957.959,386.229V420.5h-7.536v-34.271H957.959z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M969.287,395.684v3.36h0.096c0.896-1.279,1.976-2.271,3.24-2.976c1.264-0.704,2.712-1.057,4.345-1.057    c1.567,0,3,0.305,4.296,0.912c1.296,0.608,2.279,1.68,2.951,3.217c0.736-1.088,1.736-2.049,3-2.881    c1.265-0.832,2.761-1.248,4.488-1.248c1.312,0,2.527,0.16,3.648,0.48c1.119,0.32,2.079,0.832,2.88,1.535    c0.8,0.705,1.424,1.625,1.872,2.761c0.447,1.136,0.672,2.505,0.672,4.104V420.5h-6.816v-14.064c0-0.831-0.032-1.615-0.096-2.352    c-0.064-0.736-0.24-1.375-0.528-1.92c-0.288-0.544-0.712-0.976-1.271-1.296c-0.561-0.319-1.32-0.479-2.28-0.479    s-1.736,0.184-2.328,0.551c-0.593,0.369-1.056,0.849-1.392,1.44c-0.336,0.593-0.561,1.265-0.672,2.017    c-0.113,0.752-0.168,1.512-0.168,2.279V420.5h-6.816v-13.92c0-0.736-0.017-1.464-0.048-2.184    c-0.032-0.721-0.168-1.385-0.408-1.992s-0.641-1.096-1.2-1.465c-0.56-0.367-1.384-0.551-2.472-0.551    c-0.32,0-0.744,0.071-1.272,0.215c-0.527,0.145-1.04,0.416-1.535,0.816c-0.497,0.4-0.921,0.977-1.272,1.729    c-0.353,0.752-0.528,1.736-0.528,2.951v14.4h-6.815v-24.816H969.287z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1011.432,395.684v3.168h0.096c0.832-1.344,1.888-2.319,3.168-2.928c1.279-0.607,2.688-0.912,4.224-0.912    c1.952,0,3.632,0.369,5.04,1.104c1.408,0.736,2.576,1.712,3.504,2.928c0.929,1.217,1.616,2.632,2.064,4.248    s0.672,3.305,0.672,5.063c0,1.664-0.224,3.265-0.672,4.801c-0.448,1.535-1.128,2.896-2.04,4.08s-2.048,2.128-3.408,2.832    c-1.36,0.703-2.952,1.056-4.775,1.056c-1.536,0-2.952-0.312-4.248-0.937c-1.296-0.623-2.36-1.543-3.192-2.76h-0.096v11.76h-6.816    v-33.504H1011.432z M1020.287,415.363c0.752-0.447,1.36-1.031,1.824-1.752c0.464-0.719,0.792-1.56,0.984-2.52    c0.191-0.96,0.288-1.936,0.288-2.928s-0.104-1.969-0.312-2.928c-0.208-0.961-0.552-1.816-1.032-2.568    c-0.479-0.752-1.096-1.359-1.848-1.824c-0.752-0.463-1.673-0.695-2.76-0.695c-1.121,0-2.057,0.232-2.809,0.695    c-0.752,0.465-1.36,1.064-1.823,1.801c-0.465,0.736-0.792,1.584-0.984,2.543c-0.192,0.961-0.288,1.953-0.288,2.977    c0,0.992,0.104,1.968,0.312,2.928c0.207,0.96,0.543,1.801,1.008,2.52c0.463,0.721,1.08,1.305,1.848,1.752    c0.768,0.449,1.696,0.673,2.784,0.673C1018.6,416.036,1019.535,415.812,1020.287,415.363z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1040.086,386.229V420.5h-6.815v-34.271H1040.086z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1051.559,414.548c1.024,0.992,2.496,1.488,4.416,1.488c1.376,0,2.56-0.344,3.553-1.032    c0.991-0.688,1.6-1.416,1.823-2.184h6c-0.96,2.976-2.432,5.104-4.416,6.384s-4.384,1.92-7.199,1.92    c-1.953,0-3.713-0.312-5.28-0.937c-1.568-0.623-2.896-1.512-3.984-2.664c-1.088-1.151-1.928-2.527-2.52-4.127    c-0.593-1.6-0.889-3.36-0.889-5.28c0-1.855,0.304-3.583,0.912-5.185c0.607-1.6,1.472-2.982,2.593-4.152    c1.119-1.167,2.455-2.088,4.008-2.76c1.552-0.672,3.271-1.008,5.16-1.008c2.111,0,3.951,0.408,5.52,1.225    c1.567,0.815,2.856,1.912,3.864,3.287c1.008,1.377,1.735,2.945,2.184,4.705s0.607,3.6,0.48,5.52h-17.904    C1049.975,411.956,1050.534,413.557,1051.559,414.548z M1059.263,401.492c-0.815-0.896-2.057-1.344-3.72-1.344    c-1.088,0-1.992,0.184-2.712,0.552s-1.296,0.824-1.729,1.368c-0.432,0.544-0.736,1.12-0.912,1.728    c-0.176,0.608-0.28,1.152-0.312,1.632h11.088C1060.646,403.7,1060.079,402.389,1059.263,401.492z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1077.238,395.684v3.36h0.096c0.896-1.279,1.976-2.271,3.24-2.976c1.264-0.704,2.712-1.057,4.345-1.057    c1.567,0,3,0.305,4.296,0.912c1.296,0.608,2.279,1.68,2.951,3.217c0.736-1.088,1.736-2.049,3-2.881    c1.265-0.832,2.761-1.248,4.488-1.248c1.312,0,2.527,0.16,3.648,0.48c1.119,0.32,2.079,0.832,2.88,1.535    c0.8,0.705,1.424,1.625,1.872,2.761c0.447,1.136,0.672,2.505,0.672,4.104V420.5h-6.816v-14.064c0-0.831-0.032-1.615-0.096-2.352    c-0.064-0.736-0.24-1.375-0.528-1.92c-0.288-0.544-0.712-0.976-1.271-1.296c-0.561-0.319-1.32-0.479-2.28-0.479    s-1.736,0.184-2.328,0.551c-0.593,0.369-1.056,0.849-1.392,1.44c-0.336,0.593-0.561,1.265-0.672,2.017    c-0.113,0.752-0.168,1.512-0.168,2.279V420.5h-6.816v-13.92c0-0.736-0.017-1.464-0.048-2.184    c-0.032-0.721-0.168-1.385-0.408-1.992s-0.641-1.096-1.2-1.465c-0.56-0.367-1.384-0.551-2.472-0.551    c-0.32,0-0.744,0.071-1.272,0.215c-0.527,0.145-1.04,0.416-1.535,0.816c-0.497,0.4-0.921,0.977-1.272,1.729    c-0.353,0.752-0.528,1.736-0.528,2.951v14.4h-6.815v-24.816H1077.238z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1120.197,414.548c1.024,0.992,2.496,1.488,4.416,1.488c1.376,0,2.56-0.344,3.553-1.032    c0.991-0.688,1.6-1.416,1.823-2.184h6c-0.96,2.976-2.432,5.104-4.416,6.384s-4.384,1.92-7.199,1.92    c-1.953,0-3.713-0.312-5.28-0.937c-1.568-0.623-2.896-1.512-3.984-2.664c-1.088-1.151-1.928-2.527-2.52-4.127    c-0.593-1.6-0.889-3.36-0.889-5.28c0-1.855,0.304-3.583,0.912-5.185c0.607-1.6,1.472-2.982,2.593-4.152    c1.119-1.167,2.455-2.088,4.008-2.76c1.552-0.672,3.271-1.008,5.16-1.008c2.111,0,3.951,0.408,5.52,1.225    c1.567,0.815,2.856,1.912,3.864,3.287c1.008,1.377,1.735,2.945,2.184,4.705s0.607,3.6,0.48,5.52h-17.904    C1118.613,411.956,1119.173,413.557,1120.197,414.548z M1127.901,401.492c-0.815-0.896-2.057-1.344-3.72-1.344    c-1.088,0-1.992,0.184-2.712,0.552s-1.296,0.824-1.729,1.368c-0.432,0.544-0.736,1.12-0.912,1.728    c-0.176,0.608-0.28,1.152-0.312,1.632h11.088C1129.285,403.7,1128.718,402.389,1127.901,401.492z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1145.733,395.684v3.457h0.144c0.864-1.44,1.984-2.488,3.36-3.145c1.375-0.656,2.784-0.984,4.224-0.984    c1.824,0,3.319,0.248,4.488,0.744c1.168,0.496,2.088,1.185,2.76,2.064c0.672,0.881,1.144,1.952,1.416,3.216    c0.271,1.265,0.408,2.664,0.408,4.2V420.5h-6.816v-14.016c0-2.048-0.32-3.576-0.96-4.584c-0.641-1.008-1.775-1.512-3.407-1.512    c-1.856,0-3.201,0.551-4.032,1.655c-0.833,1.104-1.248,2.921-1.248,5.448V420.5h-6.816v-24.816H1145.733z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1180.148,395.684v4.561h-4.991v12.288c0,1.151,0.191,1.92,0.575,2.304c0.385,0.385,1.152,0.576,2.305,0.576    c0.384,0,0.751-0.016,1.104-0.049c0.352-0.031,0.688-0.078,1.008-0.143v5.279c-0.575,0.096-1.216,0.16-1.92,0.191    c-0.704,0.032-1.392,0.049-2.063,0.049c-1.057,0-2.057-0.072-3-0.217c-0.944-0.144-1.776-0.424-2.496-0.84    c-0.72-0.415-1.289-1.008-1.704-1.775c-0.416-0.768-0.624-1.776-0.624-3.024v-14.64h-4.128v-4.561h4.128v-7.439h6.816v7.439    H1180.148z",
        //                "duration": 1000
        //                    },
        //              {
        //                "path": "M1181.924,403.316c0.097-1.6,0.496-2.928,1.2-3.984c0.703-1.057,1.6-1.903,2.688-2.544    c1.087-0.64,2.312-1.096,3.672-1.368c1.359-0.271,2.728-0.408,4.104-0.408c1.248,0,2.512,0.089,3.792,0.264    c1.279,0.177,2.448,0.521,3.504,1.033c1.057,0.512,1.92,1.224,2.593,2.135c0.672,0.912,1.008,2.121,1.008,3.625v12.912    c0,1.12,0.063,2.191,0.191,3.215c0.128,1.025,0.353,1.793,0.672,2.305h-6.911c-0.129-0.384-0.232-0.775-0.312-1.176    s-0.137-0.809-0.168-1.225c-1.088,1.121-2.368,1.904-3.84,2.353c-1.473,0.448-2.977,0.672-4.512,0.672    c-1.185,0-2.289-0.144-3.312-0.433c-1.024-0.287-1.92-0.735-2.688-1.344c-0.769-0.607-1.368-1.375-1.801-2.304    c-0.432-0.928-0.647-2.032-0.647-3.312c0-1.408,0.247-2.568,0.744-3.48c0.495-0.912,1.135-1.64,1.92-2.184    c0.783-0.544,1.68-0.952,2.688-1.225c1.009-0.271,2.023-0.487,3.048-0.648c1.024-0.159,2.032-0.287,3.024-0.383    c0.991-0.097,1.872-0.24,2.64-0.433c0.769-0.192,1.376-0.472,1.824-0.84s0.655-0.903,0.624-1.608c0-0.735-0.12-1.32-0.359-1.752    c-0.24-0.432-0.561-0.768-0.961-1.008s-0.863-0.399-1.392-0.48c-0.528-0.079-1.097-0.119-1.704-0.119    c-1.344,0-2.399,0.287-3.168,0.863c-0.768,0.576-1.217,1.537-1.344,2.881H1181.924z M1197.668,408.355    c-0.288,0.257-0.647,0.457-1.08,0.601c-0.432,0.144-0.896,0.265-1.392,0.36c-0.497,0.096-1.017,0.176-1.561,0.24    s-1.088,0.144-1.632,0.239c-0.512,0.097-1.016,0.224-1.512,0.384s-0.929,0.377-1.296,0.648c-0.368,0.271-0.665,0.616-0.888,1.031    c-0.225,0.417-0.337,0.945-0.337,1.584c0,0.609,0.112,1.121,0.337,1.537c0.223,0.416,0.527,0.744,0.911,0.983    c0.385,0.24,0.832,0.408,1.345,0.504c0.511,0.097,1.039,0.144,1.584,0.144c1.344,0,2.383-0.223,3.12-0.672    c0.735-0.447,1.279-0.983,1.632-1.607c0.352-0.624,0.567-1.256,0.647-1.896c0.08-0.639,0.12-1.151,0.12-1.535V408.355z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1222.195,395.684v4.561h-4.991v12.288c0,1.151,0.191,1.92,0.575,2.304c0.385,0.385,1.152,0.576,2.305,0.576    c0.384,0,0.751-0.016,1.104-0.049c0.352-0.031,0.688-0.078,1.008-0.143v5.279c-0.575,0.096-1.216,0.16-1.92,0.191    c-0.704,0.032-1.392,0.049-2.063,0.049c-1.057,0-2.057-0.072-3-0.217c-0.944-0.144-1.776-0.424-2.496-0.84    c-0.72-0.415-1.289-1.008-1.704-1.775c-0.416-0.768-0.624-1.776-0.624-3.024v-14.64h-4.128v-4.561h4.128v-7.439h6.816v7.439    H1222.195z",
        //                "duration": 1000
        //                    },
        //              {
        //                "path": "M1224.451,391.844v-5.615h6.815v5.615H1224.451z M1231.267,395.684V420.5h-6.815v-24.816H1231.267z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1235.587,402.716c0.607-1.615,1.471-2.991,2.592-4.128c1.119-1.135,2.464-2.016,4.032-2.64    c1.567-0.624,3.327-0.937,5.279-0.937s3.721,0.312,5.305,0.937s2.936,1.505,4.056,2.64c1.12,1.137,1.983,2.513,2.592,4.128    c0.607,1.616,0.912,3.417,0.912,5.4c0,1.984-0.305,3.776-0.912,5.376c-0.608,1.6-1.472,2.969-2.592,4.104    c-1.12,1.137-2.472,2.009-4.056,2.616s-3.353,0.912-5.305,0.912s-3.712-0.305-5.279-0.912c-1.568-0.607-2.913-1.479-4.032-2.616    c-1.121-1.135-1.984-2.504-2.592-4.104c-0.608-1.6-0.912-3.392-0.912-5.376C1234.675,406.133,1234.979,404.332,1235.587,402.716z     M1241.778,411.02c0.192,0.945,0.52,1.793,0.984,2.545c0.464,0.752,1.08,1.352,1.848,1.799c0.769,0.449,1.729,0.673,2.88,0.673    c1.152,0,2.12-0.224,2.904-0.673c0.784-0.447,1.408-1.047,1.872-1.799s0.792-1.6,0.984-2.545c0.191-0.943,0.288-1.911,0.288-2.903    c0-0.991-0.097-1.968-0.288-2.929c-0.192-0.959-0.521-1.807-0.984-2.543s-1.088-1.336-1.872-1.801    c-0.784-0.463-1.752-0.695-2.904-0.695c-1.151,0-2.111,0.232-2.88,0.695c-0.768,0.465-1.384,1.064-1.848,1.801    c-0.465,0.736-0.792,1.584-0.984,2.543c-0.191,0.961-0.288,1.938-0.288,2.929C1241.49,409.108,1241.587,410.076,1241.778,411.02z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1270.051,395.684v3.457h0.144c0.864-1.44,1.984-2.488,3.36-3.145c1.375-0.656,2.784-0.984,4.224-0.984    c1.824,0,3.319,0.248,4.488,0.744c1.168,0.496,2.088,1.185,2.76,2.064c0.672,0.881,1.144,1.952,1.416,3.216    c0.271,1.265,0.408,2.664,0.408,4.2V420.5h-6.816v-14.016c0-2.048-0.32-3.576-0.96-4.584c-0.641-1.008-1.775-1.512-3.407-1.512    c-1.856,0-3.201,0.551-4.032,1.655c-0.833,1.104-1.248,2.921-1.248,5.448V420.5h-6.816v-24.816H1270.051z",
        //                "duration": 800
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var g4 = {
        //          "nfusion-chemistry-g4": {
        //            "strokepath": [
        //              {
        //                "path": "M735.6,622.4l3.4-6.7l-0.8-0.4l-6,11.6l11.1-6.9l-0.6-0.8l-6.4,4l40.9-44.7h89.5v-1h-89.9L735.6,622.4z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M908.292,579.857c-0.884,0.372-1.777,0.559-2.678,0.559c-1.422,0-2.7-0.247-3.835-0.741    c-1.136-0.493-2.094-1.174-2.873-2.041c-0.78-0.866-1.378-1.885-1.794-3.055s-0.624-2.431-0.624-3.783    c0-1.386,0.208-2.673,0.624-3.86s1.014-2.224,1.794-3.107c0.779-0.885,1.737-1.577,2.873-2.08    c1.135-0.502,2.413-0.754,3.835-0.754c0.953,0,1.876,0.143,2.769,0.429s1.698,0.706,2.418,1.261s1.313,1.24,1.781,2.055    s0.754,1.75,0.858,2.808h-3.9c-0.243-1.04-0.711-1.819-1.404-2.34s-1.534-0.78-2.521-0.78c-0.919,0-1.699,0.178-2.34,0.533    c-0.642,0.355-1.162,0.832-1.561,1.43s-0.688,1.279-0.871,2.041c-0.182,0.764-0.272,1.552-0.272,2.366    c0,0.78,0.091,1.538,0.272,2.274c0.183,0.738,0.473,1.4,0.871,1.99c0.398,0.589,0.919,1.062,1.561,1.416    c0.641,0.355,1.421,0.533,2.34,0.533c1.352,0,2.396-0.342,3.133-1.027c0.736-0.684,1.165-1.676,1.287-2.977h-4.108v-3.042h7.8V580    h-2.6l-0.416-2.105C909.982,578.83,909.176,579.484,908.292,579.857z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M915,575.788v-3.38l7.904-10.608h3.302v10.946h2.418v3.042h-2.418V580h-3.51v-4.212H915z M922.618,566.428    l-4.706,6.318h4.784v-6.318H922.618z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M934.031,575.996V580h-4.082v-4.004H934.031z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M950.087,555.88c0.769-2.191,1.872-4.104,3.312-5.735c1.439-1.633,3.208-2.912,5.304-3.84    s4.456-1.393,7.08-1.393c2.656,0,5.023,0.465,7.104,1.393c2.079,0.928,3.84,2.207,5.279,3.84c1.44,1.631,2.544,3.544,3.312,5.735    c0.768,2.192,1.151,4.568,1.151,7.128c0,2.496-0.384,4.824-1.151,6.984c-0.769,2.16-1.872,4.04-3.312,5.64    c-1.439,1.601-3.2,2.856-5.279,3.769c-2.081,0.912-4.448,1.367-7.104,1.367c-2.624,0-4.984-0.455-7.08-1.367    s-3.864-2.168-5.304-3.769c-1.44-1.6-2.544-3.479-3.312-5.64c-0.768-2.16-1.151-4.488-1.151-6.984    C948.936,560.448,949.319,558.072,950.087,555.88z M956.976,567.208c0.336,1.36,0.871,2.585,1.607,3.672    c0.736,1.089,1.696,1.96,2.88,2.616s2.624,0.984,4.32,0.984s3.136-0.328,4.32-0.984c1.184-0.656,2.144-1.527,2.88-2.616    c0.735-1.087,1.271-2.312,1.608-3.672c0.336-1.36,0.504-2.76,0.504-4.2c0-1.504-0.168-2.959-0.504-4.367    c-0.337-1.408-0.873-2.664-1.608-3.769c-0.736-1.104-1.696-1.983-2.88-2.64c-1.185-0.656-2.624-0.984-4.32-0.984    s-3.137,0.328-4.32,0.984s-2.144,1.535-2.88,2.64s-1.271,2.36-1.607,3.769s-0.504,2.863-0.504,4.367    C956.472,564.448,956.64,565.848,956.976,567.208z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M992.328,555.184v3.168h0.096c0.832-1.344,1.888-2.319,3.168-2.928c1.279-0.607,2.688-0.912,4.224-0.912    c1.952,0,3.632,0.369,5.04,1.104c1.408,0.736,2.576,1.712,3.504,2.928c0.929,1.217,1.616,2.632,2.064,4.248    s0.672,3.305,0.672,5.063c0,1.664-0.224,3.265-0.672,4.801c-0.448,1.535-1.128,2.896-2.04,4.08s-2.048,2.128-3.408,2.832    c-1.36,0.703-2.952,1.056-4.775,1.056c-1.536,0-2.952-0.312-4.248-0.937c-1.296-0.623-2.36-1.543-3.192-2.76h-0.096v11.76h-6.816    v-33.504H992.328z M1001.184,574.863c0.752-0.447,1.36-1.031,1.824-1.752c0.464-0.719,0.792-1.56,0.984-2.52    c0.191-0.96,0.288-1.936,0.288-2.928s-0.104-1.969-0.312-2.928c-0.208-0.961-0.552-1.816-1.032-2.568    c-0.479-0.752-1.096-1.359-1.848-1.824c-0.752-0.463-1.673-0.695-2.76-0.695c-1.121,0-2.057,0.232-2.809,0.695    c-0.752,0.465-1.36,1.064-1.823,1.801c-0.465,0.736-0.792,1.584-0.984,2.543c-0.192,0.961-0.288,1.953-0.288,2.977    c0,0.992,0.104,1.968,0.312,2.928c0.207,0.96,0.543,1.801,1.008,2.52c0.463,0.721,1.08,1.305,1.848,1.752    c0.768,0.449,1.696,0.673,2.784,0.673C999.496,575.536,1000.432,575.312,1001.184,574.863z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1021.271,574.048c1.024,0.992,2.496,1.488,4.416,1.488c1.376,0,2.56-0.344,3.553-1.032    c0.991-0.688,1.6-1.416,1.823-2.184h6c-0.96,2.976-2.432,5.104-4.416,6.384s-4.384,1.92-7.199,1.92    c-1.953,0-3.713-0.312-5.28-0.937c-1.568-0.623-2.896-1.512-3.984-2.664c-1.088-1.151-1.928-2.527-2.52-4.127    c-0.593-1.6-0.889-3.36-0.889-5.28c0-1.855,0.304-3.583,0.912-5.185c0.607-1.6,1.472-2.982,2.593-4.152    c1.119-1.167,2.455-2.088,4.008-2.76c1.552-0.672,3.271-1.008,5.16-1.008c2.111,0,3.951,0.408,5.52,1.225    c1.567,0.815,2.856,1.912,3.864,3.287c1.008,1.377,1.735,2.945,2.184,4.705s0.607,3.6,0.48,5.52h-17.904    C1019.687,571.456,1020.246,573.057,1021.271,574.048z M1028.975,560.992c-0.815-0.896-2.057-1.344-3.72-1.344    c-1.088,0-1.992,0.184-2.712,0.552s-1.296,0.824-1.729,1.368c-0.432,0.544-0.736,1.12-0.912,1.728    c-0.176,0.608-0.28,1.152-0.312,1.632h11.088C1030.358,563.2,1029.791,561.889,1028.975,560.992z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1046.807,555.184v3.457h0.144c0.864-1.44,1.984-2.488,3.36-3.145c1.375-0.656,2.784-0.984,4.224-0.984    c1.824,0,3.319,0.248,4.488,0.744c1.168,0.496,2.088,1.185,2.76,2.064c0.672,0.881,1.144,1.952,1.416,3.216    c0.271,1.265,0.408,2.664,0.408,4.2V580h-6.816v-14.016c0-2.048-0.32-3.576-0.96-4.584c-0.641-1.008-1.775-1.512-3.407-1.512    c-1.856,0-3.201,0.551-4.032,1.655c-0.833,1.104-1.248,2.921-1.248,5.448V580h-6.816v-24.816H1046.807z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1067.782,551.344v-5.615h6.815v5.615H1067.782z M1074.598,555.184V580h-6.815v-24.816H1074.598z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1085.254,555.184v3.457h0.144c0.864-1.44,1.984-2.488,3.36-3.145c1.375-0.656,2.784-0.984,4.224-0.984    c1.824,0,3.319,0.248,4.488,0.744c1.168,0.496,2.088,1.185,2.76,2.064c0.672,0.881,1.144,1.952,1.416,3.216    c0.271,1.265,0.408,2.664,0.408,4.2V580h-6.816v-14.016c0-2.048-0.32-3.576-0.96-4.584c-0.641-1.008-1.775-1.512-3.407-1.512    c-1.856,0-3.201,0.551-4.032,1.655c-0.833,1.104-1.248,2.921-1.248,5.448V580h-6.816v-24.816H1085.254z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1129.485,581.824c-0.272,1.279-0.856,2.472-1.752,3.576c-0.896,1.104-2.192,2.039-3.888,2.808    c-1.697,0.769-3.969,1.151-6.816,1.151c-1.217,0-2.456-0.152-3.72-0.455c-1.265-0.305-2.417-0.776-3.456-1.416    c-1.04-0.641-1.904-1.465-2.592-2.473c-0.688-1.008-1.08-2.216-1.177-3.623h6.769c0.319,1.279,0.943,2.167,1.872,2.664    c0.928,0.495,1.999,0.743,3.216,0.743c1.92,0,3.319-0.575,4.2-1.728c0.88-1.152,1.303-2.609,1.271-4.368v-3.265h-0.096    c-0.736,1.312-1.784,2.281-3.145,2.904c-1.36,0.624-2.792,0.936-4.296,0.936c-1.855,0-3.456-0.327-4.8-0.983    c-1.344-0.655-2.448-1.552-3.312-2.688c-0.864-1.135-1.496-2.463-1.896-3.983c-0.4-1.52-0.6-3.128-0.6-4.824    c0-1.6,0.231-3.144,0.695-4.632s1.145-2.8,2.04-3.936s2.008-2.041,3.337-2.713c1.327-0.672,2.855-1.008,4.584-1.008    c1.632,0,3.063,0.305,4.296,0.912c1.231,0.608,2.263,1.633,3.096,3.072h0.096v-3.312h6.48v23.232    C1129.894,579.408,1129.757,580.544,1129.485,581.824z M1120.149,573.568c0.735-0.385,1.344-0.896,1.824-1.536    c0.479-0.64,0.84-1.368,1.08-2.185c0.239-0.815,0.359-1.672,0.359-2.568c0-1.023-0.096-1.991-0.288-2.903    c-0.191-0.912-0.512-1.72-0.96-2.424s-1.04-1.264-1.775-1.681c-0.737-0.415-1.665-0.623-2.784-0.623    c-0.96,0-1.784,0.191-2.472,0.576c-0.689,0.383-1.265,0.904-1.729,1.56c-0.464,0.656-0.8,1.408-1.008,2.256    c-0.209,0.849-0.312,1.736-0.312,2.664c0,0.896,0.088,1.784,0.265,2.664c0.175,0.88,0.479,1.673,0.912,2.376    c0.432,0.704,0.999,1.28,1.703,1.729c0.704,0.447,1.584,0.672,2.641,0.672C1118.565,574.145,1119.413,573.952,1120.149,573.568z",
        //                "duration": 1800
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //        var title = {
        //          "nfusion-chemistry-title": {
        //            "strokepath": [
        //              {
        //                "path": "M1489.019,619.341h2.88v-0.12c-1.2-0.721-2.073-1.653-2.62-2.801c-0.546-1.146-0.82-2.319-0.82-3.52   c0-1.52,0.207-2.767,0.62-3.74c0.414-0.973,0.987-1.74,1.721-2.3s1.627-0.953,2.68-1.18c1.054-0.227,2.22-0.34,3.5-0.34h12.72v5.68   h-11.68c-1.706,0-2.98,0.267-3.82,0.8c-0.84,0.534-1.26,1.48-1.26,2.84c0,1.547,0.46,2.667,1.38,3.36s2.434,1.04,4.54,1.04h10.84   v5.68h-20.68V619.341z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1481.139,581.341h5.28v13.8h6.6v-11.96h4.88v11.96h11.8v6.28h-28.56V581.341z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1509.698,565.301h-2.88v0.12c1.2,0.72,2.067,1.653,2.601,2.8c0.532,1.147,0.8,2.32,0.8,3.521   c0,1.52-0.2,2.767-0.601,3.739c-0.399,0.975-0.966,1.74-1.699,2.301c-0.733,0.56-1.627,0.953-2.681,1.18   c-1.053,0.227-2.22,0.34-3.5,0.34h-12.72v-5.68h11.68c1.707,0,2.98-0.267,3.82-0.8s1.26-1.48,1.26-2.841   c0-1.546-0.46-2.666-1.38-3.359s-2.433-1.04-4.54-1.04h-10.84v-5.68h20.68V565.301z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1504.559,551.802c0.439-0.253,0.8-0.579,1.08-0.979s0.486-0.86,0.62-1.38c0.134-0.521,0.199-1.061,0.199-1.62   c0-0.4-0.046-0.82-0.14-1.26c-0.093-0.44-0.24-0.84-0.439-1.2c-0.2-0.36-0.467-0.66-0.801-0.9c-0.333-0.239-0.753-0.359-1.26-0.359   c-0.853,0-1.493,0.566-1.92,1.699c-0.426,1.134-0.854,2.714-1.28,4.74c-0.186,0.827-0.406,1.634-0.66,2.42   c-0.253,0.787-0.586,1.487-1,2.101c-0.413,0.613-0.933,1.106-1.56,1.479c-0.626,0.374-1.394,0.561-2.3,0.561   c-1.333,0-2.427-0.261-3.28-0.78c-0.853-0.521-1.526-1.206-2.02-2.061c-0.493-0.853-0.841-1.812-1.04-2.88   c-0.2-1.065-0.301-2.159-0.301-3.279s0.107-2.207,0.32-3.261c0.214-1.053,0.574-1.993,1.08-2.819   c0.507-0.826,1.18-1.514,2.021-2.061c0.84-0.546,1.899-0.873,3.18-0.979v5.399c-1.093,0.08-1.833,0.494-2.22,1.24   c-0.387,0.747-0.58,1.627-0.58,2.64c0,0.32,0.02,0.667,0.06,1.04c0.04,0.374,0.127,0.714,0.26,1.021   c0.134,0.307,0.327,0.566,0.58,0.78c0.254,0.214,0.594,0.319,1.021,0.319c0.507,0,0.92-0.186,1.24-0.56   c0.319-0.373,0.579-0.86,0.779-1.46c0.2-0.601,0.38-1.286,0.54-2.061c0.16-0.772,0.334-1.56,0.521-2.359   c0.187-0.826,0.413-1.634,0.68-2.42s0.62-1.486,1.06-2.101c0.44-0.613,0.987-1.106,1.641-1.479s1.46-0.561,2.42-0.561   c1.36,0,2.5,0.274,3.42,0.82c0.92,0.547,1.66,1.26,2.22,2.14c0.561,0.88,0.954,1.888,1.181,3.021c0.226,1.134,0.34,2.287,0.34,3.46   c0,1.2-0.12,2.374-0.36,3.52c-0.24,1.147-0.64,2.167-1.2,3.061c-0.56,0.894-1.3,1.627-2.22,2.2s-2.073,0.887-3.46,0.939v-5.399   C1503.592,552.183,1504.118,552.056,1504.559,551.802z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1485.818,535.942h-4.68v-5.68h4.68V535.942z M1489.019,530.263h20.68v5.68h-20.68V530.263z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1494.879,526.662c-1.347-0.506-2.493-1.226-3.44-2.16c-0.946-0.933-1.68-2.053-2.2-3.359   c-0.52-1.307-0.78-2.773-0.78-4.4c0-1.626,0.261-3.1,0.78-4.42c0.521-1.32,1.254-2.446,2.2-3.38c0.947-0.934,2.094-1.653,3.44-2.16   c1.347-0.506,2.847-0.76,4.5-0.76s3.146,0.254,4.479,0.76c1.334,0.507,2.474,1.227,3.42,2.16c0.947,0.934,1.674,2.06,2.18,3.38   c0.507,1.32,0.761,2.794,0.761,4.42c0,1.627-0.254,3.094-0.761,4.4c-0.506,1.307-1.232,2.427-2.18,3.359   c-0.946,0.935-2.086,1.654-3.42,2.16c-1.333,0.507-2.826,0.761-4.479,0.761S1496.226,527.169,1494.879,526.662z M1501.799,521.502   c0.786-0.159,1.493-0.433,2.12-0.819c0.626-0.387,1.126-0.9,1.5-1.54c0.373-0.641,0.56-1.44,0.56-2.4s-0.187-1.766-0.56-2.42   c-0.374-0.653-0.874-1.173-1.5-1.56c-0.627-0.387-1.334-0.66-2.12-0.82s-1.594-0.24-2.42-0.24c-0.827,0-1.641,0.08-2.44,0.24   s-1.506,0.434-2.12,0.82c-0.613,0.387-1.113,0.906-1.5,1.56c-0.386,0.654-0.58,1.46-0.58,2.42s0.194,1.76,0.58,2.4   c0.387,0.64,0.887,1.153,1.5,1.54c0.614,0.387,1.32,0.66,2.12,0.819c0.8,0.16,1.613,0.24,2.44,0.24   C1500.205,521.742,1501.013,521.662,1501.799,521.502z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1489.019,497.943h2.88v-0.12c-1.2-0.721-2.073-1.653-2.62-2.801c-0.546-1.146-0.82-2.319-0.82-3.52   c0-1.52,0.207-2.767,0.62-3.74c0.414-0.973,0.987-1.74,1.721-2.3s1.627-0.953,2.68-1.18c1.054-0.227,2.22-0.34,3.5-0.34h12.72v5.68   h-11.68c-1.706,0-2.98,0.267-3.82,0.8c-0.84,0.534-1.26,1.48-1.26,2.84c0,1.547,0.46,2.667,1.38,3.36s2.434,1.04,4.54,1.04h10.84   v5.68h-20.68V497.943z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1481.139,461.063l19.64-6.681v-0.08l-19.64-6.319v-8.84h28.56v5.88h-20.24v0.08l20.24,7v4.84l-20.04,7v0.08   h20.04v5.88h-28.56V461.063z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1495.379,435.464c-1.334-0.08-2.44-0.413-3.32-1c-0.88-0.586-1.586-1.333-2.12-2.24   c-0.533-0.906-0.913-1.926-1.14-3.06s-0.341-2.273-0.341-3.42c0-1.04,0.074-2.094,0.221-3.16s0.434-2.04,0.859-2.92   c0.428-0.88,1.021-1.601,1.78-2.16c0.76-0.561,1.767-0.84,3.021-0.84h10.76c0.934,0,1.827-0.054,2.68-0.16   c0.854-0.106,1.494-0.293,1.92-0.561v5.761c-0.319,0.106-0.646,0.193-0.979,0.26s-0.674,0.113-1.021,0.14   c0.934,0.907,1.587,1.974,1.96,3.2s0.561,2.48,0.561,3.76c0,0.987-0.12,1.907-0.36,2.761s-0.613,1.6-1.12,2.239   c-0.506,0.641-1.146,1.141-1.92,1.5c-0.773,0.36-1.693,0.54-2.76,0.54c-1.173,0-2.14-0.206-2.9-0.62   c-0.76-0.413-1.366-0.946-1.819-1.6s-0.794-1.4-1.021-2.24s-0.406-1.686-0.54-2.54c-0.133-0.853-0.24-1.692-0.32-2.52   c-0.079-0.826-0.199-1.561-0.359-2.2s-0.394-1.146-0.7-1.52c-0.307-0.374-0.753-0.547-1.34-0.521c-0.613,0-1.101,0.1-1.46,0.3   c-0.36,0.2-0.641,0.467-0.84,0.8c-0.2,0.334-0.333,0.721-0.4,1.16c-0.066,0.44-0.1,0.914-0.1,1.42c0,1.12,0.239,2,0.72,2.641   c0.479,0.64,1.28,1.014,2.4,1.12V435.464z M1499.578,422.344c0.214,0.24,0.38,0.54,0.5,0.9c0.12,0.359,0.221,0.746,0.301,1.159   c0.079,0.414,0.146,0.848,0.199,1.301c0.054,0.453,0.12,0.906,0.2,1.359c0.08,0.427,0.188,0.848,0.32,1.261   c0.134,0.413,0.313,0.773,0.54,1.079c0.227,0.308,0.514,0.555,0.859,0.74c0.348,0.188,0.787,0.28,1.32,0.28   c0.507,0,0.934-0.093,1.28-0.28c0.347-0.186,0.62-0.439,0.82-0.76c0.199-0.32,0.34-0.693,0.42-1.12   c0.08-0.426,0.119-0.866,0.119-1.32c0-1.119-0.186-1.985-0.56-2.6c-0.373-0.613-0.82-1.066-1.34-1.36   c-0.521-0.293-1.046-0.473-1.58-0.54c-0.533-0.065-0.96-0.1-1.28-0.1H1499.578z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1489.019,407.864h2.88v-0.12c-1.2-0.721-2.073-1.653-2.62-2.801c-0.546-1.146-0.82-2.319-0.82-3.52   c0-1.52,0.207-2.767,0.62-3.74c0.414-0.973,0.987-1.74,1.721-2.3s1.627-0.953,2.68-1.18c1.054-0.227,2.22-0.34,3.5-0.34h12.72v5.68   h-11.68c-1.706,0-2.98,0.267-3.82,0.8c-0.84,0.534-1.26,1.48-1.26,2.84c0,1.547,0.46,2.667,1.38,3.36s2.434,1.04,4.54,1.04h10.84   v5.68h-20.68V407.864z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1495.379,390.784c-1.334-0.08-2.44-0.413-3.32-1c-0.88-0.586-1.586-1.333-2.12-2.24   c-0.533-0.906-0.913-1.926-1.14-3.06s-0.341-2.273-0.341-3.42c0-1.04,0.074-2.094,0.221-3.16s0.434-2.04,0.859-2.92   c0.428-0.88,1.021-1.601,1.78-2.16c0.76-0.561,1.767-0.84,3.021-0.84h10.76c0.934,0,1.827-0.054,2.68-0.16   c0.854-0.106,1.494-0.293,1.92-0.561v5.761c-0.319,0.106-0.646,0.193-0.979,0.26s-0.674,0.113-1.021,0.14   c0.934,0.907,1.587,1.974,1.96,3.2s0.561,2.48,0.561,3.76c0,0.987-0.12,1.907-0.36,2.761s-0.613,1.6-1.12,2.239   c-0.506,0.641-1.146,1.141-1.92,1.5c-0.773,0.36-1.693,0.54-2.76,0.54c-1.173,0-2.14-0.206-2.9-0.62   c-0.76-0.413-1.366-0.946-1.819-1.6s-0.794-1.4-1.021-2.24s-0.406-1.686-0.54-2.54c-0.133-0.853-0.24-1.692-0.32-2.52   c-0.079-0.826-0.199-1.561-0.359-2.2s-0.394-1.146-0.7-1.52c-0.307-0.374-0.753-0.547-1.34-0.521c-0.613,0-1.101,0.1-1.46,0.3   c-0.36,0.2-0.641,0.467-0.84,0.8c-0.2,0.334-0.333,0.721-0.4,1.16c-0.066,0.44-0.1,0.914-0.1,1.42c0,1.12,0.239,2,0.72,2.641   c0.479,0.64,1.28,1.014,2.4,1.12V390.784z M1499.578,377.664c0.214,0.24,0.38,0.54,0.5,0.9c0.12,0.359,0.221,0.746,0.301,1.159   c0.079,0.414,0.146,0.848,0.199,1.301c0.054,0.453,0.12,0.906,0.2,1.359c0.08,0.427,0.188,0.848,0.32,1.261   c0.134,0.413,0.313,0.773,0.54,1.079c0.227,0.308,0.514,0.555,0.859,0.74c0.348,0.188,0.787,0.28,1.32,0.28   c0.507,0,0.934-0.093,1.28-0.28c0.347-0.186,0.62-0.439,0.82-0.76c0.199-0.32,0.34-0.693,0.42-1.12   c0.08-0.426,0.119-0.866,0.119-1.32c0-1.119-0.186-1.985-0.56-2.6c-0.373-0.613-0.82-1.066-1.34-1.36   c-0.521-0.293-1.046-0.473-1.58-0.54c-0.533-0.065-0.96-0.1-1.28-0.1H1499.578z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1511.219,349.045c1.066,0.228,2.06,0.714,2.979,1.46c0.92,0.747,1.7,1.827,2.34,3.24   c0.641,1.414,0.96,3.307,0.96,5.68c0,1.014-0.126,2.047-0.38,3.101s-0.646,2.014-1.18,2.88c-0.534,0.867-1.22,1.587-2.06,2.16   c-0.841,0.573-1.848,0.899-3.021,0.979v-5.64c1.066-0.267,1.807-0.786,2.22-1.561c0.413-0.772,0.62-1.666,0.62-2.68   c0-1.6-0.479-2.767-1.439-3.5s-2.174-1.086-3.641-1.06h-2.72v0.08c1.094,0.613,1.9,1.486,2.42,2.619   c0.521,1.134,0.78,2.327,0.78,3.58c0,1.547-0.273,2.88-0.82,4c-0.546,1.12-1.293,2.04-2.24,2.761   c-0.946,0.72-2.053,1.246-3.319,1.58c-1.267,0.333-2.606,0.5-4.021,0.5c-1.333,0-2.62-0.193-3.859-0.58   c-1.24-0.387-2.334-0.953-3.28-1.7c-0.946-0.746-1.7-1.673-2.26-2.78c-0.561-1.106-0.841-2.38-0.841-3.82   c0-1.359,0.254-2.553,0.761-3.58c0.507-1.025,1.359-1.886,2.56-2.579v-0.08h-2.76v-5.4h19.36   C1509.205,348.705,1510.151,348.819,1511.219,349.045z M1504.339,356.825c-0.32-0.613-0.747-1.12-1.28-1.521   c-0.533-0.399-1.14-0.699-1.82-0.899c-0.68-0.2-1.393-0.3-2.14-0.3c-0.854,0-1.66,0.08-2.42,0.239   c-0.76,0.16-1.434,0.428-2.021,0.801c-0.586,0.373-1.053,0.866-1.399,1.479c-0.347,0.614-0.521,1.387-0.521,2.32   c0,0.8,0.16,1.486,0.48,2.06c0.319,0.574,0.754,1.054,1.3,1.44c0.547,0.387,1.174,0.667,1.88,0.84   c0.707,0.174,1.447,0.26,2.22,0.26c0.747,0,1.487-0.073,2.221-0.22s1.394-0.4,1.979-0.76c0.587-0.36,1.067-0.833,1.44-1.42   s0.56-1.32,0.56-2.2C1504.818,358.146,1504.658,357.438,1504.339,356.825z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1504.738,339.064c0.827-0.853,1.24-2.08,1.24-3.68c0-1.146-0.286-2.133-0.86-2.96   c-0.573-0.826-1.18-1.333-1.819-1.521v-5c2.479,0.801,4.253,2.027,5.319,3.681c1.067,1.653,1.601,3.653,1.601,6   c0,1.627-0.261,3.094-0.78,4.399c-0.52,1.308-1.26,2.414-2.22,3.32c-0.96,0.907-2.106,1.606-3.44,2.1   c-1.333,0.494-2.8,0.74-4.399,0.74c-1.547,0-2.986-0.253-4.32-0.76c-1.333-0.506-2.486-1.227-3.46-2.16   c-0.974-0.933-1.74-2.046-2.3-3.34c-0.561-1.293-0.841-2.727-0.841-4.3c0-1.761,0.341-3.293,1.021-4.601   c0.68-1.306,1.594-2.38,2.74-3.22s2.453-1.446,3.92-1.82c1.467-0.373,3-0.506,4.6-0.399v14.92   C1502.578,340.385,1503.912,339.918,1504.738,339.064z M1493.858,332.645c-0.746,0.68-1.12,1.714-1.12,3.101   c0,0.906,0.154,1.659,0.46,2.26c0.307,0.6,0.688,1.08,1.141,1.439c0.453,0.36,0.934,0.614,1.439,0.761   c0.507,0.146,0.96,0.233,1.36,0.26v-9.24C1495.698,331.491,1494.605,331.965,1493.858,332.645z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1489.019,317.666h2.8v-0.08c-1.066-0.746-1.893-1.646-2.479-2.7c-0.587-1.053-0.881-2.26-0.881-3.62   c0-1.307,0.254-2.5,0.761-3.58s1.399-1.899,2.68-2.46c-0.906-0.613-1.706-1.446-2.4-2.5c-0.692-1.053-1.04-2.3-1.04-3.74   c0-1.093,0.134-2.105,0.4-3.04c0.267-0.933,0.693-1.732,1.28-2.399c0.587-0.666,1.354-1.187,2.3-1.561   c0.947-0.373,2.087-0.56,3.42-0.56h13.84v5.68h-11.72c-0.693,0-1.347,0.027-1.96,0.08c-0.613,0.054-1.146,0.2-1.6,0.44   c-0.453,0.239-0.813,0.594-1.08,1.06c-0.267,0.467-0.4,1.101-0.4,1.9s0.153,1.446,0.46,1.939c0.307,0.494,0.707,0.88,1.2,1.16   s1.054,0.467,1.68,0.561c0.627,0.094,1.26,0.14,1.9,0.14h11.52v5.68h-11.6c-0.613,0-1.22,0.014-1.82,0.04   c-0.6,0.027-1.153,0.141-1.66,0.34c-0.506,0.2-0.913,0.534-1.22,1c-0.307,0.467-0.46,1.154-0.46,2.061c0,0.267,0.06,0.62,0.18,1.06   c0.12,0.44,0.348,0.867,0.681,1.28c0.333,0.414,0.813,0.767,1.439,1.06c0.627,0.294,1.447,0.44,2.46,0.44h12v5.68h-20.68V317.666z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1504.738,281.865c0.827-0.853,1.24-2.08,1.24-3.68c0-1.146-0.286-2.133-0.86-2.96   c-0.573-0.826-1.18-1.333-1.819-1.521v-5c2.479,0.801,4.253,2.027,5.319,3.681c1.067,1.653,1.601,3.653,1.601,6   c0,1.627-0.261,3.094-0.78,4.399c-0.52,1.308-1.26,2.414-2.22,3.32c-0.96,0.907-2.106,1.606-3.44,2.1   c-1.333,0.494-2.8,0.74-4.399,0.74c-1.547,0-2.986-0.253-4.32-0.76c-1.333-0.506-2.486-1.227-3.46-2.16   c-0.974-0.933-1.74-2.046-2.3-3.34c-0.561-1.293-0.841-2.727-0.841-4.3c0-1.761,0.341-3.293,1.021-4.601   c0.68-1.306,1.594-2.38,2.74-3.22s2.453-1.446,3.92-1.82c1.467-0.373,3-0.506,4.6-0.399v14.92   C1502.578,283.186,1503.912,282.719,1504.738,281.865z M1493.858,275.445c-0.746,0.68-1.12,1.714-1.12,3.101   c0,0.906,0.154,1.659,0.46,2.26c0.307,0.6,0.688,1.08,1.141,1.439c0.453,0.36,0.934,0.614,1.439,0.761   c0.507,0.146,0.96,0.233,1.36,0.26v-9.24C1495.698,274.292,1494.605,274.766,1493.858,275.445z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1489.019,260.587h2.88v-0.12c-1.2-0.721-2.073-1.653-2.62-2.801c-0.546-1.146-0.82-2.319-0.82-3.52   c0-1.52,0.207-2.767,0.62-3.74c0.414-0.973,0.987-1.74,1.721-2.3s1.627-0.953,2.68-1.18c1.054-0.227,2.22-0.34,3.5-0.34h12.72v5.68   h-11.68c-1.706,0-2.98,0.267-3.82,0.8c-0.84,0.534-1.26,1.48-1.26,2.84c0,1.547,0.46,2.667,1.38,3.36s2.434,1.04,4.54,1.04h10.84   v5.68h-20.68V260.587z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1489.019,231.907h3.8v4.159h10.24c0.96,0,1.6-0.159,1.92-0.479s0.479-0.96,0.479-1.92   c0-0.32-0.013-0.627-0.039-0.92s-0.066-0.573-0.12-0.84h4.399c0.08,0.479,0.134,1.014,0.16,1.6c0.026,0.587,0.04,1.16,0.04,1.72   c0,0.88-0.06,1.714-0.18,2.5c-0.12,0.787-0.354,1.48-0.7,2.08c-0.347,0.601-0.84,1.074-1.48,1.42   c-0.64,0.347-1.479,0.521-2.52,0.521h-12.2v3.439h-3.8v-3.439h-6.2v-5.681h6.2V231.907z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1502.658,214.668c0.667-0.347,1.207-0.807,1.62-1.381c0.414-0.572,0.72-1.246,0.92-2.02s0.3-1.573,0.3-2.4   c0-0.56-0.046-1.159-0.14-1.8c-0.093-0.64-0.273-1.24-0.54-1.8s-0.633-1.026-1.1-1.4c-0.467-0.373-1.061-0.56-1.78-0.56   c-0.773,0-1.4,0.247-1.88,0.74c-0.48,0.493-0.88,1.14-1.2,1.939s-0.6,1.707-0.84,2.721s-0.506,2.039-0.8,3.079   c-0.267,1.067-0.594,2.107-0.98,3.12c-0.386,1.014-0.886,1.92-1.5,2.721c-0.613,0.8-1.38,1.446-2.3,1.939   c-0.92,0.494-2.033,0.74-3.34,0.74c-1.467,0-2.74-0.313-3.82-0.94c-1.08-0.626-1.979-1.446-2.7-2.46   c-0.72-1.013-1.253-2.16-1.6-3.439c-0.347-1.28-0.521-2.561-0.521-3.84c0-1.493,0.167-2.927,0.5-4.301   c0.334-1.373,0.874-2.593,1.62-3.659c0.747-1.066,1.7-1.913,2.86-2.54s2.566-0.94,4.22-0.94v6.08   c-0.853,0.054-1.56,0.233-2.12,0.54c-0.56,0.307-1,0.714-1.319,1.22c-0.32,0.507-0.547,1.087-0.681,1.74   c-0.133,0.653-0.199,1.367-0.199,2.14c0,0.507,0.054,1.014,0.159,1.521c0.107,0.507,0.294,0.967,0.561,1.38   c0.267,0.414,0.6,0.754,1,1.02c0.399,0.268,0.907,0.4,1.52,0.4c0.561,0,1.014-0.106,1.36-0.32c0.347-0.213,0.667-0.633,0.96-1.26   c0.294-0.626,0.587-1.493,0.88-2.6c0.294-1.106,0.667-2.554,1.12-4.34c0.106-0.533,0.3-1.273,0.58-2.221   c0.28-0.946,0.727-1.886,1.34-2.819c0.614-0.934,1.434-1.74,2.46-2.421c1.027-0.68,2.34-1.02,3.94-1.02   c1.307,0,2.52,0.254,3.64,0.76c1.12,0.507,2.087,1.26,2.9,2.26s1.446,2.24,1.899,3.721c0.453,1.479,0.681,3.193,0.681,5.14   c0,1.574-0.194,3.101-0.58,4.58c-0.387,1.48-0.993,2.787-1.82,3.92c-0.826,1.134-1.88,2.034-3.16,2.7   c-1.28,0.667-2.8,0.986-4.56,0.96v-6.08C1501.179,215.188,1501.992,215.015,1502.658,214.668z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1504.738,189.027c0.827-0.853,1.24-2.08,1.24-3.68c0-1.146-0.286-2.133-0.86-2.96   c-0.573-0.826-1.18-1.333-1.819-1.521v-5c2.479,0.801,4.253,2.027,5.319,3.681c1.067,1.653,1.601,3.653,1.601,6   c0,1.627-0.261,3.094-0.78,4.399c-0.52,1.308-1.26,2.414-2.22,3.32c-0.96,0.907-2.106,1.606-3.44,2.1   c-1.333,0.494-2.8,0.74-4.399,0.74c-1.547,0-2.986-0.253-4.32-0.76c-1.333-0.506-2.486-1.227-3.46-2.16   c-0.974-0.933-1.74-2.046-2.3-3.34c-0.561-1.293-0.841-2.727-0.841-4.3c0-1.761,0.341-3.293,1.021-4.601   c0.68-1.306,1.594-2.38,2.74-3.22s2.453-1.446,3.92-1.82c1.467-0.373,3-0.506,4.6-0.399v14.92   C1502.578,190.348,1503.912,189.881,1504.738,189.027z M1493.858,182.607c-0.746,0.68-1.12,1.714-1.12,3.101   c0,0.906,0.154,1.659,0.46,2.26c0.307,0.6,0.688,1.08,1.141,1.439c0.453,0.36,0.934,0.614,1.439,0.761   c0.507,0.146,0.96,0.233,1.36,0.26v-9.24C1495.698,181.454,1494.605,181.928,1493.858,182.607z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1489.019,167.749h3.84v-0.08c-0.64-0.267-1.233-0.627-1.78-1.08c-0.546-0.453-1.013-0.974-1.399-1.561   c-0.387-0.586-0.687-1.213-0.9-1.88c-0.213-0.666-0.32-1.359-0.32-2.08c0-0.373,0.067-0.786,0.2-1.24h5.28   c-0.053,0.268-0.1,0.587-0.14,0.961c-0.04,0.373-0.061,0.733-0.061,1.079c0,1.04,0.174,1.921,0.521,2.641s0.819,1.3,1.42,1.74   c0.6,0.439,1.3,0.753,2.1,0.939s1.667,0.28,2.601,0.28h9.319v5.68h-20.68V167.749z",
        //                "duration": 800
        //                    },
        //              {
        //                "path": "M1509.698,153.468l-20.68,7.08v-5.96l14.12-4.359v-0.08l-14.12-4.36v-5.64l20.68,7V153.468z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1485.818,138.629h-4.68v-5.68h4.68V138.629z M1489.019,132.949h20.68v5.68h-20.68V132.949z",
        //                "duration": 600
        //                    },
        //              {
        //                "path": "M1492.738,119.589c0,0.907,0.207,1.667,0.62,2.28c0.414,0.613,0.947,1.113,1.6,1.5   c0.654,0.387,1.374,0.66,2.16,0.819c0.787,0.16,1.567,0.24,2.34,0.24c0.747,0,1.508-0.08,2.28-0.24   c0.774-0.159,1.474-0.42,2.101-0.779c0.627-0.36,1.14-0.847,1.54-1.46c0.399-0.613,0.6-1.36,0.6-2.24c0-1.36-0.38-2.406-1.14-3.14   c-0.761-0.733-1.78-1.193-3.061-1.381v-5.479c2.747,0.374,4.84,1.439,6.28,3.2c1.439,1.76,2.16,4.014,2.16,6.76   c0,1.547-0.261,2.967-0.78,4.26c-0.52,1.294-1.246,2.394-2.18,3.3c-0.934,0.907-2.047,1.614-3.34,2.12   c-1.294,0.507-2.714,0.761-4.261,0.761c-1.6,0-3.086-0.233-4.46-0.7c-1.373-0.467-2.56-1.153-3.56-2.061   c-1-0.906-1.78-2.013-2.34-3.319c-0.561-1.307-0.841-2.801-0.841-4.48c0-1.227,0.16-2.406,0.48-3.54   c0.32-1.133,0.807-2.146,1.46-3.04c0.653-0.893,1.467-1.62,2.44-2.18c0.974-0.561,2.127-0.88,3.46-0.96v5.56   C1493.926,115.763,1492.738,117.163,1492.738,119.589z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1504.738,101.43c0.827-0.853,1.24-2.08,1.24-3.68c0-1.146-0.286-2.133-0.86-2.96   c-0.573-0.826-1.18-1.333-1.819-1.521v-5c2.479,0.801,4.253,2.027,5.319,3.681c1.067,1.653,1.601,3.653,1.601,6   c0,1.627-0.261,3.094-0.78,4.399c-0.52,1.308-1.26,2.414-2.22,3.32c-0.96,0.907-2.106,1.606-3.44,2.1   c-1.333,0.494-2.8,0.74-4.399,0.74c-1.547,0-2.986-0.253-4.32-0.76c-1.333-0.506-2.486-1.227-3.46-2.16   c-0.974-0.933-1.74-2.046-2.3-3.34c-0.561-1.293-0.841-2.727-0.841-4.3c0-1.761,0.341-3.293,1.021-4.601   c0.68-1.306,1.594-2.38,2.74-3.22s2.453-1.446,3.92-1.82c1.467-0.373,3-0.506,4.6-0.399v14.92   C1502.578,102.75,1503.912,102.283,1504.738,101.43z M1493.858,95.01c-0.746,0.68-1.12,1.714-1.12,3.101   c0,0.906,0.154,1.659,0.46,2.26c0.307,0.6,0.688,1.08,1.141,1.439c0.453,0.36,0.934,0.614,1.439,0.761   c0.507,0.146,0.96,0.233,1.36,0.26v-9.24C1495.698,93.856,1494.605,94.33,1493.858,95.01z",
        //                "duration": 1800
        //                    },
        //              {
        //                "path": "M1504.559,80.77c0.439-0.253,0.8-0.579,1.08-0.979s0.486-0.86,0.62-1.38c0.134-0.521,0.199-1.061,0.199-1.62   c0-0.4-0.046-0.82-0.14-1.26c-0.093-0.44-0.24-0.84-0.439-1.2c-0.2-0.36-0.467-0.66-0.801-0.9c-0.333-0.239-0.753-0.359-1.26-0.359   c-0.853,0-1.493,0.566-1.92,1.699c-0.426,1.134-0.854,2.714-1.28,4.74c-0.186,0.827-0.406,1.634-0.66,2.42   c-0.253,0.787-0.586,1.487-1,2.101c-0.413,0.613-0.933,1.106-1.56,1.479c-0.626,0.374-1.394,0.561-2.3,0.561   c-1.333,0-2.427-0.261-3.28-0.78c-0.853-0.521-1.526-1.206-2.02-2.061c-0.493-0.853-0.841-1.812-1.04-2.88   c-0.2-1.065-0.301-2.159-0.301-3.279s0.107-2.207,0.32-3.261c0.214-1.053,0.574-1.993,1.08-2.819   c0.507-0.826,1.18-1.514,2.021-2.061c0.84-0.546,1.899-0.873,3.18-0.979v5.399c-1.093,0.08-1.833,0.494-2.22,1.24   c-0.387,0.747-0.58,1.627-0.58,2.64c0,0.32,0.02,0.667,0.06,1.04c0.04,0.374,0.127,0.714,0.26,1.021   c0.134,0.307,0.327,0.566,0.58,0.78c0.254,0.214,0.594,0.319,1.021,0.319c0.507,0,0.92-0.186,1.24-0.56   c0.319-0.373,0.579-0.86,0.779-1.46c0.2-0.601,0.38-1.286,0.54-2.061c0.16-0.772,0.334-1.56,0.521-2.359   c0.187-0.826,0.413-1.634,0.68-2.42s0.62-1.486,1.06-2.101c0.44-0.613,0.987-1.106,1.641-1.479s1.46-0.561,2.42-0.561   c1.36,0,2.5,0.274,3.42,0.82c0.92,0.547,1.66,1.26,2.22,2.14c0.561,0.88,0.954,1.888,1.181,3.021c0.226,1.134,0.34,2.287,0.34,3.46   c0,1.2-0.12,2.374-0.36,3.52c-0.24,1.147-0.64,2.167-1.2,3.061c-0.56,0.894-1.3,1.627-2.22,2.2s-2.073,0.887-3.46,0.939V81.15   C1503.592,81.15,1504.118,81.023,1504.559,80.77z",
        //                "duration": 1800
        //                    }
        //                ],
        //            "dimensions": {
        //              "width": 1600,
        //              "height": 750
        //            }
        //          }
        //        };
        //
        //        $('#grid-path').lazylinepainter({
        //          "svgData": grid,
        //          "strokeWidth": 1,
        //          "strokeColor": "#ffffff",
        //          "onComplete": function () {
        //            $('#nfusion-chemistry-title').lazylinepainter('paint');
        //            $('#icon-path').lazylinepainter('paint');
        //            $('#grid-path').animate({
        //              opacity: .25
        //            });
        //          },
        //          "drawSequential": false,
        //          //             'reverse': true
        //        });
        //        $('#chisel-path').lazylinepainter({
        //          "svgData": chisel,
        //          "strokeWidth": 1,
        //          "strokeColor": "#ffffff",
        //          //          "drawSequential": false,
        //          'reverse': true,
        //          "onComplete": function () {
        //            //            $('#chisel-fill').fadeIn(500);
        //            $('#chisel-fill').animate({
        //              opacity: 1
        //            });
        //            $('#chisel-path').animate({
        //              opacity: .25
        //            });
        //          }
        //        });
        //        $('#circles-path').lazylinepainter({
        //          "svgData": circles,
        //          "strokeWidth": 1,
        //          "strokeColor": "#ffffff",
        //          "drawSequential": false,
        //          "onComplete": function () {
        //            $('#icon-fill, #icon-path, #circles-path').animate({
        //              opacity: .1
        //            });
        //          }
        //        });
        //        $('#nfusion-chemistry-g1').lazylinepainter({
        //          "svgData": g1,
        //          "strokeWidth": .5,
        //          "strokeColor": "#ffffff",
        //          "drawSequential": false,
        //          "onComplete": function () {
        //            $('#g1-fill').animate({
        //              opacity: 1
        //            });
        //            //            $('#nfusion-chemistry-g2').lazylinepainter('paint');
        //          }
        //          //             'delay': 2500
        //          //             'reverse': true
        //        });
        //        $('#nfusion-chemistry-g2').lazylinepainter({
        //          "svgData": g2,
        //          "strokeWidth": .5,
        //          "strokeColor": "#ffffff",
        //          "drawSequential": false,
        //          "onComplete": function () {
        //            $('#g2-fill').animate({
        //              opacity: 1
        //            });
        //            //            $('#nfusion-chemistry-g3').lazylinepainter('paint');
        //          }
        //          //             'delay': 2500
        //          //             'reverse': true
        //        });
        //        $('#nfusion-chemistry-g3').lazylinepainter({
        //          "svgData": g3,
        //          "strokeWidth": .5,
        //          "strokeColor": "#ffffff",
        //          "drawSequential": false,
        //          "onComplete": function () {
        //            $('#g3-fill').animate({
        //              opacity: 1
        //            });
        //            //            $('#nfusion-chemistry-g4').lazylinepainter('paint');
        //          }
        //          //             'delay': 2500
        //          //             'reverse': true
        //        });
        //        $('#nfusion-chemistry-g4').lazylinepainter({
        //          "svgData": g4,
        //          "strokeWidth": .5,
        //          "strokeColor": "#ffffff",
        //          "drawSequential": false,
        //          "onComplete": function () {
        //            $('#g4-fill').animate({
        //              opacity: 1
        //            });
        //          }
        //          //             'delay': 2500
        //          //             'reverse': true
        //        });
        //        $('#nfusion-chemistry-title').lazylinepainter({
        //          "svgData": title,
        //          "strokeWidth": .5,
        //          "strokeColor": "#ffffff",
        //          "drawSequential": false,
        //          "onComplete": function () {
        //          }
        //          //             'delay': 2500
        //          //             'reverse': true
        //        });
        //        $('#icon-path').lazylinepainter({
        //          "svgData": iconpath,
        //          "strokeWidth": 1,
        //          "strokeColor": "#ffffff",
        //          "drawSequential": false,
        //          //          'delay': 2100,
        //          "onComplete": function () {
        //            //            $('#icon-fill').fadeIn(300);
        //            $('#icon-fill').animate({
        //              opacity: 1
        //            });
        //            $('#circles-path').lazylinepainter('paint');
        //            $('#chisel-path').lazylinepainter('paint');
        //          }
        //          //             'reverse': true
        //        });
        //

        $('.process').hcSticky({
          stickTo: '.process-wrapper',
          stickyClass: 'sticky',
          top: $('header.floater').outerHeight()
        });
        $('.service-header').each(function () {
          var base = $('html').css('font-size').replace('px', '');
          var parent = $(this).parents('.service-header').attr('id');

          $(this).hcSticky({
            stickTo: parent,
            stickyClass: 'sticky',
            //            top: $('header.floater').outerHeight(),
            bottomEnd: base * -5,
            followScroll: false
          });
        });

      }
    },
    'page_id_27': {
      finalize: function () {

        $.modu = function (check, against) {
          return check % against === 0;
        };

        $('.timeline li .card').hover(function (e) {
          //          e.stopPropagation();
          var parent = $(this).parents('li');
          var id = $(this).parents('li').attr('id');
          var no = $(this).parents('li').attr('data-attr');
          var card = $(this).html();
          var width = $(this).outerWidth();
          var height = $(this).outerHeight();
          var date = $(parent).find('.event-label').text();

          if ($(parent).hasClass('hover')) {
            $('.timeline li').not(parent).removeClass('no-hover').removeClass('hover');
            $(parent).removeClass('hover').removeClass('no-hover');

            $('.bg').animate({
              opacity: 0
            }).addClass('last');

            setTimeout(function () {
              $('.bg.last').remove();
            }, 500);
            $('.floating.card').addClass('last');
            $('.floating.card.last').animate({
              opacity: 0
            });

            setTimeout(function () {
              $('.floating.card.last').remove();
            }, 550);

            setTimeout(function () {
              $('.floating.card.last').remove();
              $('.timeline-container').removeClass('hovering');
              $('body').removeClass('history-hovering');

            }, 400);
          } else {
            var x = $(this).offset().left;
            var y = $(this).offset().top - $('.overlay-layer').offset().top;
            var yBottom = $('.overlay-layer').outerHeight() - y - height;

            $('.timeline-container').addClass('hovering');
            $('body').addClass('history-hovering');
            $('.timeline li').not(parent).removeClass('hover').addClass('no-hover');
            $(parent).addClass('hover').removeClass('no-hover');
            var img = $(parent).find('img').attr('src');

            setTimeout(function () {
              $('.bg').not('.' + id + '').remove();
            }, 500);
            $('.timeline-container').prepend('<div class="bg ' + id + '"><img src="' + img + '"></div>');

            $('.' + id + '').delay(100).animate({
              opacity: 1
            });

            if ($.modu(no, 4)) {
              $('.overlay-layer').append('<div class="floating card ' + id + '" style="bottom: ' + yBottom + 'px; left: ' + x + 'px; width: ' + width + 'px">' + card + '</div>');

            } else {

              $('.overlay-layer').append('<div class="floating card ' + id + '" style="top: ' + y + 'px; left: ' + x + 'px; width: ' + width + 'px">' + card + '</div>');

            }

          }
        });

      }
    },
    'single_post': {
      finalize: function () {

        var editor = $('.editor');

        editor.attr('style', '--width: ' + (editor.offset().left + 15) + 'px');

        $('.wp-block-video').each(function () {

          var src = $(this).find('video').attr('src');
          var classes = $(this).attr('class');
          var poster = $(this).find('video').attr('poster');
          var index = $('.wp-block-video').index(this);

          var id = 'vjs-html-' + index;

          if ($(this).find('figcaption').length) {

            var label = $(this).find('figcaption').text();

            $(this).before('<div class="video-js ' + classes + '" id="' + id + '"></div><label>' + label + '</label>');

          } else {

            $(this).before('<div class="video-js ' + classes + '" id="' + id + '"></div>');

          }

          $(this).css('display', 'none');

          videojs(id, {
            controls: true,
            poster: poster,
            sources: [{
              "type": "video/mp4",
              "src": src,
              "poster": poster
            }],
          });

        });

        $('.wp-block-embed-youtube').each(function () {

          var src = $(this).find('iframe').attr('src');
          var classes = $(this).attr('class');
          var index = $('.wp-block-embed-youtube').index(this);
          var id = 'vjs-yt-' + index;

          $(this).css('display', 'none');

          if ($(this).find('figcaption').length) {

            var label = $(this).find('figcaption').text();

            $(this).before('<div class="video-js ' + classes + '" id="' + id + '"></div><label>' + label + '</label>');

          } else {

            $(this).before('<div class="video-js ' + classes + '" id="' + id + '"></div>');

          }

          videojs(id, {
            controls: true,
            techOrder: ["youtube"],
            sources: [{
              "type": "video/youtube",
              "src": src
            }],
          });

        });
        $('.wp-block-embed-vimeo').each(function () {

          var src = $(this).find('iframe').attr('src');
          var classes = $(this).attr('class');
          console.log(src);
          var vimeo = src.split('?dnt=');
          var vimeo1 = vimeo[0].replace('player.', '');
          var vimeo2 = vimeo1.replace('/video', '');

          console.log(vimeo2);

          var index = $('.wp-block-embed-vimeo').index(this);
          var id = 'vjs-vimeo-' + index;

          if ($(this).find('figcaption').length) {

            var label = $(this).find('figcaption').text();

            $(this).before('<div class="video-js ' + classes + '" id="' + id + '"></div><label>' + label + '</label>');

          } else {

            $(this).before('<div class="video-js ' + classes + '" id="' + id + '"></div>');

          }
          $(this).css('display', 'none');

          videojs(id, {
            controls: true,
            techOrder: ["vimeo"],
            sources: [{
              "type": "video/vimeo",
              "src": vimeo2
            }],
          });

        });

        function imgWidth() {

          $('.wp-block-image').each(function () {

            var width = $(this).find('img').outerWidth();
            var classes = $(this).children('figure').attr('class');

            $(this).attr('style', '--imgWidth: ' + width + 'px').addClass(classes);

          });
        }

        imgWidth();

        var resizeTimer;

        $(window).on('resize', function (e) {

          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {

            imgWidth();
            editor.attr('style', '--width: ' + (editor.offset().left + 15) + 'px');

          }, 250);

        });

      }
    }
  };
  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function (func, funcname, args) {
      var fire;
      var namespace = Sage;

      funcname = funcname === undefined ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';
      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function () {
      // Fire common init JS
      UTIL.fire('common');
      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });
      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };
  // Load Events

  $(document).ready(UTIL.loadEvents);
}(jQuery)); // Fully reference jQuery after this point.
