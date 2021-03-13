import chai from 'chai'
import validateCpf from '../src/helpers/validateCpf'

const assert = chai.assert

describe('Teste para validação de CPF', () => {
    it ('Deve remover os caracteres que não digitos', () => {
        const expertedResult = true
        assert.equal( validateCpf('073.785.344-12'), expertedResult )
    })

    it ('Deve retorar false para tamanho de CPF diferente de 11', () => {
        const expertedResult = false
        assert.equal( validateCpf('0731234561'), expertedResult )
    })

    it ('Deve retornar false em caso falha na validação do digito verificador', () => {
        const expertedResult = false
        assert.equal( validateCpf('07378534411'), expertedResult )
    })

})