
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

        $('body').on('keydown', function (event) {

            popup.handleKeys(event);

        });

        $('.bookmarks').on('mouseenter', 'a', function () {

            $(this).addClass('active');
            $(this).siblings('a').removeClass('active');

        });

    },

    search: function () {

        var query = $('.search').val().trim();

        popup.ls.query = query;

        chrome.bookmarks.search(query, function (bookmarksArray) {

            popup.buildList(bookmarksArray);

        });

    },

    handleKeys: function (event) {

        switch (event.keyCode) {
        case 40:

            // Down

            popup.changeActive(event);
            
            break;

        case 38:

            // Up

            popup.changeActive(event);

            break;

        case 13:

            console.log('enter');
            event.preventDefault();

            break;

        default:

            console.log(event.keyCode);

            clearTimeout(popup.keyDelay);

            popup.keyDelay = setTimeout(popup.search, 200);

        }

    },

    buildList: function (bookmarksArray) {

        $('.bookmarks').empty();

        bookmarksArray = bookmarksArray.slice(0, 20);

        var thisBookmark,
            i;

        for (i = 0; i < bookmarksArray.length; i += 1) {

            thisBookmark = $.extend(bookmark, {

                datas: bookmarksArray[i],

                uid: i

            });

            thisBookmark.init();

            $('.bookmarks').append(thisBookmark.domObject);

        }

        $('.bookmarks a').first().addClass('active');

    },

    changeActive: function (event) {

        event.preventDefault();

        var current = $('a.active'), 
            next;

        next = (event.keyCode === 40) ? current.next('a') : current.prev('a') ;

        if (next.length) {

            current.removeClass('active');
            next.addClass('active');

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