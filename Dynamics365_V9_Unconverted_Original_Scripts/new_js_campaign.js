function CreateAttendancesFlag(){
	var d = new Date();
    var n = d.getMilliseconds();
    var s = n.toString();

    Xrm.Page.getAttribute("new_createattendancesflag").setValue(s);
    Xrm.Page.getAttribute("new_createattendancesflag").setSubmitMode("always");
	Xrm.Page.data.entity.save();
	
	pause(3000);
	
	alert("Attendances have been created");
}

function pause(millis){
    var time = new Date();
    var curtime = null;

    do {curtime = new Date();}
    while(curtime - time < millis);
}