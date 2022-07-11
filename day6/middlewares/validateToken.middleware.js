export default(req, res, next) => {
    const token = req.headers.token;
    if(token && token === "xyz"){
        next();
    }
    else{
        res.status(403).send({ success:false, message:"Invalid API token" });
    }
}