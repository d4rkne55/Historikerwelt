scrollStopInstances = 0;
$.fn.scrollStop = function(callback) {
    var i = ++scrollStopInstances;
    $(this).scroll(function() {
        var $this = $(this);
        if ($this.data("scrollTimeout" + i)) {
            clearTimeout($this.data("scrollTimeout" + i));
        }
        $this.data("scrollTimeout" + i, setTimeout(callback, 50));
    });
};