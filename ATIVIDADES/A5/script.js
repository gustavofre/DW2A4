const masks = {
    cep (value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    }
}

document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {
        e.target.value = masks[field](e.target.value)
    }, false)
})

function findCEP(cep){
    return fetch(`https://viacep.com.br/ws/${cep}/json/`);
}

const form = document.querySelector('#cep-formulario');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})

async function doSubmit(){
    const resultado = document.querySelector('#resultado');
    const cep = document.querySelector('#cep');

    try {

        let cepResponse = await findCEP(cep.value);
        let dados = await cepResponse.json();

        let resultadoResponse = await fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${dados.uf}`);
        let dataResponse = await resultadoResponse.json();

        try {
            if(dataResponse.uf){
                resultado.innerHTML = "O estado de " + dataResponse.uf + " no total teve " + dataResponse.cases + " casos de COVID-19 positivos até o momento";
            }
        } catch (err){
            resultado.innerHTML = dataResponse.error;
            console.log("Deu erro aqui");
        }
    } catch(err){
        console.log(err);
        console.log("Erro depois do catch");
    }
    
}