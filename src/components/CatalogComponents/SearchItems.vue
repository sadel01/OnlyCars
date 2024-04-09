<template> 
    
    <!--- Mejorar clase padre para los containers y hacer independiente cada unos.-->
    <div class="container container2">
        <div class="searchItems">
            <input type="text" placeholder="Search for a car" v-model="search" @input="inputItems" />
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

.container.container2{
    width: 80%; /* modified */
    height: 20%;
    background-color: #1f1f1f;
    border-radius: 10px;
    margin-left: 5%;
}

.searchItems > input {
    width: 80%;
    margin-left: 1%;
    border-radius: 10px;
    border: none;
    padding-top: 3%;
    padding-bottom: 3%;
    margin-top: 5%;
}
.searchItems > input:focus {
    outline: none;
    border-color: yellow; /* change the color to your desired color */
}

</style>