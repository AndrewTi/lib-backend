module.exports = {
    jwt: {
        secret: "library-secret-token-key",
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 30
    }
}