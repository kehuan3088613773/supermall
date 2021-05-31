module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视图的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,//视图的高度，对应的是我们设计稿的高度，（也可以不配置）
      unitPrecision: 5,//指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw',//指定需要转换成的视穿单位，建议使用vw
      selsectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],//指定不需要转换的类
      minPixelValue: 1, //小于或等于`px`不转换为视穿单位
      mediaQuery: false,//允许在媒体查询中转换`px`
      exclude: [/TabBar/]//排出文件的名字，必须是正则
    }
  }
}
