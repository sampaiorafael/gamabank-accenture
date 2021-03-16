import chai from 'chai'
import zerofill from '../helpers/zeroFill'

const assert = chai.assert

describe('Teste para validar o preenchimento dos zeros', () => {
   
   it('Retornou com 1 digito com 5 zeros à esquerda',() => {
      let expectedResult = '000001'
      assert.equal(zerofill('1', 6), expectedResult)
   })

   it('Retornou com 2 digitos com 4 zeros à esquerda',() => {
      let expectedResult = '000012'
      assert.equal(zerofill('12', 6), expectedResult)
   })

   it('Retornou com 3 digitos com 4 zeros à esquerda',() => {
      let expectedResult = '000123'
      assert.equal(zerofill('123', 6), expectedResult)
   })

   it('Retornou com 4 digitos com 2 zeros à esquerda',() => {
      let expectedResult = '001234'
      assert.equal(zerofill('1234', 6), expectedResult)
   })

   it('Retornou com 5 digitos com 1 zeros à esquerda',() => {
      let expectedResult = '012345'
      assert.equal(zerofill('12345', 6), expectedResult)
   })

   it('Retornou com 6 digitos sem zeros à esquerda',() => {
      let expectedResult = '123456'
      assert.equal(zerofill('123456', 6), expectedResult)
   })

   // se a função zerofill passar a controlar o tamanho do número de caracteres, descomentar
   // it('Não pode permitir número maior que seis digítos',() => {
   //    let expectedResult = '123456'
   //    assert.equal(zerofill('1234567', 6), expectedResult)
   // })
   
})