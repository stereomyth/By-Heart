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
});