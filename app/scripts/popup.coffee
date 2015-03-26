'use strict';

log = (content) -> console.log content

# $('.hole').append('cheese')


# newTree

typeNode = (node, depth) ->
    if node.children?
        new Folder node, depth
    else
        new Bookmark node, depth

class Tree
    constructor: (@seed) ->
        @children = (typeNode node, 0 for node in @seed)
        # log @children

class Node
    constructor: (@obj, @depth) -> 
        log @obj.title

    # log: ->
    #     log @obj

class Folder extends Node
    constructor: (@obj, @depth) ->
        @getChildren @obj.children
        super

    getChildren: (children) ->
        # log children
        @children = (typeNode node, @depth++ for node in children)


class Bookmark extends Node
    constructor: (@obj, @depth) -> 
        super



# node1 = new Node 'john'

# node1.askName()



# plantSeed = (oldTree) -> 
    



# eat food for food in ['toast', 'cheese', 'wine']





# get tree and begin plantSeed

chrome.bookmarks.getTree (output) -> 
    new Tree output[0].children
    # log output[0].children
    # plantSeed output[0].children



