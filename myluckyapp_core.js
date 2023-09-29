async function initMyLuckyapp(){
    for(i=1;i>0;i++){
        if(luckyapp_core.loaded){
            console.log("Starting")
            await myLuckyappCore.loadSettings();
            luckyapp_core.load_check();
            await myLuckyappCore.initModules();
            luckyapp_core.load_check();
            await myLuckyappCore.loadCardList();
            luckyapp_core.load_check();
            await myLuckyappCore.initModuleFunctions();
            luckyapp_core.load_check();
            console.log("danach");
            break;
        }else{
            await sleep(100);
        }
        console.log(i);
        if(i==100){
            console.error("[MyLuckyappCore] Fatal Error: System kann nicht geladen werden.");
            luckyapp_core.load_error(undefined, "MyLuckyapp kann nicht geladen werden.");
        }
    }
    console.warn("[myLuckyappCore] Ladevorgang abgeschlossen");
}

var storageName = "myLuckyappSettings";

var myLuckyappCore = {
    loadCount:0,
    loadCheckCount:0,
    loaded:false,
    version: "1",
    cardList: [],
    moduleFunctions:[],
    updateOnSettingsChange:[], //Funktionen, die aufgerufen werden wenn die Einstellungen geändert werden. (nur über myLuckyappCore.settingChange())
    settings: {
        settingsVersion: 3,
        darkmode: false, //Zum ändern darkmode.activate/() oder deactivate() verwenden
        cardList: [
            "fastlink",
            "hangman"
        ],//Liste der Ids der Karten, die angezeigt werden sollen.
    },
    loadCheck: function(){
        this.loadCheckCount++;
        if(this.loadCheckCount==this.loadCount){
            this.loaded = true;
        }
    },
    loadSettings: function(){
        if(localStorage.getItem(storageName)){
            var storedSettings = JSON.parse(localStorage.getItem(storageName));
            if(storedSettings.settingsVersion<this.settings.settingsVersion){
                this.saveSettings();
                error_show("Settings aktualisiert");
                return true;
            }else{
                this.settings = JSON.parse(localStorage.getItem(storageName));
            }
        }else{
            this.saveSettings();
        }
    },
    changeSetting: async function(setting, value){
        if(localStorage.getItem(storageName)){
            try{
                myLuckyappCore.settings[setting] = value;
                this.saveSettings();
                this.loadFunctions(this.updateOnSettingsChange);
            }catch(err){
                console.warn(`unable to change setting ${setting} to value ${value}`);
            }
        }
    },
    saveSettings: function(){
        localStorage.setItem(storageName, JSON.stringify(this.settings));
        return true;
    },
    loadFunctions: function(array){
        array.forEach((elem)=>{luckyapp_core.modules.fileloader.load(elem)});
    },
    loadCardList_count:0,
    loadCardList: async function(){
        //console.log("loadCardList");
        return new Promise(async(resolve)=>{
            //console.log("loadCardListPromise");
            var maxLoadCount = 10;
            for(lc=0;lc<maxLoadCount+1;lc++){
                //console.log(lc);
                //console.log("start cyclye"+lc);
                if(this.loaded||lc == maxLoadCount){
                    lc=maxLoadCount;
                    if(!this.loaded){
                        load_status--;
                        luckyapp_core.load_error(undefined, "loadCardList error: Möglicherweise kann eine Moduldatei nicht geladen werden.")
                    }
                    this.cardList = this.settings.cardList;
                    for(i=0;i<this.cardList.length;i++){
                        if(this.modules[this.cardList[i]].loaded){
                            if(this.modules[this.cardList[i]].html){
                                document.getElementById("cardContainer").appendChild(this.modules[this.cardList[i]].html);
                            }else{
                                error_show("[MyLuckyapp LoadCardList] Module " +this.cardList[i] +" stellt keine Card zur Verfügung.");
                            }
                        }
                    }
                    //console.log("ausgeführt");
                    await this.cardManager.init();
                    resolve("result");
                }else{
                    //console.log("before sleep"+lc);
                    await sleep(300);
                    //console.log("after sleep"+lc);
                }
                //console.log("end cycle"+lc);
            }
        });
    },
    insertCard: async function(html_string){
        var htmlContent = await createHTML(html_string);
        document.getElementById("cardContainer").appendChild(htmlContent);
        return true;
    },
    modules: { //Module sind Funktionen, die in die Website eingebaut werden können. Modules stellen auch die Cards bereit.
        name1:{ //id des Modules
            active: true,
            files: {
                js:["modules/template.js"]
            }, //Dateien
            functions: ["testing"], //Funktion, die nach vollständigem Laden ausgeführt wird
            start: async function(){
                //zu startende Funktionen hier einfügen
                console.log("template");
                myLuckyappCore.loadCheck();
            }
        },
        darkmode:{ //id des Modules
            active: true,
            files: {
                js:["modules/darkmode/darkmode.js"],
                css:["modules/darkmode/darkmode.css"]
            }, //Dateien
            functions: ["init_darkmode"],
            start: async function(){
                //zu startende Funktionen hier einfügen
                console.log("darkmode");
                myLuckyappCore.loadCheck();
            }
        },
        sidebar:{ //id des Modules
            active: true,
            files: {
                js:["modules/sidebar/sidebar.js"],
                css:["modules/sidebar/sidebar.css"]
            }, //Dateien
            functions: ["init_sidebar"], //Funktion, die nach vollständigem Laden ausgeführt wird
            start: async function(){
                //zu startende Funktionen hier einfügen
                start_sidebar_stylesheet();
                console.log("sidebar");
                myLuckyappCore.loadCheck();
            }
        },
        fastlink:{ //id des Modules
            active: true,
            files: {
                js:["modules/fastlink/fastlink.js"],
                css:["modules/fastlink/fastlink.css"]
            }, //Dateien
            start: async function(){
                //zu startende Funktionen hier einfügen
                console.log("fastlink");
                await start_fastlink_module();
                myLuckyappCore.loadCheck();
            }
        },
        hangman:{
            active: true,
            files: {
                js:["modules/hangman/hangman.js"],
                css:["modules/hangman/hangman.css"]
            },
            functions: ["hangman_init"],
            start: async function(){
                console.log("hangman");
                await start_hangman_module();
                myLuckyappCore.loadCheck();
            }
        }
    },
    initModules: async function(){
        try{
            console.log("initModules");
            var modulesList = Object.keys(this.modules);
            for(i=0;i<modulesList.length;i++){
                var modName = modulesList[i];
                var module = this.modules[modName];
                if(module.active){
                    //console.log("active");
                    if(module.files.js){
                        for(j=0;j<module.files.js.length;j++){
                            if(j==0){
                                var callback = this.modules[modName].start;
                                this.loadCount++;
                            }else{
                                var callback = undefined;
                            }
                            await scriptLoader(module.files.js[j], callback);
                        }
                    }
                    if(module.files.css){
                        for(j=0;j<module.files.css.length;j++){
                            await cssLoader(module.files.css[j]);
                        }
                    }
                    if(module.functions){
                        this.moduleFunctions.push(module.functions);
                        console.log(this.moduleFunctions);
                    }
                }
            }
            console.log("initModules ended");
        }catch(err){
            console.error("[myLuckyapps] Loaderror");
        }
    },
    initModuleFunctions: async function(){
        return new Promise(async (resolve)=>{
            try{
                this.moduleFunctions.forEach((elem)=>{luckyapp_core.modules.fileloader.load(elem)});
            }catch(err){
                console.log(err);
            }
            resolve();
        });
    },
    cardManager: {
        cards: [],
        init: function (){
            //console.log("initCardManager");
            var cardList = document.getElementsByClassName("mLCard");
            for(i=0;i<cardList.length;i++){
                var card = {
                    obj: cardList[i],
                    back: false
                }
                if(cardList[i].getElementsByClassName("mLCardBack")[0]){
                    card.back = true;
                    var flipHtml = createHTML('<div class="mLCardFlipperFront">🔄️</div>');
                    cardList[i].insertBefore(flipHtml, cardList[i].getElementsByClassName("mLCardBack")[0]);
                    cardList[i].getElementsByClassName("mLCardBack")[0].innerHTML += '<div class="mLCardFlipperBack">❌</div>';
                    cardList[i].getElementsByClassName("mLCardFlipperFront")[0].addEventListener("click",(evt)=>{myLuckyappCore.cardManager.flipToBack(evt.target.offsetParent)});
                    cardList[i].getElementsByClassName("mLCardBack")[0].getElementsByClassName("mLCardFlipperBack")[0].addEventListener("click",(evt)=>{myLuckyappCore.cardManager.flipToFront(evt.target.offsetParent.offsetParent)});
                }
                myLuckyappCore.cardManager.cards.push(card);
            }
        },
        flipToBack: function(obj){
            obj.classList.add("mLCardFlipped");
        },
        flipToFront: function(obj){
            obj.classList.remove("mLCardFlipped");
        }
    }
}

class Card{
    constructor(name, description, files){
        try{
            this.name = name,
            this.files = files,
            this.description = description
        }catch(err){console.error(evt)};
    }
}