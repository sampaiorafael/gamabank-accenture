const generateCc = ():  number => {
    let newCC: number;
    
//  remover linha 5 ao implementar a função
    newCC = 0
//  consula no banco proximo número de conta disponivel e atribui a newCC
//  newCC = consultaBanco('select (max(accountNumber) + 1) from TableAccounts' );
    
    return newCC;
}

export default generateCc