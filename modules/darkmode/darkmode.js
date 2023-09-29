async function init_darkmode(){
    myLuckyappCore.darkmode = {
    toggle: ()=>{
        if(myLuckyappCore.settings.darkmode == true){
            myLuckyappCore.darkmode.deactivate();
        }else if(myLuckyappCore.settings.darkmode == false){
            myLuckyappCore.darkmode.activate();
        }
    },
    activate: async ()=>{
        myLuckyappCore.changeSetting("darkmode", true);
        for(i=0;i<document.getElementsByClassName("darkmode_toggle").length;i++){ //In ButtonToggle function?
            document.getElementsByClassName("darkmode_toggle")[i].src= await getAbsoluteLink("images/Theme_Symbol.png");
        }
        var config = await get_data("darkmodeConfig.json");
        for(i=0;i<Object.keys(config).length;i++){
            var currentType = config[Object.keys(config)[i]];
            var currentTypeName = Object.keys(config)[i];
            for(j=0;j<Object.keys(currentType).length;j++){
                var currentElement = currentType[Object.keys(currentType)[j]];
                var currentElementName = Object.keys(currentType)[j];
                if(currentElement.styles){ //Direct Style
                    for(k=0;k<Object.keys(currentElement.styles).length;k++){
                        var currentStyleValue = currentElement.styles[Object.keys(currentElement.styles)[k]];
                        var currentStyleName = Object.keys(currentElement.styles)[k];
                        if(currentTypeName=="classes"){
                            for(l=0;l<document.getElementsByClassName(currentElementName).length;l++){
                                try{
                                    document.getElementsByClassName(currentElementName)[l].style[currentStyleName] = currentStyleValue;
                                }catch(err){
                                    console.warn(`[Darkmode direct style to classes] unable to attach style to ${currentElementName}`);
                                }
                            }
                        }else if(currentTypeName=="ids"){
                            try{
                                document.getElementById(currentElementName).style[currentStyleName] = currentStyleValue;
                            }catch(err){
                                console.warn(`[Darkmode direct style to ids] unable to attach style to ${currentElementName}`);
                            }
                        }else if(currentTypeName=="tags"){
                            for(l=0;l<document.getElementsByTagName(currentElementName).length;l++){
                                try{
                                    document.getElementsByTagName(currentElementName)[l].style[currentStyleName] = currentStyleValue;
                                }catch(err){
                                    console.warn(`[Darkmode direct style to tags] unable to attach style to ${currentElementName}`);
                                }
                            }
                        }
                    }
                }else if(currentElement.classes){ //Class changes
                    if(currentElement.classes.add){
                        var classes_add = currentElement.classes.add;
                        for(k=0;k<classes_add.length;k++){
                            if(currentTypeName=="classes"){
                                for(l=0;l<document.getElementsByClassName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByClassName(currentElementName)[l].classList.add(classes_add[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at classes] unable to attach class to ${currentElementName}`);
                                    }
                                }
                            }else if(currentTypeName=="ids"){
                                try{
                                    document.getElementById(currentElementName).classList.add(classes_add[k]);
                                }catch(err){
                                    console.warn(`[Darkmode class at ids] unable to attach class to ${currentElementName}`);
                                }
                            }else if(currentTypeName=="tags"){
                                for(l=0;l<document.getElementsByTagName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByTagName(currentElementName)[l].classList.add(classes_add[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at tags] unable to attach class to ${currentElementName}`);
                                    }
                                }
                            }
                        }
                    }
                    if(currentElement.classes.remove){
                        var classes_remove = currentElement.classes.remove;
                        for(k=0;k<classes_remove.length;k++){
                            if(currentTypeName=="classes"){
                                for(l=0;l<document.getElementsByClassName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByClassName(currentElementName)[l].classList.remove(classes_remove[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at classes] unable to remove class to ${currentElementName}`);
                                    }
                                }
                            }else if(currentTypeName=="ids"){
                                try{
                                    document.getElementById(currentElementName).classList.remove(classes_remove[k]);
                                }catch(err){
                                    console.warn(`[Darkmode class at ids] unable to remove class to ${currentElementName}`);
                                }
                            }else if(currentTypeName=="tags"){
                                for(l=0;l<document.getElementsByTagName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByTagName(currentElementName)[l].classList.remove(classes_remove[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at tags] unable to remove class to ${currentElementName}`);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    deactivate: async ()=>{
        myLuckyappCore.changeSetting("darkmode", false);
        for(i=0;i<document.getElementsByClassName("darkmode_toggle").length;i++){ //In ButtonToggle function?
            document.getElementsByClassName("darkmode_toggle")[i].src= await getAbsoluteLink("images/Theme_Symbol2.png");
        }
        var config = await get_data("darkmodeConfig.json");
        for(i=0;i<Object.keys(config).length;i++){
            var currentType = config[Object.keys(config)[i]];
            var currentTypeName = Object.keys(config)[i];
            for(j=0;j<Object.keys(currentType).length;j++){
                var currentElement = currentType[Object.keys(currentType)[j]];
                var currentElementName = Object.keys(currentType)[j];
                if(currentElement.styles){ //Direct Style
                    for(k=0;k<Object.keys(currentElement.styles).length;k++){
                        var currentStyleValue = currentElement.styles[Object.keys(currentElement.styles)[k]];
                        var currentStyleName = Object.keys(currentElement.styles)[k];
                        if(currentTypeName=="classes"){
                            for(l=0;l<document.getElementsByClassName(currentElementName).length;l++){
                                try{
                                    document.getElementsByClassName(currentElementName)[l].style[currentStyleName] = "unset";
                                }catch(err){
                                    console.warn(`[Darkmode direct style to classes] unable to attach style to ${currentElementName}`);
                                }
                            }
                        }else if(currentTypeName=="ids"){
                            try{
                                document.getElementById(currentElementName).style[currentStyleName] = "unset";
                            }catch(err){
                                console.warn(`[Darkmode direct style to ids] unable to attach style to ${currentElementName}`);
                            }
                        }else if(currentTypeName=="tags"){
                            for(l=0;l<document.getElementsByTagName(currentElementName).length;l++){
                                try{
                                    document.getElementsByTagName(currentElementName)[l].style[currentStyleName] = "unset";
                                }catch(err){
                                    console.warn(`[Darkmode direct style to tags] unable to attach style to ${currentElementName}`);
                                }
                            }
                        }
                    }
                }else if(currentElement.classes){ //Class changes
                    if(currentElement.classes.add){
                        var classes_add = currentElement.classes.add;
                        for(k=0;k<classes_add.length;k++){
                            if(currentTypeName=="classes"){
                                for(l=0;l<document.getElementsByClassName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByClassName(currentElementName)[l].classList.remove(classes_add[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at classes] unable to remove class to ${currentElementName}`);
                                    }
                                }
                            }else if(currentTypeName=="ids"){
                                try{
                                    document.getElementById(currentElementName).classList.remove(classes_add[k]);
                                }catch(err){
                                    console.warn(`[Darkmode class at ids] unable to remove class to ${currentElementName}`);
                                }
                            }else if(currentTypeName=="tags"){
                                for(l=0;l<document.getElementsByTagName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByTagName(currentElementName)[l].classList.remove(classes_add[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at tags] unable to remove class to ${currentElementName}`);
                                    }
                                }
                            }
                        }
                    }
                    if(currentElement.classes.remove){
                        var classes_remove = currentElement.classes.remove;
                        for(k=0;k<classes_remove.length;k++){
                            if(currentTypeName=="classes"){
                                for(l=0;l<document.getElementsByClassName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByClassName(currentElementName)[l].classList.add(classes_remove[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at classes] unable to add class to ${currentElementName}`);
                                    }
                                }
                            }else if(currentTypeName=="ids"){
                                try{
                                    document.getElementById(currentElementName).classList.add(classes_remove[k]);
                                }catch(err){
                                    console.warn(`[Darkmode class at ids] unable to add class to ${currentElementName}`);
                                }
                            }else if(currentTypeName=="tags"){
                                for(l=0;l<document.getElementsByTagName(currentElementName).length;l++){
                                    try{
                                        document.getElementsByTagName(currentElementName)[l].classList.add(classes_remove[k]);
                                    }catch(err){
                                        console.warn(`[Darkmode class at tags] unable to add class to ${currentElementName}`);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
if(myLuckyappCore.settings.darkmode==false){ //In ButtonToggle function?
    for(i=0;i<document.getElementsByClassName("darkmode_toggle").length;i++){
        document.getElementsByClassName("darkmode_toggle")[i].src= await getAbsoluteLink("images/Theme_Symbol2.png");
    }
}else{
    if(myLuckyappCore.settings.darkmode==true){
        myLuckyappCore.darkmode.activate();
    }
}
for(i=0;i<document.getElementsByClassName("darkmode_toggle").length;i++){
    document.getElementsByClassName("darkmode_toggle")[i].addEventListener("click", ()=>{myLuckyappCore.darkmode.toggle()});
}
}

async function get_data(url, noinfo){
    var data

    if(!url.includes("https")){
        if(url.includes("http")){
            url = url.replace("http","https");
        }
    }else{
    }
    
    await fetch(url)
    
    .then((response) => response.text())

    .then((data_text) => {data = JSON.parse(data_text)});
    return data;
}

async function getAbsoluteLink(link){
    if(window.location.origin != "file://"){
        return window.location.origin +"/"+ link;
    }
}