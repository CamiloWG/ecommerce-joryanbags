export const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = process.env.CLIENT_URL.split(',').map(url => url.trim());
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true,
};
