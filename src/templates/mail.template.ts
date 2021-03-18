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

const createAccTemplateMail = (user: string, codBank: string, agency: string, cc: string) =>{  // parametros do cliente
    const html: string = `
    <section style="width: 600px; border: 1px solid #68de5a; border-radius: 10px;">
        <div style="width: 100%; 
        background: #121214; 
        padding: 1rem 0;
        height: 10%; 
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
                text-align: center;">BEM-VINDO(A) A REVOLUÇÃO VERDE</h1>
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
                font-family: 'Raleway', sans-serif;">Conta: ${zeroFill(cc, 6)}</p>
    
            </div>
        </main>
        
    </section>
`
    
    return html;
};

const movementTemplateMail = (user: string, codBank: string, agency: string, cc: string) =>{  // parametros do cliente
    const html: string = 
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
        <h2>Hover Rows</h2>
        <p>The .table-hover class enables a hover state on table rows:</p>            
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
            </tr>
            </tbody>
        </table>
        </div>
    
        </body>
        </html>
        `
        return html
};
    
const buyDebitTemplateMail = ( user: string, description: string, value: number) => {
        const html: string  = 
    `<p><span style="font-size:18px"><strong>Ol&aacute; ${user} voc&ecirc; acaba de efetuar uma compra no d&eacute;bito.</strong></span></p>
    
    <hr />
    <p><span style="font-size:16px">Estabelecimento: ${description}</span></p>
    
    <p><span style="font-size:16px">Valor: ${value}</span></p>
    
    <hr />
    <p>&nbsp;</p>`
    
};
    
const buyCreditTemplateMail = ( user: string, value: string, description: string, balance: string,  instalments: string) => {
        const html: string  = 
    `<p><span style="font-size:18px"><strong>Ol&aacute; ${user} voc&ecirc; acaba de efetuar uma compra no d&eacute;bito.</strong></span></p>
    
    <hr />
    <p><span style="font-size:16px">Estabelecimento: ${description}</span></p>
    
    <p><span style="font-size:16px">Valor: R$ ${value}</span></p>

    <p><span style="font-size:16px">Parcelas: ${instalments}</span></p>

    <p><span style="font-size:16px">Saldo disponível no cartão: R$ ${balance}</span></p>
    
    <hr />
    <p>&nbsp;</p>`
    return html
};
    
    export default { statusTemplateMail, createAccTemplateMail, movementTemplateMail, buyDebitTemplateMail, buyCreditTemplateMail } 