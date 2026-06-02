function SetContactAddress(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var eventSource = executionContext ? executionContext.getEventSource() : null;
    var oField = eventSource ? eventSource.getValue() : null;
    if (typeof (oField) != "undefined" && oField != null) {
        getOrganizationAddress(formContext, oField[0].id, "AccountSet");
    }
}

function getOrganizationAddress(formContext, id, odataSetName) {
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
        url: serverUrl + ODATA_ENDPOINT + "/" + odataSetName + "(guid'" + id + "')?$select=Address1_Country,Address1_PostalCode,Address1_StateOrProvince,Address1_City,Address1_Line1,Address1_Line2,Address1_Line3,new_address1_line4",
        beforeSend: function (XMLHttpRequest) {
            //Specifying this header ensures that the results will be returned as JSON.
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        success: function (data, textStatus, XmlHttpRequest) {
            setAddressValues(formContext, data, textStatus, XmlHttpRequest)
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("Error – " + errorThrown)
        }
    });
}

function setAddressValues(formContext, data, textStatus, XmlHttpRequest) {
    if (data && data.d != null) {
        setAttributeValue(formContext, "address1_country", data.d.Address1_Country);
        setAttributeValue(formContext, "address1_stateorprovince", data.d.Address1_StateOrProvince);
        setAttributeValue(formContext, "address1_city", data.d.Address1_City);
        setAttributeValue(formContext, "address1_postalcode", data.d.Address1_PostalCode);
        setAttributeValue(formContext, "address1_line1", data.d.Address1_Line1);
        setAttributeValue(formContext, "address1_line2", data.d.Address1_Line2);
        setAttributeValue(formContext, "address1_line3", data.d.Address1_Line3);
        //setAttributeValue(formContext, "nav_address1_line4", data.d.new_address1_line4);
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

function setAttributeValue(formContext, attributeName, value) {
    if (!formContext) {
        return;
    }

    var attribute = formContext.getAttribute(attributeName);
    if (attribute != null) {
        attribute.setValue(value);
    }
}