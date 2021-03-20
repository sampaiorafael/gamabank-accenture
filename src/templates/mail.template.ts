import zeroFill from '../helpers/zeroFill'

const statusTemplateMail = (status: string) :string => {
    const html: string  = 
    `<div style="text-align:center">
    <figure class="image" style="display:inline-block"><img alt="STATUS OK" height="600" src="https://http.cat/200.jpg" width="750" />
    <figcaption>${status}</figcaption>
    </figure>
    </div>`

    return html;
};

const signUpTemplateMail = (user: string, codBank: string, agency: string, cc: string) =>{  // parametros do cliente
    const html: string = `
    <section style="width: 600px; border: 1px solid #68de5a; border-radius: 10px;">
        <div style="width: 100%; 
        background: #121214; 
        padding: 1rem 0;
        height: 25vh; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        border-radius: 10px;">
            <img style="width: 50%;" src="https://i.pinimg.com/originals/21/85/cf/2185cf0529edd791d058437ebdcde336.png" alt="logo_gama">
        </div>

        <main style="padding: 0 3rem;">
            <div>
                <h1 style="color: #68de5a;
                 font-family: 'Raleway', sans-serif;
                 font-size: 1.7em;
                font-style: italic;
                text-align: center;">BEM-VINDO(A) A REVOLUÇÃO VERDE!</h1>
            </div>
            <div>
                <p style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">Parabéns <strong style="color: #68de5a;">${user}</strong>.</p>
                
                <p style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">
                A abertura da sua Conta Digital com Crédito 
                <strong style="color: #68de5a;">Gama Bank</strong> 
                foi aprovada!</p><br>
                
                <strong style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">Seus dados:</strong>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">Limite Inicial: R$ 200,00</p>
                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">Banco: ${codBank}</p>
                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">Agência: ${zeroFill(agency, 4)}</p>
                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">Conta: ${zeroFill(cc, 6)}</p><br><br><br>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;"><strong style="color: #68de5a;">Central de Atendimento</strong></p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">9999 9999 - Capitais e Regiões Metropolitanas</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">0800 999 9999 - Demais localidades</p><br>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                text-align: center;">Atenciosamente, <strong style="color: #68de5a;">Team Gama</strong>.</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">Copyright © 2021</p><br>
    
            </div>
        </main>
        
    </section>
`
    
    return html;
};
    
const buyDebitTemplateMail = ( user: string, email: string, value: number) => {
        const html: string  = 
    `
    <section style="width: 600px; border: 1px solid #68de5a; border-radius: 10px;">

        <main style="padding: 0 3rem;">
            <div>
                <h1 style="color: #68de5a;
                 font-family: 'Raleway', sans-serif;
                 font-size: 1.7em;
                text-align: center;">Olá ${user}!</h1>
            </div><br>
            <div>
                
                <p style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 1.125em;
                text-align: center;">
                Você acabou de efetuar uma compra no valor de:</p>

                <h1 style="color: #e43e3e;;
                 font-family: 'Raleway', sans-serif;
                 font-size: 2.5em;
                 font-weight: bold;
                text-align: center;">R$ ${value}</h1>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;"><strong style="color: #68de5a;">Central de Atendimento</strong></p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">9999 9999 - Capitais e Regiões Metropolitanas</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">0800 999 9999 - Demais localidades</p><br>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                text-align: center;">Atenciosamente, <strong style="color: #68de5a;">Team Gama</strong>.</p>
    

                <div style="width: 100%;
                height: 15vh; 
                display: flex; 
                align-items: center; 
                justify-content: center;">
                    <img style="width: 30%;
                    background: #121214;
                    padding: 1rem;
                    border-radius: 10px;
                    " src="https://i.pinimg.com/originals/21/85/cf/2185cf0529edd791d058437ebdcde336.png" alt="logo_gama">
                </div>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">Copyright © 2021</p><br>
    
            </div>
        </main>
        
    </section>

    `
    return html
};
    
