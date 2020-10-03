const path = require('path')

//在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口文件
    output: {
        path: path.join(__dirname, './dist'), //输出路径
        filename: 'bundle.js', //指定输出文件的名称
    },
    plugins: [ //所有webpack插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板文件路径
            filename: 'index.html' //设置生成的内存页面的名称
        })

    ],
    module: { //这个节点，用于配置所有第三方模块加载器
        rules: [ //所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=1&name=[hash:8]-[name].[ext]' },
            //limit给定的值，是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64位的值
            { test: /\.(ttf||eot|svg|woff|woff2)$/, use: 'url-loader' }, //处理字体文件的loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //处理es6文件的loader
            { test: /\.vue$/, use: 'vue-loader' }
        ]

    },
    resolve: {
        alias: {
            // "vue$": "vue/dist/vue.js"
        }
    }
}