<template>
    <div class="outer">
        <div id="lists" class="inner">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Status</th>
                    <th scope="col" v-if="this.$parent.user_id==this.$parent.list.user_id">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Apply  bg colour in function of status -->  
                    <tr v-for="(book, i) in this.$parent.books" :key="book.id" class="status" :class="book.status" >
                        <td>{{book.title}}</td>
                        <td>{{book.author}}</td>
                        <td v-if="book.status=='UR'">Unread</td>
                        <td v-else-if="book.status=='R'">Read</td>
                        <td v-else-if="book.status=='CR'">Currently reading</td>
                        <td v-if="$parent.user_id==$parent.list.user_id"><button class="edit-btn" data-toggle="modal" data-target="#editBookModal" v-on:click="$parent.GetEditBookIndex(i)"><img src="/storage/edit-16.png"></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log("Ok");
        },
    }
</script>