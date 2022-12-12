
const secreteKey = process.env.secreteKey;
const jwt = require("jsonwebtoken");


const todoMiddleWare = async (req, res, next) => {
    const token = req.headers.authorization;


    jwt.verify(token, secreteKey, function (err, decoded) {
        if (err) {
            res.send({ msg: "You are not authorized" });
        }
       
        if (decoded) {
            req.body.user = decoded.user_id;
            next();
}
    });
}

module.exports = { todoMiddleWare };