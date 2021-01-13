<template>
    <div class="container" id="lists">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">My lists</div>
                    <all-list></all-list>
                    
                    <div class="card-body text-center">
                        <button class="btn btn-primary btn-round btn-add text-center font-weight-bold align-middle float-right btn-text-align" data-toggle="modal" data-target="#addModal">+</button>
                    </div>

                </div>
            </div>
        </div>

    <new-list-modal></new-list-modal>
    <edit-list-modal></edit-list-modal>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                editId: -1,
            } 
        },
        mounted() {
            console.log("Ok")
        },
        methods: {
            SetEditId(id){
                this.editId=id;
            },
            CopyLink(id){
                navigator.clipboard.writeText("localhost:8000/lists/show/"+this.$parent.lists[id].id);
            },
        },
    }
</script>