import Sms from '../helpers/SendSms';
import Tts from '../helpers/SendTts';

const notify = (phone: string, message: string) =>{
    Sms(phone, message)
    Tts(phone, message)
}

export default notify