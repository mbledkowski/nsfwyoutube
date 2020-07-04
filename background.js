const videoID = () => {
    let url = new URL(window.location.href)
    return url.searchParams.get("v")
}

const playlistID = () => {
    let url = new URL(window.location.href)
    return url.searchParams.get("list")
}

const timestamp = () => {
    let url = new URL(window.location.href)
    return /\d*/g.exec(url.searchParams.get("t"))[0]
}

const bypass = () => {
    let pID = playlistID()
    let t = timestamp()
    let additionalOptions = ""

    //console.log(t)

    if (pID !== null) { additionalOptions = `&q=${pID}` }
    //console.log(t !== null)
    if (t !== "") {
        additionalOptions = `${additionalOptions}&start=${t}`
        //console.log(additionalOptions)
    }

    document.querySelector("yt-playability-error-supported-renderers > div#container").innerHTML = `<iframe name="nsfwyoutube-addon" width="100%" height="100%" src="https://www.youtube.com/embed/${videoID()}?autoplay=1&modestbranding=1${additionalOptions}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
}

const removeObject = () => {
    document.querySelector("yt-playability-error-supported-renderers > div#container").innerHTML = ""
}

const isAgeRestricted = () => {
    if (document.querySelectorAll('.reason.style-scope.yt-player-error-message-renderer').length > 0) {
        return true
    }
    return false
}

let tempVideoID = "" // ID of recent checked video

setInterval(() => {
    let id = videoID()
    if (id !== tempVideoID && id !== null) {
        if (isAgeRestricted()) {
            bypass()
        }
        tempVideoID = id
    } else if (id === null) {
        removeObject()
    }
}, 2250)