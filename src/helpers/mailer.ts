import * as nodemailer from 'nodemailer' 
import configs from '../config/configs'

const setup = async () => {

    let account = await nodemailer.createTestAccount()
    console.log('setup')
    const transporter = nodemailer.createTransport({
        host: configs.Mailer.host, 
        port: Number(configs.Mailer.port),
        secure: false,
        auth: {
            user: account ? account.user : configs.Mailer.user,
            pass: account ? account.pass : configs.Mailer.pass
        }
    })

    return transporter
}

const sendmail = async (from: string, to: string, subject: string, text: string, htmlTemplate: string) => {

    const transporter  = await setup();
    console.log('sendmail')
    const result = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: htmlTemplate
    })

    console.log("Mensagem enviada: %s", result.messageId);
    console.log("URL Preview: %s", nodemailer.getTestMessageUrl(result));
 
    return result
}

export default { sendmail }



