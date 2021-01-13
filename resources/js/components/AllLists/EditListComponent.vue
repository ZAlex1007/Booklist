<template>
    <!-- Modal -->
    <div class="modal fade" id="editListModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <!-- Modal title -->
                <h5 class="modal-title" id="addModalLabel">Edit the list</h5>
                <button type="button" class="close" v-on:click="emptyInput()" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- Modal body -->
                <form id="edit_list_form" autocomplete="off"> 
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="Listname">List name</label>
                            <input type="text" class="form-control" id="editlistname" placeholder="Enter the title of the list" :value="this.$parent.$parent.lists[this.$parent.editId].name" v-if="this.$parent.$parent.lists[this.$parent.editId]!=undefined">
                            <input type="text" class="form-control" id="editlistname" placeholder="Enter the title of the list" v-else>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" v-on:click="deleteList()"  data-dismiss="modal">Remove list</button>
                        <button type="submit" class="btn btn-primary" v-on:click="stopDefault()" data-dismiss="modal">Edit list</button>    
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                ok: 1,
            }
        },
        mounted() {
            console.log('Ok');
        },
        methods: {
            stopDefault(){
                var form = document.getElementById("edit_list_form");
                function handleForm(event) { event.preventDefault(); } 
                form.addEventListener('submit', handleForm);
                // Get the data of form
                let listname=$(" #editlistname ").val();
                if(listname!=''){
                    this.editList(listname);
                }
                this.emptyInput();
            },
            emptyInput(){$(" #editlistname ").val('')},
            async editList(name){
                var list_id=this.$parent.$parent.lists[this.$parent.editId].id;
                let edit_ls = await this.UpdateListDB(list_id, name);
                Vue.set(this.$parent.$parent.lists, this.$parent.editId, edit_ls);
            },
            async UpdateListDB(list_id, name){
                let ls_edit;
                await axios.put('/lists/'+list_id+'/update',{name: name}).then(res=>{
                    ls_edit=res.data;
                });
                return ls_edit
            },
            deleteList(){
                var list_id=this.$parent.$parent.lists[this.$parent.editId].id;
                axios.delete('lists/'+list_id+'/delete');
                this.$parent.$parent.lists.splice(this.$parent.editId,1);
            },
        }
    }

</script>