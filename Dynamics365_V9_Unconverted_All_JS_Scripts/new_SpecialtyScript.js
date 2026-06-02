// JScript source code
// Update Specialty description field from Specialties
function relatedSpecialtiesChange() {
    var lookupItem = new Array();
    lookupItem = Xrm.Page.getAttribute("nav_specialty").getValue();

    if (lookupItem[0] != null) {
        var name = lookupItem[0].name;
        var guid = lookupItem[0].id;
        var entType = lookupItem[0].entityType;

        // alert("Name: " + name + "; ID: " + guid + "; Entity type: " + entType);

        try {
            //Get entity data;
            var serverUrl = Xrm.Page.context.getServerUrl(); // "http://oto480dcrmv/PHODev";
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
                    Xrm.Page.data.entity.attributes.get("nav_description").setValue(org.nav_Description);
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