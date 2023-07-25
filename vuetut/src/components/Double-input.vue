<template>
    <hr>

    <p>{{overText}}</p>
    <input  class="inp-username" type="text" v-model="username" placeholder="enter your username">
    <input  class="inp-password" type="text" v-model="password" placeholder="enter your password">
    <button type="submit" @click="
        logCredentials
    ">{{buttonText}}</button>
    <p>This is a sign up input {{isSignUp}}</p>
    <p>This is a log in input {{isLogin}}</p>
    <p>feedback message: {{msg}}</p>
</template>

<script>
import axios from 'axios';
export default {
    props:{
        isSignUp: Boolean,
        isLogin:Boolean,
        overText:String,
        buttonText:String
    },
    methods:{
        logCredentials() {
            if((this.isSignUp||this.isLogin)&&this.isSignUp){
                axios.post(`http://localhost:4000/api/posts/create`,
                {username:this.username, password:this.password}
                ).then((response)=>{
                    console.log(response);
                    console.log("signup");
                    this.msg="user created"
                });
            }else if((this.isSignUp||this.isLogin)&&this.isLogin){
                axios.post(`http://localhost:4000/api/posts/read`,
                {username:this.username, password:this.password,msg:this.msg}
                ).then((response)=>{
                    console.log(response);
                    console.log("login");
                    this.reponse=response;
                    this.msg = response.data.msg;
                });
            }else{
                axios.post(`http://localhost:4000/api/posts/delete`,
                {username:this.username, password:this.password,msg:this.msg}
                ).then((response)=>{
                    console.log(response);
                    console.log("login");
                    this.reponse=response;
                    this.msg = response.data.msg;
                });
            }
            console.log('username:', this.username);
            console.log('password:', this.password);
            console.log('message:', this.msg);

        }
    },
    data(){
        return{
            username:"",
            password:"",
            response:"",
            msg:"",
        }
    }
}
</script>

<style scoped>
.inp-username,
.inp-password{
    display: block;
    text-align: center;
    margin-left: 46.5%;
    margin-bottom: 10px;
}
</style>