module.exports.config = {
    PORT: process.env.PORT || 8081,
};

module.exports.defaultHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": 2592000,
};
