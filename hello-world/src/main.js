import Vue from '../src/my-vue'
// import App from './App.vue'

Vue.config.productionTip = false

new Vue({ 
  render: h => h("h1",{
    style:{
      color:"red",
    },
  },"hello")
}).$mount('#app')
