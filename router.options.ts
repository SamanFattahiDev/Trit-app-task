import type {RouterConfig} from '@nuxt/schema'
import {createWebHashHistory, createWebHistory} from 'vue-router'

export default <RouterConfig>{
    // https://router.vuejs.org/api/interfaces/routeroptions.html
    history: base => createWebHistory()
}