
var popup = {

    ls: localStorage,

    // popup: popup,   // ???

    init: function () {

        popup.listnerInit();

        $('.search').val(popup.ls.query);

        if (popup.ls.query !== '') {

            popup.search();

        }

        return this;

    },

    listnerInit: function () {

        $('.search').on('keyup', function() {

            clearTimeout(popup.keyDelay);

            popup.keyDelay = setTimeout(popup.search, 200);

        });

        $('body').on('keydown', function (event) {

            switch (event.keyCode) {
            case 40:

                console.log('down');
                break;

            case 38:

                console.log('up');
                break;

            case 13:

                console.log('enter');
                break;

            default:

                console.log(event.keyCode);

            }

        });

    },

    search: function () {

        var query = $('.search').val().trim();

        popup.ls.query = query;

        chrome.bookmarks.search(query, function (bookmarksArray) {

            popup.buildList(bookmarksArray);

        });

    },

    buildList: function (bookmarksArray) {

        $('.bookmarks').empty();

        bookmarksArray = bookmarksArray.slice(0, 20);

        var thisBookmark,
            i;

        for (i = 0; i < bookmarksArray.length; i += 1) {

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