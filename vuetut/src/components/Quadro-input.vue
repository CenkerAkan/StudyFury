<template>
    <hr>

    <p>Update User</p>
    <input  class="inp-username" type="text" v-model="oldUsername" placeholder="enter old username">
    <input  class="inp-password" type="text" v-model="oldPassword" placeholder="enter old password">
    <input  class="inp-password" type="text" v-model="newUsername" placeholder="enter new password">
    <input  class="inp-password" type="text" v-model="newPassword" placeholder="enter new password">
    <button type="submit" @click="
        logCredentials
    ">Update user settings</button>
    <p>feedback message: {{msg}}</p>
</template>

<script>
import axios from 'axios';
export default {
    props:{
    },
    methods:{
        logCredentials() {
            axios.post(`http://localhost:4000/api/posts/delete`,
            {username:this.oldUsername, password:this.oldPassword}
            ).then((response)=>{
                console.log(response);
                console.log("login");
                this.reponse=response;
                this.msg = response.data.msg;
            });
            console.log('username:', this.oldUsername);
            console.log('password:', this.oldPassword);
            console.log('message:', this.msg);

            axios.post(`http://localhost:4000/api/posts/create`,
            {username:this.newUsername, password:this.newPassword}
            ).then((response)=>{
                console.log(response);
                console.log("signup");
            });
        
            console.log('username:', this.newUsername);
            console.log('password:', this.newPassword);
            console.log('message:', this.msg);

        }
    },
    data(){
        return{
            oldUsername:"",
            oldPassword:"",
            newUsername:"",
            newPassword:"",
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
    margin-left: 46.5%;
    margin-bottom: 10px;
}
</style>