if (typeof (de_Incident_Quick) == "undefined")
{ de_Incident_Quick = { __namespace: true }; }

//de_Incident_Quick Library - Start

de_Incident_Quick.Library = {
    //--------------------------------------------------------------------------
    onLoad: function (executionContext) {
        var formContext = de_Incident_Quick.Library.getFormContext(executionContext);
        if (!formContext) {
            return;
        }

        if (formContext.ui.getFormType() == 1) {
            //formContext.getAttribute("de_consultationdate").setValue(new Date());
            this.de_contact_onChange(executionContext);
        }
    },
        
    //--------------------------------------------------------------------------
    de_contact_onChange: function (executionContext) {
        var formContext = de_Incident_Quick.Library.getFormContext(executionContext);
        if (!formContext) {
            return;
        }

        var lookupObject = formContext.getAttribute("de_contactid");
        if (lookupObject != null) {
            var lookUpObjectValue = lookupObject.getValue();

            // setting customer id
            var customerIdAttr = formContext.getAttribute("customerid");
            if (customerIdAttr != null) {
                customerIdAttr.setValue(lookUpObjectValue);
            }

            if ((lookUpObjectValue != null)) {

                if (lookUpObjectValue[0] != null) {
                    var name = lookUpObjectValue[0].name;
                    var guid = lookUpObjectValue[0].id;
                    var entType = lookUpObjectValue[0].entityType;
                    var clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
                    var odataSelect = clientUrl + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + guid + "')";
                    // alert("ODATA Select: " + odataSelect.toString()); 

                    $.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        url: odataSelect,
                        beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },
                        success: function (data, textStatus, XmlHttpRequest) {
                            var org = data.d;
                            var accountIdAttr = formContext.getAttribute("de_accountid");
                            if (accountIdAttr == null) {
                                return;
                            }

                            if (org.ParentCustomerId.Id != null) {
                                accountIdAttr.setValue([{ id: org.ParentCustomerId.Id, name: org.ParentCustomerId.Name, entityType: "account" }]);
                            }
                            else {
                                accountIdAttr.setValue(null);
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
    getFormContext: function (executionContext) {
        if (executionContext && typeof executionContext.getFormContext === "function") {
            return executionContext.getFormContext();
        }

        if (executionContext && typeof executionContext.getAttribute === "function" && typeof executionContext.getControl === "function") {
            return executionContext;
        }

        return null;
    },

    //--------------------------------------------------------------------------
    __namespace: true
};

//de_Incident_Quick Library - End