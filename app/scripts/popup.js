var popup = {

    ls: localStorage,

    // popup: popup,   // ???

    init: function () {

        popup.listnerInit();

        return this;

    },

    listnerInit: function () {

        $('.search').on('keyup', function() {

            popup.search($(this).val());

        });

    },

    search: function (query) {

        chrome.bookmarks.search(query, function (bookmarksArray) {

            popup.buildList(bookmarksArray);

        });

    },

    buildList: function (bookmarksArray) {

        $('.bookmarks').empty();

        var howMany = (bookmarksArray.length > 10) ? 10 : bookmarksArray.length;

        for (var i = 0; i < howMany; i++) {

            // console.log(bookmarksArray[i].title);

            var thisBookmark = $.extend(bookmark, {

                datas: bookmarksArray[i],

            });

            thisBookmark.init();

            $('.bookmarks').append(thisBookmark.domObject);

        }

    }

};

var bookmark = {

    datas: {},

    init: function () {

        bookmark.unfurlDatas();

        bookmark.domObject = $('<a/>', {

                'href': bookmark.url,

                'text': bookmark.title,

            });


    },

    unfurlDatas: function (argument) {

        bookmark.title = bookmark.datas.title;
        bookmark.url = bookmark.datas.url;

    }

}

$(document).ready(function () {
    'use strict';

    popup.init();

});