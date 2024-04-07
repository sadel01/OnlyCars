<template> 
    
    
    <div class="container">
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

.searchBar > .container {
    width: %; /* modified */
    height: 40%;
}

.searchItems > input {
    width: 95%;
    margin-left: 1%;
}
</style>