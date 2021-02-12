const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		header: {
			import: './modules/header/header.js',
		},
		body: {
			import: './modules/body/body.js',
			dependOn: 'lodash',
		},
		footer: {
			import: './modules/footer/footer.js',
		},
		shared: 'jquery',
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
		contentBase: './dist',
		port: 8564,
	},
	mode: 'development',
};
