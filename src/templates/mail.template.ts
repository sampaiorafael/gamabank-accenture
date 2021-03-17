import zeroFill from '../helpers/zeroFill'

const statusMail = (status: string) :string => {
    const html: string  = 
    `<div style="text-align:center">
    <figure class="image" style="display:inline-block"><img alt="STATUS OK" height="600" src="https://http.cat/200.jpg" width="750" />
    <figcaption>${status}</figcaption>
    </figure>
    </div>`

    return html;
};

const createAccMail = (user: string, codBank: string, agency: string, cc: string) =>{  // parametros do cliente
    const html: string = `<p><span style="font-size:18px"><strong>Parab&eacute;ns ${user} sua conta foi criada com sucesso!</strong></span></p>

<p><br />
<span style="font-size:16px">Agora voc&ecirc; pode fazer transferencias, e usar sua fun&ccedil;&atilde;o de cr&eacute;dito,</span></p>

<hr />
<p><span style="font-size:16px">Guarde os dados da sua conta:</span></p>

<p><span style="font-size:18px"><strong>GamaBank</strong></span></p>

<p><span style="font-size:16px">C&oacute;digo do banco: ${codBank}</span></p>

<p><span style="font-size:16px">Ag&ecirc;ncia: ${zeroFill(agency, 4)}</span></p>

<p><span style="font-size:16px">Conta: ${zeroFill(cc, 6)}</span></p>

<hr />
<p><span style="font-size:18px"><span style="font-family:arial,helvetica,sans-serif"><strong>Limite do cart&atilde;o: R$ 200</strong></span></span></p>

<hr />
<p>&nbsp;</p>`
    
    return html;
};

export default { statusMail, createAccMail };