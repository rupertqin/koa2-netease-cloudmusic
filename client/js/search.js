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
            if (!this.key) return
            const sd = await superagent.post('/api/search')
                .send({
                    key: this.key
                })
            console.log(sd)
            this.songs = sd.body.songs
        }
    }
})


$('.menu .item').tab()
