import Sms from '../helpers/SendSms';
import Tts from '../helpers/SendTts';

const notify = (phone: string, info: any) =>{
    
    const smsMessage: string = `Compra no crédito no valor de R$ ${info.value} em ${info.description}, seu saldo disponível é de R$ ${info.balance}`
    const ttsMessage: string = `. , , Compra no crédito no valor de R$ ${info.value} em ${info.description}, 
    seu saldo disponível é de R$ ${info.balance}, vou repetir, . , Compra no crédito no valor de R$ ${info.value} em ${info.description}, seu saldo disponível é de R$ ${info.balance}`

    Sms(phone, smsMessage)
    Tts(phone, ttsMessage)
}

export default notify