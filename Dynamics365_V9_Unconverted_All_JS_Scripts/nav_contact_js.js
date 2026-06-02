function SetContactAddress(context) {
    var oField = context.getEventSource().getValue();
    if (typeof (oField) != "undefined" && oField != null) {
        getOrganizationAddress(oField[0].id, "AccountSet");
    }
}

function getOrganizationAddress(id, odataSetName) {
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
        url: serverUrl + ODATA_ENDPOINT + "/" + odataSetName + "(guid'" + id + "')?$select=Address1_Country,Address1_PostalCode,Address1_StateOrProvince,Address1_City,Address1_Line1,Address1_Line2,Address1_Line3,new_address1_line4",
        beforeSend: function (XMLHttpRequest) {
            //Specifying this header ensures that the results will be returned as JSON.
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        success: function (data, textStatus, XmlHttpRequest) {
            setAddressValues(data, textStatus, XmlHttpRequest)
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("Error – " + errorThrown)
        }
    });
}

function setAddressValues(data, textStatus, XmlHttpRequest) {
    if (data && data.d != null) {
        Xrm.Page.getAttribute("address1_country").setValue(data.d.Address1_Country);
        Xrm.Page.getAttribute("address1_stateorprovince").setValue(data.d.Address1_StateOrProvince);
        Xrm.Page.getAttribute("address1_city").setValue(data.d.Address1_City);
        Xrm.Page.getAttribute("address1_postalcode").setValue(data.d.Address1_PostalCode);
        Xrm.Page.getAttribute("address1_line1").setValue(data.d.Address1_Line1);
        Xrm.Page.getAttribute("address1_line2").setValue(data.d.Address1_Line2);
        Xrm.Page.getAttribute("address1_line3").setValue(data.d.Address1_Line3);
        //Xrm.Page.getAttribute("nav_address1_line4").setValue(data.d.new_address1_line4);
     }
 }