const cpf = new validaCPF('000.000.000-00'); // Insira um CPF entre aspas aqui.

function validaCPF(cpf) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpf.replace(/\D+/g, '');;
        }
    });
}

validaCPF.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.validaDigito(cpfParcial);
    const digito2 = this.validaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
};

validaCPF.prototype.validaDigito = function(cpf) {
    const cpfArray = Array.from(cpf);

    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, valor)=>{
        ac += (regressivo * Number(valor));
        regressivo--;
        return ac;
    }, 0);
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

validaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

console.log(cpf.valida() ? `CPF VÁLIDO` : `CPF INVÁLIDO`);