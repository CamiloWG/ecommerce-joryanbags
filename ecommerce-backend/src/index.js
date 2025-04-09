import colors from "colors";

import server from "./server.js";

const port = process.env.SERVER_PORT || 4000;

server.listen(port, () => {
    console.log("—————————————————————————————————————");
    console.log(
        colors.cyan.bold(
            `Servidor iniciado en ${process.env.SERVER_URL}${port}`
        )
    );
    console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST);

});
