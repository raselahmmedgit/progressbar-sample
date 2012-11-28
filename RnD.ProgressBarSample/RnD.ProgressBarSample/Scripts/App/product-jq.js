//-----------------------------------------------------
//start Add, Edit, Delete - Success Funtion
// Add Product Success Function
function AddProductSuccess() {
    alert("AddProductSuccess");
    if ($("#addProductMess").html() == "True") {

        //now we can close the dialog
        $('#addProductDialog').dialog('close');
        //twitter type notification
        $('#commonMessage').html("Product Added.");
        $('#commonMessage').delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {
        //show message in popup
        $("#addProductMess").show();
    }
}

// Edit Product Success Function
function EditProductSuccess() {
    if ($("#editProductMess").html() == "True") {

        //now we can close the dialog
        $('#editProductDialog').dialog('close');
        //twitter type notification
        $('#commonMessage').html("Product Updated.");
        $('#commonMessage').delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {
        //show message in popup
        $("#editProductMess").show();
    }
}

// Delete Product Success Function
function DeleteProductSuccess() {
    if ($("#deleteProductMess").html() == "True") {

        //now we can close the dialog
        $('#deleteProductDialog').dialog('close');
        //twitter type notification
        $('#commonMessage').html("Task deleted");
        $('#commonMessage').delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {
        //show message in popup
        $("#deleteProductMess").show();
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

        alert("True");

        //now we can close the dialog
        $(_dailogID).dialog('close');
        //twitter type notification
        $(_commonMessageId).html(_commonMessage);
        $(_commonMessageId).delay(400).slideDown(400).delay(3000).slideUp(400);

        catObjData.fnDraw();

    }
    else {

        alert("False");
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

var proObjData;

$(function () {
    //start DataTable Script

    //for display more collapse data from category
    $('#productDataTable tbody td img.proCatg').live('click', function () {

        if ($(this).attr('class').match('proCatg')) {
            var nTr = this.parentNode.parentNode;
            if (this.src.match('details_close')) {
                this.src = "/Content/Images/App/details_open.png";
                proObjData.fnClose(nTr);
            }
            else {
                this.src = "/Content/Images/App/details_close.png";
                var proid = $(this).attr("rel");
                $.get("/Product/GetCategory?proId=" + proid, function (pro) {
                    proObjData.fnOpen(nTr, pro, 'details');
                });
            }
        }

    });

    proObjData = $('#productDataTable').dataTable({
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
        "sAjaxSource": "/Product/GetProducts",
        "aoColumns": [{ "sName": "ID",
            "bSearchable": false,
            "bSortable": false,
            "fnRender": function (oObj) {
                return '<img class="proCatg img-expand-collapse" src="/Content/Images/App/details_open.png" title="Category" alt="expand/collapse" rel="' +
                                oObj.aData[0] + '"/>' +
                                '<a class="lnkDetailsProduct" href=\"/Product/Details/' +
                                oObj.aData[0] + '\" ><img src="/Content/Images/App/detail.png" title="Details" class="tb-space" alt="Detail"></a>' +
                                '<a class="lnkEditProduct" href=\"/Product/Edit/' +
                                oObj.aData[0] + '\" ><img src="/Content/Images/App/edit.png" title="Edit" class="tb-space" alt="Edit"></a>' +
                                '<a class="lnkDeleteProduct" href=\"/Product/Delete/' +
                                oObj.aData[0] + '\" ><img src="/Content/Images/App/delete.png" title="Delete" class="tb-space" alt="Delete"></a>';

            }

        },
                          { "sName": "PRODUCTNAME" },
                          { "sName": "PRICE" },
                          { "sName": "CATEGORYID" },
                          { "sName": "CATEGORYNAME" }
            ]
    });

    //end DataTable Script

    //-------------------------------------------------------
    //start Add, Edit, Delete - Dialog, Click Event

    $("#addProductDialog").dialog({
        autoOpen: false,
        width: 600,
        resizable: false,
        modal: true,
        buttons: {
            "Add": function () {
                //make sure there is nothing on the message before we continue 
                $("#addProductMess").html('');
                $("#addProductForm").submit();
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    //add Product
    $('.lnkAddProduct').click(function () {

        //change the title of the dialgo
        linkObj = $(this);
        var dialogDiv = $('#addProductDialog');
        var viewUrl = linkObj.attr('href');

        $.get(viewUrl, function (data) {
            dialogDiv.html(data);
            //validation
            var $form = $("#addProductForm");
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

    //edit Product
    $("#editProductDialog").dialog({
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
                $("#editProductMess").html('');
                $("#editProductForm").submit();
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }

    });

    $('#productDataTable tbody td a.lnkEditProduct').live('click', function () {

        //change the title of the dialgo
        linkObj = $(this);
        var dialogDiv = $('#editProductDialog');
        var viewUrl = linkObj.attr('href');
        $.get(viewUrl, function (data) {
            dialogDiv.html(data);
            //validation
            var $form = $("#editProductForm");
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

    //delete Product
    $("#deleteProductDialog").dialog({
        autoOpen: false,
        width: 600,
        resizable: false,
        modal: true,
        buttons: {
            "Yes": function () {
                //make sure there is nothing on the message before we continue                         
                $("#deleteProductMess").html('');
                $("#deleteProductForm").submit();
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#productDataTable tbody td a.lnkDeleteProduct').live('click', function () {

        //change the title of the dialgo
        linkObj = $(this);
        var dialogDiv = $('#deleteProductDialog');
        var viewUrl = linkObj.attr('href');
        $.get(viewUrl, function (data) {
            dialogDiv.html(data);
            //validation
            var $form = $("#deleteProductForm");
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

    //For details Product
    $("#detailsProductDialog").dialog({
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

    $('#productDataTable tbody td a.lnkDetailsProduct').live('click', function () {

        linkObj = $(this);
        var dialogDiv = $('#detailsProductDialog');
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