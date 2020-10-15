class Calculator{
    constructor(currentText,previousText){
        this.currentText = currentText;
        this.previousText = previousText;
        this.clear();
    }

    display(){
        if(this.operation && this.operation!='√'){
            this.previousText.innerText = this.previousT+this.operation;
        }else this.previousText.innerText = this.previousT;

        this.currentText.innerText = this.currentT;
    }

    screen(number){
        if(number ==='.'&& !this.currentT.includes(number)){
            this.currentT += number.toString();
        }else if(number!=='.'){
            this.currentT += number.toString();
        }

    }

    chooseOperation(operation){
        if(!this.currentT){
            this.operation = operation;
            return;
        }
        if(operation=='√' ){
            this.operation=operation;
            this.calcualate();
        }
        if(this.operation){
            this.calcualate();
            this.operation=operation;
        }
        this.operation = operation;
        this.previousT = this.currentT;
        this.currentT = '';
    }

    clear(){
        this.previousT = '';
        this.currentT= '';
        this.operation = undefined;
    }

    delete(){
        this.currentT = this.currentT.toString().slice(0,(this.currentT.toString().length-1));
    }

    calcualate(){
        let res;
        if( (this.previousT == '' || this.currentT=='') && this.operation!='√'){
            return;
        }
        switch(this.operation){
            case '+':
            if(!Number(this.previousT))break;
            res = Number(this.previousT) + Number(this.currentT);
            break;
            case '-':
                if(!this.previousT)break;
            res = Number(this.previousT) - Number(this.currentT);
            break;
            case '/':
            res = Number(this.previousT) / Number(this.currentT);
            break;
            case '*':
                if(!this.previousT)break;
                res = Number(this.previousT) * Number(this.currentT);
            break;
            case '^':
                if(!this.previousT)break;
                res = Number(this.previousT) ** Number(this.currentT);
            break;
            case '√':
                res = Math.sqrt(Number(this.currentT));
            break;
            default:
                break;
        }
        this.clear();

        //this.previousT = '';
        this.currentT = res;
    }

}

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-deleteB]');
const clearButton = document.querySelector('[data-clearB]');
const previousText = document.querySelector('[data-previousT]');
const currentText = document.querySelector('[data-currentT]');
const resultButton = document.querySelector('[data-resultB]');

const calcualator = new Calculator(currentText,previousText);

numbers.forEach(button=>{
    button.addEventListener('click',()=>{
        calcualator.screen(button.innerText);
        calcualator.display();
    });
});

operations.forEach(button=>{
    button.addEventListener('click',()=>{
        calcualator.chooseOperation(button.innerText);
        calcualator.display();
    });
});

clearButton.addEventListener('click',()=>{
    calcualator.clear();
    calcualator.display();
});

deleteButton.addEventListener('click',()=>{
    calcualator.delete();
    calcualator.display();
});

resultButton.addEventListener('click',()=>{
    calcualator.calcualate();
    calcualator.display();
});