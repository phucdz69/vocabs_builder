import { createRouter, createWebHistory } from 'vue-router';

import Words from './views/Words.vue'
import Show from './views/Show.vue'
import New from './views/New.vue'
import Edit from './views/Edit.vue'
import Delete from './views/Delete.vue' 

const routes = [
    {
        path: '/',
        redirect: '/words'
    },
    {
        path: '/words',
        name: 'Words',
        component: Words
    },
    {
        path: '/words/new',
        name: 'New',
        component: New
    },
    {
        path: '/words/show/:id',
        name: 'Show',
        component: Show
    },
    {
        path: '/words/edit/:id',
        name: 'Edit',
        component: Edit
    },
    {
        path: '/words/delete/:id', 
        name: 'Delete',           
        component: Delete
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router