import Vue from 'vue'
import superagent from 'superagent'
import APlayer from 'APlayer'

const app = new Vue({
    el: 'body',
    data: {
        key: '',
        songs: []
    },
    methods: {
        search: async function() {
            const sd = await superagent.post('/api/search')
                .send({
                    key: this.key
                })
            console.log(sd)
            this.songs = sd.body.result.songs
        }
    }
})


$('.menu .item').tab()
