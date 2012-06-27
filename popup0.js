// by heart

$(function () {
    $('a').hover(function(){
        $(this).css("background","#fff");
    });
    //$('#bookmarks').text("cheese");
    $('span').hover(function(){
        $(this).css("background","#fff");
    });
    $('span').click(function () {
        $('a').toggle();
    });
});



chrome.bookmarks.getTree(function (bookmarks) {
    printBookmarks(bookmarks);
});

function printBookmarks(bookmarks) {
    bookmarks.forEach(function (bookmark) {
        if (bookmark.id <= 150) {
            if (bookmark.url) {
                //console.debug("link" + ' - ' + bookmark.id + ' - ' + bookmark.title + ' - ' + bookmark.url);
                //console.debug('http://g.etfv.co/' + bookmark.url);
                //$('#bookmarks').append('<a href="' + bookmark.url + '"><img src="http://g.etfv.co/' + bookmark.url + '?defaulticon=bluepng" class="favicon">' + bookmark.title + '</a>');
                $('#bookmarks').append('<li>' + bookmark.title + '</li>');
            } else {
                //console.debug("folder" + ' - ' + bookmark.id + ' - ' + bookmark.title);
                $('#bookmarks').append('</ul><li>' + bookmark.title + '</li><ul>');
            }
        }

        //console.debug(bookmark.id + ' - ' + bookmark.title + ' - ' + bookmark.url);
        if (bookmark.children)
            printBookmarks(bookmark.children);
    });
}
