import Vue from 'vue'
import superagent from 'superagent'
import querystring from 'querystring'
import APlayer from 'APlayer'
import DPlayer from 'dplayer'
import 'APlayer/dist/APlayer.min.css'
import 'dplayer/dist/DPlayer.min.css'


if ($('body.play-page').length) {

    const playType = querystring.parse(location.search.slice(1)).type
    let songs = []
    switch (playType) {
        case 'mv':
            
            break;
        case 'radio':
            songs = feData.songs.map((song) => {
                return {
                    title: song.title,
                    author: song.artist,
                    url: song.url_best,
                    pic: (feData.picUrl || song.pic_url) + '?param=132y132'
                }   
            })
            
            break;
        default :
            songs = feData.songs.map((song) => {
                return {
                    title: song.title,
                    author: song.artist,
                    url: song.url_best,
                    pic: (feData.picUrl || song.pic_url) + '?param=132y132'
                }   
            })
            break;
    }
    if (playType === 'mv') {
        var dp = new DPlayer({
            element: document.getElementById('dplayer'),
            autoplay: false,
            theme: '#FADFA3',
            loop: true,
            video: {
                url: feData.url_best,
                pic: feData.pic_url
            },
            danmaku: {
                id: '{{mv_id}}',
                api: 'https://dplayer.daoapp.io/',
                token: 'tokendemo',
                maximum: 1000
            }
        });
        dp.init();

    } else {
        var ap = new APlayer({
            element: document.getElementById('player'),
            narrow: false,
            autoplay: true,
            mutex: true,
            theme: '#615754',
            music: songs
        });
        ap.init();
        if (!/(android)/i.test(navigator.userAgent)) {
            ap.play();
        }
        
    }

}

