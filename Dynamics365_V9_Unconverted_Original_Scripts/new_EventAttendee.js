if (typeof (de_EventAttendee) == "undefined")
{ de_EventAttendee = { __namespace: true }; }

// Event Attendee Library - Start

de_EventAttendee.Library = {
    //--------------------------------------------------------------------------
    onLoad: function () {
        Xrm.Page.getAttribute("cm_parent_leadid").setRequiredLevel("none");
    },

    //--------------------------------------------------------------------------
    onSave: function () {

    },

    //--------------------------------------------------------------------------
    __namespace: true
};

// Event Attendee Library - End