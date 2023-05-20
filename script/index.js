const inputs = document.querySelectorAll('.input');
const tip = document.querySelectorAll('.btn');
const tipAmount = document.getElementById('tip_value');
const total = document.getElementById('total');
const reset = document.getElementById('reset');
const tipCustom = document.getElementById('tip');
const error = document.getElementById('error');

//objeto que armazena os valores para manipula-los
const values = {
    bill: 0,
    people: 0,
    tipValue: 0,
    customTip: "",
    tipResult() {    /* função calcula o total da conta e da gorjeta */
        let result = (this.bill / this.people);
        let tipResult = ((this.tipValue / 100) * result);
        return { result, tipResult }
    }
}

//pega cada um dos inputs e realiza o calculo e trata o erro do valor 0
inputs.forEach( input => { 
    input.addEventListener('input', ()=>{
        if (input.name == 'value'){values.bill = input.value}; 
        if (input.name == 'people'){
            input.style.outlineColor = "";
            error.textContent = "";
            values.people = input.value;
            if (input.value == "0") {
                error.textContent = "Can't be zero"
                input.style.outlineColor = "red"
            }
        };                
        addInfos();
    })
})

//gorjetas clicadas
tip.forEach(btn => {
    btn.addEventListener('click', ()=>{   
        values.tipValue = btn.value;
        tipCustom.value = "";
        addInfos();
        btnToggle(btn);
    })
})

//gorjeta customizada
tipCustom.addEventListener('input', ()=>{
        values.tipValue = tipCustom.value;
        addInfos();
        let activeBtn = tipCustom.parentNode.querySelector('.active');
        activeBtn.classList.remove('active');
});

//alterna entre os backgrounds da gorjeta clicada
function btnToggle(btn) {
    let activeBtn = btn.parentNode.querySelector('.active');
    btn.classList.add('active');
    activeBtn.classList.remove('active');
}

//adiciona os valores na tela
function addInfos() {
    let result = values.tipResult().result;
    let tipResult = values.tipResult().tipResult;
    
    const totalPerPerson = `$${(tipResult + result).toFixed(2)}`;
    total.textContent = totalPerPerson;

    tipAmount.textContent = `$${(tipResult).toFixed(2)}`;

    if ( result == Infinity || result == NaN || tipResult == Infinity || tipResult == NaN){

        total.textContent = "$0.00";
        tipAmount.textContent = "$0.00";

    }
}


//função reset
reset.addEventListener('click', ()=>{
    inputs.forEach( input => input.value = "");
    tip.forEach(btn => {
        values.tipValue = 0;
        btn.classList.remove('active');
    });
    tipCustom.value = "";
    total.textContent = "$0.00";
    tipAmount.textContent = "$0.00";
})