function SendAllEmailsFlag(executionContext){
	var d = new Date();
    var n = d.getMilliseconds();
    var s = n.toString();
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("ge_sendallemailsflag").setValue(s);
    formContext.getAttribute("ge_sendallemailsflag").setSubmitMode("always");
    formContext.data.save().then(
        function () {
            setTimeout(function () {
                Xrm.Navigation.openAlertDialog({ text: "All Emails have been sent" });
            }, 3000);
        },
        function (error) {
            Xrm.Navigation.openErrorDialog({ message: error.message });
        }
    );
}