import prisma from '../helpers/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body

        // Validação de campos obrigatórios
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        // Validação do formato do email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        try {
            // Busca o usuário no banco de dados pelo email
            const user = await prisma.user.findUnique({
                where: { email },
            })

            // Verifica se o usuário existe
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' })
            }

            // Verifica se a senha está correta
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) {
                return res.status(401).json({ error: 'Invalid credentials' })
            }

            const { id, name } = user

            // Retorna os dados do usuário e o token JWT
            return res.json({
                user: {
                    id,
                    name,
                    email,
                },
                token: jwt.sign({ id }, "0511ba94319cc5b2cf81f038d700096b1d05c1df", {
                    expiresIn: "7d",
                }),
            })
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new SessionsController()
