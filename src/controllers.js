const { nanoid } = require("nanoid");
const { defaultHeaders: headers } = require("./config");

const urls = {};

const optionsController = (req, res) => {
    res.writeHead(204, { ...headers });
    res.end();
};

const postController = (req, res) => {
    /**
     * Corpo de mensagem a ser tratado
     */
    let body = "";

    req.on("data", (info) => {
        body += info;
    });

    req.on("end", () => {
        const response = {
            error: null,
            data: {
                "base-url": null,
                "short-url": null,
            },
        };

        const requiredURL = JSON.parse(body).url;
        const shortenedURL = urls[requiredURL];

        if (shortenedURL) {
            response.data = {
                "base-url": requiredURL,
                "short-url": shortenedURL,
            };
        } else {
            const shortId = nanoid(11);
            response.data = {
                "base-url": requiredURL,
                "short-url": shortId,
            };

            urls[requiredURL] = shortId;
            urls[shortId] = requiredURL;
        }

        res.writeHead(200, {
            ...headers,
            "Content-Type": "application/json",
        });

        res.write(JSON.stringify(response));
        res.end();
    });
};

const getController = (req, res) => {
    const requestedURL = req.url.replace("/", "");
    const baseURL = urls[requestedURL];

    if (!baseURL) {
        return errorController(req, res);
    }

    return redirectController(req, res, baseURL);
};

const errorController = (req, res) => {
    res.writeHead(404, {
        ...headers,
        "Content-Type": "application/json",
    });

    res.write(
        JSON.stringify({
            error: "404",
            data: {
                message: "Not Found",
            },
        })
    );

    res.end();
};

const redirectController = (req, res, redirectTo) => {
    res.writeHead(301, {
        ...headers,
        "Content-Type": "application/json",
        Location: redirectTo,
    });

    res.end();
};

const putController = (req, res) => {};

module.exports = {
    optionsController,
    postController,
    getController,
    putController,
    errorController,
};
