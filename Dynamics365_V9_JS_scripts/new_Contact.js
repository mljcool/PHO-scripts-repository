function Form_onload() {
}

function CopyAddressToClipboard() {

    var address1_line1 = "";
    var address1_line2 = "";
    var address1_line3 = "";
    var address1_city = "";
    var address1_stateorprovince = "";
    var address1_postalcode = "";
    var address1_country = "";

    if (Xrm.Page.getAttribute("address1_line1").getValue() != null)
        var address1_line1 = Xrm.Page.getAttribute("address1_line1").getValue();

    if (Xrm.Page.getAttribute("address1_line2").getValue() != null)
        var address1_line2 = Xrm.Page.getAttribute("address1_line2").getValue();

    if (Xrm.Page.getAttribute("address1_line3").getValue() != null)
        var address1_line3 = Xrm.Page.getAttribute("address1_line3").getValue();

    if (Xrm.Page.getAttribute("address1_city").getValue() != null)
        var address1_city = Xrm.Page.getAttribute("address1_city").getValue();

    if (Xrm.Page.getAttribute("address1_stateorprovince").getValue() != null)
        var address1_stateorprovince = Xrm.Page.getAttribute("address1_stateorprovince").getValue();

    if (Xrm.Page.getAttribute("address1_postalcode").getValue() != null)
        var address1_postalcode = Xrm.Page.getAttribute("address1_postalcode").getValue();

    if (Xrm.Page.getAttribute("address1_country").getValue() != null)
        var address1_country = Xrm.Page.getAttribute("address1_country").getValue();

    var sAddress = "\n" +
    address1_line1 + " " + address1_line2 + " " + address1_line3 + " \n" +
    address1_city + ", " + address1_stateorprovince + " " + address1_postalcode + " " + address1_country;

    window.clipboardData.setData("text", sAddress);

}
