<template>
    <!-- Modal -->
    <div class="modal fade" id="editBookModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <!-- Modal title -->
                <h5 class="modal-title" id="addModalLabel">Edit the book</h5>
                <button type="button" class="close" v-on:click="emptyInput()" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- Modal body -->
                <form id="edit_book_form" autocomplete="off"> 
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="BookTitle">Book title</label>
                            <input type="text" class="form-control" id="editbooktitle" placeholder="Enter the title of the book" :value="this.$parent.books[this.$parent.currentEditIndex].title" v-if="this.$parent.books[this.$parent.currentEditIndex]!=undefined">
                            <input type="text" class="form-control" id="editbooktitle" placeholder="Enter the title of the book" v-else>
                        </div>
                        <div class="form-group">
                            <label for="BookAuthor">Book author</label>
                            <input type="text" class="form-control" id="editbookauthor" placeholder="Enter the author of the book" :value="this.$parent.books[this.$parent.currentEditIndex].author" v-if="this.$parent.books[this.$parent.currentEditIndex]!=undefined">
                            <input type="text" class="form-control" id="editbookauthor" placeholder="Enter the author of the book" v-else>
                        </div>
                        <div class="form-group">
                            <label for="BookStatus">Select book status</label>
                                <select class="form-control" id="editbookstatus">
                                    <option value="UR">Unread</option>
                                    <option value="R">Read</option>
                                    <option value="CR">Currently reading</option>
                                </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" v-on:click="deleteBook()"  data-dismiss="modal">Remove book</button>
                        <button type="submit" class="btn btn-primary" v-on:click="stopDefault()" data-dismiss="modal">Edit book</button>    
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
                index: -1,
            }
        },
        mounted() {
            console.log('Ok');
        },
        methods: {
            stopDefault(){
                var form = document.getElementById("edit_book_form");
                var booktitle = $('#editbooktitle').val();
                var bookauthor = $('#editbookauthor').val();
                var bookstatus = $( "#editbookstatus option:selected").val();
                function handleForm(event) { event.preventDefault(); } 
                form.addEventListener('submit', handleForm);
                // Check if the list name is empty, if NOT add a new list component
                if(booktitle != '' && bookauthor != ''){
                   this.editBook(booktitle,bookauthor,bookstatus);
                }
                this.emptyInput();
            },
            emptyInput(){
                $('#booktitle').val('');
                $('#bookauthor').val('');
            },
            editBook(title,author,status){
                // DB
                var edit_id=this.$parent.books[this.$parent.currentEditIndex].id;
                axios.put('/books/'+edit_id+'/update', {title: title, author:author, status:status});
                // Change in obj for dynamic UI
                Vue.set(this.$parent.books, this.$parent.currentEditIndex, {
                    id: edit_id,
                    title: title,
                    author: author,
                    status: status,
                });
            },
            deleteBook(){
                var delete_id=this.$parent.books[this.$parent.currentEditIndex].id;
                axios.delete('/books/'+delete_id+'/delete');
                this.$parent.books.splice(this.$parent.currentEditIndex, 1);
            }
           
        }
    }

</script>