//metodo construtor
class CalcController {
    constructor(){
   
        //atributos com ._ são privados
        //document.querySelector pega o id dos elementos HTML  
        this._locale = 'pt-BR';  
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;      
        this.initialize();  
        this.initButtonsEvents();
    } 

    //inicializa assim que iniciar a execução
    initialize(){   
        this.setDisplayDateTime(); 
        //arrow function para definir um intervalo de execução 
        setInterval(()=>{
        //retorn a data atual com base na localização informada.
        this.setDisplayDateTime();

        }, 1000);
        
    }

    //recebe os elementos e cria eventos.
    addEventListenerAll(element, events, fn){ 

        events.split(' ').forEach(event => { 

            element.addEventListener(event , fn, false);

        });

    }

    //manipulando os eventos. 
    initButtonsEvents(){

        //seleciona os botões dentro da tag g
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //adiciona  um evento ao botão

        buttons.forEach((btn, index)=>{
             
            this.addEventListenerAll(btn, "click drag", e => {
                //busca a classe do botão
                let textBtn = btn.className.baseVal.replace("btn-", "");

                

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=> {

                btn.style.cursor = "pointer";

            });
        });

    }
    //insere a localização atual a hora e a data.
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
               day: "2-digit",
               month: "long",
               year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);  
    };

    //get & set valores do display

    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        return this._displayCalcEl.innerHTML = value;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        return this._currentDate = value;
    }
}
