function form_onload(executionContext)
{
	var formContext = getFormContext(executionContext);
	if (!formContext) {
		return;
	}

	// default Country to Canada if blank
	// alert("Setting Country default");
	try
	{
		var nvs_Country = new Array();
		// alert("Get existing Country value");
		var countryAttr = formContext.getAttribute("new_country");
		nvs_Country = countryAttr != null ? countryAttr.getValue() : null;
		
		if(nvs_Country == null)
		{
			// alert("Preparing to set Country:");
			var countryName = "Canada";
			
			var lookupData = new Array();
			var lookupItem = new Object();
			lookupItem.id="{A53E3645-912A-E111-92BB-00155D146C19}";
			lookupItem.name=countryName;
			lookupItem.entityType="oahpp_country";
			
			lookupData[0] = lookupItem;
			// alert("Assigning Country to Field:");
			if (countryAttr != null) {
				countryAttr.setValue(lookupData);
			}
		}
	}
	catch(err)
	{}
	
	// default Province to Ontario if blank
	// alert("Setting Province default");
	try
	{
		var nvs_Province = new Array();
		// alert("Get existing Province value");
		var provinceAttr = formContext.getAttribute("new_provincestate");
		nvs_Province = provinceAttr != null ? provinceAttr.getValue() : null;
		
		if(nvs_Province == null)
		{
			// alert("Preparing to set Province:");
			var provinceName = "Ontario";
			
			var lookupData = new Array();
			var lookupItem = new Object();
			lookupItem.id="{84284D60-912A-E111-92BB-00155D146C19}";
			lookupItem.name=provinceName;
			lookupItem.entityType="oahpp_province";
			
			lookupData[0] = lookupItem;
			// alert("Assigning Province to Field:");
			if (provinceAttr != null) {
				provinceAttr.setValue(lookupData);
			}
		}
	}
	catch(err)
	{}
	
	// alert("OnLoad Done!");
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