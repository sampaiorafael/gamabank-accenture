import chai from 'chai'
import BcryptHandler from '../helpers/BcryptHandler'

const assert = chai.assert

describe('Teste de verificação da criptorafia', () => {

    it ('Retorna true se a senha for decifrada corretamente', () => {
        const passTest = '123456789'
        const expectedResult = true
        assert.equal( BcryptHandler.checkPassword(passTest,BcryptHandler.hashPassword(passTest)), expectedResult )
    })

    it ('Retorna false se a senha verificada for diferente da cifrada', () => {
        const passTest = '123456789'
        const errTest = '1234567890'
        const expectedResult = false
        assert.equal( BcryptHandler.checkPassword(errTest,BcryptHandler.hashPassword(passTest)), expectedResult )
    })


})