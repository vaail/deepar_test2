const init = () => {
    const sourceVideo = document.createElement('video')
    const deeparCanvas = document.createElement('canvas')
    const streamVideo = document.querySelector("#videoElement");
    let filterInited = false;

    sourceVideo.setAttribute('autoplay', '');
    sourceVideo.setAttribute('muted', '');
    sourceVideo.setAttribute('playsinline', '');

    const initVideoSource = () => {
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

            deepAR.setVideoElement(sourceVideo)
        }
    }

    const deepAR = DeepAR({
        licenseKey: 'fea9ce44dbbd37971a8e3103f25e9d2dc20aa7f20289158ff84ec2c76ab739577644cf37c0d2bc57',
        canvasWidth: 4096,
        canvasHeight: 2160,
        canvas: deeparCanvas,
        numberOfFaces: 1, // how many faces we want to track min 1, max 4
        onInitialize: () => {
            if (!filterInited) {
                deepAR.switchEffect(0, 'slot', 'scripts/effects/beauty', () => {
                    deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', 'chin_raise', 0)
                    deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', 'big_eyes', 0)
                    deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', 'face_narrow', 0)
                    deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', 'nose_small', 0)
                    deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', 'smoothingAmount', 0)
                    deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', 'softAmount', 0)
                    deepAR.changeParameterBool('eyes', '', 'enabled', false)
                });
                filterInited = true
            }

            deepAR.startVideo()
            windowVisibilityHandler(deepAR)

            initVideoSource()
        }
    })

    deepAR.onVideoStarted = function() {
        streamVideo.srcObject = deeparCanvas.captureStream()
        streamVideo.muted = true
        streamVideo.play()
    };

    const windowVisibilityHandler = (deepAR) => {
        const hiddenStatusPropName = getHiddenStatusType()

        const isEventListenerAvailable = document.addEventListener !== undefined
        const isPageHiddenAPIAvailable = hiddenStatusPropName !== undefined

        if (!isEventListenerAvailable || !isPageHiddenAPIAvailable) {
            console.error("Warning: Page Visibility API not supported")
        } else {
            document.addEventListener(
                getVisibilityChangeHandlerName(),
                onVisibilityChange,
                false
            )
        }

        function getHiddenStatusType() {
            if (document.hidden !== undefined) { // Opera 12.10 and Firefox 18 and later support
                return "hidden"
            } else if (document.msHidden !== undefined) {
                return "msHidden"
            } else if (document.webkitHidden !== undefined) {
                return "webkitHidden"
            }
        }

        function getVisibilityChangeHandlerName() {
            if (document.visibilityState !== undefined) { // Opera 12.10 and Firefox 18 and later support
                return "visibilitychange"
            } else if (document.msVisibilityState !== undefined) {
                return "msvisibilitychange"
            } else if (document.webkitVisibilityState !== undefined) {
                return "webkitvisibilitychange"
            }
        }

        function onVisibilityChange() {
            if (document[hiddenStatusPropName]) {
                deepAR.stopVideo()
            } else {
                deepAR.startVideo()
            }
        }
    }

    sourceVideo.addEventListener('play', function () {
        if (this.paused && this.ended) {
            deepAR.stopVideo()
        }
    }, 0)

    sourceVideo.addEventListener('loadedmetadata', function() {
        deepAR.canvasWidth = sourceVideo.videoWidth
        deepAR.canvasHeight = sourceVideo.videoHeight
    })

    const maskParams = ['chin_raise', 'big_eyes', 'face_narrow', 'nose_small', 'smoothingAmount']
    maskParams.forEach(key => {
        document.querySelector(`#${key}`).addEventListener('input', event => {
            document.querySelector(`#${key}Value`).value = event.target.valueAsNumber;

            deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', key, event.target.valueAsNumber)
        });

        document.querySelector(`#${key}Value`).addEventListener('input', event => {
            document.querySelector(`#${key}`).value = event.target.valueAsNumber;

            deepAR.changeParameterFloat('faceMorphFluffy', 'MeshRenderer', key, event.target.valueAsNumber)
        });
    })

    deepAR.downloadFaceTrackingModel('scripts/lib/models-68-extreme.bin');
}

init();
