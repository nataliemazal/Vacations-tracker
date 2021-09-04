
function isAdmin(request, response, next) {

    if (!request.headers.authorization) {
        response.status(403).json({ message: "you are not allowed " });
        return;
    }
    next();
}

module.exports = isAdmin;
