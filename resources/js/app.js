/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// All lists
Vue.component('all-list', require('./components/AllLists/ListComponent.vue').default);
Vue.component('new-list-modal', require('./components/AllLists/ListModalComponent.vue').default);
Vue.component('show-lists', require('./components/AllLists/ShowListsComponent.vue').default);
Vue.component('edit-list-modal', require('./components/AllLists/EditListComponent.vue').default);

// Books of the list
Vue.component('main-books', require('./components/Books/ShowBooksComponent.vue').default);
Vue.component('books', require('./components/Books/BooksComponent.vue').default);
Vue.component('add-book-modal', require('./components/Books/AddBookModalComponent.vue').default);
Vue.component('edit-book-modal', require('./components/Books/EditBookModalComponent.vue').default);

Vue.component('loading-screen', require('./components/LoadingAnimation/LoadingScreenComponent.vue').default);

Vue.component('main-app', require('./components/MainComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});
