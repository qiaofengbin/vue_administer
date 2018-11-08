// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import echarts from 'echarts'
// 引入 ECharts 主模块
import echartsLib from 'echarts/lib/echarts';
// 引入柱状图
import echartsBar  from 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import echartsTool from 'echarts/lib/component/tooltip';
import echartsTitle from 'echarts/lib/component/title';

// Vue.prototype.$echarts = echarts 

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
