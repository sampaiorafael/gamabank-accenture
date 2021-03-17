import mailer from '../helpers/mailer'
import htmlTemplate from '../templates/mail.template'

const from = 'admin@gamabank.com.br'

const sendCreateAccountMail = async (user: string, bankCode: string, agencia: string, cc: string) => {
    const subject = 'Conta criada com sucesso'
    const text = 'Conta criada com sucesso'
    const to = 'njr.mor@gmail.com' //  Passar email do cliente como parâmetro
    mailer.sendmail(from, to, subject, text, htmlTemplate.createAccMail(user, bankCode, agencia, cc))
        .then(sended => console.log(sended))
        .catch(error => console.error(error))
}

//testar email
const sendStatusMail = async (message: string) => {
    const subject = 'Status'
    const text = message
    const to = 'njr.mor@gmail.com' //  Passar email do cliente como parâmetro
    mailer.sendmail(from, to, subject, text, htmlTemplate.statusMail(message))
        .then(sended => console.log(sended))
        .catch(error => console.error(error))
}


export default { sendCreateAccountMail, sendStatusMail }
