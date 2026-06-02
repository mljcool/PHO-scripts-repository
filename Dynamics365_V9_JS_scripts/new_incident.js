if (typeof (de_Incident) == "undefined")
{ de_Incident = { __namespace: true }; }

//Incident Library - Start

de_Incident.Library = {
    //--------------------------------------------------------------------------
    onLoad: function (executionContext) {

        PHO_de_Common.Library.setFormContext(executionContext);

        this.de_consultationtype_onChange();
        this.visibilityUpdates();
        var formContext = PHO_de_Common.Library.getFormContext();
        if (!formContext) {
            return;
        }

        var currentItem = formContext.ui.formSelector.getCurrentItem();
        var formLbl = currentItem ? currentItem.getLabel() : null;

        if (formContext.ui.getFormType() == 1) {
            if (formLbl == 'IPAC') {
                var consultationDateAttr = formContext.getAttribute("de_consultationdate");
                if (consultationDateAttr != null) {
                    consultationDateAttr.setValue(new Date());
                }
                this.setDueDate();
            }

            if (formLbl == 'HPCB') {
                var hpcbCasePrefixAttr = formContext.getAttribute("de_caseprefix");
                if (hpcbCasePrefixAttr != null) {
                    hpcbCasePrefixAttr.setValue("HPCB");
                }
                
                PHO_de_Common.Library.hideField("de_srmorganization");
                PHO_de_Common.Library.hideField("de_leadid");                
            }

            if (formLbl == 'HPCDIP-ES') {
                var esCasePrefixAttr = formContext.getAttribute("de_caseprefix");
                if (esCasePrefixAttr != null) {
                    esCasePrefixAttr.setValue("ES");
                }
            }

            if (formLbl == 'IVPD') {
                var ivpdCasePrefixAttr = formContext.getAttribute("de_caseprefix");
                if (ivpdCasePrefixAttr != null) {
                    ivpdCasePrefixAttr.setValue("IVPD");
                }
            }
                        
            this.setMandatoryFields();
        }
        else if (formContext.ui.getFormType() == 2) {
            if (formLbl == 'HPCB') {
                this.showHideLeadContactAccount();                   
            }
        }
    },

    //--------------------------------------------------------------------------
    setMandatoryFields: function () {

        var formContext = PHO_de_Common.Library.getFormContext();
        if (!formContext) {
            return;
        }

        var currentItem = formContext.ui.formSelector.getCurrentItem();
        var formLabel = currentItem ? currentItem.getLabel() : null;

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
    de_sector_onChange: function (executionContext) {

        if (executionContext) {
            PHO_de_Common.Library.setFormContext(executionContext);
        }

        var formContext = PHO_de_Common.Library.getFormContext();
        if (!formContext) {
            return;
        }

        var currentItem = formContext.ui.formSelector.getCurrentItem();
        var lbl = currentItem ? currentItem.getLabel() : null;

        if (lbl == 'HPCB') {
            var sectorAttr = formContext.getAttribute("de_sector");
            if (sectorAttr != null && sectorAttr.getValue() == 250000012)
                PHO_de_Common.Library.setRequired("de_othersector", "required");
            else
                PHO_de_Common.Library.setRequired("de_othersector", "none");
        }
    },

    //--------------------------------------------------------------------------
    setDueDate: function () {
        var consultationDateAttr = PHO_de_Common.Library.getAttribute("de_consultationdate");
        var followupByAttr = PHO_de_Common.Library.getAttribute("followupby");
        if (consultationDateAttr == null || followupByAttr == null || consultationDateAttr.getValue() == null) {
            return;
        }

        var today = consultationDateAttr.getValue();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        followupByAttr.setValue(tomorrow);
    },

    //--------------------------------------------------------------------------
    de_consultationdate_onChange: function (executionContext) {
        if (executionContext) {
            PHO_de_Common.Library.setFormContext(executionContext);
        }
        this.setDueDate();
    },

    //--------------------------------------------------------------------------
    onSave: function (executionContext) {
        var wod_SaveMode, wod_SaveEventVal;

        PHO_de_Common.Library.setFormContext(executionContext);

        if (executionContext != null && executionContext.getEventArgs() != null) {

            wod_SaveMode = executionContext.getEventArgs().getSaveMode();

            if (wod_SaveMode == 5) {

                var timeTrackingEnabledAttr = PHO_de_Common.Library.getAttribute("de_timetrackingenabled");
                var totalTimeAttr = PHO_de_Common.Library.getAttribute("de_totaltime");

                if (timeTrackingEnabledAttr != null && timeTrackingEnabledAttr.getValue() == 1) {

                    PHO_de_Common.Library.setRequired("de_totaltime", "required");

                    if (totalTimeAttr != null && totalTimeAttr.getValue() == 0) {
                        alert("Total Time must be greater than 0");
                        executionContext.getEventArgs().preventDefault();
                    }
                }
            }
        }
    },

    //--------------------------------------------------------------------------
    statuscode_onChange: function (executionContext) {
        if (executionContext) {
            PHO_de_Common.Library.setFormContext(executionContext);
        }
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
        var clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
        var ODATA_ENDPOINT = "XRMServices/2011/OrganizationData.svc";
        //odataSetName is required, i.e. "AccountSet"   
        if (!odataSetName) {
            alert("odataSetName is required.");
            return;
        }
        //Build the URI  
        //var odataUri = serverUrl + ODATA_ENDPOINT + "/" + odataSetName;

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

            var value = PHO_de_Common.Library.getFieldValue("statuscode");
            var timeTrackingEnabledAttr = PHO_de_Common.Library.getAttribute("de_timetrackingenabled");
            var totalTimeControl = PHO_de_Common.Library.getControl("de_totaltime");
            if (timeTrackingEnabledAttr == null) {
                return;
            }

            if (data[0].de_Enabled == true) {
                timeTrackingEnabledAttr.setValue(1);
                // displaying Total Time field
                if (totalTimeControl != null)
                    totalTimeControl.setVisible(true); // Total Time

                // setting mandatory fields
                if (value != null && value == 5) // Resolved
                    PHO_de_Common.Library.setRequired("de_totaltime", "required");
                else
                    PHO_de_Common.Library.setRequired("de_totaltime", "none");
            }
            else {
                timeTrackingEnabledAttr.setValue(0);
                // hiding Total Time field
                if (totalTimeControl != null)
                    totalTimeControl.setVisible(false);
            }
        }
    },

    //--------------------------------------------------------------------------
    de_consultationtype_onChange: function (executionContext) {

        if (executionContext) {
            PHO_de_Common.Library.setFormContext(executionContext);
        }

        var formContext = PHO_de_Common.Library.getFormContext();
        if (!formContext) {
            return;
        }

        var currentItem = formContext.ui.formSelector.getCurrentItem();
        var lbl = currentItem ? currentItem.getLabel() : null;

        if (lbl == 'IPAC') {

            var ct = formContext.getAttribute("de_consultationtype");
            if (ct == null) {
                return;
            }

            var tab6 = formContext.ui.tabs.get("tab_6");
            var firstTab = formContext.ui.tabs.get(0);
            var responseSection = firstTab ? firstTab.sections.get("general_section_10") : null;
            var outcomeSection = firstTab ? firstTab.sections.get("tab_4_section_2") : null;

            switch (ct.getValue()) {
                case 250000000: // Inquiry
                    if (tab6 != null)
                        tab6.setVisible(false); // Consultation Participants
                    if (responseSection != null)
                        responseSection.setVisible(true);  // Response
                    if (outcomeSection != null)
                        outcomeSection.setVisible(false);  // Outcome
                    break;
                default:
                    if (tab6 != null)
                        tab6.setVisible(true); // Consultation Participants
                    if (responseSection != null)
                        responseSection.setVisible(false);  // Response
                    if (outcomeSection != null)
                        outcomeSection.setVisible(true);  // Outcome
                    break;
            }
        }
    },

    //--------------------------------------------------------------------------
    de_contact_onChange: function (executionContext) {
        if (executionContext) {
            PHO_de_Common.Library.setFormContext(executionContext);
        }

        var formContext = PHO_de_Common.Library.getFormContext();
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
                    var serverUrl = Xrm.Utility.getGlobalContext().getClientUrl();
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