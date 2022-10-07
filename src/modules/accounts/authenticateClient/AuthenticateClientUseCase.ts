import { prisma } from "../../../database/prismaClient";
import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({username, password}: IAuthenticateClient) 
    {
        //Receber username e password

        //Verificar se username cadastrado
        const client = await prisma.clients.findFirst({
            where: {username}
        })

        if(!client) {
            throw new Error("User does not exists!")
        }


        //Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, client.password)

        if(!passwordMatch) {
            throw new Error('Password does not match!')            
        }

        //Gerar o token
        const token = sign({username}, '10af1f8c756a2ccd0e3f321fa0a7b335', {
            subject: client.id,
            expiresIn: '1d'
        })

        return {
            token,
        }

    }
}