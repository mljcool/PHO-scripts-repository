if (typeof (de_Education) == "undefined")
{ de_Education = { __namespace: true }; }

// Education Library - Start

de_Education.Library = {
    //--------------------------------------------------------------------------
    onLoad: function () {
        this.setClearDateRescheduled();
        this.updateTimeTracking();
        this.visibilityUpdates();
    },

    //--------------------------------------------------------------------------
    onSave: function (context) {

        if (Xrm.Page.getAttribute("de_timetrackingenabled").getValue() == 1) {
            if (Xrm.Page.getAttribute("de_deliverytime").getValue() != null && Xrm.Page.getAttribute("de_duration").getValue() != null) {

                if (Xrm.Page.getAttribute("de_deliverytime").getValue() > Xrm.Page.getAttribute("de_duration").getValue()) {
                    alert("Delivery Time cannot be greater than Duration.");
                    context.getEventArgs().preventDefault();
                }
            }
        }
    },

    //--------------------------------------------------------------------------
    statuscode_onChange: function () {
        this.setClearDateRescheduled();
        this.visibilityUpdates();
    },

    //--------------------------------------------------------------------------
    visibilityUpdates: function () {

        var value = PHO_de_Common.Library.getFieldValue("statuscode");

        if (Xrm.Page.getAttribute("de_timetrackingenabled").getValue() == 1) {

            // displaying Preparation and Delivery Time fields
            Xrm.Page.ui.controls.get("de_preparationtime").setVisible(true); // Preparation Time
            Xrm.Page.ui.controls.get("de_deliverytime").setVisible(true);  // Delivery Time

            // setting mandatory fields
            if (value != null && value == 250000002) // Completed
            {
                PHO_de_Common.Library.setRequired("de_preparationtime", "required");
                PHO_de_Common.Library.setRequired("de_deliverytime", "required");
            }
            else {
                PHO_de_Common.Library.setRequired("de_preparationtime", "none");
                PHO_de_Common.Library.setRequired("de_deliverytime", "none");
            }
        }
        else {
            // hiding Preparation and Delivery Time fields
            Xrm.Page.ui.controls.get("de_preparationtime").setVisible(false); // Preparation Time
            Xrm.Page.ui.controls.get("de_deliverytime").setVisible(false);  // Delivery Time
        }

    },

    //--------------------------------------------------------------------------
    updateTimeTracking: function () {
        var _condition = "Time Tracking in Education and Consultation Modules";
        if (_condition != null) {
            this.retrieveMultiple("de_configurationSet", "?$filter=de_name eq '" + _condition + "' ", this.RetrieveEntityRecords, null, null);
        }
    },

    //--------------------------------------------------------------------------
    setClearDateRescheduled: function () {
        var val = PHO_de_Common.Library.getFieldValue("statuscode");

        if (val != null && val != "250000000") { //250000000 - Cancelled
            PHO_de_Common.Library.setFieldValue("de_daterescheduled", null);
            PHO_de_Common.Library.setRequired("de_daterescheduled", "none");
            PHO_de_Common.Library.hideField("de_daterescheduled");
        }
        else {
            PHO_de_Common.Library.showField("de_daterescheduled");
        }
    },

    //--------------------------------------------------------------------------
    retrieveMultiple: function (odataSetName, filter, successCallback, errorCallback, _executionObj) {
        _executionObjMultiretrive = _executionObj;
        var context = Xrm.Page.context;
        var serverUrl = context.getServerUrl();
        var ODATA_ENDPOINT = "XRMServices/2011/OrganizationData.svc";
        //odataSetName is required, i.e. "AccountSet"   
        if (!odataSetName) {
            alert("odataSetName is required.");
            return;
        }
        //Build the URI  
        //var odataUri = serverUrl + ODATA_ENDPOINT + "/" + odataSetName;
        var odataUri = document.location.protocol + "//" + document.location.host + "/" + context.getOrgUniqueName() + "/" + ODATA_ENDPOINT + "/" + odataSetName;

        //If a filter is supplied, append it to the OData URI 
        if (filter) {
            odataUri += filter;
        }
        //Asynchronous AJAX function to Retrieve CRM records using OData 
        $.ajax({
            type: "GET",
            async: false,
            contentType: "application/json; charset=utf-8",
            datatype: "json", url: odataUri,
            beforeSend: function (XMLHttpRequest) {
                //Specifying this header ensures that the results will be returned as JSON. 
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            success: function (data, textStatus, XmlHttpRequest) {
                if (successCallback) {
                    if (data && data.d && data.d.results) {
                        successCallback(data.d.results, textStatus, XmlHttpRequest);
                    }
                    else if (data && data.d) {
                        successCallback(data.d, textStatus, XmlHttpRequest);
                    }
                    else {
                        successCallback(data, textStatus, XmlHttpRequest);
                    }
                }
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                if (errorCallback)
                    errorCallback(XmlHttpRequest, textStatus, errorThrown);
                else
                    errorHandler(XmlHttpRequest, textStatus, errorThrown);
            }
        });
    },

    //--------------------------------------------------------------------------
    RetrieveEntityRecords: function (data, textStatus, XmlHttpRequest) {
        if (data.length > 0) {
            if (data[0].de_Enabled == true) {
                Xrm.Page.getAttribute("de_timetrackingenabled").setValue(1);
            }
            else {
                Xrm.Page.getAttribute("de_timetrackingenabled").setValue(0);
            }
        }
    },

    //--------------------------------------------------------------------------
    __namespace: true
};

// Education Library - End