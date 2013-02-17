// by heart

"use strict";

var padding = 15;
var startFolder = '1';
var ls = localStorage;
var searchTimeout;

function getBookmarkTree() {

    var bookmarkTree = chrome.bookmarks.getChildren(startFolder, function (bookmarkTree) {

        var level = -1;

        $('#bookmarks').append(buildList(bookmarkTree, level));

    });
}

function buildList(bookmarkTree, level) {

    var list = $('<ul>'),
        i;

    for (i = 0; i < bookmarkTree.length; i += 1) {

        list.append(buildItem(bookmarkTree[i], level));

    }

    return list;
}

function buildItem(bookmarkItem, level) {

    var template,
        html;

    bookmarkItem.level = parseInt(level, 10) + 1;

    bookmarkItem.levelPadding = bookmarkItem.level * padding;

    template = (bookmarkItem.url) ? Handlebars.templates.bookmark : Handlebars.templates.folder;

    html = template(bookmarkItem);

    return html;

}


function addListners() {

    $('#searchBox').val(ls.searchTerm).keyup(function (event) {

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(goGoSearch, 200);

    });

    $("#wrapper").on("click", ".folder", function (event) {

        var itemLevel, newChildren, theFolder = $(this);

        if (theFolder.hasClass('unloaded')) {

            theFolder.removeClass('unloaded').addClass('open');

            itemLevel = theFolder.data('level');

            newChildren = chrome.bookmarks.getChildren(theFolder.context.id, function (newChildren) {

                $('#' + theFolder.context.id).parent().append(buildList(newChildren, itemLevel));

            });

        } else if (theFolder.hasClass('open')) {

            theFolder.removeClass('open').siblings('ul').addClass('noShow');

        } else {

            theFolder.addClass('open').siblings('ul').removeClass('noShow');

        }

    });

    $("#wrapper").on("click", ".link", function (event) {

        var that = $(this);

        console.log(that.context.href);

        chrome.tabs.getSelected(null, function (tab) { 
            chrome.tabs.update(tab.id, {url: that.context.href}); 
        });

        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.update(tab.id, { selected: true });
        });

    });

    $("#bookmarks").on("contextmenu", ".link, .folder", function (event) {

        event.preventDefault();

        contextMenu(event, $(this));

    });



}

function contextMenu(event, bookmarkItem) {

    // $('#context').show().css('left', event.pageX).css('top', event.pageY);

}

function goGoSearch() {

    var searchTerm = $('#searchBox').val().trim(),
        searchList;

    if (searchTerm) {

        searchList = chrome.bookmarks.search(searchTerm, function (searchList) {

            if (searchList.length > 0) {

                $('#searchHole').empty().append(buildList(searchList.slice(0, 50)));
                $('#searchHole').show();
                $('#bookmarks').hide();

            } else {

                $('#searchHole').text('nuffin');

            }

        });

    } else {

        $('#searchHole').empty();
        $('#bookmarks').show();

    }

    ls.searchTerm = searchTerm;

}

document.addEventListener('DOMContentLoaded', function () {

    getBookmarkTree();
    addListners();

    if (ls.searchTerm) { goGoSearch(); }

    // var _gaq = _gaq || [];
    // _gaq.push(['_setAccount', 'UA-33494524-1']);
    // _gaq.push(['_trackPageview']);
    // (function() {
    //     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //     ga.src = 'https://ssl.google-analytics.com/ga.js';
    //     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    // })();
});