const buyCreditTemplateMail = ( user: string, value: string, description: string, balance: string,  instalments: string) => {
        const html: string  = 
    `
    <section style="width: 600px; border: 1px solid #68de5a; border-radius: 10px;">

        <main style="padding: 0 3rem;">
            <div>
                <h1 style="color: #68de5a;
                 font-family: 'Raleway', sans-serif;
                 font-size: 1.7em;
                text-align: center;">Olá ${user}!</h1>
            </div><br>
            <div>
                
                <p style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 1.125em;
                text-align: center;">
                Você acabou de efetuar uma compra no valor de:</p>

                <h1 style="color: #e43e3e;;
                 font-family: 'Raleway', sans-serif;
                 font-size: 2.5em;
                 font-weight: bold;
                text-align: center;">R$ ${value}</h1>
    
                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">
                <strong>Local de compra:</strong> ${description}</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">
                <strong>Parcelas:</strong> ${instalments}</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">
                <strong>Saldo Disponível:</strong> ${balance}</p><br><br><br><br>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;"><strong style="color: #68de5a;">Central de Atendimento</strong></p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">9999 9999 - Capitais e Regiões Metropolitanas</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">0800 999 9999 - Demais localidades</p><br>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                text-align: center;">Atenciosamente, <strong style="color: #68de5a;">Team Gama</strong>.</p>
    

                <div style="width: 100%;
                height: 15vh; 
                display: flex; 
                align-items: center; 
                justify-content: center;">
                    <img style="width: 30%;
                    background: #121214;
                    padding: 1rem;
                    border-radius: 10px;
                    " src="https://i.pinimg.com/originals/21/85/cf/2185cf0529edd791d058437ebdcde336.png" alt="logo_gama">
                </div>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">Copyright © 2021</p><br>
    
            </div>
        </main>
        
    </section>
`
    return html
};

const invoiceTemplateMail = (user: string, invoice: Array<object>) =>{  // parametros do cliente
    const balance = invoice;
    let html: string =
        `
        <html lang="en">
        <head>
        <title>Gama Bank</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Extended&display=swap" rel="stylesheet">
        </head>
        <body>


        <section style="width: 600px; border: 1px solid #68de5a; border-radius: 10px;">
        <div style="width: 100%;
                height: 15vh; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                margin: 2rem 0;">
                    <img style="width: 30%;
                    background: #121214;
                    padding: 1rem;
                    border-radius: 10px;
                    " src="https://i.pinimg.com/originals/21/85/cf/2185cf0529edd791d058437ebdcde336.png" alt="logo_gama">
                </div>

        <div
        style="width: 100%; 
        background: #68de5a; 
        height: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;">
            <h1 style="color: #fff;
             font-family: 'Raleway', sans-serif;
             font-size: 1.7em;">OLÁ STÊNIO, SUA FATURA FECHOU!</h1>
        </div>

        <main style="padding: 0 3rem;">
            <div>
                
                <p style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                text-align: center;
                line-height: 1.6;">
                Você pode imprimir este email e 
                pagar por meio de boleto bancário ou se prefirir pela sua conta digital
                <strong style="color: #68de5a;">Gama Bank</strong>.</p><br><br>
    
                <strong style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">Suas compras do mês:</strong>`

            let total = 0
            invoice.forEach(element => {
              const {description, value, instalments, createdAt} = JSON.parse(JSON.stringify(element))  
              html +=`
    
                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">
                ${description}: R$ ${value} em ${instalments}x</p><br>`

                total+=value / instalments
                });
                html +=`

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;">
                Total: <span style="font-size: 2em; font-weight: bold;">R$ ${total}</span>
                </p><br><br><br><br><br>`

                html +=`

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                text-align: center;
                font-size: .9em;">
                500-1 | 99999.00009 99999.090909 00000.909090 1 99999990000000</p>

                <h1
                style="
                color: #000;
                font-size: 3em;
                letter-spacing: 10px;
                transform:scale(1,2);
                font-family: 'Libre Barcode 39 Extended';
                text-align: center;">
                accenture</h1><br><br><br>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;"><strong style="color: #68de5a;">Central de Atendimento</strong></p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">9999 9999 - Capitais e Regiões Metropolitanas</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">0800 999 9999 - Demais localidades</p><br>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                text-align: center;">Atenciosamente, <strong style="color: #68de5a;">Team Gama</strong>.</p>

                <p
                style="
                color: #121214;
                font-family: 'Raleway', sans-serif;
                font-size: 0.9em;
                text-align: center;">Copyright © 2021</p><br>
    
            </div>
        </main>
        
    </section><br><br>
    
        <div class="container">
        <h2>Fatura</h2>    
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Pacerla</th>
            </tr>
            </thead>
            <tbody>
            `
        return html
};
   
export default { statusTemplateMail, signUpTemplateMail, invoiceTemplateMail, buyDebitTemplateMail, buyCreditTemplateMail } 