<template>
    <div class="container" id="lists">
        <div class="outer">
        <div class="inner">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Copy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in this.$parent.$parent.lists" :key="list.id">
                        <td class="hover-dark list-btn col-8" v-on:click="$parent.$parent.changeState(index)"><div><h5>{{ list.name }}</h5></div></td>
                        <td class="hover-blue pointer" data-toggle="modal" data-target="#editListModal" v-on:click="$parent.SetEditId(index)"><button class="edit-btn col-4" ><img src="/storage/edit-16.png"></button></td>
                        <td class="hover-blue pointer" v-on:click="$parent.CopyLink(index)"><button class="edit-btn col-4" ><img src="/storage/copy-16.png"></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
</template>    

<script>
    export default {
        mounted() {
            console.log("Ok")
        },
        methods: {
            redirect(url){
                window.location=url;
            },
        },
    }
</script>
