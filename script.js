const algoritmoCPF = function(){

    const campoCpf = document.querySelector('#campoCpf');
    const btnValidar = document.querySelector('#btnValidar');
    const campoResultado = document.querySelector('#campoResultado');

    btnValidar.addEventListener('click', ()=> {
        return receberCpf(campoCpf.value);
    });

    document.addEventListener('keypress', (e)=>{
        e.key == 'Enter' ? receberCpf(campoCpf.value) : '';
    });

    function receberCpf(valor) {
        const array = Array.from(valor);
        removerDigitos(array)
    }

    function removerDigitos(valor) {
        valor.pop();
        valor.pop();
        multiplicacao(valor);
    }

    function multiplicacao(array) {
        let soma = 0;
        array.reverse();
        for(let i = 2; i <= array.length + 1; i++) {
            let mult = array[i - 2] * i;
            soma += mult;
        };
        digito(soma, array);
    }

    function digito(valor, array) {
        let calculo = 11 - (valor % 11);
        calculo > 9 ? calculo = 0 : calculo;
        array.reverse();
        array.push(calculo);
        adicionarDigitos(array);
    }

    function adicionarDigitos(array) {
        let soma = 0;
        for(let i = array.length + 1; i >= 2; i--) {
            let mult = array[i - 2] * i;
            soma += mult;
        };
        let calculo = 11 - (soma % 11);
        calculo > 9 ? calculo = 0 : calculo; 
        array.push(calculo);
        const d1 = array.pop();
        const d2 = array.pop();
    validacao(d1, d2);
    }

    function validacao(d1, d2) {
        const arrayOriginal = Array.from(campoCpf.value);
        const d1Original = arrayOriginal.pop();
        const d2Original = arrayOriginal.pop();
        d1Original == d1 && d2Original == d2 ? campoResultado.innerHTML = `CPF válido` : campoResultado.innerHTML = `CPF inválido`;
    }

};

algoritmoCPF();