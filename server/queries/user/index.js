const { Users, Biodata } = require("../../models")


module.exports = {
    getAllUser: async () => {
        const userAttributes = ["user_id", "username","email"]

        return await Users.findAll({
            attributes: userAttributes,
            include:[
                {
                    model: Biodata,
                    attributes: ['address']
                }
            ]
        })
    }
}