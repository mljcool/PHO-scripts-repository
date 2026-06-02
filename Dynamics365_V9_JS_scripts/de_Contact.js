function Form_onload(executionContext) {
}

function CopyAddressToClipboard(executionContext) {

    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var address1_line1 = "";
    var address1_line2 = "";
    var address1_line3 = "";
    var address1_city = "";
    var address1_stateorprovince = "";
    var address1_postalcode = "";
    var address1_country = "";

    var address1_line1Attr = formContext.getAttribute("address1_line1");
    if (address1_line1Attr != null && address1_line1Attr.getValue() != null)
        address1_line1 = address1_line1Attr.getValue();

    var address1_line2Attr = formContext.getAttribute("address1_line2");
    if (address1_line2Attr != null && address1_line2Attr.getValue() != null)
        address1_line2 = address1_line2Attr.getValue();

    var address1_line3Attr = formContext.getAttribute("address1_line3");
    if (address1_line3Attr != null && address1_line3Attr.getValue() != null)
        address1_line3 = address1_line3Attr.getValue();

    var address1_cityAttr = formContext.getAttribute("address1_city");
    if (address1_cityAttr != null && address1_cityAttr.getValue() != null)
        address1_city = address1_cityAttr.getValue();

    var address1_stateorprovinceAttr = formContext.getAttribute("address1_stateorprovince");
    if (address1_stateorprovinceAttr != null && address1_stateorprovinceAttr.getValue() != null)
        address1_stateorprovince = address1_stateorprovinceAttr.getValue();

    var address1_postalcodeAttr = formContext.getAttribute("address1_postalcode");
    if (address1_postalcodeAttr != null && address1_postalcodeAttr.getValue() != null)
        address1_postalcode = address1_postalcodeAttr.getValue();

    var address1_countryAttr = formContext.getAttribute("address1_country");
    if (address1_countryAttr != null && address1_countryAttr.getValue() != null)
        address1_country = address1_countryAttr.getValue();

    var sAddress = "\n" +
    address1_line1 + " " + address1_line2 + " " + address1_line3 + " \n" +
    address1_city + ", " + address1_stateorprovince + " " + address1_postalcode + " " + address1_country;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(sAddress).catch(function () {
            if (window.clipboardData && window.clipboardData.setData) {
                window.clipboardData.setData("text", sAddress);
            }
        });
    }
    else if (window.clipboardData && window.clipboardData.setData) {
        window.clipboardData.setData("text", sAddress);
    }

}

function getFormContext(executionContext) {
    if (executionContext && typeof executionContext.getFormContext === "function") {
        return executionContext.getFormContext();
    }

    // Ribbon commands can pass primaryControl, which is already a form context-like object.
    if (executionContext && typeof executionContext.getAttribute === "function" && typeof executionContext.getControl === "function") {
        return executionContext;
    }

    return null;
}
