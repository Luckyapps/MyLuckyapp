async function start_hangman_module(){ //html embed
    var ready_to_load = false;
    for(i=0; ready_to_load != true;i++){
        if(luckyapp_core.modules.content.loaded){ //Bedingung für Ausführung
            ready_to_load = true;
            var html_content =  '<div class="mLCard hangmanCard">'
                                    +'<h2>Hangman Minigame</h2>'
                                    +'<div class="hangmanOutput"></div>'
                                +'</div>';
            html_content = await createHTML(html_content);
            myLuckyappCore.modules.hangman.html = html_content; //Hier name ändern (F2 Taste?)
            //document.body.appendChild(html_content);
            //document.getElementById("cardContainer").appendChild(html_content);
            myLuckyappCore.modules.hangman.loaded = true; //Hier name ändern
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

function hangman_init(){
    hangman = {
      settings:{
        fails: 5
      },
      guessed: {
        correct: ["adfh"],
        wrong: [],
        all: []
      },
      start: function(){
        hangman.word.input = document.getElementById("hangman_input").value;
        hangman.load();
        console.log(hangman.word.input);
      },
      load: function(reload){
        if(!reload){
          hangman.word.data = [];
        }
        hangman.output.innerHTML = "<div class='hangman_header'>Rate das Wort:</div>";
        hangman.output.innerHTML += "<div class='hangman_fails'>Fehler: "+ hangman.guessed.wrong.length +" von "+ hangman.settings.fails +"</div>"
        var eingabe = hangman.word.input;
        var ausgabe = "";
        for(i=0;i<eingabe.length;i++){
          if(eingabe.substr(i, 1) == " "){
            if(eingabe.substr(i-1, 1) == ","){
            }else{
              ausgabe += "<div style='color: yellow'>|</div>";
            }
          }else if(eingabe.substr(i, 1) == ","){
            ausgabe += "<div style='color:green'>,</div>"
          }else if(eingabe.substr(i, 1).length === 1 && eingabe.substr(i, 1).match(/[a-z | ß | ü | ä | ö]/i)){
            /*if(hangman.guessed.correct.forEach(function(src){if(src == eingabe.substr(i,1)){return true}else{return false};})){
              console.error("part of it");
            }*/
            //console.error(hangman.guessed.correct.length);
            var show = false;
            for(j=0;j<hangman.guessed.correct.length;j++){
              if(hangman.guessed.correct[j] === eingabe.substr(i,1)){
                show = true;
              }
            }
            if(show){
              ausgabe += "<div>"+ eingabe.substr(i,1) +"</div>";
            }else{
              ausgabe += "<div>_</div>";
            }
            
            if(!reload){
              hangman.word.data.push(eingabe.substr(i, 1));
            }
          }else{
            console.log("NOLETTER");
          }
        }
        hangman.output.innerHTML += "<div class='hangman_output'>"+ ausgabe +"</div>";
        var characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var selection = "";
        characters.forEach(function(src){
          var check = false;
          for(k=0;k<hangman.guessed.all.length;k++){
            if(hangman.guessed.all[k] === src){
              check = true;
            }
          }
          if(!check){
            selection += "<button onclick='hangman.test(this.value)' value='"+ src +"' id='hangman_but_"+ src +"'>"+ src +"</button>";
          }
        })
        hangman.output.innerHTML += "<div>"+ selection +"</div>";
      },
      test: function(letter){
        var end = false;
        hangman.guessed.all.push(letter);
        var check = false;
        hangman.word.data.forEach(function(src){
          var regex = new RegExp(letter, "ig");
          if(src.match(regex)){
            //console.log(src.match(regex));
            src.match(regex).forEach((elem)=>{hangman.guessed.correct.push(elem)});
            check = true;
          }
        });
        if(check){
        }else{
          hangman.guessed.wrong.push(letter);
          //console.log(letter);
        }
        if((hangman.guessed.correct.length - 1) == hangman.word.data.length){
          /*var word_selected = "";
          var word_guess = "";
          for(h=0;h<hangman.word.data.length;h++){
            word_selected += hangman.word.data[h];
          }
          for(g=1;g<hangman.guessed.correct.length;g++){
            word_guess += hangman.guessed.correct[g];
          }
          console.warn(word_guess);
          console.warn(word_selected);*/
          end = true;
          hangman.gewonnen();
          console.warn("WORT ERRATEN: "+ hangman.word.input);
        }else if(hangman.guessed.wrong.length == hangman.settings.fails){
          end = true;
          hangman.verloren();
        }
        if(!end){
          hangman.load(true);
        }
      },
      gewonnen: function(){
        console.error("GEWONNEN");
        hangman.output.innerHTML = "<div class='hm_ergebnis'>"
        +"<div>Du hast gewonnen, das Wort war: <span style='color:green'>"+ hangman.word.input +"</span></div>"
        +"<button onclick='hangman_init()'>Neu starten</button>"
        +"</div>";
      },
      verloren: function(){
        console.error("VERLOREN");
        hangman.output.innerHTML = "<div class='hm_ergebnis'>"
        +"<div>Du hast <span style='color:red'>verloren</span>, das Wort war: <span style='color:green'>"+ hangman.word.input +"</span></div>"
        +"<button onclick='hangman_init()'>Neu starten</button>"
        +"</div>";
      }
    };
    hangman.word = {};
    hangman.container = document.getElementsByClassName("hangmanCard")[0];
    hangman.output = hangman.container.getElementsByClassName("hangmanOutput")[0];
    hangman.output.innerHTML = 
    "<div class='hangman_header'>Gib ein Wort ein:</div>"
      +"<input type='text' id='hangman_input'></input>"
      +"<button id='hangman_input_submit' onclick='hangman.start()'>Senden</button>";
    //console.log(hangman);
  }