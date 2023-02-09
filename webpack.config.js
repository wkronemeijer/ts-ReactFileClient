// Parts are taken from the TypeScript handbook
// DONT change this to es6 shit
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
            
            // Less
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader:   "css-loader", options: { sourceMap: true, url: false } },
                    { loader:  "sass-loader", options: { sourceMap: true } }
                ]
            }
        ]
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
