(function( $ ) {

    var $grid = $('.grid');
    var images = $grid.find( '.grid-item-content img' );
    var $window = $(window);
    var $mainMenu = $('.yb-main-menu');
    var menuHeight = $mainMenu.outerHeight();

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
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

    // Filter the isotope layout
    $('.yb-filter-button-group').on( 'click', 'button', function(e) {
        var filterValue = $(this).attr('data-filter');
        // add a class 'active' to the current button
        $(this).addClass('active');
        // remove the class 'active' to its siblings
        $(this).siblings().removeClass('active');
        // filter the grid
        $grid.isotope({ filter: filterValue });
    });

    // Set Images to same height
    find_min_height(images);

    $window.on('resize', function() {
        find_min_height(images);
        console.log('resized');
    });


    function find_min_height( $elem ) {
        var mh = $elem[0].height;
        $elem.each(function(i){
            if($elem[i].height < mh) {
                mh = $elem[i].height;
            }
        });

        set_height( $elem, mh);
    }

    function set_height( $elem, $h) {
        $elem.each(function(){
            $elem.css({'height' : $h + 'px'});
        });
    }


    // Sticky menu on scroll

    // if the page vertical offset is
    // greater than the menu bar height
    // add the sticky class
    // else remove it
    function stickyMenu() {
        if( ($window.scrollTop() / 2) > menuHeight ) {
            $mainMenu.addClass('sticky');
        }
        else {
            $mainMenu.removeClass('sticky');
        }
    }

    // listen to scroll event
    window.addEventListener('scroll', stickyMenu);

})(jQuery);

