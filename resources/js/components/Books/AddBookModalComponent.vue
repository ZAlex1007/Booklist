<template>
    <!-- Modal -->
    <div class="modal fade" id="addBookModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <!-- Modal title -->
                <h5 class="modal-title" id="addModalLabel">Add a new book</h5>
                <button type="button" class="close" v-on:click="emptyInput()" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- Modal body -->
                <form id="add_book_form" autocomplete="off"> 
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="BookTitle">Book title</label>
                            <input type="text" class="form-control" id="booktitle" placeholder="Enter the title of the book">
                        </div>
                        <div class="form-group">
                            <label for="BookAuthor">Book author</label>
                            <input type="text" class="form-control" id="bookauthor" placeholder="Enter the author of the book">
                        </div>
                        <div class="form-group">
                            <label for="BookStatus">Select book status</label>
                                <select class="form-control" id="bookstatus">
                                    <option value="UR">Unread</option>
                                    <option value="R">Read</option>
                                    <option value="CR">Currently reading</option>
                                </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="emptyInput()"  data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-on:click="stopDefault()" data-dismiss="modal">Add book</button>    
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
                ok: 1
            }
        },
        mounted() {
            console.log('Ok');
        },
        methods: {
            stopDefault(){
                var form = document.getElementById("add_book_form");
                var booktitle = $('#booktitle').val();
                var bookauthor = $('#bookauthor').val();
                var bookstatus = $( "#bookstatus option:selected").val();
                function handleForm(event) { event.preventDefault(); } 
                form.addEventListener('submit', handleForm);
                // Check if the list name is empty, if NOT add a new list component
                if(booktitle != '' && bookauthor != ''){
                    this.addBook(booktitle,bookauthor,bookstatus);
                }
                this.emptyInput();
            },
            emptyInput(){
                $('#booktitle').val('');
                $('#bookauthor').val('');
                $('#bookstatus').val('UR');
            },
            async addBook(title,author,status){
                var list_id=this.$parent.$parent.showList.id;
                // DB
                let id;
                await axios.post('/books/store', {title: title, author: author, status:status, list_id: list_id}).then(res => {
                    id=res.data;
                });
                // Change in obj for dynamic UI
                this.$parent.books.push({
                    id: id,
                    title: title,
                    author: author,
                    status: status,
                })
            }
        }
    }
    

</script>