const globImporter = require("node-sass-glob-importer");

// Parts are taken from the TypeScript handbook
// ignore vsc, DONT change this to use ESM imports
module.exports = {
    mode: "development",
    
    //////////
    // Emit //
    //////////
    
    devtool: "source-map",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    
    /////////////
    // Loaders //
    /////////////
    
    resolve: { extensions: [
        ".ts", ".tsx", 
        // ".js", 
        // ".json", 
        ".scss",
    ] },
    module: {
        rules: [
            // TypeScript
            { test: /\.tsx?$/, loader: "ts-loader" },
            
            // SCSS
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: {
                        sourceMap: true,
                        url: false,
                    } },
                    { loader: "sass-loader", options: { 
                        sourceMap: true, 
                        sassOptions: {
                            importer: globImporter(),
                        },
                    } },
                ],
            },
        ],
    },
    ///////////////
    // UMD Stuff //
    ///////////////
    // Finally removed!
    
    //////////////////
    // Presentation //
    //////////////////
    
    // Stop webpack from barfing meaningless characters over my console
    stats: {
        modules: false,
    },
};
