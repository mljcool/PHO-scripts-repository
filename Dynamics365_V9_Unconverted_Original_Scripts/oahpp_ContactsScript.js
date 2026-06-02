function Form_onload() {
	// alert("Firing OnLoad");
	try
	{
	        // Set Contact or Secondary Contact to Secondary Contact if parent contact present on create form
        if (crmForm.FormType == 1) {
            // alert("Form is create new...");
            var ContactLookupArr = new Array();
            try {
                ContactLookupArr = Xrm.Page.data.entity.attributes.get("parentcustomerid").getValue();
                if (ContactLookupArr[0] != null) {
                    var ContactLookUp = ContactLookupArr[0].name;

                    // alert("Primary contact name is: " + ContactLookUp);
                    if (ContactLookUp != null && ContactLookUp != "undefined") {
                        // alert("Setting flag...");				    
                        var IsContact = ContactLookupArr[0].entityType;
                        if (IsContact == "contact") {
                            Xrm.Page.getAttribute("oahpp_contactorprofile").setValue(false);
                            // alert("Flag set.");
                        }
                    }
                    else {
                        Xrm.Page.getAttribute("oahpp_contactorprofile").setValue(true);
                    }
                }
            }
            catch (err) {
                // catch failure on primary contact null, so it is a primary contact
                Xrm.Page.getAttribute("oahpp_contactorprofile").setValue(true);
            }
        }
	
		// If main Contact hide Secondary Contact address fields
		if (Xrm.Page.getAttribute("oahpp_contactorprofile").getValue() == true) 
		{
			// alert("This is a Primary Contact...");
			// Hide Secondary Contact address section
			// alert("Hide tabs...");
			Xrm.Page.ui.tabs.get("profileAddress").setVisible(false);
			// Change border color of main form area
			// alert("Change border colour...");
			$(".ms-crm-Form-Page-Main-cell").css("background-color","#0000FF");
			// Hide parent contact field
			// alert("Hide fields...");
			Xrm.Page.ui.controls.get("parentcustomerid").setVisible(false);
			// alert("Set title accordingly...");
			Xrm.Page.getControl("WebResource_contactHeaderLabel").setSrc("/PHODev/WebResources/oahpp_contactHeader"); 
			// alert("Done!");
		}
		else 
		{
			// alert("This is a Secondary Contact...");
			// If sub-contact (Secondary Contact) hide home address fields
			// Hide tabs in Secondary Contacts not needed
			// alert("Hiding tabs...");
			Xrm.Page.ui.tabs.get("details").setVisible(false);
			// Xrm.Page.ui.tabs.get("general").setVisible(false);
			Xrm.Page.ui.tabs.get("subcontacts").setVisible(false);
			// Xrm.Page.ui.tabs.get("profiles").setVisible(false);
			Xrm.Page.ui.tabs.get("specialties").setVisible(false);
			Xrm.Page.ui.tabs.get("personalInformation").setVisible(false);
			// alert("Hiding sections...");
			setVisibleTabSection("general", "contact_information_section", false);
			// alert("Hiding from navigation...");
			// Hide form common navigation
			// Xrm.Page.ui.navigation.items.get("nav_oahpp_contact_oahpp_specialty").setVisible(false);
			Xrm.Page.ui.navigation.items.get("navSubConts").setVisible(false);
			// Change border color of main form area
			// alert("Change border colour...");
			$(".ms-crm-Form-Page-Main-cell").css("background-color","#0D7B0D");
			// alert("Set title accordingly...");
			Xrm.Page.getControl("WebResource_contactHeaderLabel").setSrc("/PHODev/WebResources/oahpp_contactProfileHeader"); 
			// alert("Done!");
		}
	}
	catch(err)
	{}
	
	// default Country to Canada if blank
	// alert("Setting Country default");
	try
	{
        if (crmForm.FormType == 1) {

		var nvs_Country = new Array();
		// alert("Get existing Country value");
		nvs_Country = Xrm.Page.getAttribute("oahpp_relatedcountryid").getValue();
		
		if(nvs_Country == null)
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
		}
                                 }
	}
	catch(err)
	{}
	
	// default Province to Ontario if blank
	// alert("Setting Province default");
	try
	{
        if (crmForm.FormType == 1) {

		var nvs_Province = new Array();
		// alert("Get existing Province value");
		nvs_Province = Xrm.Page.getAttribute("oahpp_relatedprovinceid").getValue();
		
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
			Xrm.Page.getAttribute("oahpp_relatedprovinceid").setValue(lookupData);
		}
                              }
	}
	catch(err)
	{}
	
	// alert("OnLoad Done!");

$("#new_editornotes_c").css("color","#FF0000");

}


function setCountryId(country, fieldName)
{
   try
   {
      var countryName = country.toString();
			
      var lookupData = new Array();
      var lookupItem = new Object();
      lookupItem.id="{A53E3645-912A-E111-92BB-00155D146C19}";
      lookupItem.name=countryName;
      lookupItem.entityType="oahpp_country";
			
      lookupData[0] = lookupItem;
      // alert("Country passed is: " + countryName + ", for field name: " + fieldName);
      Xrm.Page.getAttribute(fieldName).setValue(lookupData);
   }
   catch(err)
   {}
}

