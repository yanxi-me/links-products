var _ = require('underscore');
var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId;

var QiriError = require('../../model/qiri-err');
var utils = require('../../model/utils');
var s = require('../../model/schemas').schemas;

exports.addLink = function(req, res, next) {
    var newLink = req.body.newLink;

    async.auto({
        newLink : function(callback) {
            s.Link.create(newLink, callback);
        },
        updateArea : [ 'newLink', function(callback, results) {
            s.Area.findByIdAndUpdate(newLink.areaId, {
                $push : {
                    linkIds : results.newLink.id
                }
            }, callback);
        } ]
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.sortLink = function(req, res, next) {
    var areaId = req.body.areaId;
    var linkIds = req.body.linkIds;

    async.auto({
        updateArea : function(callback) {
            s.Area.findByIdAndUpdate(areaId, {
                $set : {
                    linkIds : linkIds
                }
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.deleteLink = function(req, res, next) {
    var linkId = req.body.linkId;

    async.auto({
        deleteLink : function(callback) {
            s.Link.findByIdAndRemove(linkId, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.changeLink = function(req, res, next) {
    var link = req.body.link;

    async.auto({
        updateLink : function(callback) {
            s.Link.findByIdAndUpdate(link.id, {
                text : link.text,
                url : link.url,
                image : link.image
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.changeArea = function(req, res, next) {
    var area = req.body.area;
    async.auto({
        updateArea : function(callback) {
            s.Area.findByIdAndUpdate(area.id, {
                title : area.title,
                type : area.type
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.addArea = function(req, res, next) {
    var newArea = req.body.newArea;

    async.auto({
        newArea : function(callback) {
            s.Area.create(newArea, callback);
        },
        updatePage : [ 'newArea', function(callback, results) {
            s.Page.findByIdAndUpdate(newArea.pageId, {
                $push : {
                    areaIds : results.newArea.id
                }
            }, callback);
        } ]
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.deleteArea = function(req, res, next) {
    var areaId = req.body.areaId;

    async.auto({
        deleteArea : function(callback) {
            s.Area.findByIdAndRemove(areaId, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.sortArea = function(req, res, next) {
    var pageId = req.body.pageId;
    var areaIds = req.body.areaIds;

    async.auto({
        updatePage : function(callback) {
            s.Page.findByIdAndUpdate(pageId, {
                $set : {
                    areaIds : areaIds
                }
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.changePage = function(req, res, next) {
    var page = req.body.page;

    async.auto({
        updatePage : function(callback) {
            s.Page.findByIdAndUpdate(page.id, {
                $set : {
                    title : page.title,
                    name : page.name,
                }
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.addCategory = function(req, res, next) {
    var category = req.body.category;

    async.auto({
        category : function(callback) {
            s.Category.create(category, callback);
        },
        updatePage : [ 'category', function(callback, results) {
            var category = results.category;
            s.Page.update({
                type : 'channel',
                name : category.channel,
                'categoryGroups.name' : category.group
            }, {
                $push : {
                    'categoryGroups.$.categoryIds' : category.id
                }
            }, callback);
        } ]
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.deleteCategory = function(req, res, next) {
    var categoryId = req.body.categoryId;

    async.auto({
        category : function(callback) {
            s.Category.findById(categoryId, callback);
        },
        deleteCategory : [ 'category', function(callback, results) {
            s.Category.findByIdAndRemove(categoryId, callback);
        } ],
        updatePage : [ 'deleteCategory', function(callback, results) {
            var category = results.category;
            s.Page.update({
                type : 'channel',
                name : category.channel,
                'categoryGroups.name' : category.group
            }, {
                $pull : {
                    'categoryGroups.$.categoryIds' : categoryId
                }
            }, callback);
        } ],
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.changeCategory = function(req, res, next) {
    var category = req.body.category;

    async.auto({
        updateCategory : function(callback) {
            s.Category.findByIdAndUpdate(category.id, {
                $set : {
                    title : category.title,
                    name : category.name,
                }
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.addCategoryGroup = function(req, res, next) {
    var categoryGroup = req.body.categoryGroup;

    async.auto({
        updatePage : function(callback) {
            s.Page.findByIdAndUpdate(categoryGroup.pageId, {
                $push : {
                    categoryGroups : {
                        title : categoryGroup.title,
                        name : categoryGroup.name,
                    }
                }
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.deleteCategoryGroup = function(req, res, next) {
    var group = req.body.group;

    async.auto({
        updatePage : function(callback) {
            s.Page.findByIdAndUpdate(group.pageId, {
                $pull : {
                    categoryGroups: {_id: new ObjectId(group.id)}
                }
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.sortCategoryGroup = function(req, res, next) {
    var pageId = req.body.pageId;
    var groupIds = req.body.groupIds;

    async.auto({
        categoryGroups : function(callback) {
            s.Page.findById(pageId, function(err, page) {
                callback(err, page.categoryGroups);
            });
        },
        updatePage : ['categoryGroups', function(callback, results) {
            var sortedGroups = utils.sortById(results.categoryGroups, groupIds);
            s.Page.findByIdAndUpdate(pageId, {
                $set : {
                    categoryGroups : sortedGroups
                }
            }, callback);
        } ]
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.sortCategory = function(req, res, next) {
    var pageId = req.body.pageId;
    var groupId = req.body.groupId;
    var categoryIds = req.body.categoryIds;

    async.auto({
        updatePage : function(callback) {
            s.Page.update({
                _id : new ObjectId(pageId),
                'categoryGroups._id' : new ObjectId(groupId)
            }, {
                $set : {
                    'categoryGroups.$.categoryIds' : categoryIds
                }
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.addProduct = function(req, res, next) {
    var product = req.body.product;

    async.auto({
        addProduct : function(callback) {
            s.Product.create(product, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};

exports.changeProductBasic = function(req, res, next) {
    var product = req.body.product;
    var update = {};
    update[product.key] = product.value;
    
    async.auto({
        updateProduct : function(callback) {
            s.Product.findByIdAndUpdate(product.id, {
                $set: update
            }, callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.json({});
    });
};