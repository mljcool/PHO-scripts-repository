function Form_onload() {

    // Set Organisation or Sub Organisation based upon parent on create form
   if (crmForm.FormType == 1) {
        var OrganisationLookUp = Xrm.Page.data.entity.attributes.get("parentaccountid").getValue();
        if (OrganisationLookUp != null && OrganisationLookUp != "undefined") {
            Xrm.Page.data.entity.attributes.get("oahpp_organisationorsuborganisation").setValue(true);
        }
    }

    // Change header image for organisation or sub-organisation
    if (Xrm.Page.data.entity.attributes.get("oahpp_organisationorsuborganisation").getValue() == false) {
      //Xrm.Page.getControl("WebResource_organisationHeader").setSrc("/PHODev/WebResources/oahpp_organisationHeader"); 
      // Change border color of main form area
      $(".ms-crm-Form-Page-Main-cell").css("background-color","#0000FF");
      var nvs_parentOrganization = Xrm.Page.ui.controls.get("parentaccountid");
      nvs_parentOrganization.setVisible(false);
    } 
   else  { 
       Xrm.Page.getControl("WebResource_organisationHeader").setSrc("/PHODev/WebResources/oahpp_organisationSubHeader"); 
       // Hide sub-organisations grid
       Xrm.Page.ui.tabs.get("subOrganisations").setVisible(false);
 
       // Hide form common navigation
       Xrm.Page.ui.navigation.items.get("navSubAccts").setVisible(false);
       // Change border color of main form area
       $(".ms-crm-Form-Page-Main-cell").css("background-color","#0D7B0D");
       }
	// default Country to Canada if blank
	// alert("Setting Country default");
	try
	{
   if (crmForm.FormType == 1) {

		var nvs_Country = new Array();
		// alert("Get existing Country value");
		nvs_Country = Xrm.Page.getAttribute("oahpp_relatedcountryid").getValue();
		
		if(nvs_Country != null)
		{
			var name = nvs_Country[0].name;
			var guid = nvs_Country[0].id;
			var entType = nvs_Country[0].entityType;
			// alert("Country: name=" + name + " guid=" + guid + " entType=" + entType);
		}
		else
		{
			// alert("Preparing to set Country:");
			var countryName = "Canada";
			
			var lookupData = new Array();
			var lookupItem = new Object();
						// {757B2990-E036-E111-8E88-1CC1DEE89A7A}
			lookupItem.id="{A53E3645-912A-E111-92BB-00155D146C19}";
			lookupItem.name=countryName;
			lookupItem.entityType="oahpp_country";
			
			lookupData[0] = lookupItem;
			// alert("Assigning Country to Field:");
			Xrm.Page.getAttribute("oahpp_relatedcountryid").setValue(lookupData);
                                                                Xrm.Page.getAttribute("address1_country").setValue(countryName);
		}
                               }
	}
	catch(err)
	{
		// alert("Error: " + err.toString() + " || " + err.number + " || " + err.description);
	}
	
	// default Province to Ontario if blank
	// alert("Setting Province default");
	try
	{
   if (crmForm.FormType == 1) {

		var nvs_Province = new Array();
		// alert("Get existing Province value");
		nvs_Province = Xrm.Page.getAttribute("oahpp_relatedprovinceid").getValue();
		
		if(nvs_Province != null)
		{
			var name = nvs_Province[0].name;
			var guid = nvs_Province[0].id;
			var entType = nvs_Province[0].entityType;
			// alert("Province: name=" + name + " guid=" + guid + " entType=" + entType);
		}
		else
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
			Xrm.Page.getAttribute("oahpp_relatedprovinceid").setValue(lookupData);
                                                                Xrm.Page.getAttribute("address1_stateorprovince").setValue(provinceName);
		}
                              }
	}
	catch(err)
	{
		// alert("Error: " + err.toString() + " || " + err.number + " || " + err.description);
	}

$("#new_editornotes_c").css("color","#FF0000");

 }

// Update address line 1 country from related country entity
function RelatedCountry_OnChange() {
   var lookupObject = Xrm.Page.getAttribute("oahpp_relatedcountryid");
    if (lookupObject != null) {
       var lookUpObjectValue = lookupObject.getValue();
       if ((lookUpObjectValue != null)) {
       var lookuptextvalue = lookUpObjectValue[0].name;
       Xrm.Page.data.entity.attributes.get("address1_country").setValue(lookuptextvalue);
       Xrm.Page.getAttribute('oahpp_relatedprovinceid').setValue(null);
       Xrm.Page.data.entity.attributes.get("address1_stateorprovince").setValue("");
       }
   }
}

// Update address line 1 province from related province entity
function RelatedProvince_OnChange() {
   var lookupObject = Xrm.Page.getAttribute("oahpp_relatedprovinceid");
    if (lookupObject != null) {
       var lookUpObjectValue = lookupObject.getValue();
       if ((lookUpObjectValue != null)) {
       var lookuptextvalue = lookUpObjectValue[0].name;
       Xrm.Page.data.entity.attributes.get("address1_stateorprovince").setValue(lookuptextvalue);
       }
   }
}