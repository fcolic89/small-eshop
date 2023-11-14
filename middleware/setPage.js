exports.setPage = function (req, res, next) {
    if(!req.query.page){
        req.query.page = 1;
    }
    if(!req.query.size){
        req.query.size = 10;
    }

    next();
}
