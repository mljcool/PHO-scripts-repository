if (typeof (PHO_de_Common) == "undefined")
{ PHO_de_Common = { __namespace: true }; }

//------------------------------------------------------------------------------
//******************************* Start - Common Variables**********************
//------------------------------------------------------------------------------

var CRM_FORM_TYPE_CREATE = 1;
var CRM_FORM_TYPE_UPDATE = 2;
var CRM_FORM_TYPE_READONLY = 3;
var CRM_FORM_TYPE_DISABLED = 4;
var CRM_FORM_TYPE_BULKEDIT = 6;

var CRM_FORM_SAVEMODE_SAVE = 1;
var CRM_FORM_SAVEMODE_SAVEANDCLOSE = 2;
var CRM_FORM_SAVEMODE_SAVEASCOMPLETED = 58;
var CRM_FORM_SAVEMODE_SAVEANDNEW = 59;
var CRM_FORM_SAVEMODE_AUTOSAVE = 70;

var CRM_FORM_SUBMITMODE_ALWAYS = "always";
var CRM_FORM_SUBMITMODE_NEVER = "never";
var CRM_FORM_SUBMITMODE_DIRTY = "dirty";

var CRM_FORM_REQUIREDLEVEL_NONE = "none";
var CRM_FORM_REQUIREDLEVEL_REQUIRED = "required";
var CRM_FORM_REQUIREDLEVEL_RECOMMENDED = "recommended";


/* Digitalembrace environment 
var _SSRSURL = 'http://crm2011.digitalembrace.ca:85/SPS';
var _MOSSURL = 'http://SPS.moss2010.digitalembrace.ca';
*/

/*  FQA Environment
var _SSRSURL = 'http://ltcbigdcapcrm02.cihs.ad.gov.on.ca/SPS';
var _MOSSURL = 'http://ltcbigdcwhiis21.cihs.ad.gov.on.ca:8090/sites/SPS';
*/

/*  UAT Environment
var _SSRSURL = 'https://intra.stage.dynxrm.netcoe.gov.on.ca/SPS';
var _MOSSURL = 'https://extra.sse.gov.on.ca/sites/mnr-sps';
*/

/*  PRD Environment
*/
var _SSRSURL = 'https://intra.dynxrm.netcoe.gov.on.ca/SPS';
var _MOSSURL = 'https://extra.sse.gov.on.ca/sites/mnr-sps';

var _StatementOfAccountRpt = "{ddbbcef3-b326-e211-81af-00155d027d03}";
var _SARAgreementReportId = "58DDEB16-813D-E211-B310-00155D027D03";
var _PaymentBatchRpt = "{74df6e2a-b426-e211-81af-00155d027d03}";
var _ExpenditureActualsRpt = "{979e4b64-b426-e211-81af-00155d027d03}";
var _MFTIPCLTIPOverlapReportId = "30B7C8C0-35EB-E211-8612-00155D018003";

//------------------------------------------------------------------------------
//******************************* End - Common Variables************************
//------------------------------------------------------------------------------

// Common Library Start

