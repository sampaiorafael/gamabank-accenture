import chai from 'chai'
import verifyPass from '../helpers/validatePassword'


const assert = chai.assert

describe('Teste para validação da Senha', () => {
   it('Senha não pode ser menor que seis caracteres', () => {
      console.log(verifyPass('12as1'))
      const expectedResult = { status: false, msg: [ 'Menor que seis caracteres' ] }
      assert.equal(verifyPass('12as1223'), expectedResult )
      
     
   })
})








// describe('Teste para validação da senha', () => {
//    it ('Deve remover os caracteres que não digitos', () => {
//        const expectedResult = true
//        assert.equal( validatePassword('073.785.344-12'), expectedResult )
//    })

//    it ('Deve retorar false para tamanho de CPF diferente de 11', () => {
//        const expectedResult = false
//        assert.equal( validatePassword('0731234561'), expectedResult )
//    })

//    it ('Deve retornar false em caso falha na validação do digito verificador', () => {
//        const expectedResult = false
//        assert.equal( validatePassword('07378534411'), expectedResult )
//    })

//    it ('Deve retornar false em caso de todos os numeros iguais', () => {
//        const expectedResult = false
//        assert.equal( validatePassword('11111111111'), expectedResult )
//    })

// })


