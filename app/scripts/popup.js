'use strict';

var popup = {

    ls: localStorage,

    popup: popup,

    init: function () {

        popup.testjs();

        return this;
    },

    testjs: function () {

        console.log("...i remember");

    }

};

$(document).ready(function () {

    popup.init();

});
