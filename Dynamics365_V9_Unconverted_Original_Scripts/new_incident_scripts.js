function ResolveCustom()
{
    if (Xrm.Page.getAttribute("de_timetrackingenabled").getValue() == 1) {
        PHO_de_Common.Library.setRequired("de_totaltime", "required");

        if (Xrm.Page.getAttribute("de_totaltime").getValue() == 0 || Xrm.Page.getAttribute("de_totaltime").getValue() == null) {
            alert("Total Time must be greater than 0");
            context.getEventArgs().preventDefault();
        }
        else
            resolve();
    }
    else
        resolve();
}