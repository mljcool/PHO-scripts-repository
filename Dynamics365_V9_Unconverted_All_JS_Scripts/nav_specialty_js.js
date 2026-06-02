function SetSpecialtyDesc(context) {
    var oField = context.getEventSource().getValue();
    if (typeof (oField) != "undefined" && oField != null) {
        getAllSpecialitiesDesc(oField[0].id, "nav_allspecialtiesSet");
    }
}

function getAllSpecialitiesDesc(id, odataSetName) {
    id = id.replace("{", "");
    id = id.replace("}", "");

    // Get Server URL
    var serverUrl = GetServerUrl();

    //The OData end-point
    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";

    //Asynchronous AJAX function to Retrieve a CRM record using OData
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: serverUrl + ODATA_ENDPOINT + "/" + odataSetName + "(guid'" + id + "')?$select=nav_description",
        beforeSend: function (XMLHttpRequest) {
            //Specifying this header ensures that the results will be returned as JSON.
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        success: function (data, textStatus, XmlHttpRequest) {
            setDescValue(data, textStatus, XmlHttpRequest)
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("Error – " + errorThrown)
        }
    });
}

function setDescValue(data, textStatus, XmlHttpRequest) {
    if (data && data.d != null) {
        Xrm.Page.getAttribute("nav_description").setValue(data.d.nav_description); 
        Xrm.Page.getAttribute("nav_description").setSubmitMode("always");
        Xrm.Page.ui.controls.get("nav_description").setDisabled(true);       
    }
}

function setDescDisable() {
    var formType = Xrm.Page.ui.getFormType();
    if (formType != null && formType != 1) {
        Xrm.Page.getAttribute("nav_description").setSubmitMode("always");
        Xrm.Page.ui.controls.get("nav_description").setDisabled(true); 
     }
 }