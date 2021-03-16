function validateEmail(email:any) {

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if(email.match(mailformat)){
       return true;
    } else {
       return false;
    }
}

export default validateEmail