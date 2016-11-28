module.exports.use = function (app) {
    app.get("/", require("./calendar").get);
    app.get("/login", require("./login").get);
    app.post("/login", require("./login").post);
    app.post("/logout", require("./logout").post);
    app.get("/calendar/:month?/:year?",require("./calendar").get);
    app.get("/day/:date/:month/:year",require("./day").get);
    app.get("/event/:id",require("./eventdetails").get);

    app.post("/editevent",require("./editevent").post);
    app.get("/editevent",require("./editevent").get);
    app.all("/editevent",require("./editevent").all);

    app.post("/addevent",require("./events/addevent").post);
    app.post("/updevent",require("./events/updevent").post);
    app.post("/delevent",require("./events/delevent").post);
}
