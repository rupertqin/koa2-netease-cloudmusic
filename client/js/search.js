import Vue from 'vue'
import superagent from 'superagent'

const app = new Vue({
    el: 'body',
    data: {
        key: '',
        songs: []
    },
    methods: {
        search: async function() {
            const sd = await superagent.post('/search')
                .send({
                    key: this.key
                })
            console.log(sd)
            this.songs = sd.body.result.songs
        }
    }
})


$('.menu .item').tab()
