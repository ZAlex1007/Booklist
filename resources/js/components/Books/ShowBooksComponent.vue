<template>
    <div class="container" id="books">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Books of {{list.name}}</div>
                    <books></books>
                    
                    <div class="card-body align-middle">
                        <button class="btn btn-primary btn-round btn-add text-center font-weight-bold align-middle float-right btn-text-align" data-toggle="modal" data-target="#addBookModal" v-if="user_id==list.user_id">+</button>
                        <button class="btn btn-primary text-center font-weight-bold align-middle float-left v-align" v-on:click="Back()">Back</button>
                    </div>
                </div>
            <add-book-modal v-if="user_id==list.user_id"></add-book-modal>
            <edit-book-modal v-if="user_id==list.user_id"></edit-book-modal>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return{
                currentEditIndex: 0,
                // The books cointained in the list
                books: [],
                list: {},
            }
        },
        async mounted() {
            $('#books').hide();
            // Call function if the componenent is called in blade file
            if(this.source=="blade"){
                this.list = JSON.parse(this.list_s);
                await this.GetBooksFromList(this.list.id);
                $('#books').show();
            }  
        },
        props: ['list_s', 'user_id', 'source'],
        methods: {
            async GetBooksFromList(listid){
                await axios.get("/books/"+listid).then(resp =>{
                        this.books=resp.data;
                    }).catch(err => {
                        console.log(err);
                    });
            },
            GetEditBookIndex(index){
                this.currentEditIndex=index;
                //Edit the selected status
                switch (this.books[this.currentEditIndex].status) {
                    case 'UR':
                         $( "#editbookstatus")[0].selectedIndex=0;
                        break;
                    case 'R':
                        $( "#editbookstatus")[0].selectedIndex=1;
                        break;
                    case 'CR':
                        $( "#editbookstatus")[0].selectedIndex=2;
                        break;
                    default:
                        break;
                } 
            },
            Back(){
                if(this.source=="blade"){
                    window.location="/";
                } else{
                    this.$parent.changeState();
                }
            },
        },
    }
</script>