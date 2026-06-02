function Form_onload(executionContext) {

   var formContext = getFormContext(executionContext);
   if (!formContext) {
      return;
   }

   // Change marketing list Lookup names
   $("#createdfromcode option[value='1']").text("Organization");
   $("#createdfromcode option[value='2']").text("Contact");


   // Set default as Contact
   if (formContext.data.entity.attributes.get('createdfromcode').getValue() == null)
   {
        // Set default view as contacts
        formContext.getAttribute('createdfromcode').setValue(2);
   }
}

function getFormContext(executionContext) {
   if (executionContext && typeof executionContext.getFormContext === "function") {
      return executionContext.getFormContext();
   }

   if (executionContext && typeof executionContext.getAttribute === "function" && typeof executionContext.getControl === "function") {
      return executionContext;
   }

   if (typeof Xrm !== "undefined" && Xrm.Page) {
      return Xrm.Page;
   }

   return null;
}