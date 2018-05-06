/**
 * Created by hj on 2017/6/27.
 */
const express=require("express"),http=require("http"),qs=require("querystring"),url=require("url");
const mysql = require("mysql");
var pool = mysql.createPool({
    host:'127.0.0.2',
    user:'root',
    password:'',
    database:'top',
    connectionLimit:10
});
var app = express();
var server = http.createServer(app);
server.listen(8081);
app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});
app.get("/hotgame",(req,res)=>{
    res.sendFile(__dirname+"/public/hotgame.html");
});
app.get("/bhg",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM bighot_item ORDER BY show_index";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/newhg",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM newbighot_item ORDER BY show_index";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/Gtest",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM test_item";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/Bboard",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM billboard_item ORDER BY star DESC";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/BBSforum",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM forum_item";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/relatedproduct",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM relatedproduct_item";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/userlogin",(req,res)=>{
    var uname=req.query.uname;
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM user_item WHERE uname=?";
        conn.query(sql,[uname],(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.post("/userregister",(req,res)=>{
    req.on("data",(data)=>{
      var obj = qs.parse(data.toString());
        var rn=obj.rname;
        var rp=obj.rpwd;
        pool.getConnection((err,conn)=>{
            var sql = "INSERT INTO user_item VALUES(NULL,?,?)";
            conn.query(sql,[rn,rp],(err,result)=>{
                res.json(result);
                conn.release();
            });
        });
    });
});
app.get("/gametype",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM gametype";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/gameterrace",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM gameterrace";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/gameplay",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM gameplay";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/gamesubject",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT * FROM gamesubject";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/game",(req,res)=>{
        var i = parseInt(req.query.ucount);
        pool.getConnection((err, conn)=> {
            var sql = "SELECT uname,pic,utype,usize,score,content FROM game LIMIT ?,30";
            conn.query(sql, [i], (err, result)=> {
                res.json(result);
                conn.release();
            });
        });
});
app.get("/page",(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql = "SELECT uname FROM game";
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/pagetype",(req,res)=>{
    var gtype=req.query.gametype,gterrace=req.query.gameterrace,gplay=req.query.gameplay,gsubject=req.query.gamesubject;
    pool.getConnection((err,conn)=>{
        var sql = `SELECT uname FROM game WHERE ugametype LIKE '%${gtype}%' AND ugameterrace LIKE '%${gterrace}%' AND ugameplay LIKE '%${gplay}%' AND ugamesubject LIKE '%${gsubject}%'`;
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/gameAll",(req,res)=>{
    var i = parseInt(req.query.ucount);
    var gtype=req.query.gametype,gterrace=req.query.gameterrace,gplay=req.query.gameplay,gsubject=req.query.gamesubject;
    pool.getConnection((err,conn)=>{
        var sql = `SELECT uname,pic,utype,usize,score,content  FROM game WHERE ugametype LIKE '%${gtype}%' AND ugameterrace LIKE '%${gterrace}%' AND ugameplay LIKE '%${gplay}%' AND ugamesubject LIKE '%${gsubject}%' LIMIT ?,30`;
        conn.query(sql,[i],(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/search",(req,res)=>{
    var input = req.query.input;
    pool.getConnection((err,conn)=>{
        var sql = `SELECT uname,pic,utype,usize,score,content FROM game WHERE uname LIKE '%${input}%' `;
        conn.query(sql,(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
app.get("/searchresult",(req,res)=>{
    var uname = req.query.un;
    pool.getConnection((err,conn)=>{
        var sql = `SELECT uname,pic,utype,usize,score,content FROM game WHERE uname=? `;
        conn.query(sql,[uname],(err,result)=>{
            res.json(result);
            conn.release();
        });
    });
});
