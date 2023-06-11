const userController = require('../controllers/user.controller');
const verifyToken = require('../controllers/auth.middleware');

module.exports = (app) => {
    app.post("/api/register", userController.registerUser);
    app.post("/api/login", userController.loginUser);
    app.get("/api/user", verifyToken, userController.getUser);

};