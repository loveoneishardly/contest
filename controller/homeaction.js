const conn = require('../models/database');

module.exports = function(app, obj){
    app.get("/getcontentquestion", function(req, res){
        var sql_tauca = "CALL p_get_content(?);";
        conn.query(sql_tauca, ['1'] ,function(err, results, rows, fields) {
            if (err) {
                console.log("err:", err);
            } else {
                var re_data = JSON.parse(JSON.stringify(results));
                var namequestion = re_data[0][0].cauhoi;
            }
            res.json({name: namequestion, content: re_data[0]});
        });
    });

    app.post("/xulydangnhap", function(req, res){
        var sql1 = "CALL p_login(?,?);";
        conn.query(sql1, [req.body.username, req.body.password] ,function(err, results, rows, fields) {
            if (err) {
                console.log("err:", err);
            } else {
                var re_data = JSON.parse(JSON.stringify(results));
                var value = JSON.parse(JSON.stringify(re_data[0]));
                if (value[0].status) {
                    req.session.SaveUser = {
                        username: value[0].username,
                        hoten: value[0].name,
                        iduser: value[0].id,
                        loggedin: true,
                        status: value[0].status,
                        admin: value[0].admin,
                        madonvi: value[0].dvi_ma,
                        avatar: value[0].avatar,
                        macty: value[0].com_id
                    }
                }
                res.json({result:true, data: re_data[0]});
            }
        });
    });

    app.post("/dangxuat", function(req,res){
        req.session.destroy(function(err) {
            return res.status(200).json({status: 'success', session: 'cannot access session here'});
        })
    });

    app.get('/get_session', (req, res) => {
        if(req.session.SaveUser){
            return res.write('<p> Session expires after 10 min of in activity: ' + (req.session.cookie.expires) + '</p>');
        }
        return res.status(200).json({status: 'error', session: 'No session'})
    });

    app.post("/save-user", function(req, res){
        var sql1 = "CALL p_save_info_user(?,?,?,?,?,?,?);";
        conn.query(sql1, [req.body.idonvi, req.body.iduser, req.body.nameuser, req.body.ngay, req.body.hoten, req.body.idcontest, req.body.idnhom] ,function(err, results, rows, fields) {
            if (err) {
                console.log("err:", err);
            } else {
                var re_data = JSON.parse(JSON.stringify(results));
                res.json({result: true, data: re_data[0]});
            }
        });
    });

    app.get("/get_users_login", function(req, res){
        var ngay = req.query.ngayhientai;
        var sql_tauca = "CALL p_get_list_users(?,?);";
        conn.query(sql_tauca, ['1', ngay] ,function(err, results, rows, fields) {
            if (err) {
                console.log("err:", err);
            } else {
                var re_data = JSON.parse(JSON.stringify(results));
                var value = JSON.parse(JSON.stringify(re_data[0]));
            }
            res.json({0: re_data[0]});
        });
    });

    app.post("/close-current-page", function(req, res){
        var sql1 = "CALL p_close_info_user(?,?,?,?,?);";
        conn.query(sql1, [req.body.idonvi, req.body.iduser, req.body.nameuser, req.body.status, req.body.ngay] ,function(err, results, rows, fields) {
            if (err) {
                console.log("err:", err);
            } else {
                var re_data = JSON.parse(JSON.stringify(results));
                console.log(re_data[0]);
                res.json({result:true, data: re_data[0]});
            }
        });
    });
};