<template>
    <div>
        <div v-for="(sneaker, index) in sneakersData" :key="index">
            <sneaker 
            name=sneaker.name
            image_url=sneaker.image_url
            price=sneaker.price[0] />
        </div>
    </div>
</template>
<script>
import sneaker from "@/components/sneaker.vue";
export default {
    props:{
        sneakersData:{
            type:Array
        }
    },
    components:{
        sneaker
    }
}
</script>
<style lang="scss" scoped>

</style>
