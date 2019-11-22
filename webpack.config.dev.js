const pipedrivePostCSS = require('@pipedrive/pipedrive-postcss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const includePaths = ['node_modules', 'src'];

module.exports = {
	mode: 'development',
	entry: {
		'babel-polyfill': 'babel-polyfill',
		'script': `${__dirname}/src/entry/public.js`,
		'style': `${__dirname}/src/styles/public.scss`,
	},
	output: {
		path: `${__dirname}/build`,
		filename: '[name].js',
	},
	devServer: {
		contentBase: `${__dirname}/build/`,
		compress: true,
		port: 12213,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => {
									return [pipedrivePostCSS()];
								},
							},
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths,
							},
						},
					],
				}),
			},
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				include: [`${__dirname}/src`],
				query: {
					presets: ['@babel/env', '@babel/react'],
					plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties'],
				},
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/',
					},
				},
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'url-loader',
				query: {
					limit: 8192,
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: includePaths,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${__dirname}/src/entry/public.html`,
			filename: `${__dirname}/build/index.html`,
		}),
		new ExtractTextPlugin('[name].css'),
	],
	devtool: 'source-map',
};
