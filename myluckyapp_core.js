async function initMyLuckyapp(){
    if(luckyapp_core.loaded){
        await myLuckyappCore.loadSettings();
        await myLuckyappCore.initModules();
        myLuckyappCore.loadCardList();
    }else{
        await sleep(100);
        initMyLuckyapp();
    }
}

var storageName = "myLuckyappSettings";

var myLuckyappCore = {
    loadCount:0,
    loadCheckCount:0,
    loaded:false,
    version: "1",
    cardList: [],
    settings: {
        settingsVersion: 1,
        cardList: [
            "fastlink"
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
    loadCardList: async function(){
        if(this.loaded){
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
            this.cardManager.init();
        }else{
            await sleep(100);
            this.loadCardList();
        }
    },
    insertCard: async function(html_string){
        var htmlContent = await createHTML(html_string);
        document.getElementById("cardContainer").appendChild(htmlContent);
        return true;
    },
    saveSettings: function(){
        localStorage.setItem(storageName, JSON.stringify(this.settings));
        return true;
    },
    modules: { //Module sind Funktionen, die in die Website eingebaut werden können. Modules stellen auch die Cards bereit.
        name1:{ //id des Modules
            active: true,
            files: {
                js:["modules/template.js"]
            }, //Dateien
            start: async function(){
                //zu startende Funktionen hier einfügen
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
                await start_fastlink_module();
                myLuckyappCore.loadCheck();
            }
        }
    },
    initModules: async function(){
        try{
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
                            scriptLoader(module.files.js[j], callback);
                        }
                    }
                    if(module.files.css){
                        for(j=0;j<module.files.css.length;j++){
                            cssLoader(module.files.css[j]);
                        }
                    }
                }
            }
        }catch(err){
            console.error("[myLuckyapps] Loaderror");
        }
    },
    cardManager: {
        cards: [],
        init: function (){
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
                console.log(card);
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