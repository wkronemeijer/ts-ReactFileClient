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
    module: { rules: [
        // TypeScript
        { 
            test: /\.tsx?$/, 
            use: [
                { loader: "ts-loader" },
                { loader: 'webpack-import-glob-loader' },
            ],
        },
        
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
                } },
            ],
        },
    ] },
    
    //////////////////
    // Presentation //
    //////////////////
    
    // webpack, I don't care about the 200+ modules you included
    stats: {
        modules: false,
    },
};
