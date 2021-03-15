import chai from 'chai'
import verifyPass from '../helpers/validatePassword'

const assert = chai.assert

describe('Teste para validação da Senha', () => {
   
   it('Senha não pode ser menor que seis caracteres', () => {
      let expectedResult = false
      assert.equal(verifyPass('12as1').status, expectedResult )
   })

   it('Senha deve conter números', () => {
      let expectedResult = false
      assert.equal(verifyPass('abc@ABC').status, expectedResult) 
   })

   it('Senha deve conter letra Maiúscula', () => {
      let expectedResult = false
      assert.equal(verifyPass('abc@123').status, expectedResult) 
   })

   it('A senha deve conter letra minúscula', () => {
      let expectedResult = false
      assert.equal(verifyPass('ABC@123').status, expectedResult)
   })

   it('A senha deve conter caracter especial', () => {
      let expectedResult = false
      assert.equal(verifyPass('ABCO123').status, expectedResult)
   })

   it('A senha contém todos os requisitos para ser validada', () => {
      let expectedResult = true
      assert.equal(verifyPass('@Bc745').status, expectedResult)
   })

})


