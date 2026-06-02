function form_onload()
{
	// default Country to Canada if blank
	// alert("Setting Country default");
	try
	{
		var nvs_Country = new Array();
		// alert("Get existing Country value");
		nvs_Country = Xrm.Page.getAttribute("new_country").getValue();
		
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
			Xrm.Page.getAttribute("new_country").setValue(lookupData);
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
		nvs_Province = Xrm.Page.getAttribute("new_provincestate").getValue();
		
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
			Xrm.Page.getAttribute("new_provincestate").setValue(lookupData);
		}
	}
	catch(err)
	{}
	
	// alert("OnLoad Done!");
}