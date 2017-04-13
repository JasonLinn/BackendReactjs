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
  __RELEASE__: argv.PENV === 'prod'
});

// 判断是否是在当前生产环境
var isProduction = argv.PENV === 'prod';
var isTest = argv.PENV === 'test';
var loPath = '/wapp/';
var loPath2 = '/wappbx/';

module.exports = {
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './static/',
        host: '0.0.0.0',
        port: 3001
        // ,
        // proxy: [{
        //     path: "/app/*",
        //     target: "http://localhost:3000",
        //     host: "localhost"
        // }]
    },
    // entry: { //prod 使用：配置入口文件，有几个写几个
    //     index: './src/page/index.js',
    //     bex: './src/page/bex.js',
    //     profitobe: './src/page/profitobe.js',
    // },
    // entry: { //test dev使用：配置入口文件，有几个写几个
    //     index: [
    //         // 'babel-polyfill',
    //         'webpack-dev-server/client?http://0.0.0.0:3001',
    //         'webpack/hot/only-dev-server',
    //         './src/page/index.js'
    //     ],
    //     bex: [
    //         // 'babel-polyfill',
    //         'webpack-dev-server/client?http://0.0.0.0:3001',
    //         'webpack/hot/only-dev-server',
    //         './src/page/bex.js'
    //     ],
    //     profitobe: [
    //         // 'babel-polyfill',
    //         'webpack-dev-server/client?http://0.0.0.0:3001',
    //         'webpack/hot/only-dev-server',
    //         './src/page/profitobe.js'
    //     ],
    // },
    output: {
      // chunkFilename: 'chunk/[name].chunk.js'
      path: path.join(__dirname, './static/dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
      // publicPath: loPath + 'dist/', //模板、样式、脚本、图片等资源对应的server上的路径．打開會影響 hotUpdate 的路徑
      filename: isProduction || isTest ?'js/[name].[hash:10].js':'js/[name].js',//每个页面对应的主js的生成配置
      // filename: 'js/[name].js',//每个页面对应的主js的生成配置
      chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
      // ,hotUpdateChunkFilename:'[id].[hash].hot-update.js',
      // hotUpdateMainFilename:'[hash].hot-update.json'
    },
    watch: true,
    resolve: {
        extensions: ['', '.js', '.jsx'],
        // modulesDirectories: ["node_modules", "bower_components"],
        modulesDirectories: ["node_modules"]
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
              loaders: [ 'babel?presets[]=es2015,presets[]=es2016,presets[]=es2017,presets[]=stage-3,presets[]=react,plugins[]=transform-runtime,plugins[]=transform-decorators-legacy,plugins[]=transform-class-properties'],
              // loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime']
              //
              // query: {
              //     presets: ['es2015', 'react']
              // }
          },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract('style', 'css')
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
          chunks: ['index','bex','profitobe','joinus','xbpjoinus'], //提取哪些模块共有的部分
          // filename: isProduction ? 'js/vendor.[hash:10].js':'js/vendor.js',
          minChunks: 3 // 提取至少4个模块共有的部分
      }),
      new webpack.NoErrorsPlugin(), //程式碼沒有錯誤時再更新頁面。
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> Track
        path:loPath,
        indexJs:'index.js',
        title:'FiToBe',
        baseUrl:isProduction ? 'http://www.fitobe.com/wapp' : 'http://localhost:3000/wapp',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../index.html', //生成的html存放路径，相对于path
        template: './src/index.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值 ， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: isProduction ? true : false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> FiTobex
        path:loPath,
        indexJs:'bex.js',
        title:'ProFiToBex',
        baseUrl:isProduction ? 'http://www.fitobe.com/wapp' : 'http://localhost:3000/wapp',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../bex.html', //生成的html存放路径，相对于path
        template: './src/index.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'bex'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: isProduction ? true : false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> FiTobex
        path:loPath,
        indexJs:'profitobe.js',
        title:'ProFiToBe',
        baseUrl:isProduction ? 'http://www.fitobe.com/wapp' : 'http://localhost:3000/wapp',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../profitobe.html', //生成的html存放路径，相对于path
        template: './src/index.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'profitobe'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: isProduction ? true : false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> Joinus
        path:loPath,
        indexJs:'joinus.js',
        title:'JoinUs',
        baseUrl:isProduction ? 'http://www.fitobe.com/wapp' : 'http://localhost:3000/wapp',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../joinus.html', //生成的html存放路径，相对于path
        template: './src/index.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'joinus'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: isProduction ? true : false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML ==> xbpJoinus
        path:loPath,
        indexJs:'xbpjoinus.js',
        title:'xbpJoinUs',
        baseUrl:isProduction ? 'http://www.fitobe.com/wapp' : 'http://localhost:3000/wapp',
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: '../xbpjoinus.html', //生成的html存放路径，相对于path
        template: './src/index.template.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值， 設定成 true 會無法正確 hot loader
        chunks: ['vendors', 'xbpjoinus'],//需要引入的chunk，不配置就会引入所有页面的资源
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
      index: './src/page/index.js',
      bex: './src/page/bex.js',
      profitobe: './src/page/profitobe.js',
      joinus: './src/page/joinus.js',
      xbpjoinus: './src/page/xbpjoinus.js',
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
  // module.exports.devtool = '#source-map';

  module.exports.entry = { //test dev使用：配置入口文件，有几个写几个
      index: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/index.js'
      ],
      bex: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/bex.js'
      ],
      profitobe: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/profitobe.js'
      ],
      joinus: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/joinus.js'
      ],
      xbpjoinus: [
          // 'babel-polyfill',
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          './src/page/xbpjoinus.js'
      ],
  };

  //test dev使用：使用webpack-dev-server的Hot Module Replacement Plugin套件
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

}
