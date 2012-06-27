// by heart



//old folder click functions (werd and unecceray)

function folderManip(parentId) {
    $('.folder[parent=' + parentId + ']').click(function () {
        if ($(this).hasClass('unloaded')) {
            $(this).removeClass('unloaded').addClass('open');
            var itemId = $(this).attr('id');
            var itemLevel = $(this).attr('data-level');
            var newChildren = chrome.bookmarks.getChildren(itemId, function (newChildren) {
                $('#' + itemId).parent().append(buildList(newChildren, itemLevel));
                folderManip(itemId);
            });
        } else if ($(this).hasClass('open')) {
            $(this).removeClass('open').addClass('closed').siblings('ul').addClass('noShow');
        } else {
            $(this).removeClass('closed').addClass('open').siblings('ul').removeClass('noShow');
        }
    });
}

// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks(query) {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
        function (bookmarkTreeNodes) {
            $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
            $('.folder').click(function () {
//                $(this).siblings('ul').toggle();
                $(this).siblings('ul').children('li').children('.folder').toggle();
                $(this).siblings('ul').children('li').children('.link').toggle();
            });
        });
}
function dumpTreeNodes(bookmarkNodes, query) {
    var list = $('<ul>');
    var i;
    for (i = 0; i < bookmarkNodes.length; i++) {
        list.append(dumpNode(bookmarkNodes[i], query));
    }
    return list;
}
function dumpNode(bookmarkNode, query) {
    if (bookmarkNode.title) {
        if (query && !bookmarkNode.children) {
            if (String(bookmarkNode.title).indexOf(query) == -1) {
                return $('<div></div>');
            }
        }
        var item = "";
        if (bookmarkNode.url) {
            item = $('<a target="_blank" class="link">');
            item.attr('href', bookmarkNode.url);
            item.text(bookmarkNode.title);
        } else {
            item = $('<div class="folder parent' + bookmarkNode.parentId + '">');
            item.text( bookmarkNode.title);
        }
//        var anchor = $('<a target="_blank">');
//        anchor.attr('href', bookmarkNode.url);
//        anchor.text(bookmarkNode.title);
//        anchor.click(function () {
//            chrome.tabs.create({url:bookmarkNode.url});
//        });
//        var span = $('<span>');
//        span.append(anchor);
    }
    var li = $(bookmarkNode.title ? '<li>' : '<div>').append(item);
    if (bookmarkNode.children && bookmarkNode.children.length > 0) {
        li.append(dumpTreeNodes(bookmarkNode.children, query));
    }
    return li;
}

document.addEventListener('DOMContentLoaded', function () {
    dumpBookmarks();
});

$(function () {
//    $('#bookmarks').text("cheese");
//    $('.folder').text("cheese");
});