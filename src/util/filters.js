export default {
    toFullUrl: (url)=> ~url.indexOf('http://') ? url : '/' + url
}
