module.exports = function(app, obj){
    app.get("/", function(req, res){
        if(req.session.SaveUser){
            if(req.session.SaveUser.admin == 1){
                return res.redirect('/server');
            } else {
                return res.redirect('/client');
            }
        } else {
            res.render("login", {
                obj: obj,
                i18n: res
            });
        }
    });

    app.get("/client", function(req, res){
        if(req.session.SaveUser){
            res.render("client", {
                obj: obj,
                info_obj: req.session.SaveUser,
                i18n: res
            });
        } else {
            return res.redirect('/');
        }
    });

    app.get("/server", function(req, res){
        if(req.session.SaveUser){
            res.render("server", {
                obj: obj,
                info_obj: req.session.SaveUser,
                i18n: res
            });
        } else {
            return res.redirect('/');
        }
    });

    app.get("/dieukhien", function(req, res){
        if(req.session.SaveUser){
            res.render("control", {
                obj: obj,
                info_title: "Điều khiển",
                i18n: res
            });
        } else {
            return res.redirect('/');
        }
    });

    app.get("/danhmuc", function(req, res){
        if(req.session.SaveUser){
            res.render("categories", {
                obj: obj,
                info_title: "Danh mục",
                i18n: res
            });
        } else {
            return res.redirect('/');
        }
    })

    app.get("/*", function(req, res){
        res.render("404", {
            obj: obj,
            i18n: res
        });
    });
};