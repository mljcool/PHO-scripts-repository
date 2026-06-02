if (typeof (de_EventAttendee) == "undefined")
{ de_EventAttendee = { __namespace: true }; }

// Event Attendee Library - Start

de_EventAttendee.Library = {
    //--------------------------------------------------------------------------
    onLoad: function (executionContext) {
        var formContext = de_EventAttendee.Library.getFormContext(executionContext);
        if (!formContext) {
            return;
        }

        var parentLeadIdAttr = formContext.getAttribute("cm_parent_leadid");
        if (parentLeadIdAttr != null) {
            parentLeadIdAttr.setRequiredLevel("none");
        }
    },

    //--------------------------------------------------------------------------
    onSave: function (executionContext) {

    },

    //--------------------------------------------------------------------------
    getFormContext: function (executionContext) {
        if (executionContext && typeof executionContext.getFormContext === "function") {
            return executionContext.getFormContext();
        }

        if (executionContext && typeof executionContext.getAttribute === "function" && typeof executionContext.getControl === "function") {
            return executionContext;
        }

        return null;
    },

    //--------------------------------------------------------------------------
    __namespace: true
};

// Event Attendee Library - End