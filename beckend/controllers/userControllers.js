const dbHandlerService = require("../services/dbHndler");


exports.createUser = async function (req, res) {
    try {
        const {userName,language} = req.body
        const token = await dbHandlerService.createUser(userName,language);
        res.status(200).json(token);
    } catch (e) {
        res.status(500).send({
            message: e.message || "failed create user" //TODO: it need to be message or something else
        });
    }
};







