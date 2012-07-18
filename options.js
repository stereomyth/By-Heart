// by heart
var ls = localStorage;

$(function () {
    //$('#optionsWrapper').hide();
//    if(ls.option1){
//        $('#option1').val(ls.option1);
//    }

    $('#option1').val(ls.option1).keyup(function (event) {
        ls.option1 = $('#option1').val();
    });

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-33494524-1']);
    _gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
});


