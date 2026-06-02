function SendAllEmailsFlag(executionContext){
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

	var d = new Date();
    var n = d.getMilliseconds();
    var s = n.toString();
    var sendAllEmailsFlagAttr = formContext.getAttribute("ge_sendallemailsflag");

    if (sendAllEmailsFlagAttr != null) {
    	sendAllEmailsFlagAttr.setValue(s);
    	sendAllEmailsFlagAttr.setSubmitMode("always");
    }
    formContext.data.entity.save();
	
	pause(3000);
	
	alert("All Emails have been sent");
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

function pause(millis){
    var time = new Date();
    var curtime = null;

    do {curtime = new Date();}
    while(curtime - time < millis);
}