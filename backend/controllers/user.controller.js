const User = require("../modules/user.module");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let user = await User.findOneByEmail(email);
        if (user) {
            return res.status(400).json({ message: "User  Already Exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User  registered successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOneByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "E-mail doesn't match!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password doesn't match!" });
        }

        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: `Welcome back! ${user.username}`, token: jwtToken, name: user.username });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { username } = req.params;

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User  not found."});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect." });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New passwords do not match." });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        await User.updatePassword(username, hashedNewPassword);

        res.status(200).json({ message: "Password updated successfully." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};