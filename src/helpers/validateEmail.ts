function validateEmail(email:any) {

    var mailformat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    
    if(email.match(mailformat)){
       return true;
    } else {
       return false;
    }
}

export default validateEmail