// import 'babel-preset-es2017/polyfill';
const webpack = require('webpack');
var path = require('path');
// const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_dir = path.join(__dirname, './node_modules/');
var argv = require('yargs').argv;

var definePlugin = new webpack.DefinePlugin({
  __PRERELEASE__: true,
  __RELEASE__: argv.env === 'prod'
});

// 判断是否是在当前生产环境
var isProduction = argv.env === 'prod';
var isTest = argv.env === 'test';
var loPath = '/';

console.log("cfg1",argv.env);
console.log("cfg2",isProduction);
console.log("cfg3",isTest);

module.exports = {
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        historyApiFallback: {
            index:'indexbo.html'
        },
        hot: true,
        inline: true,
        //progress: true,
        contentBase: './static/',
        host: '0.0.0.0',
        port: 3001
        // ,
        // proxy: [{
        //     path: "/app/*",
        //     target: "http://localhost:3000",
        //     host: "localhost"
        // }]

		,publicPath: loPath + 'dist/'
        // match the output `publicPath`
    },
    output: {
      // chunkFilename: 'chunk/[name].chunk.js'
      path: path.join(__dirname, './static/dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
      publicPath: loPath + 'dist/', //模板、样式、脚本、图片等资源对应的server上的路径．打開會影響 hotUpdate 的路徑
      filename: isProduction || isTest ?'js/[name].[hash:10].js':'js/[name].js',//每个页面对应的主js的生成配置
      // filename: 'js/[name].js',//每个页面对应的主js的生成配置
      chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
      // ,hotUpdateChunkFilename:'[id].[hash].hot-update.js',
      // hotUpdateMainFilename:'[hash].hot-update.json'
    },
    watch: true,
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        // modulesDirectories: ["node_modules", "bower_components"],
        // modulesDirectories: ["node_modules"]
        // ,
        // alias:{
        //   $:("jquery"),
        //   jquery:("jquery"),
        //   jQuery:("jquery")
        // }
    },
    module: {
        loaders: [
          {
              test: /\.js[x]?$/,
              exclude: node_dir,
              include: path.join(__dirname, 'src'),
              loaders: [ 'babel-loader?presets[]=es2015,presets[]=es2016,presets[]=es2017,presets[]=stage-3,presets[]=react,plugins[]=transform-runtime,plugins[]=transform-decorators-legacy,plugins[]=transform-class-properties'],
              // loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime']
              //
              // query: {
              //     presets: ['es2015', 'react']
              // }
          },

          {
              test: /\.css$/,
              // loader: ExtractTextPlugin.extract('style', 'css')
              loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
          },
          // {
          //     test: /\.(svg|png|jpg|jpeg|gif)$/,
          //     loader: 'url-loader?limit=10192'
          // },
          {
            //文件加载器，处理文件静态资源
            test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file?limit=10000&name=fonts/[hash:10].[ext]'
          }
        ]
    },
    plugins: [
      // new BowerWebpackPlugin({
      //   searchResolveModulesDirectories: false
      // }),

      // new webpack.ProvidePlugin({
      //   '$': 'jquery',
      //   'jquery': 'jquery',
      //   'jQuery': 'jquery',
      //   'windows.jQuery': 'jquery'
      // }),

      // commonsPlugin,

      // 类库统一打包生成一个文件
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
          chunks: ['indexbo','loginbo','accountbo'], //提取哪些模块共有的部分
          // filename: isProduction ? 'js/vendor.[hash:10].js':'js/vendor.js',
          minChunks: 3 // 提取至少4个模块共有的部分
      }),
      new webpack.NoErrorsPlugin(), //程式碼沒有錯誤時再更新頁面。
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> Track
        path:loPath,
        indexJs:'indexbo.js',
        title:'首頁',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../indexbo.html', //生成的html存放路径，相对于path
        template: './src/templates/index.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值 ， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'indexbo'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: isProduction ? true : false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> Track
        path:loPath,
        indexJs:'accountbo.js',
        title:'帳號管理',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../accountbo.html', //生成的html存放路径，相对于path
        template: './src/templates/index.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值 ， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'accountbo'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: isProduction ? true : false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> Track
        path:loPath,
        indexJs:'loginbo.js',
        title:'登入',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../loginbo.html', //生成的html存放路径，相对于path
        template: './src/templates/login.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值 ， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'loginbo'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: isProduction ? true : false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new ExtractTextPlugin(isProduction || isTest ? 'css/[name].[hash:10].css':'css/[name].css'),
      // new ExtractTextPlugin('css/[name].css'),
      definePlugin
    ]
};


if(isProduction || isTest){

  module.exports.entry = { //prod 使用：配置入口文件，有几个写几个
      indexbo: './src/page/index-bo.js',
      accountbo: './src/page/index-bo-account.js',
      loginbo: './src/page/login-bo.js',
  };

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,  // remove all comments
        },
        compress: {
            warnings: false
        },
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        }
    })
  );

  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
  );


}else{// 開發才跑
  // devtool: '#cheap-module-eval-source-map',//#inline-source-map, //#cheap-module-eval-source-map //#source-map
  // module.exports.devtool = '#cheap-module-eval-source-map';
  module.exports.devtool = '#source-map';

  module.exports.entry = { //test dev使用：配置入口文件，有几个写几个
      vendor: ['react-hot-loader/patch', 'react', 'react-dom', 'react-router', 'react-tap-event-plugin', 'babel-polyfill'],
      indexbo: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/index-bo.js'
      ],
      accountbo: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/index-bo-account.js'
      ],
      loginbo: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/login-bo.js'
      ],
  };

  //test dev使用：使用webpack-dev-server的Hot Module Replacement Plugin套件
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

  // module.exports.plugins.push(
  //   new OpenBrowserPlugin({
  //       url: 'http://localhost:3001/index.html'
  //   })
  // );

}
