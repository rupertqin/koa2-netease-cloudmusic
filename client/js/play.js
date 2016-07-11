import Vue from 'vue'
import superagent from 'superagent'
import querystring from 'querystring'
import APlayer from 'APlayer'
import 'APlayer/dist/APlayer.min.css'


if ($('body.play-page').length) {

    const playType = querystring.parse(location.search.slice(1)).type
    let songs = []
    switch (playType) {
        case 'radio':
            songs = feData.songs.map((song) => {
                return {
                    title: song.title,
                    author: song.artist,
                    url: song.url_best,
                    pic: feData.picUrl || song.pic_url
                }   
            })
            
            break;
        default :
            songs = feData.songs.map((song) => {
                return {
                    title: song.title,
                    author: song.artist,
                    url: song.url_best,
                    pic: feData.picUrl
                }   
            })
            break;
    }
    var ap = new APlayer({
        element: document.getElementById('player'),
        narrow: false,
        autoplay: true,
        mutex: true,
        theme: '#615754',
        music: songs
    });
    ap.init();
    ap.play();

}

