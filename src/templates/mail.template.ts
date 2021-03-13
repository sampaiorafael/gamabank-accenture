const statusMail = (status: string) :string => {
    const html: string  = 
    `<div style="text-align:center">
    <figure class="image" style="display:inline-block"><img alt="STATUS OK" height="600" src="https://http.cat/200.jpg" width="750" />
    <figcaption>${status}</figcaption>
    </figure>
    </div>`

    return html
}

const createAccMail = () =>{  // parametros do cliente
    const html: string = 'Conta criada com sucesso'
    
    return html
}

export default { statusMail, createAccMail } 