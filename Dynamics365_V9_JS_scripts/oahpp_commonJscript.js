// Function to format phone numbers
function FormatPhoneNumber(context) {
    var oField = context.getEventSource().getValue();
    var sTmp = oField;

    if (typeof (oField) != "undefined" && oField != null) {
        sTmp = oField.replace(/[^0-9]/g, "");
        switch (sTmp.length) {
            case 10:
                sTmp = "+1 (" + sTmp.substr(0, 3) + ") " + sTmp.substr(3, 3) + "-" + sTmp.substr(6, 4);
                break;

            case 11:
                sTmp = "+" + sTmp.substr(0, 1) + " (" + sTmp.substr(1, 3) + ") " + sTmp.substr(4, 3) + "-" + sTmp.substr(7, 4);
                break;

            default:
                alert("Phone must contain 10 or 11 numbers for North America.")
                break;
        }
    }
    context.getEventSource().setValue(sTmp);
}

function validateZipCode(formContext) {

    if (!formContext) {
        return false;
    }

    // Validate Canadian postal code
    var regex = /^[a-zA-Z][0-9][a-zA-Z]\s?[0-9][a-zA-Z][0-9]$/;
    var postalCodeAttr = formContext.getAttribute("address1_postalcode");
    var postalCodeValue = postalCodeAttr != null ? postalCodeAttr.getValue() : null;
    if (regex.test(postalCodeValue))
        return true;
    else 
        return false;
    
    //else if (countryCode == 2) // US ZIP validation
    //{
    //    var regex = /\d{5}([\-]?\d{4})?$/;
    //    var regex2 = /\d{5}([\-]?\d{3})?$/;
    //    var regex3 = /\d{5}([\-]?\d{2})?$/;
    //    var regex4 = /\d{5}([\-]?\d{1})?$/;
    //    var regex5 = /\d{5}$/;
    //    var explicit = Xrm.Page.getAttribute("address1_postalcode").getValue();

    //    alert(explicit);
    //    var clean = explicit.replace(/-_|_/gi, "");

    //    if (regex.test(clean) || regex2.test(clean) || regex3.test(clean) || regex4.test(clean) || regex5.test(clean)) {
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }
    //}
}

// Function to format postal code
// for both Canadian and US postal codes
function FormatPostalCode(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var context = executionContext;
    var oField = context.getEventSource().getValue();
    var sTmp;
    
    var countryAttr = formContext.getAttribute("address1_country");
    if (countryAttr != null && countryAttr.getValue() != null) {
        var country = countryAttr.getValue();

        if (country.toUpperCase() == "CANADA")
        {
            var retval = validateZipCode(formContext);
            if (retval == false) {
                alert("Invalid postal code format");
                var postalCodeAttr = formContext.getAttribute("address1_postalcode");
                if (postalCodeAttr != null) {
                    postalCodeAttr.setValue("");
                }
                

                //Xrm.Page.getControl("address1_postalcode").setFocus();
                //$("#address1_postalcode_i").mask("a9a 9a9");
            }
        }        
    }

    


    //if (typeof (oField) != "undefined" && oField != null) {
    //    // check for US ZIP code
    //    if (oField.match(/^[0-9]{5}$/)) {
    //        context.getEventSource().setValue(oField);
    //        return true;
    //    }

    //    // check for Canadian postal code
    //    sTmp = oField.toUpperCase();
    //    if (sTmp.match(/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/)) {
    //        sTmp = sTmp.substr(0, 3) + " " + sTmp.substr(3, 3);
    //        context.getEventSource().setValue(sTmp);
    //        return true;
    //    }
    //    if (sTmp.match(/^[A-Z][0-9][A-Z].[0-9][A-Z][0-9]$/)) {
    //        context.getEventSource().setValue(sTmp);
    //        return true;
    //    }

        // code is invalid
        // alert("Incorrect ZIP/Postal Code format.");
        // code could be any other country, so leave as is
    //}
}

function SetDefaultFields(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    // Function to default country to Canada
    var countryAttr = formContext.getAttribute("address1_country");
    if (countryAttr != null && countryAttr.getValue() == null) {
        countryAttr.setValue("Canada");
    }

    // Function to default province to Ontario
    var stateOrProvinceAttr = formContext.getAttribute("address1_stateorprovince");
    if (stateOrProvinceAttr != null && stateOrProvinceAttr.getValue() == null) {
        stateOrProvinceAttr.setValue("Ontario");
    }
}

//Get complete server URL
function GetServerUrl() {
    var context, crmServerUrl;
    if (typeof GetGlobalContext != "undefined") {
        context = GetGlobalContext();
    }
    else if (typeof Xrm != "undefined" && Xrm.Utility && typeof Xrm.Utility.getGlobalContext === "function") {
        context = Xrm.Utility.getGlobalContext();
    }
    else {
        throw new Error("CRM context is not available.");
    }

    if (typeof context.isOutlookClient === "function" && typeof context.isOutlookOnline === "function" && context.isOutlookClient() && !context.isOutlookOnline()) {
        crmServerUrl = window.location.protocol + "//" + window.location.host;
    } else {
        crmServerUrl = typeof context.getClientUrl === "function" ? context.getClientUrl() : context.getServerUrl();
        crmServerUrl = crmServerUrl.replace(/\/$/, ""); // remove trailing slash if any  
    }
    return crmServerUrl;
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