function setProvinceId(province, fieldName)
{
   try
   {
      var provinceName = province.toString();
			
      var lookupData = new Array();
      var lookupItem = new Object();
      lookupItem.id="{84284D60-912A-E111-92BB-00155D146C19}";
      lookupItem.name=provinceName;
      lookupItem.entityType="oahpp_province";
			
      lookupData[0] = lookupItem;
      // alert("Province passed is: " + provinceName + ", for field name: " + fieldName);
      Xrm.Page.getAttribute(fieldName).setValue(lookupData);
   }
   catch(err)
   {}
}

function setVisibleTabSection(tabname, sectionname, show) {
	try
	{
		var tab = Xrm.Page.ui.tabs.get(tabname);
		if (tab != null) {
			if (sectionname == null)
				tab.setVisible(show);
			else {
				var section = tab.sections.get(sectionname);
				if (section != null) {
					section.setVisible(show);
					if (show)
						tab.setVisible(show);
				}
			}
		}
	}
	catch(err)
	{}
}

// Function to update address 1 fields with selected organisation data.
function relatedOrganisationChange() {
try
{
    var lookupObject = Xrm.Page.getAttribute("oahpp_relatedorganisation");
    if (lookupObject != null) {
        var lookUpObjectValue = lookupObject.getValue();

        if ((lookUpObjectValue != null)) {
            var lookuptextvalue = lookUpObjectValue[0].name;
            var lookupid = lookUpObjectValue[0].id;
            //Get entity data;
            var serverUrl = Xrm.Page.context.getServerUrl();
            var odataSelect = serverUrl + "/XRMServices/2011/OrganizationData.svc/AccountSet(guid'" + lookupid + "')?$select=Name,Address1_Line1,Address1_Line2,Address1_Line3,Address1_City,Address1_StateOrProvince,Address1_PostalCode,Address1_Country,Address1_Telephone1,Address1_Telephone2,Address1_Fax";
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                url: odataSelect,
                beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },
                success: function (data, textStatus, XmlHttpRequest) {
                    var org = data.d;
                    //Change form data
                    // alert("TEST: Country: " + org.Address1_Country[0].name + "; Province: " + org.Address1_StateOrProvince[0].name);
                    Xrm.Page.data.entity.attributes.get("address1_addresstypecode").setValue(3);
                    Xrm.Page.data.entity.attributes.get("address1_name").setValue(org.Name);
                    Xrm.Page.data.entity.attributes.get("address1_line1").setValue(org.Address1_Line1);
                    Xrm.Page.data.entity.attributes.get("address1_line2").setValue(org.Address1_Line2);
                    Xrm.Page.data.entity.attributes.get("address1_line3").setValue(org.Address1_Line3);
                    Xrm.Page.data.entity.attributes.get("address1_city").setValue(org.Address1_City);
                    Xrm.Page.data.entity.attributes.get("address1_postalcode").setValue(org.Address1_PostalCode);
                    // Xrm.Page.data.entity.attributes.get("oahpp_relatedcountryid").setValue(org.Address1_Country);
                    // Xrm.Page.data.entity.attributes.get("address1_telephone1").setValue(org.Address1_Telephone1);
                    // Xrm.Page.data.entity.attributes.get("mobilephone").setValue(org.Address1_Telephone2);
                    // Xrm.Page.data.entity.attributes.get("address1_fax").setValue(org.Address1_Fax);
                    // Xrm.Page.data.entity.attributes.get("new_phone").setValue(org.Address1_Telephone1);
                    // Xrm.Page.data.entity.attributes.get("new_mobilephone").setValue(org.Address1_Telephone2);
                    // Xrm.Page.data.entity.attributes.get("new_fax").setValue(org.Address1_Fax);
						setCountryId(org.Address1_Country.toString(), "oahpp_relatedcountryid");
						setProvinceId(org.Address1_StateOrProvince.toString(), "oahpp_relatedprovinceid");
					// Xrm.Page.data.entity.attributes.get("oahpp_relatedprovinceid").setValue(org.Address1_StateOrProvince);
					// Xrm.Page.data.entity.attributes.get("oahpp_relatedcountryid").setValue(org.Address1_Country);
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert('OData Select Failed: ' + odataSelect);
                }
            }
			);
		}
    }
}
catch(err)
{}
}

// Update address line 1 country from related country entity
function RelatedCountry_OnChange() {
	try{
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
   catch(err)
   {}
}

// Update address line 1 province from related province entity
function RelatedProvince_OnChange() {
	try{
	   var lookupObject = Xrm.Page.getAttribute("oahpp_relatedprovinceid");
		if (lookupObject != null) {
		   var lookUpObjectValue = lookupObject.getValue();
		   if ((lookUpObjectValue != null)) {
		   var lookuptextvalue = lookUpObjectValue[0].name;
		   Xrm.Page.data.entity.attributes.get("address1_stateorprovince").setValue(lookuptextvalue);
		   }
	   }
   }
   catch(err)
   {}
}