import Vue from 'vue'
import superagent from 'superagent'
import APlayer from 'APlayer'
import 'APlayer/dist/APlayer.min.css'

if ($('body.play-page').length) {

    var ap = new APlayer({
        element: document.getElementById('player'),
        narrow: false,
        autoplay: true,
        mutex: true,
        theme: '#615754',
        music: {
            title: feData.title,
            author: feData.artist,
            url: feData.url_best,
            pic: feData.pic_url,
        }
    });
    ap.init();

}

