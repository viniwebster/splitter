const inputs = document.querySelectorAll('.input');
const tip = document.querySelectorAll('.btn');
const tipAmount = document.getElementById('tip_value');
const total = document.getElementById('total');
const reset = document.getElementById('reset');
const tipCustom = document.getElementById('tip');

const values = {
    bill : 0,
    people: 0,
    tipValue: 0,
    customTip: "",
    tipResult: function () {
        let result = (this.bill / this.people);
        let tipResult = ((this.tipValue / 100) * result);
        return { result, tipResult }
    }
}

inputs.forEach( input => { 
    input.addEventListener('input', ()=>{
        if (input.name == 'value'){values.bill = input.value}; 
        if (input.name == 'people'){values.people = input.value};                
        addInfos();
    })
})

tip.forEach(btn => {
    btn.addEventListener('click', ()=>{   
        values.tipValue = btn.value;
        tipCustom.value = "";
        addInfos();
        btnToggle(btn);
    })
})

tipCustom.addEventListener('input', ()=>{
        values.tipValue = tipCustom.value;
        addInfos();
        let activeBtn = tipCustom.parentNode.querySelector('.active');
        activeBtn.classList.remove('active');
});


function btnToggle(btn) {
    let activeBtn = btn.parentNode.querySelector('.active');
    btn.classList.add('active');
    activeBtn.classList.remove('active');
}

function addInfos() {
    let result = values.tipResult().result;
    let tipResult = values.tipResult().tipResult;
    
    const totalForPerson = `$${(tipResult + result).toFixed(2)}`;
    total.textContent = totalForPerson;

    tipAmount.textContent = `$${(tipResult).toFixed(2)}`;

    if ( result == Infinity || result == NaN || tipResult == Infinity || tipResult == NaN){

        total.textContent = "$0.00";
        tipAmount.textContent = "$0.00";

    }

}

reset.addEventListener('click', ()=>{
    console.log(values)
})