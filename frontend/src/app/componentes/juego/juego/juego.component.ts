import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { sustantivos, pruebas } from "../palabras";

@Component({
  selector: "app-juego",
  templateUrl: "./juego.component.html",
  styleUrls: ["./juego.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class JuegoComponent implements OnInit {
  ngOnInit() {

  }

  ordenarRandom = (array: any) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  inputPalabra: boolean; // Input palabra

  inputPalabraValue: string = '';

  title = "MecaTIP";

  palabras = this.ordenarRandom(pruebas);// Ordenar el arreglo de palabras random

  stringTodasPalabras = this.palabras.toString();// Arreglo de todas las palabras pasado a String

  posiblesErrores = this.stringTodasPalabras.length;// Cantidad de letras totales, cantidad de posibles errores de tipeo

  index = 0; // Indice actual de la palabra en el Arreglo de palabras de la partida

  tiempoLimite = 5; // Tiempo limite por palabra

  temporizadorPalabra; // Temporizador usado para cada palabra

  palAcertadas = 0; // Contador de palbras acertadas

  apretoTilde = false; // Variable para saber si presiono tilde

  palabraActual = this.palabras[this.index]; // Palabra actual mostrada en pantalla

  letraIndex = 0; // Indice de la letra en la cual se esta validando

  inputIndex = 0; // Indice de la letra que esta siendo ingresada por el usuario

  usuarioInput = ""; // Todo lo ingresado en el input hasta el momento por el usuario

  mensajeError = ""; // Mensaje de Error cuando presiona una tecla incorrecta

  tiempoTranscurrido = 0; // Tiempo que paso desde que comenzo la partida

  correctas = 0; // Catidad de Letras correctas ingresadas por el usuario

  errores = 0; // Catidad de Letras incorrectas ingresadas por el usuario

  PPM = 0; // Promedio de Palabras por Minuto

  precision = 0; // Total de Letras - Letras incorrectas / Total de Letras

  progreso = 0; // Porcentaje de las palabras completadas

  timer; // Temporizador de la Partida

  checkeaLetra = (letter: string, input: string) => {

    if (this.apretoTilde === true) {// Manera que se me ocurrió validar el tilde

      if (input === "a") {
        input = "á";
      }
      else if (input === "e") {
        input = "é";
      }
      else if (input === "i") {
        input = "í";
      }
      else if (input === "o") {
        input = "ó";
      }
      else if (input === "u") {
        input = "ú";
      }
      else {
        input = input;
      }
      this.apretoTilde = false;
    }

    if (this.index === 0 && this.letraIndex === 0 && this.timer == null) {//Comienza el juego cuando se presiona una tecla
      this.EmpezarTemporizador();
      this.correctas = 0;
    }
    if (this.letraIndex === this.inputIndex) {// Si el indice de la letra que ingresa el usuario es el mismo que el de la letra que se esta validando
      if (letter[this.letraIndex] === input) {// Si concide
        this.letraIndex++;
        this.inputIndex++;
        this.correctas++;
        this.mensajeError = "";
        return;
      } else {
        if (input !== "" && input !== " " && input != "Backspace") { //Sino coincide y la de entrada no es la tecla de borrar
          this.mensajeError = `${ // Muestro la letra con error (se puede agregar texto)
            letter[this.letraIndex]
            }`;
          this.errores++;
        } else {
          //
        }
      }
    }
  };


  EmpezarTemporizador = () => {
    console.log("Comienza Cronometro");
    this.inputPalabra = false;
    this.precision = 0;
    this.correctas = 0;
    this.errores = 0;
    this.tiempoTranscurrido = 0;
    this.tiempoLimite = 5;
    this.letraIndex = 0;
    this.inputIndex = 0;
    this.PPM = 0;

    this.timer = setInterval(() => {
      this.tiempoTranscurrido++;
    }, 1000);

    this.temporizadorPalabra = setInterval(() => {
      if (this.tiempoLimite > 0) {
        // Decrementar
        this.tiempoLimite--;
      }
      else if (this.tiempoLimite === 0) {

        if (this.index === this.palabras.length - 1) {
          this.index = 0;
          this.FinalizarTemporizador();
        }
        else {
          this.index++;
          this.palabraActual = this.palabras[this.index];
          this.inputPalabraValue = "";
          this.tiempoLimite = 5;
        }
      }

    }, 1000);


  };

  FinalizarTemporizador = () => {
    clearInterval(this.timer);
    this.timer = null;

    clearInterval(this.temporizadorPalabra);
    this.temporizadorPalabra = null;

    this.getPalabrasPorMinuto();
    this.getProgreso();
    this.getPrecision();

    this.inputPalabra = true;

  };

  getPalabrasPorMinuto = () => {
    this.PPM = parseInt(
      ((this.palabras.length / this.tiempoTranscurrido) * 60).toFixed()
    );
  };

  getProgreso = () => {
    this.progreso = parseInt(
      (
        ((this.palAcertadas) / this.palabras.length) *
        100
      ).toFixed(2)
    );
  };

  getPrecision = () => {
    this.precision = parseInt(
      (
        ((this.posiblesErrores - this.errores) / this.posiblesErrores) *
        100
      ).toFixed(2)
    );
  };

  checkeaPalabra = (event: KeyboardEvent, word: string, index: number) => {
    if (event.keyCode !== 16) { // Sino es la tecla shift

      if (event.keyCode === 222 || event.keyCode === 186) { // Si aprieta el tilde
        this.apretoTilde = true;
        return;
      }

      this.usuarioInput = word;
      let letraAct = this.palabras[index].split("");
      this.checkeaLetra(letraAct, event.key);

      if (event.which === 32) { // Si aprita espacio
        if (word.replace(/\s/g, "") === this.palabras[index]) { // Elimino espacio entre letras (En caso que alla)
          this.palAcertadas++;
          this.letraIndex = 0;
          this.inputIndex = 0;
          this.index++;
          this.usuarioInput = "";
          this.mensajeError = "";
          this.palabraActual = this.palabras[index + 1];
          this.tiempoLimite = 5;
          document.getElementById("barraProgreso").setAttribute("style", "width:" + (this.palAcertadas / this.palabras.length * 100) + "%");// Cargar barra de progreso
          if (index === this.palabras.length - 1) {
            this.index = 0;
            this.FinalizarTemporizador();
          }
        } else {
          //No ingreso la palabra correcta pero la funcion checkeaLetra() va a Mostrar el Error
        }
      }
    }
  };
}
