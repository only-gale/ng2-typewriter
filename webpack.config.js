/**
 * Created by gale on 17-1-22.
 *
 * Webpack configuration.
 */

const helpers = require( './config/helpers' ),
      webpack = require( 'webpack' ),
      fs      = require( 'fs' );

/**
 * Webpack Plugins
 */
const ProvidePlugin       = require( 'webpack/lib/ProvidePlugin' );
const DefinePlugin        = require( 'webpack/lib/DefinePlugin' );
const LoaderOptionsPlugin = require( 'webpack/lib/LoaderOptionsPlugin' );

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: [ '.ts', '.js', 'css', 'html' ]
    },

    entry: helpers.root( 'index.ts' ),

    output: {
        path: helpers.root( 'bundles' ),
        publicPath: '/',
        filename: 'ng2-typewriter.umd.js',
        libraryTarget: 'umd',
        library: 'ng2-typewriter'
    },

    // require those dependencies but don't bundle them
    externals: [ /^\@angular\// ],

    module: {
        rules: [ {
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [ helpers.root( 'node_modules' ) ]
        }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader?declaration=false',
            exclude: [ /\.e2e\.ts$/ ]
        } ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin( {
            options: {
                tslintLoader: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        } ),

        new webpack.BannerPlugin( fs.readFileSync( './license-banner.txt', 'utf8' ) )
    ]
};
