function selectTab(e) {
    var i;

    var tabs = Sfdc.canvas.byClass("tabLink");
    for (i = 0; i < tabs.length; i++ ) {
        tabs[i].className = "tabLink";  // this removes "activeLink"
    }
    var tab = (e.srcElement) ? e.srcElement : e.target;
    
    if (!tab){
    	throw "Unable to determine selected tab.";
    }
    
    Sfdc.canvas.byId(tab.id).className = "tabLink activeLink";

    var tabcontents = Sfdc.canvas.byClass("tabcontent");
    for (i = 0; i < tabcontents.length; i++ ) {
        tabcontents[i].className = "tabcontent paddingAll hide";
    }
    Sfdc.canvas.byId(tab.id + "-1").className = "tabcontent paddingAll";
    return false;
}

function initTabs() {
    console.log("init tabs");
    var tabs = Sfdc.canvas.byClass("tabLink");
    for (var i = 0; i < tabs.length; i++ ) {
        console.log("Tab " + i);
        var fn = tabs[i].onclick;
        tabs[i].onclick = function(e){
        	if (fn){
        		fn(e);
        	}
        	selectTab(e);
        };
    }
}