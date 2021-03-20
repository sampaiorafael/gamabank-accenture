import chai from 'chai'
import phoneNumber from '../helpers/validatePhoneNumber'

const assert = chai.assert

describe('Teste para validação de Telefone', () => {
   
   it('Número inválido', () => {
      let expectedResult: boolean = false
      assert.equal(phoneNumber(''), expectedResult )
   })

   it('Número com caracteres insuficientes', () => {
      let expectedResult: boolean = false
      assert.equal(phoneNumber('45565'), expectedResult) 
   })

   it('Insira apenas números', () => {
    let expectedResult: boolean = false
    assert.equal(phoneNumber('95569sd3915'), expectedResult) 
 })

})