import chai from 'chai'
import validateCpf from '../helpers/validateCpf'

const assert = chai.assert

describe('Teste para validação de CPF', () => {
    it ('Deve remover os caracteres que não digitos', () => {
        const expectedResult = true
        assert.equal( validateCpf('073.785.344-12'), expectedResult )
    })

    it ('Deve retorar false para tamanho de CPF diferente de 11', () => {
        const expectedResult = false
        assert.equal( validateCpf('0731234561'), expectedResult )
    })

    it ('Deve retornar false em caso falha na validação do digito verificador', () => {
        const expectedResult = false
        assert.equal( validateCpf('07378534411'), expectedResult )
    })

    it ('Deve retornar false em caso de todos os numeros iguais', () => {
        const expectedResult = false
        assert.equal( validateCpf('11111111111'), expectedResult )
    })

})