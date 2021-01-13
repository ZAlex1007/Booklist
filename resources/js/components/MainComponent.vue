<template>
    <div>
        <show-lists></show-lists>
        <main-books :list_s=showList :user_id=user_id ref="booksRef"></main-books>
        <loading-screen></loading-screen>
    </div>
    
</template>

<script>
    export default {
        data: function () {
            return {
                lists: [],
                state: 0,       // 0 - all list     1 - elements of one list
                showList: {},
            }
        },
        mounted() {
            // Get the lists
            axios.get('/lists').then(resp => {
                this.lists=resp.data;
            });

        },
        props: ['user_id'],
        methods: {
            async changeState(index){
                if(this.state==0){
                    this.showList=this.lists[index];                        // Pass the list
                    this.$refs.booksRef.list=this.showList;
                    console.log(this.$refs.booksRef.user_id)
                    this.state=1;                                           // Change state
                    $('#lists').hide();                                     // Hide the lists
                    $('#loading').show();
                    // Call the function for getting the books for the list
                    await this.$refs.booksRef.GetBooksFromList(this.showList.id);                  
                    $('#loading').hide();
                    $('#books').show();                                     // Show the books               
                } else{
                    $('#books').hide();                     // Hide the books
                    $('#lists').show();                     // Show the lists
                    this.state=0;                           // Change state
                }
            }
        },
    }
</script>