PHO_de_Common.Library = {
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    hideNavItem: function (navId) {
        var navItem = document.getElementById(navId);
        if (!navItem) return;
        navItem.style.display = 'none';
    },

    //--------------------------------------------------------------------------
    showNavItem: function (navId) {
        var navItem = document.getElementById(navId);
        if (!navItem) return;
        navItem.style.display = 'block';
    },

    //--------------------------------------------------------------------------
    disableField: function (fieldName) {
        var field = Xrm.Page.ui.controls.get(fieldName);
        if (field != null)
            field.setDisabled(true);
    },

    //--------------------------------------------------------------------------
    enableField: function (fieldName) {
        var field = Xrm.Page.ui.controls.get(fieldName);
        if (field != null)
            field.setDisabled(false);
    },

    //--------------------------------------------------------------------------
    setRequired: function (fieldName, requiredLevel) {
        var field = Xrm.Page.getAttribute(fieldName);
        if (field != null)
            field.setRequiredLevel(requiredLevel);
    },

    //--------------------------------------------------------------------------
    hideField: function (fieldName) {
        var field = Xrm.Page.ui.controls.get(fieldName);
        if (field != null)
            field.setVisible(false);
    },

    //--------------------------------------------------------------------------
    showField: function (fieldName) {
        var field = Xrm.Page.ui.controls.get(fieldName);
        if (field != null)
            field.setVisible(true);
    },

    //--------------------------------------------------------------------------
    getFieldValue: function (fieldName) {
        var field = Xrm.Page.getAttribute(fieldName);
        if (field != null)
            return field.getValue();
    },

    //--------------------------------------------------------------------------
    setFieldValue: function (fieldName, value) {
        var field = Xrm.Page.getAttribute(fieldName);
        if (field != null)
            field.setValue(value);
    },

    //--------------------------------------------------------------------------
    clearFieldValue: function (fieldName) {
        var field = Xrm.Page.getAttribute(fieldName);
        if (field != null)
            field.setValue(null);
    },

    //--------------------------------------------------------------------------
    setFocus: function (fieldName) {
        var field = Xrm.Page.getControl(fieldName);
        if (field != null)
            field.setFocus(true);
    },

    //--------------------------------------------------------------------------
    hideSection: function (tabNumber, sectionNumber) {
        var tab = Xrm.Page.ui.tabs.get(tabNumber);

        if (tab != null) {
            tab.sections.get(sectionNumber).setVisible(false);
        }
    },

    //--------------------------------------------------------------------------
    showSection: function (tabNumber, sectionNumber) {
        var tab = Xrm.Page.ui.tabs.get(tabNumber);

        if (tab != null) {
            tab.sections.get(sectionNumber).setVisible(true);
        }
    },

    //--------------------------------------------------------------------------
    hideTab: function (tabNumber) {
        var field = Xrm.Page.ui.tabs.get(tabNumber);
        if (field != null)
            field.setVisible(false);
    },

    //--------------------------------------------------------------------------
    showTab: function (tabNumber) {
        var field = Xrm.Page.ui.tabs.get(tabNumber);
        if (field != null)
            field.setVisible(true);
    },

    //--------------------------------------------------------------------------
    clearLookup: function (lookupName) {
        var field = Xrm.Page.getAttribute(lookupName);
        if (field != null)
            field.setValue(null);
    },

    //--------------------------------------------------------------------------
    setLookupValue: function (lookupName, id, name, entityType) {
        var field = Xrm.Page.getAttribute(lookupName);
        if (field != null)
            field.setValue([{ id: id, name: name, entityType: entityType }]);
    },

    //--------------------------------------------------------------------------
    setAttributeSubmitMode: function (id, mode) {
        Xrm.Page.getAttribute(id).setSubmitMode(mode);;
    },

    //--------------------------------------------------------------------------

    clearMask: function (selector) {
        $("#" + selector).unmask();
    },

    //--------------------------------------------------------------------------
    setFieldSubmitMode: function (fieldName, mode) {
        var field = Xrm.Page.getAttribute(fieldName);
        if (field != null)
            field.setSubmitMode(mode);
    },

    //--------------------------------------------------------------------------

    setMoneyMask: function (selector) {
        $("#" + selector).mask("?999999999").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val());
        });

    },

    //--------------------------------------------------------------------------
    setNumberMask: function (selector, digits) {
        var mask = "999999999999";
        $("#" + selector).mask("?" + mask.substring(0, digits)).focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val());
        });

    },

    //--------------------------------------------------------------------------
    setPostalCodeMask: function (selector) {
        $("#" + selector).mask("a9a 9a9").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val());
        });

        Xrm.Page.getAttribute(selector).setValue($("#" + selector).val());
    },

    //--------------------------------------------------------------------------
    setZipCodeMask: function (selector) {
        $("#" + selector).mask("?99999").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val());
        });

        Xrm.Page.getAttribute(selector).setValue($("#" + selector).val());
    },

    //--------------------------------------------------------------------------
    setTelephoneMask: function (selector) {
        $("#" + selector).mask("?(999) 999-9999 x99999").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val().replace(/_/g, ''));

            var val = Xrm.Page.getAttribute(selector).getValue();
            if ((val != null) && (val != "() - x")) {
                if (val.substring(val.length - 1, val.length) == "x") {
                    Xrm.Page.getAttribute(selector).setValue(val.slice(0, -1));
                }
            }
        });

        Xrm.Page.getAttribute(selector).setValue($("#" + selector).val());
    },
    //--------------------------------------------------------------------------
    validateTelephone: function (selector) {

        var val = Xrm.Page.getAttribute(selector).getValue();
        var regex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([0-9]1[0-9]|[0-9][0-9]1|[0-9][0-9][0-9])\s*\)|([0-9]1[0-9]|[0-9][0-9]1|[0-9][0-9][0-9]))\s*(?:[.-]\s*)?)?([0-9]1[0-9]|[0-9][0-9]1|[0-9][0-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

        if (regex.test(Xrm.Page.getAttribute(selector).getValue()))
            return true;
        else
            return false;
    },

    //--------------------------------------------------------------------------
    validatePostalCode: function (selector) {
        var regex = /^[a-zA-Z][0-9][a-zA-Z]\s?[0-9][a-zA-Z][0-9]$/;
        if (regex.test(Xrm.Page.getAttribute(selector).getValue()))
            return true;
        else {
            Xrm.Page.ui.controls.get(selector).setFocus();
            return false;
        }
    },

    //--------------------------------------------------------------------------
    validateZipCode: function (selector) {
        var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)$/;
        if (regex.test(Xrm.Page.getAttribute(selector).getValue()))
            return true;
        else {
            Xrm.Page.ui.controls.get(selector).setFocus();
            return false;
        }
    },

    //--------------------------------------------------------------------------
    validateIFISCode: function (selector) {

        var val = Xrm.Page.getAttribute(selector).getValue();
        var regex = /^[\d-]+$/;

        if (regex.test(Xrm.Page.getAttribute(selector).getValue()))
            return true;
        else {
            Xrm.Page.ui.controls.get(selector).setFocus();
            return false;
        }
    },

    //--------------------------------------------------------------------------
    validateARN: function (selector) {

        var val = Xrm.Page.getAttribute(selector).getValue();
        var regex = /^[\d]+$/;

        if (regex.test(Xrm.Page.getAttribute(selector).getValue()))
            return true;
        else {
            Xrm.Page.ui.controls.get(selector).setFocus();
            return false;
        }
    },

    //--------------------------------------------------------------------------
    setMobilePhoneMask: function (selector) {
        $("#" + selector).mask("(999) 999-9999").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val().replace(/_/g, ''));

            var val = Xrm.Page.getAttribute(selector).getValue();
            if (val != null) {
                if (val.substring(val.length - 1, val.length) == "x") {
                    Xrm.Page.getAttribute(selector).setValue(val.slice(0, -1));
                }
            }
        });
        Xrm.Page.getAttribute(selector).setValue($("#" + selector).val());
    },

    //--------------------------------------------------------------------------
    setFaxMask: function (selector) {
        $("#" + selector).mask("(999) 999-9999").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val().replace(/_/g, ''));

            var val = Xrm.Page.getAttribute(selector).getValue();
            if (val != null) {
                if (val.substring(val.length - 1, val.length) == "x") {
                    Xrm.Page.getAttribute(selector).setValue(val.slice(0, -1));
                }
            }
        });
        Xrm.Page.getAttribute(selector).setValue($("#" + selector).val());
    },

    //--------------------------------------------------------------------------
    setIFISCodeMask: function (selector) {
        $("#" + selector).mask("?999-999999-9999-999999-999999-9999-9999-9999").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val());
        });
    },

    //--------------------------------------------------------------------------
    setARNMask: function (selector) {
        $("#" + selector).mask("?999999999999999").focusout(function () {
            Xrm.Page.getAttribute(selector).setValue($(this).val());
        });
    },

    //--------------------------------------------------------------------------
    setValueAfterMask: function (selector) {
        if (Xrm.Page.getAttribute(selector) != null) {
            if (Xrm.Page.getAttribute(selector).getValue() != $("#" + selector).val())
                Xrm.Page.getAttribute(selector).setValue($("#" + selector).val());
        }

    },

    //--------------------------------------------------------------------------
    //******************************* End - Show Hide Items ******************
    //--------------------------------------------------------------------------
    getLookupId: function (fieldname) {
        var lookupItem = Xrm.Page.getAttribute(fieldname).getValue();
        var id;

        if (lookupItem != null) {
            id = lookupItem[0].id;
            id = id.replace("{", "");
            id = id.replace("}", "");
        }
        return id;
    },

    //--------------------------------------------------------------------------
    getLookupNameText: function (fieldname) {
        var lookupItem = Xrm.Page.getAttribute(fieldname).getValue();
        var name;

        if (lookupItem != null) {
            name = lookupItem[0].name;
        }
        return name;
    },     
   
    //--------------------------------------------------------------------------
    getSectorbyId: function (id) {
        var queryOptions = {
            entityName: "de_sector",
            attributes: ["de_sectorid"],
            values: [id],
            columnSet: ["de_sectorid", "de_name", "de_code"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getAccountbyId: function (id) {
        var queryOptions = {
            entityName: "account",
            attributes: ["accountid"],
            values: [id],
            columnSet: ["name", "accountid", "telephone1"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getContactbyId: function (id) {
        var queryOptions = {
            entityName: "contact",
            attributes: ["contactid"],
            values: [id],
            columnSet: ["firstname", "lastname", "fullname", "contactid",  "telephone1", "customertypecode", "emailaddress1"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getAffiliationContactsOfAccountbyId: function (id) {
        var queryOptions = {
            entityName: "contact",
            attributes: ["lhin_accountid"],
            values: [id],
            columnSet: ["firstname", "lastname", "contactid", "fullname", "lhin_accountid", "lhin_titletype"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------








    //--------------------------------------------------------------------------
    getUserbyId: function (id) {
        var queryOptions = {
            entityName: "systemuser",
            attributes: ["systemuserid"],
            values: [id],
            columnSet: ["businessunitid", "fullname", "parentsystemuserid"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getProjectbyId: function (id) {
        var queryOptions = {
            entityName: "de_project",
            attributes: ["de_projectid"], // Search by projectid
            values: [id], // Find all projects
            columnSet: ["de_name", "de_projectid", "de_programid", "de_permitid", "de_formid", "de_clientshareamount",
                        "de_federalshareamount", "de_provincialshareamount", "de_otherfundingamount", "de_holdbackpct",
                        "de_startdate", "de_enddate", "de_provincialreimbursementpct", "de_federalreimbursementpct"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getProjectTypebyId: function (id) {
        var queryOptions = {
            entityName: "de_projecttype",
            attributes: ["de_projecttypeid"], // Search by projectTypeid
            values: [id], // Find all project Types
            columnSet: ["de_name", "de_projecttypeid"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getAssessmentPackagesbyAssessmentId: function (id) {
        var queryOptions = {
            entityName: "de_assessmentpackage",
            attributes: ["de_assessmentid"], // Search by assessmentid
            values: [id], // Find all Assessment Packages
            columnSet: ["de_assessmentpackageno", "de_assessmentid", "statuscode", "de_totalpct", "de_totalscore"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getAssessmentbyAssessmentId: function (id) {
        var queryOptions = {
            entityName: "de_assessment",
            attributes: ["de_assessmentid"], // Search by assessmentid
            values: [id], // Find Assessment
            columnSet: ["de_assessmentid", "de_projectid"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getPermitbyPermitId: function (id) {
        var queryOptions = {
            entityName: "de_permit",
            attributes: ["de_permitid"], // Search by permitid
            values: [id], // Find Permit
            columnSet: ["de_permitid", "de_name"]
        };

        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getClaimbyId: function (id) {
        var queryOptions = {
            entityName: "de_claim",
            attributes: ["de_claimid"], // Search by claimid
            values: [id], // Find all claims  
            columnSet: ["de_claimid", "de_type", "statuscode", "de_projectid", "de_claimformid"]
        };
        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },

    //--------------------------------------------------------------------------
    getChangeRequestbyId: function (id) {
        var queryOptions = {
            entityName: "de_change_request",
            attributes: ["activityid"], // Search by id
            values: [id], // Find all  
            columnSet: ["activityid", "activitytypecode", "statuscode", "de_formid"]
        };
        return (XrmServiceToolkit.Soap.QueryByAttribute(queryOptions));
    },
    
    //--------------------------------------------------------------------------
    validateStartAndEndDate: function (startDate, endDate) {
        var result = true;

        if (startDate != null && endDate != null) {
            if (startDate.valueOf() > endDate.valueOf()) {
                alert("End Date can not be before Start Date");
                result = false;
            }
        }

        return (result);
    },

    //--------------------------------------------------------------------------
    disableFormWithAdminOveride: function (enableAdminOverride) {
        var allAttributes = Xrm.Page.data.entity.attributes.get();
        for (var i in allAttributes) {
            var myattribute = Xrm.Page.data.entity.attributes.get(allAttributes[i].getName());
            var myname = myattribute.getName();
            if (!enableAdminOverride || myname != "statuscode")
                Xrm.Page.getControl(myname).setDisabled(true);
        }
    },

    //--------------------------------------------------------------------------
    disableFormUsingChangeRequestId: function (activityId) {
        if (activityId != null) {
            var fetchedRequest = PHO_de_Common.Library.getChangeRequestbyId(activityId);
            if (fetchedRequest != null) {
                switch (fetchedRequest[0].attributes["statuscode"].value) {
                    case 234250001: //Approved
                    case 234250002: //Approved-Revised
                    case 234250003: //Rejected
                    case 234250009: //Cancelled
                        PHO_de_Common.Library.disableFormWithAdminOveride(false);
                        break;
                    default:
                        break;
                };
            }
        }
    },



    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    __namespace: true
};

//Common Library - End