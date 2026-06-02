if (typeof (de_CommunicationList) == "undefined")
{ de_CommunicationList = { __namespace: true }; }

// Communication List Library - Start

de_CommunicationList.Library = {
    //--------------------------------------------------------------------------
    onLoad: function () {
        if (Xrm.Page.ui.getFormType() == 1) {
            Xrm.Page.getAttribute("createdfromcode").setValue("2");
        }
    },

    //--------------------------------------------------------------------------
    onSave: function () {

    },

    //--------------------------------------------------------------------------
    __namespace: true
};

// Communication List Library - End