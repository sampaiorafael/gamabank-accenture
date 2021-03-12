//FUNDO PARA ALTERNAR OS MESES EM EVENTOS
function alternarMes(mes) {
    let btn = document.querySelectorAll('#btn')
    let meses = [];
    meses[0] = document.getElementById('janeiro');
    meses[1] = document.getElementById('fevereiro');
    meses[2] = document.getElementById('marco');
    meses[3] = document.getElementById('abril');
    meses[4] = document.getElementById('maio');
    meses[5] = document.getElementById('junho');
    meses[6] = document.getElementById('julho');
    meses[7] = document.getElementById('agosto');
    meses[8] = document.getElementById('setembro');
    meses[9] = document.getElementById('outubro');
    meses[10] = document.getElementById('novembro');
    meses[11] = document.getElementById('dezembro');

    if (mes >= 0 && mes <= 11) {
        meses[mes].style.display = 'block';
        
        for (let i = 0; i < 12; i++) {
            if (i != mes) {
                meses[i].style.display = 'none';
            }
        }
    }
}