const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// entry: {
	// 	// lodash: './node_modules/lodash',
	// 	// jquery: './node_modules/jquery',
	// 	header: {
	// 		import: './modules/header/header.js',
	// 	},
	// 	body: {
	// 		import: './modules/body/body.js',
	// 		// dependOn: 'jquery',
	// 	},
	// 	footer: {
	// 		import: './modules/footer/footer.js',
	// 	},
	// 	// shared: 'lodash',
	// },
	entry: {
    all: ["./modules/header/header.js", "./modules/body/body.js", "./modules/footer/footer.js"],
  },
	output: {
		path: path.resolve(__dirname, './public'),
		filename: '[name].bundle.js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
      title: 'Holberton Dashboard',
    }),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				use: ['file-loader'],
			},
		],
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './public',
		port: 8564,
	},
	mode: 'development',
};
