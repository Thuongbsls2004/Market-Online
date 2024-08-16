const User = require("../models/user.model");

module.exports = {
    getAll: async (req, res) => {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: {
                users,
            },
        });
    },

    create: async (req, res) => {
        const data = req.body;
        // validate data

        const user = await User.create({
            ...data,
        });

        return res.status(201).json({
            success: true,
            data: {
                user,
            },
        });
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        let user = await users.find((user) => user.id === +id);
        user = {
            ...user,
            ...data,
        };

        return res.json({
            success: true, 
            data: {
                user,
            },
        });
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        const index = await users.findIndex((user) => user.id === +id);

        users.splice(index, 1);

        return res.json({
            success: true, 
            data: {
                users,
            },
        });
    },

};