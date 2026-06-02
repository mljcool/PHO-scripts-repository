function SetSpecialtyDesc(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var eventSource = executionContext ? executionContext.getEventSource() : null;
    var oField = eventSource ? eventSource.getValue() : null;
    if (typeof (oField) != "undefined" && oField != null) {
        getAllSpecialitiesDesc(formContext, oField[0].id, "nav_allspecialtiesSet");
    }
}

function getAllSpecialitiesDesc(formContext, id, odataSetName) {
    id = id.replace("{", "");
    id = id.replace("}", "");

    // Get Server URL
    var serverUrl = Xrm.Utility.getGlobalContext().getClientUrl();

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
            setDescValue(formContext, data, textStatus, XmlHttpRequest)
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("Error – " + errorThrown)
        }
    });
}

function setDescValue(formContext, data, textStatus, XmlHttpRequest) {
    if (data && data.d != null) {
        var descriptionAttr = formContext.getAttribute("nav_description");
        var descriptionControl = formContext.getControl("nav_description");

        if (descriptionAttr != null) {
            descriptionAttr.setValue(data.d.nav_description);
            descriptionAttr.setSubmitMode("always");
        }

        if (descriptionControl != null) {
            descriptionControl.setDisabled(true);
        }
    }
}

function setDescDisable(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var formType = formContext.ui.getFormType();
    if (formType != null && formType != 1) {
        var descriptionAttr = formContext.getAttribute("nav_description");
        var descriptionControl = formContext.getControl("nav_description");

        if (descriptionAttr != null) {
            descriptionAttr.setSubmitMode("always");
        }

        if (descriptionControl != null) {
            descriptionControl.setDisabled(true);
        }
     }
 }

function getFormContext(executionContext) {
    if (executionContext && typeof executionContext.getFormContext === "function") {
        return executionContext.getFormContext();
    }

    if (executionContext && typeof executionContext.getAttribute === "function" && typeof executionContext.getControl === "function") {
        return executionContext;
    }

    return null;
}