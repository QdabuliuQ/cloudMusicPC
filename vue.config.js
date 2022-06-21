const path = require('path')
module.exports = {
	// 定义less全局变量
	pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径，不能使用路径别名
        path.resolve(__dirname, "./src/assets/less/globa.less"),
      ],
    },
  },

  // 配置路径别名
	configureWebpack: {
		resolve: {
			alias: {
				'images': '@/assets/images',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
				'utils': '@/utils',
				'types': '@/types',
			}
		}
	},
}