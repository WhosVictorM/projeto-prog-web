const pool = require('../config/db');

const User = {
    async findOneByEmail(email) {
        const res = await pool.query('SELECT * FROM user_login WHERE email = $1', [email]);
        return res.rows[0];
    },
    async create(user) {
        const { username, email, password } = user;
        const res = await pool.query(
            'INSERT INTO user_login (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        return res.rows[0];
    },
    async findByUsername(username) {
        const res = await pool.query(`SELECT username, password, email FROM user_login WHERE username = $1`, [username]);
        return res.rows[0];
    },
    async updatePassword(username, newPassword) {
        const res = await pool.query(
            `UPDATE user_login SET password = $1 WHERE username = $2 RETURNING *`,
            [newPassword, username]
        );
        return res.rows[0];
    }
};

module.exports = User;