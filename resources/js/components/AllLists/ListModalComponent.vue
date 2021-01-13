<template>
    <!-- Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <!-- Modal title -->
                <h5 class="modal-title" id="addModalLabel">Create a new list</h5>
                <button type="button" class="close" v-on:click="emptyInput()" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- Modal body -->
                <form id="add_list_form" autocomplete="off"> 
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="ListName">List name</label>
                            <input type="text" class="form-control" id="namelist" placeholder="Enter the name of the list" focus>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="emptyInput()"  data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-on:click="stopDefault()" data-dismiss="modal"> Create List</button>    
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
         data: function(){
            return{
                ok:1,
                id:undefined,
            }
        },
        mounted() {
            console.log('Ok');
        },
    
        methods: {
            async stopDefault(){
                var form = document.getElementById("add_list_form");
                var listname = $('#namelist').val();
                function handleForm(event) { event.preventDefault(); } 
                form.addEventListener('submit', handleForm);
                // Check if the list name is empty, if NOT add a new list component
                if(listname != ''){
                    let ls= await this.addList(listname);
                    this.$parent.$parent.lists.push(ls);
                }
                this.emptyInput();
            },
            emptyInput(){
                $('#namelist').val('');
            },
            async addList(name){
                let ls;
                await axios.post('/lists/store',{name: name}).then(res => {
                    ls=res.data;
                });
                return ls;
                
            }
        }
    }
    

</script>