<template>
    <div>
        <!-- <p>{{hashdata}}</p> -->
        <h1>will be rediredted to home page </h1>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            hashdata:""
        }
    },
    mounted(){
        // //console.log(this.$route.fullPath);
        // //console.log(this.$route.query.access_token)
        // //console.log("Hash = "+location.hash)
        this.hashdata=location.hash
        this.hashdata.split("&")
        // //console.log(this.hashdata.split("&"))
        let a = this.hashdata.split("&");
        // //console.log(a)
        let firstIndex = a[0].split("#")
        //console.log(firstIndex[1])
        // let b = a[0].split("=")
        // //console.log(b)
        // let fbtoken=b[1]
        // //console.log(fbtoken)
        let at = firstIndex[1]

        this.$store.dispatch("authentication/updateLoginFB", at )
       .then((res)=>{
           //console.log(" fb through authentiction")
           this.$router.replace("/"); 
        //  this.login.email = null;
        //   this.login.password = null;
        //   let user = this.$store.getters["authentication/getUser"];
       })
        // if(firstIndex[1]){
        //     axios.post("/facebook-signup-login",firstIndex[1])
        //     .then((res)=>{
        //         //console.log("got sucess fb token")
        //         //console.log(res)
        //         setTimeout(() => {
        //            this.$router.replace("/"); 
        //         }, 200);
                
        //     })
        //     .catch((err)=>{
        //         //console.log("failed to send fb token")
        //         //console.log(err)
        //     })
        // }
        // else{
        //     //console.log("no fb token ")
        // }
        // let fbToken = this.hashdata[1].split("&")
        // //console.log(fbToken)
      }
}
</script>
<style lang="scss" scoped>

</style>