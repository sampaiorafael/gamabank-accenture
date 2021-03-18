import mailer from '../helpers/mailer'
import htmlTemplate from '../templates/mail.template'

const from = 'admin@gamabank.com.br'

const sendSignUpMail = async (user: string, bankCode: string, agencia: string, cc: string) => {
    const subject = 'Conta criada com sucesso'
    const text = 'Conta criada com sucesso'
    const to = 'njr.mor@gmail.com' //  Passar email do cliente como parâmetro
    mailer.sendmail(from, to, subject, text, htmlTemplate.signUpTemplateMail(user, bankCode, agencia, cc))
        .then(sended => console.log(sended))
        .catch(error => console.error(error));
};

//testar email
const sendStatusMail = async (message: string) => {
    const subject = 'Status'
    const text = message
    const to = 'njr.mor@gmail.com' //  Passar email do cliente como parâmetro
    mailer.sendmail(from, to, subject, text, htmlTemplate.statusTemplateMail(message))
        .then(sended => console.log(sended))
        .catch(error => console.error(error));
};

//buyCreditMail
const sendBuyCreditMail = async (user: string, value: string, description:string, balance:string, Instalments:string  ) => {
    const subject = 'Compra no crédito'
    const text = `Compra no crédito no valor de R$ ${value}.`
    const to = 'njr.mor@gmail.com' //  Passar email do cliente como parâmetro
    mailer.sendmail(from, to, subject, text, htmlTemplate.buyCreditTemplateMail(user, value, description, balance, Instalments))
        .then(sended => console.log(sended))
        .catch(error => console.error(error));
};

const sendInvoiceMail = async (user: string, invoice: object ) => {
    const subject = 'A fatura do seu cartão chegou'
    const text = `A fatura do seu cartão chegou`
    const to = 'njr.mor@gmail.com' //  Passar email do cliente como parâmetro
    mailer.sendmail(from, to, subject, text, htmlTemplate.invoiceTemplateMail(user, invoice))
        .then(sended => console.log(sended))
        .catch(error => console.error(error));
};

export default { sendSignUpMail, sendStatusMail, sendBuyCreditMail, sendInvoiceMail };
