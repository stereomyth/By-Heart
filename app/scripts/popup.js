
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

        bookmark.domObject = Handlebars.templates.bookmark(bookmark.datas);

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