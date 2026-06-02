function ShowNotification(FieldToCheck, tab, section)	
{ 
	var contact = Xrm.Page.getAttribute("new_existingsrmcontact").getValue();
	
    var Validated= false;
	var attribute = null;
	
	if (FieldToCheck != null && FieldToCheck != "")
	{
	attribute = Xrm.Page.getAttribute(FieldToCheck).getValue();
	}
	
	if (attribute != null && attribute != "") Validated = true;
    
	if(tab != null && tab != "" && section != null && section != ""){
	
    if (contact == null && Validated==false)
     {  
           Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(true);
    }
    else
    {
        Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(false);
     }
	 }
}

function ShowNotification1(FieldToCheck, tab, section)	
{ 
	var contact = Xrm.Page.getAttribute("new_existingsrmcontact").getValue();
	
    var Validated= false;
	var attribute = null;
	
	if (FieldToCheck != null && FieldToCheck != "")
	{
	attribute = Xrm.Page.getAttribute(FieldToCheck).getValue();
	}
	
	if (attribute != null && attribute != "") Validated = true;
    
	if(tab != null && tab != "" && section != null && section != ""){
	
    if (contact == null && Validated==false)
     {  
           Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(true);
    }
    else
    {
        Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(false);
     }
	 }
}