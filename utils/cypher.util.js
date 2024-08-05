const brypt = require('bcrypt');

module.exports = {
    makeHash: (val) => {
        const saltRound = 10;
        const salt = brypt.genSaltSync(saltRound);
        return brypt.hashSync(val, salt);
    },

    compareHash: (val , hash) => 
        {
            return brypt.compareSync(val, hash)
        }
}