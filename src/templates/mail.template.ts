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
    
const buyDebitTemplateMail = ( user: string, description: string, value: number) => {
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
                <strong>Local de compra:</strong> ${description}</p><br><br><br><br>

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
        <title>Bootstrap Example</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        </head>
        <body>
    
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
            let total = 0
           invoice.forEach(element => {
              const {description, value, instalments, createdAt} = JSON.parse(JSON.stringify(element))  
              html +=`
              <tr>
                  <td>   ${createdAt}   </td>
                  <td>   ${description}   </td>
                  <td>   R$ ${value}   </td>
                  <td>${instalments} x</td>
              </tr>
              `
              total+=value / instalments
           });
           html +=`
              <tr>
                  <td></td>
                  <td></td>
                  <td><b>TOTAL</b></td>
                  <td>R$ ${total}</td>
              </tr>
              `
        html += `
            </tbody>
        </table>
        </div>
    
        </body>
        </html>
        `
        return html
};
    
export default { statusTemplateMail, signUpTemplateMail, invoiceTemplateMail, buyDebitTemplateMail, buyCreditTemplateMail } 