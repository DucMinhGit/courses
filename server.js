const app = require("./src/app");
const PORT = 8888;

const server = app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit Server Express`));
});
