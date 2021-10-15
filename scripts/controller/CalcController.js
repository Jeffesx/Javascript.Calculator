//METODO
class CalcController {
    //construtor de ATRIBUTOS
    constructor(){
   
        //atributos com ._ são privados
        //document.querySelector pega o id dos elementos HTML  
        this._operations = [];
        this._locale = 'pt-BR';  
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;      
        this.initialize();  
        this.initButtonsEvents();
    } 

    //ATRIBUTO inicializa assim que iniciar a execução
    initialize(){   
        this.setDisplayDateTime(); 
        //arrow function para definir um intervalo de execução 
        setInterval(()=>{
        //retorn a data atual com base na localização informada.
        this.setDisplayDateTime();

        }, 1000);
        
    }

    //METODO recebe os elementos e cria eventos.
    addEventListenerAll(element, events, fn){ 

        events.split(' ').forEach(event => { 

            element.addEventListener(event , fn, false);

        });

    }

    // METODO limpa a calculadora
    clearAll(){

        this._operations = [];

    }
    //METODO cancela entrada
    cancelEntry(){

        this._operations.pop();
    }

    //METODO retorna o ultimo numero
    getLastOperation(){

        return this._operations[this._operations.length-1];
    }

    //METODO ADICIONA A ULTIMA OPERAÇÃO
    setLastOperation(value){
        this._operations[this._operations.length-1] = value;
    }
    
    //METODO VERIFICA SE É OPERADOR
    isOperator(value){

        return (['+','-','/','*','%'].indexOf(value) > -1);

    }

    //METODO adiciona operações
    addOperation(value){

        if (isNaN(this.getLastOperation())){
            //string
            if(this.isOperator(value)){
                //troca o operador
            this.setLastOperation(value);
            //valida se não é numero
            }else if(isNaN(value)){

                console.log(value);

            }else{
                this._operations.push(value);
            }
        }
        else{
            //number
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseInt(newValue));
    }   

        //this._operations.push(value);
        console.log(this._operations);

    }

    //METODO de erro
    setError(){
        this.displayCalc = "Error";
    }

    //METODO executa ação no botão
    execBtn(value){
        switch (value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.cancelEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7': 
            case '8':
            case '9':

                this.addOperation(parseInt(value));

                break;
            default:
                    this.setError();
            break;                                  
                }
        }

    //METODO manipulando os eventos. 
    initButtonsEvents(){

        //seleciona os botões dentro da tag g
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //adiciona  um evento ao botão

        buttons.forEach((btn, index)=>{
             
            this.addEventListenerAll(btn, "click drag", e => {
                //busca a classe do botão
                let textBtn = btn.className.baseVal.replace("btn-", "");
                //executa a ação do botão
                this.execBtn(textBtn);
            
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=> {

                btn.style.cursor = "pointer";

            });
        });

    }

    //METODO insere a localização atual a hora e a data.
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
