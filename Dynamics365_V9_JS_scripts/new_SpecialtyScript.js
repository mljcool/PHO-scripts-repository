// JScript source code
// Update Specialty description field from Specialties
function relatedSpecialtiesChange(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var lookupItem = new Array();
    var specialtyAttr = formContext.getAttribute("nav_specialty");
    lookupItem = specialtyAttr != null ? specialtyAttr.getValue() : null;

    if (lookupItem != null && lookupItem[0] != null) {
        var name = lookupItem[0].name;
        var guid = lookupItem[0].id;
        var entType = lookupItem[0].entityType;

        // alert("Name: " + name + "; ID: " + guid + "; Entity type: " + entType);

        try {
            //Get entity data;
            var serverUrl = Xrm.Utility.getGlobalContext().getClientUrl(); // "http://oto480dcrmv/PHODev";
            var odataSelect = serverUrl + "/XRMServices/2011/OrganizationData.svc/new_specialtiesSet(guid'" + guid + "')";
            // alert("ODATA Select: " + odataSelect.toString());

            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                url: odataSelect,
                beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },
                success: function (data, textStatus, XmlHttpRequest) {
                    var org = data.d;
                    //Change form data
                    // alert("TEST: Description: " + org.new_Description);
                    var descriptionAttr = formContext.getAttribute("nav_description");
                    if (descriptionAttr != null) {
                        descriptionAttr.setValue(org.nav_Description);
                    }
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert('OData Select Failed: ' + odataSelect);
                }
            }
			);

        }
        catch (err) {
            // alert("Error: " + err.description);
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