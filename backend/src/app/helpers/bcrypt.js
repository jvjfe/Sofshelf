import bcrypt from 'bcryptjs'

export async function passwordHash(password) {
    return bcrypt.hash(password, 10)
}

export async function passwordCompare(password, hash) {
    return bcrypt.compare(password, hash)
}
