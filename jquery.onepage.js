$.fn.onepage = function(scrollSpeed, navOffset) {
    scrollSpeed = scrollSpeed || 800;
    navOffset = navOffset || 0;
    var sectionPos = [];
    this.each(function(i) {
        $(this).click(function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: sectionPos[i] - navOffset}, scrollSpeed, "easeInOutCubic");
        });
    });
    //'this' doesn't work inside new functions,
    //save it into an accessible variable
    var self = this;
    $(window).on("load resize", function() {
        //clear array first
        sectionPos.length = 0;
        self.each(function() {
            var elem = $(this).attr("href");
            sectionPos.push(Math.floor($(elem).offset().top));
        });
        //remove the last item (about me section); no nav item
        var navSectionPos = sectionPos.slice(0, -1);
        var sections = navSectionPos.length;
        //cache the window object instead of getting it at every scroll event again
        var $window = $(window);
        $window.scroll(function() {
            //jQuery's $window.scrollTop() is rather performance hungry, so the native way (in brackets)
            var scrollPos = (document.documentElement.scrollTop || document.body.scrollTop) + navOffset;
            for(var i=0; i < sections; i++) {
                var $navItem = $(self).eq(i);
                if(scrollPos >= navSectionPos[i] && scrollPos < navSectionPos[i+1]) {
                    if(!$navItem.hasClass("current")) {
                        $navItem.addClass("current");
                    }
                    //leave for loop if current section is found
                    break;
                } else if($navItem.hasClass("current")) {
                    $navItem.removeClass("current");
                }
            }
        });
    });
    //return this;
};