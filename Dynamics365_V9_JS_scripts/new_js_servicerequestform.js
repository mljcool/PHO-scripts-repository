function AutoPopulateName(executionContext){
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var first = GetValue(formContext, "new_firstname");
    var last = GetValue(formContext, "new_lastname");
	
    var nameAttr = formContext.getAttribute("new_name");
    if (nameAttr != null) {
        nameAttr.setValue((first || "") + " " + (last || ""));
    }
}

function GetValue(formContext, attr) {
    if (!formContext) {
        return null;
    }

    var attribute = formContext.getAttribute(attr);
    return attribute != null ? attribute.getValue() : null;
}

function CreateSRResponseFlag(executionContext){
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

	var d = new Date();
    var n = d.getMilliseconds();
    var s = n.toString();
    var createSrResponseFlagAttr = formContext.getAttribute("new_createsrresponseflag");

    if (createSrResponseFlagAttr != null) {
    	createSrResponseFlagAttr.setValue(s);
    	createSrResponseFlagAttr.setSubmitMode("always");
    }
    formContext.data.entity.save();
	
	//pause(1000);
	
	//alert("SR Response has been created");
}

function pause(millis){
    var time = new Date();
    var curtime = null;

    do {curtime = new Date();}
    while(curtime - time < millis);
}

function OpenSRResponse(executionContext){
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var srResponseGuidAttr = formContext.getAttribute("new_srresponseguid");
    var deactivateFlagAttr = formContext.getAttribute("new_deactivateflag");
    var srr = srResponseGuidAttr != null ? srResponseGuidAttr.getValue() : null;
	
	if(srr != null){
//if (Xrm.Utility) alert("good");
//else alert("bad");
        Xrm.Navigation.openForm({ entityName: "new_servicerequestresponse", entityId: srr });
		
    if (srResponseGuidAttr != null) {
        srResponseGuidAttr.setValue(null);
        srResponseGuidAttr.setSubmitMode("always");
    }
    if (deactivateFlagAttr != null) {
        deactivateFlagAttr.setValue(true);
        deactivateFlagAttr.setSubmitMode("always");
    }
    formContext.data.entity.save("saveandclose");
	}
}

function confirmEmailValidation(executionContext) {
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var firstEmailAttr = formContext.getAttribute("new_email");
    var confirmEmailAttr = formContext.getAttribute("new_confirmemail");
    var firstVal = firstEmailAttr != null ? firstEmailAttr.getValue() : null;
    var secondVal = confirmEmailAttr != null ? confirmEmailAttr.getValue() : null;

    if (firstVal != null && firstVal != '' && secondVal != null && secondVal != '') {
        if (firstVal != secondVal) {
            alert("Email and Confirm Email fields must match.");

            executionContext.getEventArgs().preventDefault();
        }
    }
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