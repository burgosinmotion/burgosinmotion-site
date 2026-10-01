window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script86 = function()
{
  // Acceder a las variables de Storyline
var player = GetPlayer();

// Modificar variables de Storyline
player.SetVar("Chest_Parpadeo", false);
player.SetVar("Chest_Parpadeo_2", false);
player.SetVar("timer", 30); //Restablece el tiempo a 30 segundos
player.SetVar("vidas", 4);
}

window.Script87 = function()
{
  let sec = player.GetVar("timer");
let timerId; // Variable para almacenar el ID del temporizador

// Función para reiniciar el contador cuando se oculta una capa
function resetTimerOnLayerHide() {
  let layerHidden = player.GetVar("layerHidden"); // Variable en Storyline
  if (layerHidden) {
    sec = 30; // Reinicia el contador a 30 segundos
    player.SetVar("timer", sec);
    player.SetVar("layerHidden", false); // Restablece la variable
  }
}

// Función para iniciar el temporizador
function startTimer() {
  resetTimerOnLayerHide(); // Verifica si la capa se ocultó antes de actualizar el temporizador

  let stopTimer = player.GetVar("stopTimer"); // Variable de Storyline para detener el tiempo
  if (stopTimer) {
    clearInterval(timerId); // Detiene el temporizador si la variable está activa
    return;
  }

  if (sec > 0) {
    if (player.GetVar('incorrect')) {
      sec = sec < 10 ? 0 : sec - 10;
      player.SetVar('incorrect', false);
    } else {
      sec -= 1;
    }
    player.SetVar("timer", sec);

    if (sec <= 0) {
      clearInterval(timerId);
    }
  }
}

// Función para iniciar el temporizador manualmente si se detuvo
function resumeTimer() {
  if (!timerId) {
    timerId = setInterval(startTimer, 1000);
  }
}

// Iniciar el temporizador
timerId = setInterval(startTimer, 1000);

}

window.Script88 = function()
{
  var player = GetPlayer();

var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script89 = function()
{
  var player = GetPlayer();

var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script90 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script91 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script92 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script93 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script94 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script95 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script96 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script97 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script98 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script99 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script100 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script101 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script102 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script103 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_front_timeline = gsap.timeline();

card_front_timeline.set(card_back,{rotateY:-90});
card_front_timeline.to(card_front,{rotateY:-90, duration:0.5});
card_front_timeline.to(card_back,{rotateY:0, duration:0.5});
}

window.Script104 = function()
{
  // Acceder a las variables de Storyline
//var player = GetPlayer();

// Modificar variables de Storyline
player.SetVar("noAudio", true);  // Establecer "noAudio" en verdadero (true)
player.SetVar("BloqueoClic", "Normal"); // Establecer "BloqueoClic" en "Normal"
player.SetVar("desbloquearBtnRevisar", 0);
}

window.Script105 = function()
{
  document.addEventListener("DOMContentLoaded", function () {
    function checkCards() {
        let cardSelected1 = true; // Aquí debes obtener el valor real
        let cardSelected6 = true; // Aquí debes obtener el valor real
        
        if (cardSelected1 && cardSelected6) {
            document.getElementById("Correcto1-6").style.display = "block";
        } else {
            document.getElementById("Correcto1-6").style.display = "none";
        }
    }

    checkCards(); // Llamar la función para verificar inicialmente
});

}

window.Script106 = function()
{
  // Acceder a las variables de Storyline
var player = GetPlayer();

// Modificar variables de Storyline
player.SetVar("stopTimer", false); // Establecer "stopTimer" en Falso
player.SetVar("noAudio", false); // Establecer "noAudio" en Falso
player.SetVar("timer", 30); //Restablece el tiempo a 30 segundos

//Modificar valor de la variable
var contadorActual = player.GetVar("mostrarFlechaAvance"); // Obtiene el valor actual
player.SetVar("mostrarFlechaAvance", contadorActual + 1); // Incrementa el valor
}

window.Script107 = function()
{
  // Acceder a las variables de Storyline
var player = GetPlayer();

// Modificar variables de Storyline
player.SetVar("stopTimer", false); // Establecer "stopTimer" en Falso
player.SetVar("noAudio", false); // Establecer "noAudio" en Falso
player.SetVar("timer", 30); //Restablece el tiempo a 30 segundos
}

window.Script108 = function()
{
  // Acceder a las variables de Storyline
var player = GetPlayer();

//Modificar valor de la variable (Agrega 1 a "Incorrecto")
var contadorActual = player.GetVar("Incorrecto"); // Obtiene el valor actual
player.SetVar("Incorrecto", contadorActual + 1); // Incrementa el valor

//Modificar valor de la variable (Resta 1 a "vidas")
var contadorActual = player.GetVar("vidas"); // Obtiene el valor actual
player.SetVar("vidas", contadorActual - 1); // Resta el valor
}

window.Script109 = function()
{
  // Acceder a las variables de Storyline
var player = GetPlayer();

// Modificar variables de Storyline
player.SetVar("stopTimer", false); // Establecer "stopTimer" en Falso
player.SetVar("noAudio", false); // Establecer "noAudio" en Falso
}

window.Script110 = function()
{
  // Acceder a las variables de Storyline
var player = GetPlayer();

//Modificar valor de la variable (Agrega 1 a "Incorrecto")
var contadorActual = player.GetVar("Incorrecto"); // Obtiene el valor actual
player.SetVar("Incorrecto", contadorActual + 1); // Incrementa el valor

//Modificar valor de la variable (Resta 1 a "vidas")
var contadorActual = player.GetVar("vidas"); // Obtiene el valor actual
player.SetVar("vidas", contadorActual - 1); // Resta el valor
}

window.Script111 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script112 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script113 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script114 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script115 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script116 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script117 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script118 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script119 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script120 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script121 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script122 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script123 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script124 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script125 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script126 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script127 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script128 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script129 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script130 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script131 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script132 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script133 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script134 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script135 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script136 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script137 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script138 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script139 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script140 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script141 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script142 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front6']");
var card_back = document.querySelector("[data-acc-text='card_back6']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script143 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script144 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script145 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script146 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script147 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script148 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front8']");
var card_back = document.querySelector("[data-acc-text='card_back8']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script149 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script150 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front7']");
var card_back = document.querySelector("[data-acc-text='card_back7']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script151 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script152 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front5']");
var card_back = document.querySelector("[data-acc-text='card_back5']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script153 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script154 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front4']");
var card_back = document.querySelector("[data-acc-text='card_back4']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script155 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script156 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front3']");
var card_back = document.querySelector("[data-acc-text='card_back3']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script157 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front1']");
var card_back = document.querySelector("[data-acc-text='card_back1']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

window.Script158 = function()
{
  var card_front = document.querySelector("[data-acc-text='card_front2']");
var card_back = document.querySelector("[data-acc-text='card_back2']");

let card_back_timeline = gsap.timeline();

card_back_timeline.set(card_front,{rotateY:90});
card_back_timeline.to(card_back,{rotateY:90, duration:0.5});
card_back_timeline.to(card_front,{rotateY:0, duration:0.5});
}

};
