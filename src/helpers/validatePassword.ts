const verifyPass = (senha: any) => {
    
    //let msg: Array<string> | string[] = []
    let msg: string[] = []
    let status = true
    
    if (senha.length < 6) {
        msg.push('Menor que seis caracteres')
        status = false
        return {status, msg}
    
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
                msg.push('Falta caracter numérico')
            }
            if (!achouMaiuscula) {
                msg.push('Falta caracter maiúsculo')
            } 
            if (!achouMinuscula) {
                msg.push('Falta caracter minúsculo')
            } 
            if (!achouSimbolo) { 
                msg.push('Falta caracter especial')
            }
                          

        status = achouNumero && achouMaiuscula && achouMinuscula && achouSimbolo
        return {status, msg}
    }
    
}

export default verifyPass