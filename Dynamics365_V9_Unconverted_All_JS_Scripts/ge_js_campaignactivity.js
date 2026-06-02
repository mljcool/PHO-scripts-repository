function SendAllEmailsFlag(){
	var d = new Date();
    var n = d.getMilliseconds();
    var s = n.toString();

    Xrm.Page.getAttribute("ge_sendallemailsflag").setValue(s);
    Xrm.Page.getAttribute("ge_sendallemailsflag").setSubmitMode("always");
	Xrm.Page.data.entity.save();
	
	pause(3000);
	
	alert("All Emails have been sent");
}

function pause(millis){
    var time = new Date();
    var curtime = null;

    do {curtime = new Date();}
    while(curtime - time < millis);
}