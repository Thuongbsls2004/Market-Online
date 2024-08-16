
const { hash } = require("bcrypt");
const User = require("../models/user.model")
const cypher = require("../utils/cypher.util")
const jwt = require("../utils/jwt.util")

module.exports = {

    login: async (req, res,) => {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                access: false,
                data: {
                    message: "email is not exist",
                }
            })
        }
        user = user.toObject();

        
        const isValid = cypher.compareHash(password, user.password);
        if (!isValid) {
            return res.status(400).json({
                access: false,
                data: {
                    message: "password is not correct"
                }
            })
        }

        delete user.password;
        const accessToken = jwt.generateToken({
            id: user._id,
        });
        const refreshToken = jwt.generateToken({
            id: user._id
        },
            "30d"
        )

        return res.status(200).json({
            success: true,
            data: {
                message: "Login successfull",
                user,
                accessToken,
                refreshToken,
            }
        })

    },

    register: async (req, res) => {
        const data = req.body;
        const emailExist = await User.findOne({ email: data.email })
        if (emailExist) {
            return res.status(400).json({
                access: false,
                data: {
                    message: "email already exist"
                }
            })
        }

        const hash = cypher.makeHash(data.password);
        let user = await User.create({
            ...data,
            password: hash,
        })
        user = user.toObject()
        delete user.password;
        const accessToken = jwt.generateToken({ id : user._id})
        return res.status(201).json({
            access: true,
            data: {
                user,
                accessToken
            }
        })
    }


}