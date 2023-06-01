const userController = require('../controllers/user.controller');

module.exports = (app) => {

    app.post("/api/register", userController.registerUser);
    app.post("/api/login", userController.loginUser);
    app.get("/api/user", userController.getUser);
    app.get("/api/logout", userController.logOut);

};