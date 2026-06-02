if (typeof (de_Incident_Quick) == "undefined")
{ de_Incident_Quick = { __namespace: true }; }

//de_Incident_Quick Library - Start

de_Incident_Quick.Library = {
    //--------------------------------------------------------------------------
    onLoad: function () {       

        if (Xrm.Page.ui.getFormType() == 1) {
            //Xrm.Page.getAttribute("de_consultationdate").setValue(new Date());
            this.de_contact_onChange();
        }
    },
        
    //--------------------------------------------------------------------------
    de_contact_onChange: function () {
        var lookupObject = Xrm.Page.getAttribute("de_contactid");
        if (lookupObject != null) {
            var lookUpObjectValue = lookupObject.getValue();

            // setting customer id
            Xrm.Page.getAttribute("customerid").setValue(lookUpObjectValue);
            if ((lookUpObjectValue != null)) {

                if (lookUpObjectValue[0] != null) {
                    var name = lookUpObjectValue[0].name;
                    var guid = lookUpObjectValue[0].id;
                    var entType = lookUpObjectValue[0].entityType;
                    var serverUrl = Xrm.Page.context.getServerUrl();
                    var odataSelect = serverUrl + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + guid + "')";
                    // alert("ODATA Select: " + odataSelect.toString()); 

                    $.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        url: odataSelect,
                        beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },
                        success: function (data, textStatus, XmlHttpRequest) {
                            var org = data.d;

                            if (org.ParentCustomerId.Id != null) {
                                Xrm.Page.getAttribute("de_accountid").setValue([{ id: org.ParentCustomerId.Id, name: org.ParentCustomerId.Name, entityType: "account" }]);
                            }
                            else {
                                Xrm.Page.getAttribute("de_accountid").setValue(null);
                            }

                        },
                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                            //alert("OData Select Failed: " + odataSelect); 
                        }
                    }
                    );
                }
            }
        }
    },

    //--------------------------------------------------------------------------
    __namespace: true
};

//de_Incident_Quick Library - End