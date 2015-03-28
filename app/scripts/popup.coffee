'use strict';

log = (content) -> console.log content


# newTree

typeNode = (node, parent, depth) ->
    if node.children?
        new Folder node, parent, depth
    else
        new Bookmark node, parent, depth

class Tree
    constructor: (@seed) ->
        @domObj = $('.tree')
        @children = (typeNode node, @, 0 for node in @seed)


class Node
    constructor: (@obj, @parent, @depth) -> 
        @buildDom(@parent.domObj)

    buildDom: (dest) ->
        @domObj = $(hbs.node {obj: @obj, depth: @depth})

        dest.children('.children').append(@domObj)

        @domObj.on 'click', (event) => 
            event.stopPropagation()
            @action()


class Folder extends Node
    constructor: (@obj, @parent, @depth) ->
        @active = off
        super

    getChildren: () ->
        # log @domObj
        @children = (typeNode node, @, @depth++ for node in @obj.children)

    action: ->
        if @active then @close() else @open()

    open: ->
        if @children?
            @domObj.children('.children').show() 
        else 
            @getChildren()
        
        @active = on

    close: ->
        @domObj.children('.children').hide() 
        @active = off


class Bookmark extends Node

    action: ->
        log 'open link'


# get tree and begin plantSeed

chrome.bookmarks.getTree (output) -> 
    new Tree output[0].children
    # log output[0].children
    # plantSeed output[0].children



