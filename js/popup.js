// by heart
var padding = 15;
var startFolder = '1';
var ls = localStorage;

function getBookmarkTree() {

    var bookmarkTree = chrome.bookmarks.getChildren(startFolder, function (bookmarkTree) {

        var level = -1;

        $('#bookmarks').append(buildList(bookmarkTree, level));

        //folderManip(startFolder);
    });
}

function buildList(bookmarkTree, level) {

    var list = $('<ul>');

    for (i = 0; i < bookmarkTree.length; i++) {

        list.append(buildItem(bookmarkTree[i], level));

    }

    return list;
}

function buildItem(bookmarkItem, level) {

    var html = $('<li>');
    
    var item;
    
    var thisLevel = parseInt(level) + 1;
    
    var levelPadding = thisLevel * padding;
    
    if (bookmarkItem.url) {
    
        item = $('<a>')
            .text(bookmarkItem.title)
            .attr('href', bookmarkItem.url)
            .attr('id', bookmarkItem.id)
            .addClass('link')
            .css('padding-left', levelPadding);
    
        var favicon = $('<img width="16" height="16">')
            .attr('src', 'chrome://favicon/' + bookmarkItem.url);
    
        item.prepend(favicon)
            .mousedown(function (e) {

                if (e.which === 1) {

                    chrome.tabs.getSelected(null, function (tab) {

                        chrome.tabs.update(tab.id, {url:bookmarkItem.url});

                    });

                }

                if (e.which === 2) {

                    event.preventDefault();

                    //chrome.tabs.create({url:bookmarkItem.url});

                }

                if (e.which === 3) {

                    contextMenu(e, bookmarkItem);

                }

            });

        html.append(item);

    } else {

        item = $('<div>')
            .text(bookmarkItem.title)
            .addClass('folder unloaded')
            .attr('id', bookmarkItem.id)
            .attr('data-level', thisLevel)
            .attr('data-parent', bookmarkItem.parentId)
            .css('padding-left', levelPadding)
            .mousedown(function (e) {

                if (e.which === 1) {

                    if ($(this).hasClass('unloaded')) {
                    
                        $(this).removeClass('unloaded').addClass('open');
                    
                        var itemLevel = $(this).attr('data-level');
                    
                        var newChildren = chrome.bookmarks.getChildren(bookmarkItem.id, function (newChildren) {
                    
                            $('#' + bookmarkItem.id).parent().append(buildList(newChildren, itemLevel));
                    
                        });

                    } else if ($(this).hasClass('open')) {

                        $(this).removeClass('open').addClass('closed').siblings('ul').addClass('noShow');

                    } else {

                        $(this).removeClass('closed').addClass('open').siblings('ul').removeClass('noShow');

                    }

                } else if (e.which === 3) {

                    contextMenu(e, bookmarkItem);

                }

            });

        html.append(item);

    }

    return html;

}

function contextMenu(e, bookmarkItem) {

    $('#context').show().css('left', e.pageX).css('top', e.pageY);

}

function localStuff() {
   // var theBook = $('.open');
   // ls.poop = JSON.stringify(theBook);
   // console.debug(ls.poop);
    $('#searchBox').val(ls.searchTerm).keyup(function (event) {

        goGoSearch();

    });

    if (ls.searchTerm) {
    
        goGoSearch();
    
    }
}

function goGoSearch() {

    ls.searchTerm = $('#searchBox').val();
    
    var searchTerm = $('#searchBox').val().trim();
    
    if (searchTerm) {
    
        var searchList = chrome.bookmarks.search(searchTerm, function (searchList) {
    
            if (searchList.length > 0) {
    
                $('#searchHole').empty().append(buildList(searchList.slice(0, 100)));
                $('#searchHole').show();
                $('#bookmarks').hide();
    
            } else {
    
                $('#searchHole').text('nuffin');
    
            }

        });
    
    } else {
    
        $('#searchHole').hide();
        $('#bookmarks').show();
    
    }

}

function buildSearchList(searchList) {

}

document.addEventListener('DOMContentLoaded', function () {

    getBookmarkTree();
    localStuff();

    // var _gaq = _gaq || [];
    // _gaq.push(['_setAccount', 'UA-33494524-1']);
    // _gaq.push(['_trackPageview']);
    // (function() {
    //     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //     ga.src = 'https://ssl.google-analytics.com/ga.js';
    //     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    // })();
});