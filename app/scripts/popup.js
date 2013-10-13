
var popup = {

    ls: localStorage,

    // popup: popup,   // ???

    init: function () {

        popup.listnerInit();

        $('.search').val(popup.ls.searchValue);

        if (popup.ls.searchValue !== '') {

            popup.search(popup.ls.searchValue);

        }

        return this;

    },

    listnerInit: function () {

        $('.search').on('keyup', function() {

            popup.ls.searchValue = $(this).val();

            popup.search($(this).val());

        });

        $('body').on('keydown', function (event) {

            switch (event.keyCode) {
            case 40:

                console.log('down');
                break;

            case 38:

                console.log('up');
                break;

            default:

                console.log('dont know that');

            }

        });

    },

    search: function (query) {

        chrome.bookmarks.search(query, function (bookmarksArray) {

            popup.buildList(bookmarksArray);

        });

    },

    buildList: function (bookmarksArray) {

        $('.bookmarks').empty();

        var howMany = (bookmarksArray.length > 10) ? 10 : bookmarksArray.length,
            thisBookmark,
            i;

        for (i = 0; i < howMany; i += 1) {

            thisBookmark = $.extend(bookmark, {

                datas: bookmarksArray[i]

            });

            thisBookmark.init();

            $('.bookmarks').append(thisBookmark.domObject);

        }

    }

};

var bookmark = {

    datas: {},

    init: function () {

        bookmark.domObject = Handlebars.bookmark(bookmark.datas);

    },

    unfurlDatas: function () {

        bookmark.title = bookmark.datas.title;
        bookmark.url = bookmark.datas.url;

    }

};

$(document).ready(function () {
    'use strict';

    popup.init();

});