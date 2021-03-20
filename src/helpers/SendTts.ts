import fetch from 'node-fetch'

const sendTts = (numero_destino: string, mensagem: string) =>{
    const body = { 
                    numero_destino,
                    mensagem,
                    velocidade: 0,
                    resposta_usuario: true,
                    tipo_voz: 'br-Vitoria', 
                    bina_inteligente: true
                };
                
    fetch('https://api2.totalvoice.com.br/tts', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json',
                   'Access-Token': '3274fd0c31b08177d5e5bbb93b0c9b2d' 
                 },
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

export default sendTts