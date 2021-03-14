//Validar CPF
const validateCpf = (cpf :string):  boolean => {
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	

	//verifica quantidade de caracteres iguais 
	let count :number = 1;
	for(let i: number = 1; i < cpf.length; i++){
		if (cpf.charAt(0) == cpf.charAt(i)){
			count += 1
		}
	}

	if (count == 11 || cpf.length != 11){
		return false;
	}	
	//valida primeiro digito verificador
	let calc :number = 0;	
	for (let i=0; i < 9; i ++)		
		calc += parseInt(cpf.charAt(i)) * (10 - i);	
	let	check :number = 11 - (calc % 11);	
		if (check == 10 || check == 11)		
			check = 0;	
		if (check != parseInt(cpf.charAt(9)))		
			return false;		
	//valida segundo digito verificador
	calc = 0;	
	for (let i :number = 0; i < 10; i ++)		
		calc += parseInt(cpf.charAt(i)) * (11 - i);	
	check = 11 - (calc % 11);	
	if (check == 10 || check == 11)	
		check = 0;	
	if (check != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

export default validateCpf




