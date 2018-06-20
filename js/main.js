(function( $ ) {

    /*------------------------------------*/
    /*  Variables declaration             */
    /*------------------------------------*/
    var $grid = $('.grid');
    var resizeTimer;
    var $images = $grid.find( '.grid-item-content img' );
    var $window = $(window);
    var $mainMenu = $('.fd-main-menu');
    var menuHeight = $mainMenu.outerHeight();
    var anchor = '#fd-main-nav .navbar-nav .nav-link';

    var windowWidth = $window.width();


    /*------------------------------------*/
    /*  Setup isotope layout              */
    /*------------------------------------*/
    // Initialize masonry
    $grid.isotope({
        // options
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            // use element for option
            columnWidth: '.grid-sizer'
        }
    });

    // wait for images load
    $grid.imagesLoaded()
        .done( function( instance ) {
            equalizeImagesHeight($images);
            $grid.isotope('layout');
            //console.log('all images successfully loaded');        
        })
        .progress( function() {
            $grid.isotope('layout');
        });

    
    /*------------------------------------*/
    /*  Filtering the images              */
    /*------------------------------------*/
    // Filter the isotope layout
    $('.fd-filter-button-group').on( 'click', 'button', function(e) {
        var filterValue = $(this).attr('data-filter');
        // add a class 'active' to the current button
        $(this).addClass('active');
        // remove the class 'active' to its siblings
        $(this).siblings().removeClass('active');
        // filter the grid
        $grid.isotope({ filter: filterValue });
    });


    /*------------------------------------*/
    /*  Sticky menu on scroll             */
    /*------------------------------------*/
    /* if the page vertical offset is
     * greater than the menu bar height
     * add the sticky class
     * else remove it
     */
    function stickyMenu() {
        if( ($window.scrollTop() / 2) > menuHeight ) {
            $mainMenu.addClass('sticky');
        }
        else {
            $mainMenu.removeClass('sticky');
        }
    }

    /* listen to scroll event
     * and fires the stickyMenu function
    */
    window.addEventListener('scroll', stickyMenu);
    
    /*------------------------------------*/
    /*  Set Images to same height         */
    /*  On window resize                  */
    /*------------------------------------*/
    $(window).on('resize', function(e) {

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

            // Run code here, resizing has "stopped"
            equalizeImagesHeight($images);
            $grid.isotope('layout');
                    
        }, 250);

    });


    /*------------------------------------------*/
    /*  Activate FontAwesome 5 pseudo elements */
    /*-----------------------------------------*/
    window.FontAwesomeConfig = {
        searchPseudoElements: true
    }

    /*------------------------------------*/
    /*  Smooth Scroll                     */
    /*------------------------------------*/
    smoothScrolling( anchor, 50, 1000 );

    /*------------------------------------*/
    /*  Back to top button                */
    /*------------------------------------*/
    window.addEventListener('scroll', backToTop);
    smoothScrolling( '.fd-back-to-top a' );

    function backToTop() {
        if( $window.scrollTop() > 1000) {
            $('.fd-back-to-top').addClass('show');
            $('.fd-back-to-top').removeClass('hide');
        } else {
            $('.fd-back-to-top').removeClass('show');
            $('.fd-back-to-top').addClass('hide');
        }
    }




    /*------------------------------------*/
    /*  Equalize Images Height Function   */
    /*------------------------------------*/
    function equalizeImagesHeight(images) {
        var heights = [];
        var minHeight;

        images.each(function() {
            var $this = $(this);

            // reset the image height
            $this.css('width', '100%');
            $this.css('height', 'auto');

            // add the image height in the array
            if($this.height() !== 0) {
                heights.push( Math.floor( $this.height() ) );
            }
        });

        // set min height to the first element height
        minHeight = heights[0];

        $.each( heights, function( i, v ){
            
            if(minHeight > heights[i]) {
                minHeight = heights[i];
            }
        });

        //minHeight = Math.min.apply( Math, heights );

        images.each(function() {
            var $this = $(this);
            $this.css('height', minHeight + 'px');
        });
        //console.log(minHeight);
        //console.log( 'heights: ', heights );
    }



    /*------------------------------------*/
    /*  Smooth Scroll Function            */
    /*------------------------------------*/
    function smoothScrolling(selector, offset = 0, duration = 500) {
        $(selector).on( 'click', function(event) {
            var target  = $( this );
            var element = target.attr('href');
            
            if( $( element ).offset() === undefined )
                return false;
            
            $("body, html").animate({ 
                scrollTop: $( element ).offset().top - offset
            }, duration);
        });
    }


})(jQuery);

  