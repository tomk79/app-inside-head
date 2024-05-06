const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new MiniCssExtractPlugin(),
	],
	context: path.resolve(__dirname, 'src_px2'),
	entry: {
		"dialogue/index_files/script": './dialogue/index_files/src.ignore/script.js',
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