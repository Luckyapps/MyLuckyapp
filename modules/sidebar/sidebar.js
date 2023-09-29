async function start_sidebar_stylesheet(){ //no html embed
    var ready_to_load = false;
    for(i=0; ready_to_load != true;i++){
        if(luckyapp_core.modules.content.loaded){ //Bedingung für Ausführung
            ready_to_load = true;

            sidebarContainer = document.getElementById("sidebarContainer");

            myLuckyappCore.modules.sidebar.loaded = true;
        }else{
            await sleep(1);
            if(i==100){
                luckyapp_core.load_error(undefined, "CONTENT ERROR");
            }
        }
    }
}

var sidebarContainer;

myLuckyappCore.sidebar = {
    opened: false,
    toggle: function(evt){
        if(myLuckyappCore.sidebar.opened){
            if(evt.srcElement != document.getElementById("sidebarSettings") && evt.srcElement.offsetParent != document.getElementById("sidebarSettings")){ //Ausnahmen
                console.log(evt);
                myLuckyappCore.sidebar.close();
            }else{
                myLuckyappCore.sidebar.settings.toggle(evt);
            }
        }else{
            myLuckyappCore.sidebar.open();
        }
    },
    open: function(){
        myLuckyappCore.sidebar.opened = true;
        document.getElementById("sidebarContainer").classList.remove("sidebarClosed");
        document.getElementById("sidebarContainer").classList.add("sidebarOpen");
    },
    close: function(){
        myLuckyappCore.sidebar.opened = false;
        document.getElementById("sidebarContainer").classList.remove("sidebarOpen");
        document.getElementById("sidebarContainer").classList.add("sidebarClosed");
    },
    settings: {
        opened:false,
        toggle: function(evt){
            if(myLuckyappCore.sidebar.settings.opened){
                if(evt.srcElement != document.getElementsByClassName("darkmode_toggle")[0]){
                    myLuckyappCore.sidebar.settings.close();
                }
            }else{
                myLuckyappCore.sidebar.settings.open();
            }
        },
        open: function(){
            myLuckyappCore.sidebar.settings.opened = true;
            document.getElementById("sidebarSettings").classList.remove("sidebarSettingsClosed");
            document.getElementById("sidebarSettings").classList.add("sidebarSettingsOpen");
        },
        close: function(){
            myLuckyappCore.sidebar.settings.opened = false;
            document.getElementById("sidebarSettings").classList.remove("sidebarSettingsOpen");
            document.getElementById("sidebarSettings").classList.add("sidebarSettingsClosed");
        }
    }
}

function init_sidebar(){
    document.getElementById("sidebarContainer").addEventListener("click",myLuckyappCore.sidebar.toggle);
} 