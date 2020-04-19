const http = require("http");
const { config } = require("./src/config");
const app = require("./src/app");

const server = http.createServer(app);

server.listen(config.PORT, () => {
    console.log(`Port: ${config.PORT}`);
});
