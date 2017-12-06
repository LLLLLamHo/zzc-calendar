const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

const extractSass = new ExtractTextPlugin( {
    filename: "./css/[name].css",
    disable: process.env.NODE_ENV === "development"
} );

module.exports = {
    entry: {
        picker: './src/js/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract(
                    {
                        use: [
                            {
                                loader: "css-loader" // translates CSS into CommonJS
                            },
                            {
                                loader: "postcss-loader"
                            },
                            {
                                loader: "sass-loader" // compiles Sass to CSS
                            }
                        ],
                        fallback: "style-loader"
                    } )
            }

        ]
    },
    plugins: [
        extractSass,
    ]
}