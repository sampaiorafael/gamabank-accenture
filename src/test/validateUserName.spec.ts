import chai from 'chai'
import userName from '../helpers/validateUserName'

const assert = chai.assert

describe('Teste para validação de Username', () => {
   
   it('Nome de usuário inválido', () => {
      let expectedResult: any = false
      assert.equal(userName(''), expectedResult )
   })

   it('Nome do usuário deve conter pelo menos 6 caracteres', () => {
      let expectedResult: any = false
      assert.equal(userName('45sd'), expectedResult) 
   })

   it('Nome do usuário deve conter menos de 11 caracteres', () => {
    let expectedResult: any = false
    assert.equal(userName('stdfkdf56568662'), expectedResult) 
    })

    it('Somente letras e múmeros', () => {
        let expectedResult: any = false
        assert.equal(userName('sds65564@#&'), expectedResult) 
    })

})