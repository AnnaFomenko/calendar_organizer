module.exports = function (app) {

    //app.get("/", require("./frontpage").get);
    app.get("/", require("./calendar").get);
    //app.get("/login", require("./login").get);
    //app.post("/login", require("./login").post);
    //app.post("/logout", require("./logout").post);
    app.get("/calendar/:month?/:year?",require("./calendar").get);
    app.get("/day/:date/:month/:year",require("./day").get);
    app.get("/eventDetails/:eventId",require("./eventDetails").get);
}
