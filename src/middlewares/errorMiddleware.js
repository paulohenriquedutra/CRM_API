function errorHandling(err, req, res, next){
    console.log(err)
    res.status(err.status || 500).json({
        message: err.message || "Error internal, please contact the support"
    })
}

export default errorHandling