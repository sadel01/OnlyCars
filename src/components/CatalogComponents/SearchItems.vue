<template> 
    
    <!--- Mejorar clase padre para los containers y hacer independiente cada unos.-->
    <div class="container searchContainer">
        <div class="searchItems">
            <input class="inputCarName" type="text" placeholder="Search for a car" v-model="search" @input="inputItems" />
        </div>
        <div class="si">
            
        </div>
    </div>
    
</template>

<script>   
export default {
    data() {
        return {
            search: '',
        };
    },
    methods: {
        inputItems() {
            this.$emit('inputItems', this.search);
        },
    },
};
</script>

<style>

.container.searchContainer{
    width: 80%; /* modified */
    height: 80%;
    background-color: #1f1f1f;
    border-radius: 10px;
    margin-left: 5%;
}

.inputCarName {
    width: 90%;
    margin-left: 4%;
    border-radius: 10px;
    border: none;
    padding-top: 3%;
    padding-bottom: 3%;
    margin-top: 5%;
    
}
.searchItems > input:focus {
    outline: none;
    border-color: rgb(255, 0, 0); /* change the color to your desired color */
}

</style>