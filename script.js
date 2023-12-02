document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let cep = document.getElementById('cep').value;
    let numero = document.getElementById('numero').value;
    let telefone = document.getElementById('telefone').value;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP not found');
            } else {
                let logradouro = data.logradouro;
                let bairro = data.bairro;
                let cidade = data.localidade;
                let uf = data.uf;
                let ddd = data.ddd;

                let record = {
                    name,
                    cep,
                    logradouro,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    ddd,
                    telefone
                };

                saveRecord(record);
                addRecordToTable(record);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while trying to fetch data');
        });
});

function saveRecord(record) {
    let records = getRecords();
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));
}

function getRecords() {
    let records = localStorage.getItem('records');
    return records ? JSON.parse(records) : [];
}

function addRecordToTable(record) {
    let tbody = document.getElementById('tbody');
    let tr = document.createElement('tr');

    let tdName = document.createElement('td');
    tdName.textContent = record.name;
    tr.appendChild(tdName);

    let tdCEP = document.createElement('td');
    tdCEP.textContent = record.cep;
    tr.appendChild(tdCEP);

    let tdLogradouro = document.createElement('td');
    tdLogradouro.textContent = record.logradouro;
    tr.appendChild(tdLogradouro);

    let tdNumero = document.createElement('td');
    tdNumero.textContent = record.numero;
    tr.appendChild(tdNumero);

    let tdBairro = document.createElement('td');
    tdBairro.textContent = record.bairro;
    tr.appendChild(tdBairro);

    let tdCidade = document.createElement('td');
    tdCidade.textContent = record.cidade;
    tr.appendChild(tdCidade);

    let tdUF = document.createElement('td');
    tdUF.textContent = record.uf;
    tr.appendChild(tdUF);

    let tdDDD = document.createElement('td');
    tdDDD.textContent = record.ddd;
    tr.appendChild(tdDDD);

    let tdTelefone = document.createElement('td');
    tdTelefone.textContent = record.telefone;
    tr.appendChild(tdTelefone);

    tbody.appendChild(tr);
}

let records = getRecords();
records.forEach(record => addRecordToTable(record));