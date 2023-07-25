console.log('hello,vue');
const app=Vue.createApp({// bu parantez bir objeyi simgeliyor
    //template: '<h2> I am the template</h2>' // 1-mesela bu örnekte div'in içine bu hml kodunu yerleştiriyor
    data(){// 2- diyelim ki dinamiklik istiyorsun, o zaman objenin içinde bir fonksiyon(data) tanımla, daha sonra bu fonksiyonun dönüşüne istediğin değişkeni ve değeri ata
        return{
            title:'The Final Empire',
            age:45,
            prepName: "Cenker Akan",
            github:"github.com/CenkerAkan",
            linkedIn:"www.linkedin.com/in/cenker-akan",
            showComm:false,
            mouseX:0,
            mouseY:0
        }
    },
    methods:{
        changeTitle(title){
            this.title=title// bu da js tarafında dinamik değişim sağlama
        },
        changeCom(){
            this.showComm=!this.showComm
        },
        handleMousemove(e){
            this.mouseX=e.offsetX
            this.mouseY=e.offsetY    
        }
    }
});

app.mount('#app');// artık app objemid, id'si div olan yerdeki her şeyi kontrol edebiliyor
// yani div'in içindek her şeyi