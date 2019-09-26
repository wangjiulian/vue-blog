export default{
    install: function(Vue,Option){
        Vue.prototype.showLoading = function(text='loading'){
            this.$vux.loading.show({text: text})
        }
        Vue.prototype.hideLoading = function(){
            this.$vux.loading.hide()
        }
        Vue.prototype.showToast= function(text=''){
            // if(text.indexOf('{')!=-1) return
            this.$vux.toast.text(text,'middle')
        }
    }
}

