//-----------------------------------------------------
//start Add, Edit, Delete - Success Funtion
// Add Category Success Function
function AddCategorySuccess() {
    alert("AddCategorySuccess");
    if ($("#addCategoryMess").html() == "True") {

        //now we can close the dialog
        $('#addCategoryDialog').dialog('close');
        //twitter type notification
        $('#commonMessage').html("Category Added.");
        $('#commonMessage').delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {
        //show message in popup
        $("#addCategoryMess").show();
    }
}

// Edit Category Success Function
function EditCategorySuccess() {
    if ($("#editCategoryMess").html() == "True") {

        //now we can close the dialog
        $('#editCategoryDialog').dialog('close');
        //twitter type notification
        $('#commonMessage').html("Category Updated.");
        $('#commonMessage').delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {
        //show message in popup
        $("#editCategoryMess").show();
    }
}

// Delete Category Success Function
function DeleteCategorySuccess() {
    if ($("#deleteCategoryMess").html() == "True") {

        //now we can close the dialog
        $('#deleteCategoryDailog').dialog('close');
        //twitter type notification
        $('#commonMessage').html("Task deleted");
        $('#commonMessage').delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {
        //show message in popup
        $("#deleteCategoryMess").show();
    }
}
//end Add, Edit, Delete - Success Funtion
//-----------------------------------------------------

//-----------------------------------------------------
//start Add, Edit, Delete - Begin Common Funtion
function AjaxBegin() {
    alert("Begin");
}
//end Add, Edit, Delete - Begin Common Funtion
//-----------------------------------------------------

//-----------------------------------------------------
//start Add, Edit, Delete - Complete Common Funtion
function AjaxComplete() {
    alert("Complete");
}
//end Add, Edit, Delete - Complete Common Funtion
//-----------------------------------------------------

//-----------------------------------------------------
//start Add, Edit, Delete - Success Common Funtion
function AjaxSuccess(updateTargetId, dailogId, commonMessageId, commonMessage) {

    var _updateTargetId = "#" + updateTargetId;
    var _dailogID = "#" + dailogId;
    var _commonMessageId = "#" + commonMessageId;
    var _commonMessage = commonMessage;

    if ($(_updateTargetId).html() == "True") {

        //now we can close the dialog
        $(_dailogID).dialog('close');
        //twitter type notification
        $(_commonMessageId).html(_commonMessage);
        $(_commonMessageId).delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {
        //show message in popup
        $(_updateTargetId).show();
    }
}
//end Add, Edit, Delete - Success Common Funtion
//-----------------------------------------------------

//-----------------------------------------------------
//start Add, Edit, Delete - Failure Common Funtion
function AjaxFailure() {
    alert("Failure");
}
//end Add, Edit, Delete - Failure Common Funtion
//-----------------------------------------------------

var linkObj;

var catObjData;

$(function () {
    //start DataTable Script

    //for display more collapse data from product
    $('#categoryDataTable tbody td img.catPro').live('click', function () {

        if ($(this).attr('class').match('catPro')) {
            var nTr = this.parentNode.parentNode;
            if (this.src.match('details_close')) {
                this.src = "/Content/Images/App/details_open.png";
                catObjData.fnClose(nTr);
            }
            else {
                this.src = "/Content/Images/App/details_close.png";
                var catid = $(this).attr("rel");
                $.get("/Category/GetProducts?catId=" + catid, function (products) {
                    catObjData.fnOpen(nTr, products, 'details');
                });
            }
        }

    });

    catObjData = $('#categoryDataTable').dataTable({
        "bJQueryUI": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "bSort": false,
        "oLanguage": {
            "sLengthMenu": "Display _MENU_ records per page",
            "sZeroRecords": "Nothing found - Sorry",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ records",
            "sInfoEmpty": "Showing 0 to 0 of 0 records",
            "sInfoFiltered": "(filtered from _MAX_ total records)"
        },
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "/Category/GetCategories",
        "aoColumns": [{ "sName": "ID",
            "bSearchable": false,
            "bSortable": false,
            "fnRender": function (oObj) {
                return '<img class="catPro img-expand-collapse" src="/Content/Images/App/details_open.png" title="Product List" alt="expand/collapse" rel="' +
                                oObj.aData[0] + '"/>' +
                                '<a class="lnkDetailsCategory" href=\"/Category/Details/' +
                                oObj.aData[0] + '\" ><img src="/Content/Images/App/detail.png" title="Details" class="tb-space" alt="Detail"></a>' +
                                '<a class="lnkEditCategory" href=\"/Category/Edit/' +
                                oObj.aData[0] + '\" ><img src="/Content/Images/App/edit.png" title="Edit" class="tb-space" alt="Edit"></a>' +
                                '<a class="lnkDeleteCategory" href=\"/Category/Delete/' +
                                oObj.aData[0] + '\" ><img src="/Content/Images/App/delete.png" title="Delete" class="tb-space" alt="Delete"></a>';

            }

        },
                          { "sName": "CATEGORYNAME" }
            ]
    });

    //end DataTable Script

    //-------------------------------------------------------
    //start Add, Edit, Delete - Dialog, Click Event

    $("#addCategoryDialog").dialog({
        autoOpen: false,
        width: 600,
        resizable: false,
        modal: true,
        buttons: {
            "Add": function () {
                //make sure there is nothing on the message before we continue 
                $("#addCategoryMess").html('');
                $("#addCategoryForm").submit();
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    //add Category
    $('.lnkAddCategory').click(function () {

        //change the title of the dialog
        linkObj = $(this);
        var dialogDiv = $('#addCategoryDialog');
        var viewUrl = linkObj.attr('href');

        $.get(viewUrl, function (data) {
            dialogDiv.html(data);
            //validation
            var $form = $("#addCategoryForm");
            // Unbind existing validation
            $form.unbind();
            $form.data("validator", null);
            // Check document for changes
            $.validator.unobtrusive.parse(document);
            // Re add validation with changes
            $form.validate($form.data("unobtrusiveValidation").options);
            //open dialog
            dialogDiv.dialog('open');
        });
        return false;

    });

    //edit Category
    $("#editCategoryDialog").dialog({
        autoOpen: false,
        width: 600,
        resizable: false,
        closeOnEscape: false,
        modal: true,
        close: function (event, ui) {
            $(".popover").hide();
        },
        buttons: {
            "Edit": function () {
                //make sure there is nothing on the message before we continue   
                $("#editCategoryMess").html('');
                $("#editCategoryForm").submit();
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }

    });

    $('#categoryDataTable tbody td a.lnkEditCategory').live('click', function () {

        //change the title of the dialog
        linkObj = $(this);
        var dialogDiv = $('#editCategoryDialog');
        var viewUrl = linkObj.attr('href');
        $.get(viewUrl, function (data) {
            dialogDiv.html(data);
            //validation
            var $form = $("#editCategoryForm");
            // Unbind existing validation
            $form.unbind();
            $form.data("validator", null);
            // Check document for changes
            $.validator.unobtrusive.parse(document);
            // Re add validation with changes
            $form.validate($form.data("unobtrusiveValidation").options);
            //open dialog
            dialogDiv.dialog('open');
        });
        return false;

    });

    //delete Category
    $("#deleteCategoryDailog").dialog({
        autoOpen: false,
        width: 600,
        resizable: false,
        modal: true,
        buttons: {
            "Yes": function () {
                //make sure there is nothing on the message before we continue                         
                $("#deleteCategoryMess").html('');
                $("#deleteCategoryForm").submit();
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#categoryDataTable tbody td a.lnkDeleteCategory').live('click', function () {

        //change the title of the dialog
        linkObj = $(this);
        var dialogDiv = $('#deleteCategoryDailog');
        var viewUrl = linkObj.attr('href');
        $.get(viewUrl, function (data) {
            dialogDiv.html(data);
            //validation
            var $form = $("#deleteCategoryForm");
            // Unbind existing validation
            $form.unbind();
            $form.data("validator", null);
            // Check document for changes
            $.validator.unobtrusive.parse(document);
            // Re add validation with changes
            $form.validate($form.data("unobtrusiveValidation").options);
            //open dialog
            dialogDiv.dialog('open');
        });
        return false;

    });

    //For details Category
    $("#detailsCategoryDialog").dialog({
        autoOpen: false,
        width: 500,
        resizable: false,
        modal: true,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#categoryDataTable tbody td a.lnkDetailsCategory').live('click', function () {

        linkObj = $(this);
        var dialogDiv = $('#detailsCategoryDialog');
        var viewUrl = linkObj.attr('href');
        $.get(viewUrl, function (data) {
            dialogDiv.html(data);
            dialogDiv.dialog('open');
        });
        return false;

    });

    //end Add, Edit, Delete - Dialog, Click Event
    //-------------------------------------------------------

});