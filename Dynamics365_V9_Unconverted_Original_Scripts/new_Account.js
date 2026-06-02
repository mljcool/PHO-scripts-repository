function Form_onload() {
   // setPostalCodeMask("address1_postalcode", "a9a 9a9");       
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

function setPostalCodeMask(field, format) {
    alert("setting mask");


    if (Xrm.Page.getAttribute("address1_postalcode").getValue() == null) {
        Xrm.Page.getAttribute("address1_postalcode").setValue("123");

        var oCtrl = Xrm.Page.getControl(field);
        if (oCtrl != null) {
            oCtrl.setFocus(true);
            $("#" + field + "_i").mask(format);
    }
    }

   
    //$("#address1_postalcode").click(function () {

    //    alert("Handler for .click() called.");

    //});




    //var oCtrl = Xrm.Page.getControl(field);
    //if (oCtrl != null) {

    //    //alert("not null");
    //    //oCtrl.setFocus(true);
    //    //$("#" + field + "_i").mask(format);


    //    //var oCtrl2 = Xrm.Page.getControl("name");
    //    //if (oCtrl2 != null) {
    //    //    oCtrl2.setFocus(true);
    //    //}



    //    //$("#" + "address1_postalcode" + "_i").click(function () {

    //    //    alert("focus on");
    //    //    //oCtrl.setFocus(true);
    //    //    //$("#" + field + "_i").mask(format);
    //    //    //Xrm.Page.getAttribute("#" + "address1_postalcode" + "_i").setValue($(this).val());
    //    //});
    //    //Xrm.Page.getAttribute("#" + "address1_postalcode" + "_i").setValue($("#" + "address1_postalcode" + "_i").val());


    //}

    alert("setting mask - end");
}
