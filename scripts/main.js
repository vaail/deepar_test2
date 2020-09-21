const sourceVideo = document.createElement('video')
sourceVideo.style.position = 'fixed'
sourceVideo.style.top = 0
sourceVideo.style.left = 0
sourceVideo.style.width = '100%'
sourceVideo.style.height = '100%'
window.document.body.appendChild(sourceVideo)

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: {
            width: { ideal: 4096 },
            height: { ideal: 2160 },
            facingMode: 'front'
        }
    })
        .then(function (stream) {
            sourceVideo.srcObject = stream
            sourceVideo.muted = true

            setTimeout(function() {
                sourceVideo.play();
            }, 50);
        }).catch();
}
