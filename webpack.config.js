const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	devtool: "source-map",
	plugins: [
		new MiniCssExtractPlugin(),
	],
	context: path.resolve(__dirname, 'src_wp'),
	entry: {
		"assets/index": './assets/index.js',
		"assets/test": './assets/test.ts',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
			},
			{
				test: /\.s?css$/,
				use: [
           			MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	output: {
		path: path.resolve(__dirname, "src_px2/"),
	},
};
module.exports = config;