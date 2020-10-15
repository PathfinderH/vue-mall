//导入数据库操作文件
const db = require('./db.js');

const fs = require('fs');
const host = 'http://localhost:3001/'

//获取图片地址函数
exports.getImgs = (path) => {
    let filesPath = []
    let files = fs.readdirSync(path)
    files.forEach(function(item, index) {
        filesPath.push(host + path.slice(9) + item)
    })
    return filesPath;
}

//获取轮播图地址
exports.getSwipeImgs = (req, res) => {
    let filesPath = exports.getImgs('./public/images/swipe/')
    res.json(filesPath)
}


//获取product_list数据
exports.allProductList = (req, res) => {
    let sql = 'select * from product_list';
    db.base(sql, null, (result) => {
        res.json(result);
    });
};

//获取商品详情
exports.getProduct = (req, res) => {
    let id = req.params.id;
    let sql = 'select * from product_list where id=?';
    let data = id;
    db.base(sql, data, (result) => {
        res.json(result[0]);
    });
};

//获取商品详情介绍图片
exports.getProductImg = (req, res) => {
    let id = req.params.id;
    let sql = 'select * from product_img where id=?';
    let data = [id];
    db.base(sql, data, (result) => {
        res.json(result[0]);
    });
};

//获取购物车信息
exports.getShopcar = (req, res) => {
    let info = req.params;
    let sql = "select * from product_list where find_in_set(id,?)>0";
    let data = info.id;
    db.base(sql, data, (result) => {
        res.send(result);
    });
};

//获取搜索信息
exports.getSearch = (req, res) => {
    let info = req.params.info;
    let sql = "select * from product_list where title like ?"
    let data = '%' + info + '%';
    db.base(sql, data, (result) => {
        res.send(result);
    })
}

//注册账号
exports.register = (req, res) => {
    let info = req.body;
    let username = info.username

    let sql = 'select * from user where username=?'
    db.base(sql, username, (result) => {
        if (result.length == 0) {
            let sql = 'insert into user set ?';
            db.base(sql, info, (result) => {
                if (result.affectedRows == 1) {
                    res.json({ flag: 1 });
                } else {
                    res.json({ flag: 2 });
                }
            });
        } else {
            res.json({ flag: 3 })
        }
    })
};


//登录账号
exports.login = (req, res) => {
    let arr = [];
    let info = req.body;
    for (let key in info) {
        arr.push(info[key]);
    }
    let sql = 'select * from  user where username=? and password=?'
    db.base(sql, arr, (result) => {
        if (!result.length) {
            res.json({ msg: 'fail' });
        } else if (result[0].password == info.password) {
            return res.json({ msg: 'success', username: info.username, id: result[0].id })
        }
    })
};