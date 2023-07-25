<template>
    <div class="sample-log-in">
        <p>
        this is how components work. Hello from {{authorName}}
        </p>
        <p>
            this is hw props work. Hello from {{intext}}
        </p>
    </div>    
</template>

<script>
export default {
    name:'header-name',
    props:{
        intext: String,
    },
    data(){
        return{
            authorName:"e@e"
        }
    }
}
</script>

<style scoped>
    .sample-log-in{
        font-size: 25px;
        font-weight: bold;
        color: orangered;
    }
</style>