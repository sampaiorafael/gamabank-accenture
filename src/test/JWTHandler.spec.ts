import chai from 'chai'
import JWTHandler from '../helpers/JWTHandler'

const assert = chai.assert

describe('Teste de validação de token.', async () => {
   await  it ('Deve retornar true se token for verificado com sucesso', async () => {
        const  expertedResult: number =  123456789
        const { id } = await JWTHandler.verifyToken( await  JWTHandler.newToken( expertedResult ) ) 
        assert.equal( id , expertedResult )
    })
    
})