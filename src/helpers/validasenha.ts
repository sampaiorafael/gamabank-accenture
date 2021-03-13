const verifyPass = (senha) => {
    
    let result = { 
         status: true,
         msg: []
    }
    
    if (senha.length < 6) {
        result.msg.push('Menor que seis caracteres')
        result.status = false
        return result
    
    } else {
        let achouNumero = false;
        let achouMaiuscula = false;
        let achouMinuscula = false;
        let achouSimbolo = false;
                       
            for( let i = 0 ; i < (senha.length) ; i++ ){
                let character = senha.charAt(i)
                if (character >= '0' && character <= '9') {
                    achouNumero = true;
                } else if (character >= 'A' && character <= 'Z') {
                    achouMaiuscula = true;
                } else if (character >= 'a' && character <= 'z') {
                    achouMinuscula = true;
                } else {
                    achouSimbolo = true;
                }
            }
        
            if (!achouNumero) {
                result.msg.push('Falta caracter numérico')
            }
            if (!achouMaiuscula) {
                result.msg.push('Falta caracter maiúsculo')
            } 
            if (!achouMinuscula) {
                result.msg.push('Falta caracter minúsculo')
            } 
            if (!achouSimbolo) { 
                result.msg.push('Falta caracter especial')
            }
                          

        result.status = achouNumero && achouMaiuscula && achouMinuscula && achouSimbolo
        return (result)    
    }
    
}

export default verifyPass