'use strict';
$(function() {
    $("#new-link").dialog({
        autoOpen : false,
        height : 180,
        width : 500,
        modal : true,
        buttons : {
            "确定" : function() {
                var button = this;
                var newLink = {
                    text : $('#newLinkText').val(),
                    url : $('#newLinkUrl').val(),
                    areaId : $('#newLinkAreaId').val()
                };
                $.ajax('/manage/operation', {
                    type : 'POST',
                    data : {
                        action : "addLink",
                        newLink : newLink
                    },
                    dataType : 'json',
                    success : function(json) {
                        if (json.error) {
                            return alert(json.error);
                        }
                        $(button).dialog("close");
                        location = document.location;
                    }
                });
            },
            "取消" : function() {
                $(this).dialog("close");
            }
        },
        close : function() {

        }
    });
    $('.new-link').click(function() {
        $('#newLinkText').val('');
        $('#newLinkUrl').val('');
        $('#newLinkAreaId').val($(this).attr('data-area'));
        $("#new-link").dialog("open");
    });

    $("#change-link").dialog(
            {
                autoOpen : false,
                height : 180,
                width : 500,
                modal : true,
                buttons : {
                    "确定" : function() {
                        var button = this;
                        var link = {
                            id : $('#changeLinkId').val(),
                            text : $('#changeLinkText').val(),
                            url : $('#changeLinkUrl').val()
                        };
                        $.ajax('/manage/operation', {
                            type : 'POST',
                            data : {
                                action : "changeLink",
                                link : link
                            },
                            dataType : 'json',
                            success : function(json) {
                                if (json.error) {
                                    return alert(json.error);
                                }
                                var $link = $('li[data-id=' + link.id + ']')
                                        .find('.current-link');
                                $link.html(link.text);
                                $link.attr('href', link.url);
                                $(button).dialog("close");
                            }
                        });
                    },
                    "取消" : function() {
                        $(this).dialog("close");
                    }
                },
                close : function() {

                }
            });
    $('.change-link').click(function() {
        var $li = $(this).parent();
        var $link = $li.find('.current-link');
        var linkId = $li.attr('data-id');
        $('#changeLinkId').val(linkId);
        $('#changeLinkText').val($link.html());
        $('#changeLinkUrl').val($link.attr('href'));
        $("#change-link").dialog("open");
    });

    $("#delete-link").dialog({
        resizable : false,
        autoOpen : false,
        height : 180,
        modal : true,
        buttons : {
            "删 除" : function() {
                var button = this;
                var linkId = $('#deleteLinkId').val();
                $.ajax('/manage/operation', {
                    type : 'POST',
                    data : {
                        action : "deleteLink",
                        linkId : linkId
                    },
                    dataType : 'json',
                    success : function(json) {
                        if (json.error) {
                            return alert(json.error);
                        }

                        $('li[data-id=' + linkId + ']').remove();
                        $(button).dialog("close");
                    }
                });
            },
            "取 消" : function() {
                $(this).dialog("close");
            }
        }
    });
    $('.delete-link').click(function() {
        var linkId = $(this).parent().attr('data-id');
        $('#deleteLinkId').val(linkId);
        $("#delete-link").dialog("open");
    });

    $("#new-area").dialog({
        autoOpen : false,
        height : 220,
        width : 500,
        modal : true,
        buttons : {
            "确定" : function() {
                var button = this;
                var newArea = {
                    nid : $('#nid').val(),
                    title : $('#newAreaTitle').val(),
                    type :  $('input[name=newAreaType]:radio:checked').val()
                };
                $.ajax('/manage/operation', {
                    type : 'POST',
                    data : {
                        action : "addArea",
                        newArea : newArea
                    },
                    dataType : 'json',
                    success : function(json) {
                        if (json.error) {
                            return alert(json.error);
                        }

                        $(button).dialog("close");
                        location = document.location;
                    }
                });
            },
            "取消" : function() {
                $(this).dialog("close");
            }
        },
        close : function() {
        }
    });
    $('.new-area').click(function() {
        $('#newAreaTitle').val('');
        $("#new-area").dialog("open");
    });

    $("#change-area").dialog({
        autoOpen : false,
        height : 260,
        width : 500,
        modal : true,
        buttons : {
            "确定" : function() {
                var button = this;
                var area = {
                    id : $('#changeAreaId').val(),
                    title : $('#changeAreaTitle').val(),
                    type : $('input[name=changeAreaType]:radio:checked').val() || $('#changeAreaType').html()
                };
                $.ajax('/manage/operation', {
                    type : 'POST',
                    data : {
                        action : "changeArea",
                        area : area
                    },
                    dataType : 'json',
                    success : function(json) {
                        if (json.error) {
                            return alert(json.error);
                        }

                        $('#title-' + area.id).html(area.title);
                        $('.change-area[data-area=' + area.id + ']').attr('data-area-type', area.type);
                        $(button).dialog("close");
                    }
                });
            },
            "取消" : function() {
                $(this).dialog("close");
            }
        },
        close : function() {
        }
    });
    $('.change-area').click(function() {
        var areaId = $(this).attr('data-area');
        var areaType = $(this).attr('data-area-type');
        $('#changeAreaId').val(areaId);
        $('#changeAreaTitle').val($('#title-' + areaId).html());
        $("#change-area").dialog("open");
        $('#changeAreaType').html(areaType);
        $('input[name=changeAreaType]').attr('checked', false);
    });

    $("#delete-area").dialog({
        resizable : false,
        autoOpen : false,
        height : 180,
        modal : true,
        buttons : {
            "删 除" : function() {
                var button = this;
                var areaId = $('#deleteAreaId').val();
                $.ajax('/manage/operation', {
                    type : 'POST',
                    data : {
                        action : "deleteArea",
                        areaId : areaId
                    },
                    dataType : 'json',
                    success : function(json) {
                        if (json.error) {
                            return alert(json.error);
                        }

                        $(button).dialog("close");
                        location = document.location;
                    }
                });
            },
            "取 消" : function() {
                $(this).dialog("close");
            }
        }
    });
    $('.delete-area').click(function() {
        var areaId = $(this).attr('data-area');
        $('#deleteAreaId').val(areaId);

        $("#delete-area").dialog("open");
    });

    $('ul.links').sortable({
        stop : function(e, ui) {
            var $node = ui.item.parent();
            var linkIds = $.map($node.children(), function(child) {
                return $(child).attr('data-id');
            });
            $.ajax('/manage/operation', {
                type : 'POST',
                data : {
                    action : "sortLink",
                    areaId : $node.attr('data-area'),
                    linkIds : linkIds
                },
                dataType : 'json',
                success : function(json) {
                }
            });
        }
    });

    $('ul.areas').sortable({
        stop : function(e, ui) {
            var $node = ui.item.parent();
            var areaIds = $.map($node.children(), function(child) {
                return $(child).attr('data-id');
            });
            $.ajax('/manage/operation', {
                type : 'POST',
                data : {
                    action : "sortArea",
                    nid : $('#nid').val(),
                    areaIds : areaIds
                },
                dataType : 'json',
                success : function(json) {
                }
            });
        }
    });
});