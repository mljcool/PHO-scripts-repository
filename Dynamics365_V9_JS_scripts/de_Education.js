if (typeof (de_Education) == "undefined")
{ de_Education = { __namespace: true }; }

// Education Library - Start

de_Education.Library = {
    //--------------------------------------------------------------------------
    onLoad: function (executionContext) {
        PHO_de_Common.Library.setFormContext(executionContext);
        this.setClearDateRescheduled();
        this.updateTimeTracking();
        this.visibilityUpdates();
    },

    //--------------------------------------------------------------------------
    onSave: function (executionContext) {

        PHO_de_Common.Library.setFormContext(executionContext);

        var timeTrackingEnabledAttr = PHO_de_Common.Library.getAttribute("de_timetrackingenabled");
        var deliveryTimeAttr = PHO_de_Common.Library.getAttribute("de_deliverytime");
        var durationAttr = PHO_de_Common.Library.getAttribute("de_duration");

        if (timeTrackingEnabledAttr != null && timeTrackingEnabledAttr.getValue() == 1) {
            if (deliveryTimeAttr != null && durationAttr != null && deliveryTimeAttr.getValue() != null && durationAttr.getValue() != null) {

                if (deliveryTimeAttr.getValue() > durationAttr.getValue()) {
                    alert("Delivery Time cannot be greater than Duration.");
                    executionContext.getEventArgs().preventDefault();
                }
            }
        }
    },

    //--------------------------------------------------------------------------
    statuscode_onChange: function (executionContext) {
        PHO_de_Common.Library.setFormContext(executionContext);
        this.setClearDateRescheduled();
        this.visibilityUpdates();
    },

    //--------------------------------------------------------------------------
    visibilityUpdates: function () {

        var value = PHO_de_Common.Library.getFieldValue("statuscode");
        var timeTrackingEnabledAttr = PHO_de_Common.Library.getAttribute("de_timetrackingenabled");
        var preparationTimeControl = PHO_de_Common.Library.getControl("de_preparationtime");
        var deliveryTimeControl = PHO_de_Common.Library.getControl("de_deliverytime");

        if (timeTrackingEnabledAttr != null && timeTrackingEnabledAttr.getValue() == 1) {

            // displaying Preparation and Delivery Time fields
            if (preparationTimeControl != null)
                preparationTimeControl.setVisible(true); // Preparation Time
            if (deliveryTimeControl != null)
                deliveryTimeControl.setVisible(true);  // Delivery Time

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
            if (preparationTimeControl != null)
                preparationTimeControl.setVisible(false); // Preparation Time
            if (deliveryTimeControl != null)
                deliveryTimeControl.setVisible(false);  // Delivery Time
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
        var globalContext = Xrm.Utility.getGlobalContext();
        var clientUrl = globalContext.getClientUrl();
        var ODATA_ENDPOINT = "XRMServices/2011/OrganizationData.svc";
        //odataSetName is required, i.e. "AccountSet"   
        if (!odataSetName) {
            alert("odataSetName is required.");
            return;
        }
        //Build the URI  
        var odataUri = clientUrl + "/" + ODATA_ENDPOINT + "/" + odataSetName;

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
            var timeTrackingEnabledAttr = PHO_de_Common.Library.getAttribute("de_timetrackingenabled");
            if (timeTrackingEnabledAttr == null) {
                return;
            }

            if (data[0].de_Enabled == true) {
                timeTrackingEnabledAttr.setValue(1);
            }
            else {
                timeTrackingEnabledAttr.setValue(0);
            }
        }
    },

    //--------------------------------------------------------------------------
    __namespace: true
};

// Education Library - End