var config = {
   entry: './main.js',
	
   output: {
     
      filename: './bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 5001,
	  historyApiFallback: true
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react'],
			   plugins: ['transform-decorators-legacy']
            }
         }
      ]
   }
}

module.exports = config;