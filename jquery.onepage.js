$.fn.onepage = function(scrollSpeed, navOffset) {
    scrollSpeed = scrollSpeed || 800;
    navOffset = navOffset || 0;
    var sectionPos = [];

    // 'this' doesn't work inside new functions,
    // save it into an accessible variable
    var self = this;
    $(window).on("load resize", function() {
        // clear array first
        sectionPos.length = 0;
        self.each(function() {
            var elem = $(this).attr("href");
            var offsetTop = Math.floor($(elem).offset().top);
            sectionPos.push(offsetTop);
        });
        // remove the last item (about me section); no nav item
        var navSectionPos = sectionPos.slice(0, -1);
        var sections = navSectionPos.length;

        $(window).scrollStop(function() {
            // jQuery's $(window).scrollTop() is rather performance hungry, so the native way (in brackets)
            var scrollPos = (document.documentElement.scrollTop || document.body.scrollTop) + navOffset;
            for (var i=0; i < sections; i++) {
                var navItem = self[i];
                if (scrollPos >= navSectionPos[i] && scrollPos < navSectionPos[i+1]) {
                    // again, better not jQuery's class functions to optimize performance in an scroll event
                    if (navItem.className != "current") {
                        navItem.className = "current";
                    }
                    // leave for loop if current section is found
                    break;
                } else if (navItem.className == "current") {
                    navItem.className = "";
                }
            }
        });
    });

    this.each(function(i) {
        $(this).click(function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: sectionPos[i] - navOffset}, scrollSpeed, "easeInOutCubic");
        });
    });
    //return this;
};