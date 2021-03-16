import chai from 'chai'
import verifyPass from '../helpers/validateEmail'

const assert = chai.assert

describe('Teste para validação da Email', () => {
   
   it('Retornar false se o Email não conter @', () => {
      let expectedResult = false
      assert.equal(verifyPass('personal.dominio.com'), expectedResult )
   })

   it('Retornar false se não tiver caracter antes do @', () => {
      let expectedResult = false
      assert.equal(verifyPass('@dominio.com'), expectedResult )
   })

   it('Retornar false se o dominio começar com .', () => {
      let expectedResult = false
      assert.equal(verifyPass('personal@.dominio.com'), expectedResult )
   }) 
  
   it('Retornar false se tiver .. no email', () => {
      let expectedResult = false
      assert.equal(verifyPass('personal@dominio..com'), expectedResult )
   })
   
})