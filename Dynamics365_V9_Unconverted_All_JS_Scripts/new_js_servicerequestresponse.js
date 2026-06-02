function retrieveContact() {
    
    var contact = Xrm.Page.getAttribute("new_existingsrmcontact").getValue();
    if (contact != null) {
        var id = contact[0].id;
        getContactRecord(
     id,
     "Contact",
     null, null,
     retrieveCRMObjectCompleted,
     errorRetrieve
        );
        
    }
    else {
        Xrm.Page.getAttribute("new_srmjobtitle").setValue(null);
        Xrm.Page.getAttribute("new_srmjobtitle").setSubmitMode("always");
        Xrm.Page.ui.controls.get("new_srmjobtitle").setDisabled(true);

        Xrm.Page.getAttribute("new_srmorganization").setValue(null);
        Xrm.Page.getAttribute("new_srmorganization").setSubmitMode("always");
        Xrm.Page.ui.controls.get("new_srmorganization").setDisabled(true);

        Xrm.Page.getAttribute("new_srmemail").setValue(null);
        Xrm.Page.getAttribute("new_srmemail").setSubmitMode("always");
        Xrm.Page.ui.controls.get("new_srmemail").setDisabled(true);

        Xrm.Page.getAttribute("new_srmtelephone").setValue(null);
        Xrm.Page.getAttribute("new_srmtelephone").setSubmitMode("always");
        Xrm.Page.ui.controls.get("new_srmtelephone").setDisabled(true);

        Xrm.Page.getAttribute("new_srmtelephoneextension").setValue(null);
        Xrm.Page.getAttribute("new_srmtelephoneextension").setSubmitMode("always");
        Xrm.Page.ui.controls.get("new_srmtelephoneextension").setDisabled(true);

        Xrm.Page.getAttribute("new_srmcity").setValue(null);
        Xrm.Page.getAttribute("new_srmcity").setSubmitMode("always");
        Xrm.Page.ui.controls.get("new_srmcity").setDisabled(true);

        Xrm.Page.getAttribute("new_srmprovince").setValue(null);
        Xrm.Page.getAttribute("new_srmprovince").setSubmitMode("always");
        Xrm.Page.ui.controls.get("new_srmprovince").setDisabled(true);
    }
}

retrieveCRMObjectCompleted = function (data, textStatus, XmlHttpRequest) {
    
    Xrm.Page.getAttribute("new_srmjobtitle").setValue(data.JobTitle);
    Xrm.Page.getAttribute("new_srmjobtitle").setSubmitMode("always");
    Xrm.Page.ui.controls.get("new_srmjobtitle").setDisabled(true);

    Xrm.Page.getAttribute("new_srmorganization").setValue(data.ParentCustomerId.Name);
    Xrm.Page.getAttribute("new_srmorganization").setSubmitMode("always");
    Xrm.Page.ui.controls.get("new_srmorganization").setDisabled(true);

    Xrm.Page.getAttribute("new_srmemail").setValue(data.EMailAddress2);
    Xrm.Page.getAttribute("new_srmemail").setSubmitMode("always");
    Xrm.Page.ui.controls.get("new_srmemail").setDisabled(true);

    Xrm.Page.getAttribute("new_srmtelephone").setValue(data.Telephone1);
    Xrm.Page.getAttribute("new_srmtelephone").setSubmitMode("always");
    Xrm.Page.ui.controls.get("new_srmtelephone").setDisabled(true);

    Xrm.Page.getAttribute("new_srmtelephoneextension").setValue(data.nav_phoneext);
    Xrm.Page.getAttribute("new_srmtelephoneextension").setSubmitMode("always");
    Xrm.Page.ui.controls.get("new_srmtelephoneextension").setDisabled(true);

    Xrm.Page.getAttribute("new_srmcity").setValue(data.Address1_City);
    Xrm.Page.getAttribute("new_srmcity").setSubmitMode("always");
    Xrm.Page.ui.controls.get("new_srmcity").setDisabled(true);

    Xrm.Page.getAttribute("new_srmprovince").setValue(data.Address1_StateOrProvince);
    Xrm.Page.getAttribute("new_srmprovince").setSubmitMode("always");
    Xrm.Page.ui.controls.get("new_srmprovince").setDisabled(true);
}
errorRetrieve = function (data, textStatus, XmlHttpRequest) {
    alert("Error Retrieve");
}

function hideWarning(tab, section) {
    var contact = Xrm.Page.getAttribute("new_existingsrmcontact").getValue();
    if (contact != null) {
        Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(false);
    }
}

function hideWarning1(tab, section) {
    var contact = Xrm.Page.getAttribute("new_existingsrmcontact").getValue();
    if (contact != null) {
        Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(false);
    }
}

function getContactRecord(id, type, select, expand, successCallback, errorCallback) {

    var serverpath = document.location.protocol + "//" + document.location.host + "/" + Xrm.Page.context.getOrgUniqueName() + "/XRMServices/2011/OrganizationData.svc/";

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: serverpath + type + "Set(guid'" + id + "')",
        beforeSend: function (XMLHttpRequest) {
            //Specifying this header ensures that the results will be returned as JSON.
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        success: function (data, textStatus, XmlHttpRequest) {
            successCallback(data.d, textStatus, XmlHttpRequest)
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("Error ?" + errorThrown)
        }
    });
}