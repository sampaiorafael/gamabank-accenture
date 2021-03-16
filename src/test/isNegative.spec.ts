import chai from 'chai'
import isNegative from '../helpers/isNegative'

const assert = chai.assert

describe('Teste para verificar se valor é negativo', () => {
   
   it('Retorna true se valor é negativo', () => {
      let expectedResult = true
      assert.equal(isNegative('-1'), expectedResult )
   })

   it('Retorna false se valor é positivo', () => {
      let expectedResult = false
      assert.equal(isNegative('10'), expectedResult )
   })

})