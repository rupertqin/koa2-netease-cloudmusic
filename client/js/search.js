import Vue from 'vue'
import superagent from 'superagent'

if ($('body.search-page').length) {
const app = new Vue({
    el: 'body',
    created: async function() {
        // await this.search()
    },
    data: {
        key: localStorage.search || '',
        result: JSON.parse(localStorage.result || '""')
    },
    methods: {
        search: async function() {
            if (!this.key) return
            const sd = await superagent.post(`api/search`).send({ key: this.key })
            console.log(sd)
            this.result = sd.body
            localStorage.setItem('search', this.key)
            localStorage.setItem('result', JSON.stringify(this.result))
        }
    }
})


$('.menu .item').tab()
}
