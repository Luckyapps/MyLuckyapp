async function start_xxxx_stylesheet(){ //html embed
    var ready_to_load = false;
    for(i=0; ready_to_load != true;i++){
        if(luckyapp_core.modules.content.loaded){ //Bedingung für Ausführung
            ready_to_load = true;
            var html_content = '';
            html_content = await createHTML(html_content);
            //document.body.appendChild(html_content);
            document.getElementById("cardContainer").appendChild(html_content);
            myLuckyappCore.modules.xxxxxx.loaded = true;
        }else{
            await sleep(1);
            if(i==100){
                luckyapp_core.load_error(undefined, "CONTENT ERROR");
            }
        }
    }
}

//Subpage Manager (Buttoncontrol)
window.addEventListener("popstate", (event) => {
    //conditions (Wenn button gedrück => und ... dann...)
    /*==> if(n_flyin_state == "open"){
        n_flyin_close();
        window.history.forward(1);
    }*/
});


async function start_xxxxx_stylesheet(){ //no html embed
    var ready_to_load = false;
    for(i=0; ready_to_load != true;i++){
        if(luckyapp_core.modules.content.loaded){ //Bedingung für Ausführung
            ready_to_load = true;

            myLuckyappCore.modules.xxxxxx.loaded = true;
        }else{
            await sleep(1);
            if(i==100){
                luckyapp_core.load_error(undefined, "CONTENT ERROR");
            }
        }
    }
}