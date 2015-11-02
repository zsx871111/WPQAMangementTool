/* PaymentTrust_09.00.00 */
/* 2015/01/08 AndriiK PaymentTrust_09.00.01 Fix for the Bug 21081 Notification if no results found */

$(document).ready(function () {

    $(".searchTextBox").keydown(function (event) {
        //If click "Enter" button
        if (event.keyCode == 13) {
            event.preventDefault();
            $(this).blur();
            return false;
        }
    });

    $(".searchTextBox").keyup(function (e) {
        searchHighlight(this.value);
    });

    refreshRowBackground();
});

function searchHighlight(inputString) {
    var jo = $(".supportTable > tbody").find("tr");

    if (inputString.length < 2) {
        jo.toggleClass('hideRow', false);

        refreshRowBackground();

        jo.removeHighlight();
        return;
    }

    var input = inputString.replace(/([|()[{.+*?^$\\])/g, "\\$1");
    var searchRegEx = new RegExp(input, 'i');

    jo.toggleClass('hideRow', true);

    jo.filter(function (i, v) {
        return searchRegEx.test($(this).text());
    }).toggleClass('hideRow', false);

    var numOfVisibleRows = jo.filter(function () {
        return ($(this).hasClass("") || $(this).hasClass("rowGray")) && !$(this).hasClass("hideRow");
    }).length;

    if (numOfVisibleRows === 0) {
        $("#noRes").show();
    } else {
        $("#noRes").hide();
    }

    refreshRowBackground();

    jo.removeHighlight();
    jo.highlight(searchRegEx);
};

function refreshRowBackground() {
    $("tr[Class != 'hideRow']").toggleClass('rowGray', false);
    $("tr[Class != 'hideRow']:odd").toggleClass('rowGray', true);
};


jQuery.extend({
    highlight: function (node, searchRegExp) {
        if (node.nodeType === 3) {
            var match = node.data.match(searchRegExp);
            if (match) {
                var nodeHighlight = document.createElement('span');
                nodeHighlight.className = 'searchHighlightY';
                var nodeOriginal = node.splitText(match.index);
                nodeOriginal.splitText(match[0].length);
                var nodeClone = nodeOriginal.cloneNode(true);
                nodeHighlight.appendChild(nodeClone);
                nodeOriginal.parentNode.replaceChild(nodeHighlight, nodeOriginal);
                return 1;
            }
        } else if ((node.nodeType === 1 && node.childNodes) &&
                !/(script|style)/i.test(node.tagName) &&
                (!(/(span)/i.test(node.tagName) && ($(node).hasClass('searchHighlightY'))))) {
            for (var i = 0; i < node.childNodes.length; i++) {
                i += jQuery.highlight(node.childNodes[i], searchRegExp);
            }
        }
        return 0;
    }
});

jQuery.fn.removeHighlight = function () {
    function newNormalize(node) {
        for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
            var child = children[i];

            if (child.nodeType == 1) {
                newNormalize(child);
                continue;
            }

            if (child.nodeType != 3) { continue; }

            var next = child.nextSibling;
            if (next == null || next.nodeType != 3) { continue; }
            var combinedText = child.nodeValue + next.nodeValue;
            newNode = node.ownerDocument.createTextNode(combinedText);
            node.insertBefore(newNode, child);
            node.removeChild(child);
            node.removeChild(next);
            i--;
            nodeCount--;
        }
    }

    return this.find("span.searchHighlightY").each(function () {
        var thisParent = this.parentNode;
        thisParent.replaceChild(this.firstChild, this);
        newNormalize(thisParent);
    }).end();

};

jQuery.fn.highlight = function (searchRegExp) {

    return this.each(function () {
        jQuery.highlight(this, searchRegExp);
    });

};



