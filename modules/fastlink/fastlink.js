async function start_fastlink_module(){ //html embed
    var ready_to_load = false;
    for(i=0; ready_to_load != true;i++){
        if(luckyapp_core.modules.content.loaded){ //Bedingung für Ausführung
            ready_to_load = true;
            var html_content = '<div class="mLCard fastlinkCard">'
                                    /*+'<a href="https://luckyapps.github.io/Musik/"><img src="images/musik.png"></img><span>Luckyapp Musik</span></a>'
                                    +'<a href="https://luckyapps.github.io/nasa/"><img src="images/NASA_logo.svg"></img><span>Nasa</span></a>'
                                    +'<a href="https://luckyapps.github.io/Luckyapp/"><img src="images/icons/icon-512x512.png"></img><span>Luckyapp Home</span></a>'
                                    +'<a href="https://luckyapps.github.io/games/"><img src="images/minecraft.png"></img><span>Games</span></a>'*/

                                    +'<div class="mLCardBack">'
                                        +'<h3>Settings</h3>'
                                        +'<h4>Welche Links sollen angezeigt werden?</h4>'
                                        +'<div class="flDisplaySettings"></div>'
                                    +'</div>'
                                +'</div>';
            html_content = await createHTML(html_content);
            myLuckyappCore.modules.fastlink.html = html_content;
            //document.body.appendChild(html_content);
            //document.getElementById("cardContainer").appendChild(html_content);
            myLuckyappCore.modules.fastlink.loaded = true;
        }else{
            await sleep(1);
            if(i==100){
                luckyapp_core.load_error(undefined, "CONTENT ERROR");
            }
        }
    }
}

var fastlinkSettings;

async function init_fastlink(){
    var settings_version = 3;
    fastlinkSettings = await myLuckyappCore.getModuleSettings("fastlink");
    if(fastlinkSettings == false || fastlinkSettings == undefined || fastlinkSettings.settingsVersion < settings_version){
        var baseSettings = {
            settingsVersion: settings_version,
            links: {
                music: {
                    name: "Luckyapp Musik",
                    description: "",
                    href: "https://luckyapps.github.io/Musik/",
                    image_src: "images/musik.png"
                },
                nasa: {
                    name: "Nasa",
                    description: "",
                    href: "https://luckyapps.github.io/nasa/",
                    image_src: "images/NASA_logo.svg"
                },
                luckyapp_home: {
                    name: "Luckyapp Home",
                    description: "",
                    href: "https://luckyapps.github.io/Luckyapp/",
                    image_src: "images/icons/icon-512x512.png"
                },
                games: {
                    name: "Games",
                    description: "",
                    href: "https://luckyapps.github.io/games/",
                    image_src: "images/minecraft.png"
                }
            },
            selected: ["music", "nasa", "luckyapp_home"]
        }
        Object.keys(baseSettings).forEach((elem)=>{
            myLuckyappCore.setModuleSetting("fastlink", elem, baseSettings[elem]);
        });
        init_fastlink();
    }
    load_fastlink_linklist();
    load_fastlink_settings();
}

async function clear_fastlink_linklist(){
    var length = parseInt(document.getElementsByClassName("fastlink_link").length);
    for(ik=0;ik<length;ik++){
        document.getElementsByClassName("fastlink_link")[0].remove();
    }
}

async function load_fastlink_linklist(){
    await clear_fastlink_linklist();
    for(i=0;i<myLuckyappCore.modules.fastlink.settings.selected.length;i++){
        var linkId = myLuckyappCore.modules.fastlink.settings.selected[i]
        var linkData = myLuckyappCore.modules.fastlink.settings.links[linkId]
        var html = '<a class="fastlink_link" href="'+ linkData.href +'"><img src="'+ linkData.image_src +'"></img><span>'+ linkData.name +'</span></a>'
        document.getElementsByClassName("fastlinkCard")[0].appendChild(createHTML(html));
    }
}

function fastlink_isSelected(name){
    var returnValue = false
    myLuckyappCore.modules.fastlink.settings.selected.forEach((elem)=>{if(elem == name){returnValue = true}})
    return returnValue;
}

async function load_fastlink_settings(){
    var flDisplaySettings = document.getElementsByClassName("flDisplaySettings")[0];
    var fastlinkSettings = await myLuckyappCore.getModuleSettings("fastlink");
    var links = fastlinkSettings.links;
    var keylist = Object.keys(links);
    for(i=0;i<keylist.length;i++){
        if(fastlink_isSelected(keylist[i])){
            var checkbox_state = "checked";
        }else{
            var checkbox_state = "";
        }
        var html = '<div class="flSetting">'
                        +'<div class="flSettingName">'+ links[keylist[i]].name +':</div>'
                        +'<input class="flSettingInput" type="checkbox" '+ checkbox_state +' value="'+ keylist[i] +'" onchange="fastlink_settings_change(this)"></input>'
                  +'</div>';
        flDisplaySettings.appendChild(createHTML(html));
    }
}

async function fastlink_settings_change(input){
    var linkId = input.value;
    if(fastlink_isSelected(linkId)){
        for(i=0;i<myLuckyappCore.settings.modules.fastlink.selected.length;i++){
            if(myLuckyappCore.settings.modules.fastlink.selected[i]==linkId){
                myLuckyappCore.settings.modules.fastlink.selected.splice(i,1);
                input.checked = false;
            }
        }
    }else{
        myLuckyappCore.settings.modules.fastlink.selected.push(linkId);
        input.checked = true;
    }
    myLuckyappCore.saveSettings();
    load_fastlink_linklist();
}