const app= Vue.createApp({
    data(){
        return{
            myName:'e@e',
            buttonName:"buraya bas",
            theme: "light"
        }
    },
    methods: {
        changeTheme(){
            if(this.theme=="light"){
                this.theme="dark";
            }else{
                this.theme="light";
            }
        }
    }
});
app.mount('#app');