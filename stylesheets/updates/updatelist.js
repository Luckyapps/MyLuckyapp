var updatelist_luckyapp = {
    "source": "Luckyapp",
    "content": [ 
        {
            id: "dv.1.23092.0",
            title: "myLuckyapp Update 2|sep23",
            name:"",
            date: "29.09.2023",
            type: "UPDATE",
            description: "<ul><li>Erster Entwurf der Sidebar</li></ul>"
        },{
            id: "dv.1.23091.0",
            title: "myLuckyapp Update 1|sep23",
            name:"",
            date: "29.09.2023",
            type: "UPDATE",
            description: "<ul><li>Darkmode <ul><li>Neues Darkmode Modul wurde hinzugefügt.</li><li>In der darkmodeConfig.json kann der Darkmode konfiguriert werden.</li><li>Der Darkmode kann in der Benutzeroberfläche über den neuen Button oben rechts gestuert werden.</li><li>In der darkmode.css können klassen für den Darkmode definiert werden.</li></ul></li><li>myLuckyappCore <ul><li>Settings <ul><li>Neue Darkmode Einstellung</li><li>Ändern einer Einstellung über myLuckyappCore.changeSetting(setting, value) möglich.</li><li>Über updateOnSettingsChange können Funktionen angegeben werden, die nach dem ändern einer Einstellung über myLuckyappCore.changeSetting() ausgeführt werden sollen.</li></ul></li><li>Sonstiges <ul><li>Transparenz: Nach 100 erfolglosen Ladeversuchen wird eine Ladefehlermeldung angezeigt.</li><li>Neue Funktion myLuckyappCore.loadFunctions(array) kann Funktionen ausführen.</li></ul></li></ul></li><li>Hangman <ul><li>Output Design Fix</li><li>Unbekannte (nicht erratbare) Zeichen werden jetzt in grün angezeigt.</li></ul></li></ul>"
        },{
            id: "dv.1.23084.0",
            title: "myLuckyapp Update 4|aug23",
            name:"",
            date: "20.08.2023",
            type: "UPDATE",
            description: "<ul><li>Update des Ladesystems. Vor allem der Zeitliche ablauf und die Fehlertolereanz wurden verbessert.</li><li>Es wurde eine Möglich für Module hinzugefügt Funktionen aufzurufen, nachem alle Cards angezeigt wurden.</li></ul>"
        },{
            id: "dv.1.23083.11",
            title: "myLuckyapp Update 3|aug23",
            name:"",
            date: "14.08.2023",
            type: "BUGFIX",
            description: "<ul><li>Safari Bugfix</li></ul>"
        },{
            id: "dv.1.23083.0",
            title: "myLuckyapp Update 3|aug23",
            name:"Ladesystem",
            date: "13.08.2023",
            type: "UPDATE",
            description: "<ul><li>Ladesystem angepasst, sodass auch das Laden von MyLuckyapp mit einbezogen wird.</li></ul>"
        },{
            id: "dv.1.23082.0",
            title: "myLuckyapp Update 2|aug23",
            name:"Card Flipping 2",
            date: "13.08.2023",
            type: "UPDATE",
            description: "<ul><li>Card Flipping basic Backend und Optimierungen.</li></ul>"
        },{
            id: "dv.1.23081.0",
            title: "myLuckyapp Update 1|aug23",
            name:"Card Flipping",
            date: "13.08.2023",
            type: "UPDATE",
            description: "<ul><li>Card Flipping funktion hinzugefügt.</li></ul>"
        }
    ]
};

luckyapp_core.modules.updates.updatelists.luckyapp = {loaded: true};