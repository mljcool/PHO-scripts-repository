function Form_onload() {

   // Change marketing list Lookup names
   $("#createdfromcode option[value='1']").text("Organization");
   $("#createdfromcode option[value='2']").text("Contact");


   // Set default as Contact
   if (Xrm.Page.data.entity.attributes.get('createdfromcode').getValue() == null)
   {
        // Set default view as contacts
        Xrm.Page.getAttribute('createdfromcode').setValue('2');
   }
}