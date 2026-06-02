if (typeof (de_CommunicationList) == "undefined")
{ de_CommunicationList = { __namespace: true }; }

// Communication List Library - Start

de_CommunicationList.Library = {
    //--------------------------------------------------------------------------
    onLoad: function (executionContext) {
        var formContext = de_CommunicationList.Library.getFormContext(executionContext);
        if (!formContext) {
            return;
        }

        if (formContext.ui.getFormType() == 1) {
            var createdFromCodeAttr = formContext.getAttribute("createdfromcode");
            if (createdFromCodeAttr != null) {
                createdFromCodeAttr.setValue(2);
            }
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

// Communication List Library - End