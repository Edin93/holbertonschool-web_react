const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		header:'./modules/header/header.js',
		body:'./modules/body/body.js',
		footer:'./modules/footer/footer.js',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].bundle.js',
	},
	plugins: [
		new CleanWebpackPlugin(),
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
			},
		],
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: [
      path.join(__dirname, 'modules'),
      path.join(__dirname, 'assets'),
    ],
		port: 8564,
	},
	mode: 'development',
};



































// const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
// 	entry: {
// 		header: {
// 			import: './modules/header/header.js',
// 		},
// 		body: {
// 			import: './modules/body/body.js',
// 			dependOn: 'lodash',
// 		},
// 		footer: {
// 			import: './modules/footer/footer.js',
// 		},
// 		shared: 'jquery',
// 	},
// 	output: {
// 		path: path.resolve(__dirname, 'public'),
// 		filename: '[name].bundle.js',
// 	},
// 	plugins: [
// 		new CleanWebpackPlugin(),
// 	],
// 	module: {
// 		rules: [
// 			{
// 				test: /\.css$/i,
// 				use: ['style-loader', 'css-loader'],
// 			},
// 			{
// 				test: /\.(png|svg|jpg|jpeg|gif)$/i,
// 				type: 'asset/resource',
// 			},
// 		],
// 	},
// 	devtool: 'inline-source-map',
// 	devServer: {
// 		contentBase: [
//       path.join(__dirname, 'modules'),
//       path.join(__dirname, 'assets'),
//     ],
// 		port: 8564,
// 	},
// 	mode: 'development',
// };
