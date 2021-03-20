const validatePhone = (phone: string) =>{

   let num = /^[0-9]+[0-9-]+([0-9-]+)*$/;

   if(!phone || phone === undefined || phone === null || phone === '') return false;

   if(phone.length < 11) return false;

   if(!phone.match(num)) return false;

}

export default validatePhone;