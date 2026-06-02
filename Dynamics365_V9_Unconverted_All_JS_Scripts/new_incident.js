if (typeof (de_Incident) == "undefined")
{ de_Incident = { __namespace: true }; }

//Incident Library - Start

de_Incident.Library = {
    //--------------------------------------------------------------------------
    onLoad: function () {

        this.de_consultationtype_onChange();
        this.visibilityUpdates();
        var formLbl = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();

        if (Xrm.Page.ui.getFormType() == 1) {
            if (formLbl == 'IPAC') {
                Xrm.Page.getAttribute("de_consultationdate").setValue(new Date());
                this.setDueDate();
            }

            if (formLbl == 'HPCB') {
                Xrm.Page.getAttribute("de_caseprefix").setValue("HPCB");
                
                PHO_de_Common.Library.hideField("de_srmorganization");
                PHO_de_Common.Library.hideField("de_leadid");                
            }

            if (formLbl == 'HPCDIP-ES') {
                Xrm.Page.getAttribute("de_caseprefix").setValue("ES");                
            }

            if (formLbl == 'IVPD') {
                Xrm.Page.getAttribute("de_caseprefix").setValue("IVPD");                
            }
                        
            this.setMandatoryFields();
        }
        else if (Xrm.Page.ui.getFormType() == 2) {
            if (formLbl == 'HPCB') {
                this.showHideLeadContactAccount();                   
            }
        }
    },

    //--------------------------------------------------------------------------
    setMandatoryFields: function () {

        var formLabel = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();

        if (formLabel == 'HPCB') {

            // required fields
            //PHO_de_Common.Library.setRequired("de_firstname", "required");
            //PHO_de_Common.Library.setRequired("de_lastname", "required");
            //PHO_de_Common.Library.setRequired("de_jobtitle", "required");
            //PHO_de_Common.Library.setRequired("de_organization", "required");
            //PHO_de_Common.Library.setRequired("de_email", "required");
            //PHO_de_Common.Library.setRequired("de_telephone", "required");
            // PHO_de_Common.Library.setRequired("de_telephoneextension", "required");
            //PHO_de_Common.Library.setRequired("de_city", "required");
            //PHO_de_Common.Library.setRequired("de_province", "required");
            //PHO_de_Common.Library.setRequired("de_sector", "required");
            //PHO_de_Common.Library.setRequired("de_region", "required");
            //PHO_de_Common.Library.setRequired("de_talkedwithanyoneatpho", "required");
            //PHO_de_Common.Library.setRequired("description", "required");

            this.de_sector_onChange();

            // optional
            //PHO_de_Common.Library.setRequired("subjectid", "none");
            //PHO_de_Common.Library.setRequired("title", "none");
            //PHO_de_Common.Library.setRequired("followupby", "none");
            //PHO_de_Common.Library.setRequired("de_consultationdate", "none");
        }
    },

    //--------------------------------------------------------------------------
    de_sector_onChange: function () {

        var lbl = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();

        if (lbl == 'HPCB') {
            if (Xrm.Page.getAttribute("de_sector").getValue() == 250000012)
                PHO_de_Common.Library.setRequired("de_othersector", "required");
            else
                PHO_de_Common.Library.setRequired("de_othersector", "none");
        }
    },

    //--------------------------------------------------------------------------
    setDueDate: function () {
        var today = Xrm.Page.getAttribute("de_consultationdate").getValue()
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        Xrm.Page.getAttribute("followupby").setValue(tomorrow);
    },

    //--------------------------------------------------------------------------
    de_consultationdate_onChange: function () {
        this.setDueDate();
    },

    //--------------------------------------------------------------------------
    onSave: function (context) {
        var wod_SaveMode, wod_SaveEventVal;

        if (context != null && context.getEventArgs() != null) {

            wod_SaveMode = context.getEventArgs().getSaveMode();

            if (wod_SaveMode == 5) {

                if (Xrm.Page.getAttribute("de_timetrackingenabled").getValue() == 1) {

                    PHO_de_Common.Library.setRequired("de_totaltime", "required");

                    if (Xrm.Page.getAttribute("de_totaltime").getValue() == 0) {
                        alert("Total Time must be greater than 0");
                        context.getEventArgs().preventDefault();
                    }
                }
            }
        }
    },

    //--------------------------------------------------------------------------
    statuscode_onChange: function () {
        this.visibilityUpdates();
    },

    //--------------------------------------------------------------------------
    visibilityUpdates: function () {
        var _condition = "Time Tracking in Education and Consultation Modules";
        if (_condition != null) {
            this.retrieveMultiple("de_configurationSet", "?$filter=de_name eq '" + _condition + "' ", this.RetrieveEntityRecords, null, null);
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

            var value = PHO_de_Common.Library.getFieldValue("statuscode");

            if (data[0].de_Enabled == true) {
                Xrm.Page.getAttribute("de_timetrackingenabled").setValue(1);
                // displaying Total Time field
                Xrm.Page.ui.controls.get("de_totaltime").setVisible(true); // Total Time

                // setting mandatory fields
                if (value != null && value == 5) // Resolved
                    PHO_de_Common.Library.setRequired("de_totaltime", "required");
                else
                    PHO_de_Common.Library.setRequired("de_totaltime", "none");
            }
            else {
                Xrm.Page.getAttribute("de_timetrackingenabled").setValue(0);
                // hiding Total Time field
                Xrm.Page.ui.controls.get("de_totaltime").setVisible(false);
            }
        }
    },

    //--------------------------------------------------------------------------
    de_consultationtype_onChange: function () {

        var lbl = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();

        if (lbl == 'IPAC') {

            var ct = Xrm.Page.getAttribute("de_consultationtype");

            switch (ct.getValue()) {
                case 250000000: // Inquiry
                    Xrm.Page.ui.tabs.get("tab_6").setVisible(false); // Consultation Participants
                    Xrm.Page.ui.tabs.get(0).sections.get("general_section_10").setVisible(true);  // Response
                    Xrm.Page.ui.tabs.get(0).sections.get("tab_4_section_2").setVisible(false);  // Outcome
                    break;
                default:
                    Xrm.Page.ui.tabs.get("tab_6").setVisible(true); // Consultation Participants
                    Xrm.Page.ui.tabs.get(0).sections.get("general_section_10").setVisible(false);  // Response
                    Xrm.Page.ui.tabs.get(0).sections.get("tab_4_section_2").setVisible(true);  // Outcome
                    break;
            }
        }
    },

    //--------------------------------------------------------------------------
    de_contact_onChange: function () {
        var lookupObject = Xrm.Page.getAttribute("de_contactid");
        var context = Xrm.Page.context;

        if (lookupObject != null) {
            var lookUpObjectValue = lookupObject.getValue();

            // setting customer id
            Xrm.Page.getAttribute("customerid").setValue(lookUpObjectValue);
            if ((lookUpObjectValue != null)) {

                if (lookUpObjectValue[0] != null) {
                    var name = lookUpObjectValue[0].name;
                    var guid = lookUpObjectValue[0].id;
                    var entType = lookUpObjectValue[0].entityType;
                    //var serverUrl = Xrm.Page.context.getServerUrl();
                    var serverUrl = document.location.protocol + "//" + document.location.host + "/" + context.getOrgUniqueName();
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

        //this.showHideLeadContactAccount();
    },

    //--------------------------------------------------------------------------
    showHideLeadContactAccount: function () {
        var contactId = PHO_de_Common.Library.getLookupId("de_contactid");
        var leadId = PHO_de_Common.Library.getLookupId("de_leadid");

        if (contactId == null && leadId != null) {            
            PHO_de_Common.Library.showField("de_srmorganization");
            PHO_de_Common.Library.showField("de_leadid");

            PHO_de_Common.Library.setRequired("de_contactid", CRM_FORM_REQUIREDLEVEL_NONE);            
        }
        else {
            PHO_de_Common.Library.setRequired("de_contactid", CRM_FORM_REQUIREDLEVEL_REQUIRED);

            PHO_de_Common.Library.hideField("de_srmorganization");
            PHO_de_Common.Library.hideField("de_leadid");
        }
    },

    //--------------------------------------------------------------------------
    __namespace: true
};

//Incident Library - End