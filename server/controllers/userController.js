const queries = require('../queries/user')

class userController {
    static async allUser (req, res) {
        try {
            const result = await queries.getAllUser()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error
            })
        }
    }

    static async createUser (req,res) {
        const data = req.body
        try {
            const result = await queries.createUser(data)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({
                message:"Internal Server Error",
                error
            })
        }
    }
}

module.exports = userController