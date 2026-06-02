function PicklistOneOnchange(executionContext) {

    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var picklistOneName = "new_attendancestatus"; //name of the first picklist
    var picklistTwoName = "new_attendancestatusreason";  //name of the picklist with dynamic values
	
	var picklistOne = formContext.getControl(picklistOneName);
	var picklistOneAttribute = picklistOne.getAttribute();
	
	var picklistTwo = formContext.getControl(picklistTwoName);
	var picklistTwoAttribute = picklistTwo.getAttribute();
		
   	var picklistOneSelectedOption = picklistOneAttribute.getSelectedOption();
	
	var picklistOneSelectedText = "";	
	if (picklistOneSelectedOption != null)
	{
		picklistOneSelectedText = picklistOneSelectedOption.text;
	}

	//This "if" statement stores the original values from the dynamic picklist.
	//Very important if the user hasn't made a selection on the first picklist or if the selection changes
    if (picklistTwo.flag == true) 
	{
		picklistTwo.clearOptions();
		var origOptions = picklistTwo.originalPicklistValues;
		
		for (var i = origOptions.length - 1; i >= 0; i--) 
		{ 
			if(origOptions[i].text != "")
			{
				picklistTwo.addOption(origOptions[i]);
			}
		}		
    }
    else 
	{		
        picklistTwo.originalPicklistValues = picklistTwoAttribute.getOptions();
        picklistTwo.flag = true; 
    }

	if (picklistOneSelectedText != null && picklistOneSelectedText != "") 
    {		
		var picklistTwoOptions = picklistTwoAttribute.getOptions();
        for (var i = picklistTwoOptions.length - 1; i >= 0; i--) {  
			
            if (picklistTwoOptions[i].value != null && picklistTwoOptions[i].value != "") {
				var optionText = picklistTwoOptions[i].text;
				var optionValue = picklistTwoOptions[i].value;
	
                if(picklistOneSelectedText == "Invited")
				{							
					//Remove these values
					if (optionText == "Interested" || optionText == "Not Interested/Declined" || optionText == "Yes" || optionText == "No" || optionText == "Cancelled" || optionText == "Delegate" || optionText == "Walk In" || optionText == "Originally Declined")
					{
						picklistTwo.removeOption(optionValue);
					}
				}

				if(picklistOneSelectedText == "RSVP")
				{
					//Remove these values
					if (optionText == "No Response" || optionText == "Yes" || optionText == "No" || optionText == "Cancelled" || optionText == "Delegate" || optionText == "Walk In" || optionText == "Originally Declined")
					{
						picklistTwo.removeOption(optionValue);
					}
				}			

				if(picklistOneSelectedText == "Registered")
				{
					//Remove these values
					if (optionText == "Interested" || optionText == "Not Interested/Declined" || optionText == "No Response" || optionText == "Delegate" || optionText == "Walk In" || optionText == "Originally Declined")
					{
						picklistTwo.removeOption(optionValue);
					}
				}
				
				if(picklistOneSelectedText == "Attended")
				{
					//Remove these values
					if (optionText == "Interested" || optionText == "Not Interested/Declined" || optionText == "No Response" || optionText == "Cancelled")
					{
						picklistTwo.removeOption(optionValue);
					}
				}
            }
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
