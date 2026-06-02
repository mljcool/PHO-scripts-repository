function ShowNotification(executionContext, FieldToCheck, tab, section)	
{ 
	var formContext = getFormContext(executionContext);
	if (!formContext) {
		return;
	}

	var contactAttr = formContext.getAttribute("new_existingsrmcontact");
	var contact = contactAttr != null ? contactAttr.getValue() : null;
	
    var Validated= false;
	var attribute = null;
	
	if (FieldToCheck != null && FieldToCheck != "")
	{
		var fieldAttr = formContext.getAttribute(FieldToCheck);
		attribute = fieldAttr != null ? fieldAttr.getValue() : null;
	}
	
	if (attribute != null && attribute != "") Validated = true;
    
	if(tab != null && tab != "" && section != null && section != ""){
	
    if (contact == null && Validated==false)
     {  
           setSectionVisible(formContext, tab, section, true);
    }
    else
    {
        setSectionVisible(formContext, tab, section, false);
     }
	 }
}

function ShowNotification1(executionContext, FieldToCheck, tab, section)	
{ 
	var formContext = getFormContext(executionContext);
	if (!formContext) {
		return;
	}

	var contactAttr = formContext.getAttribute("new_existingsrmcontact");
	var contact = contactAttr != null ? contactAttr.getValue() : null;
	
    var Validated= false;
	var attribute = null;
	
	if (FieldToCheck != null && FieldToCheck != "")
	{
		var fieldAttr = formContext.getAttribute(FieldToCheck);
		attribute = fieldAttr != null ? fieldAttr.getValue() : null;
	}
	
	if (attribute != null && attribute != "") Validated = true;
    
	if(tab != null && tab != "" && section != null && section != ""){
	
    if (contact == null && Validated==false)
     {  
           setSectionVisible(formContext, tab, section, true);
    }
    else
    {
        setSectionVisible(formContext, tab, section, false);
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

function setSectionVisible(formContext, tabName, sectionName, isVisible) {
	if (!formContext || !formContext.ui || !formContext.ui.tabs) {
		return;
	}

	var targetTab = formContext.ui.tabs.get(tabName);
	if (targetTab != null) {
		var targetSection = targetTab.sections.get(sectionName);
		if (targetSection != null) {
			targetSection.setVisible(isVisible);
		}
	}
}