function retrieveContact(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var contactAttr = formContext.getAttribute("new_existingsrmcontact");
    var contact = contactAttr != null ? contactAttr.getValue() : null;
    if (contact != null) {
        var id = contact[0].id;
        getContactRecord(
     formContext,
     id,
     "Contact",
     null, null,
     retrieveCRMObjectCompleted,
     errorRetrieve
        );
        
    }
    else {
        setDisabledValue(formContext, "new_srmjobtitle", null);
        setDisabledValue(formContext, "new_srmorganization", null);
        setDisabledValue(formContext, "new_srmemail", null);
        setDisabledValue(formContext, "new_srmtelephone", null);
        setDisabledValue(formContext, "new_srmtelephoneextension", null);
        setDisabledValue(formContext, "new_srmcity", null);
        setDisabledValue(formContext, "new_srmprovince", null);
    }
}

retrieveCRMObjectCompleted = function (formContext, data, textStatus, XmlHttpRequest) {
    
    setDisabledValue(formContext, "new_srmjobtitle", data.JobTitle);
    setDisabledValue(formContext, "new_srmorganization", data.ParentCustomerId != null ? data.ParentCustomerId.Name : null);
    setDisabledValue(formContext, "new_srmemail", data.EMailAddress2);
    setDisabledValue(formContext, "new_srmtelephone", data.Telephone1);
    setDisabledValue(formContext, "new_srmtelephoneextension", data.nav_phoneext);
    setDisabledValue(formContext, "new_srmcity", data.Address1_City);
    setDisabledValue(formContext, "new_srmprovince", data.Address1_StateOrProvince);
}
errorRetrieve = function (data, textStatus, XmlHttpRequest) {
    alert("Error Retrieve");
}

function hideWarning(executionContext, tab, section) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var contactAttr = formContext.getAttribute("new_existingsrmcontact");
    var contact = contactAttr != null ? contactAttr.getValue() : null;
    if (contact != null) {
        var targetTab = formContext.ui.tabs.get(tab);
        if (targetTab != null) {
            var targetSection = targetTab.sections.get(section);
            if (targetSection != null) {
                targetSection.setVisible(false);
            }
        }
    }
}

function hideWarning1(executionContext, tab, section) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var contactAttr = formContext.getAttribute("new_existingsrmcontact");
    var contact = contactAttr != null ? contactAttr.getValue() : null;
    if (contact != null) {
        var targetTab = formContext.ui.tabs.get(tab);
        if (targetTab != null) {
            var targetSection = targetTab.sections.get(section);
            if (targetSection != null) {
                targetSection.setVisible(false);
            }
        }
    }
}

function getContactRecord(formContext, id, type, select, expand, successCallback, errorCallback) {

    var serverpath = Xrm.Utility.getGlobalContext().getClientUrl() + "/XRMServices/2011/OrganizationData.svc/";

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
            successCallback(formContext, data.d, textStatus, XmlHttpRequest)
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("Error ?" + errorThrown)
        }
    });
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

function setDisabledValue(formContext, attributeName, value) {
    if (!formContext) {
        return;
    }

    var attribute = formContext.getAttribute(attributeName);
    if (attribute != null) {
        attribute.setValue(value);
        attribute.setSubmitMode("always");
    }

    var control = formContext.getControl(attributeName);
    if (control != null) {
        control.setDisabled(true);
    }
}