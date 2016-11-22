module.exports = function (app) {

    //app.get("/", require("./frontpage").get);
    app.get("/", require("./calendar").get);
    //app.get("/login", require("./login").get);
    //app.post("/login", require("./login").post);
    //app.post("/logout", require("./logout").post);
    app.get("/calendar/:month?/:year?",require("./calendar").get);
    app.get("/day/:date/:month/:year",require("./day").get);
    app.get("/event/:id",require("./event").get);

    app.post("/editevent",require("./editevent").post);
    app.get("/editevent",require("./editevent").get);
    app.all("/editevent",require("./editevent").all);
    app.post("/calendar",require("./calendar").post);
}
