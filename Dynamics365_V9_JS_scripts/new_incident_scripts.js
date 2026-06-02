function ResolveCustom(executionContext)
{
    var formContext = getFormContext(executionContext);
    if (!formContext) {
        return;
    }

    var timeTrackingEnabledAttr = formContext.getAttribute("de_timetrackingenabled");
    var totalTimeAttr = formContext.getAttribute("de_totaltime");

    if (timeTrackingEnabledAttr != null && timeTrackingEnabledAttr.getValue() == 1) {
        PHO_de_Common.Library.setRequired("de_totaltime", "required");

        if (totalTimeAttr == null || totalTimeAttr.getValue() == 0 || totalTimeAttr.getValue() == null) {
            alert("Total Time must be greater than 0");
            if (executionContext && executionContext.getEventArgs()) {
                executionContext.getEventArgs().preventDefault();
            }
        }
        else
            resolve();
    }
    else
        resolve();
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