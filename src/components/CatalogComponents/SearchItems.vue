<template> 
    <div class="searchItems">
        <input type="text" placeholder="Search for a car" v-model="search" @input="inputItems" />
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