function AutoPopulateName(){
	var first = GetValue("new_firstname");
	var last = GetValue("new_lastname");
	
	Xrm.Page.getAttribute("new_name").setValue(first + " " + last);
}

function GetValue(attr) {
    var val = Xrm.Page.getAttribute(attr).getValue();
    return val;
}

function CreateSRResponseFlag(){

	var d = new Date();
    var n = d.getMilliseconds();
    var s = n.toString();

    Xrm.Page.getAttribute("new_createsrresponseflag").setValue(s);
    Xrm.Page.getAttribute("new_createsrresponseflag").setSubmitMode("always");
	Xrm.Page.data.entity.save();
	
	//pause(1000);
	
	//alert("SR Response has been created");
}

function pause(millis){
    var time = new Date();
    var curtime = null;

    do {curtime = new Date();}
    while(curtime - time < millis);
}

function OpenSRResponse(){
	var srr = Xrm.Page.getAttribute("new_srresponseguid").getValue();
	
	if(srr != null){
//if (Xrm.Utility) alert("good");
//else alert("bad");
		Xrm.Utility.openEntityForm("new_servicerequestresponse", srr);
		
	Xrm.Page.getAttribute("new_srresponseguid").setValue(null);
	Xrm.Page.getAttribute("new_srresponseguid").setSubmitMode("always");
	Xrm.Page.getAttribute("new_deactivateflag").setValue(true);
	Xrm.Page.getAttribute("new_deactivateflag").setSubmitMode("always");
	Xrm.Page.data.entity.save("saveandclose");
	}
}

function confirmEmailValidation(context) {
    var firstVal = Xrm.Page.getAttribute("new_email").getValue();
    var secondVal = Xrm.Page.getAttribute("new_confirmemail").getValue();

    if (firstVal != null && firstVal != '' && secondVal != null && secondVal != '') {
        if (firstVal != secondVal) {
            alert("Email and Confirm Email fields must match.");

            context.getEventArgs().preventDefault();
        }
    }
}