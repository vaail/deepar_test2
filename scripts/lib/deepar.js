var createDeepARModule = function () {
    var _scriptDir = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0;
    return "undefined" != typeof __filename && (_scriptDir = _scriptDir || __filename), function (createDeepARModule) {
        var e, aa;
        createDeepARModule = createDeepARModule || {}, (e = e || (void 0 !== createDeepARModule ? createDeepARModule : {})).ready = new Promise(function (a) {
            aa = a
        }), function (a) {
            function b() {
                this.name = "NotSupportedError", this.message = "getUserMedia is not implemented in this browser"
            }

            function c() {
                this.then = function () {
                    return this
                };
                var r = new b;
                this.catch = function (m) {
                    setTimeout(function () {
                        m(r)
                    })
                }
            }

            function d(r) {
                return f ? k ? navigator.mediaDevices.getUserMedia(r) : new Promise(function (m, q) {
                    if (!p) return q(new b);
                    p.call(navigator, r, m, q)
                }) : new c
            }

            b.prototype = Error.prototype;
            var f = "undefined" != typeof Promise, g = "undefined" != typeof navigator,
                k = g && navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
                p = g && (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.ug || navigator.vg);
            d.Cf = b, d.xg = !(!f || !k && !p), "function" == typeof define && define.Cf ? define([], function () {
                return d
            }) : "object" == typeof module && module.exports ? module.exports = d : (a.navigator || (a.navigator = {}), a.navigator.mediaDevices || (a.navigator.mediaDevices = {}), a.navigator.mediaDevices.getUserMedia || (a.navigator.mediaDevices.getUserMedia = d))
        }(this), function () {
            function a() {
                var m, q, t;
                k && (window.requestAnimationFrame(a), m = Date.now(), p < (q = m - r) && (r = m - q % p, m = e.video, q = e.context, t = e.vf, m && q && t && m.readyState === m.HAVE_ENOUGH_DATA && (e._processFrameVideo(0, t.width, t.height, e.Mf), m = e.video, e.Of && h && ((q = h.tf).bindTexture(q.TEXTURE_2D, e.Of), q.texImage2D(q.TEXTURE_2D, 0, q.RGBA, q.RGBA, q.UNSIGNED_BYTE, m))), e._render()))
            }

            var c = null, d = null, f = null, g = null;
            e.preinitializedWebGLContext = e.canvas.getContext("webgl", {alpha: !1}), e.numberOfFaces || (e.numberOfFaces = 1);
            var k = !1;
            e.process = function () {
            };
            var p = 1e3 / 30, r = 0;
            e.setFps = function (m) {
                p = 1e3 / m
            }, e.startLoop = function () {
                k || (k = !0, window.requestAnimationFrame(a))
            }, e.endLoop = function () {
                k = !1
            }, e.takeScreenshot = function () {
                g(), k || e._render()
            }, e.processFrameRawPixels = function (m, q, t, v) {
                var l = e._malloc(m.length);
                e.HEAPU8.set(m, l), e._processFrameRawPixels(l, q, t, v), k || e._render()
            }, e.setFaceTrackingModel = function (m) {
                e.faceTrackingModelByteArray = m
            }, e.switchEffectByteArray = function (m, q, t) {
                var v;
                c && (v = e._malloc(t.length), e.HEAPU8.set(t, v), c(q, v, t.length, m), k || e._render())
            }, e.switchEffect = function (m, q, t, v) {
                var l = new XMLHttpRequest;
                l.open("GET", t, !0), l.responseType = "arraybuffer", l.onreadystatechange = function () {
                    var w;
                    4 == l.readyState && 200 == l.status && (w = new Uint8Array(l.response), e.switchEffectByteArray(m, q, w), v && v())
                }, l.send(null)
            }, e.clearEffect = function (m) {
                f && (f(m), k || e._render())
            }, e.startVideo = function (m, q) {
                var t;
                e.video ? console.log("video already running") : (e.Lf = !1, e.dg = q, e.Mf = !!m, (t = document.createElement("video")).muted = !0, t.loop = !0, t.controls = !0, t.setAttribute("playsinline", "playsinline"), t.style.width = "100%", t.style.height = "100%", (m = document.createElement("div")).appendChild(t), m.style.width = "1px", m.style.height = "1px", m.style.position = "absolute", m.style.top = "0px", m.style.left = "0px", m.style["z-index"] = "-1", document.body.appendChild(m), e.Gf = m, e.video = t, m = e.dg || !0, e.Qf(), navigator.mediaDevices.getUserMedia({video: m}).then(function (v) {
                    try {
                        t.srcObject = v
                    } catch (l) {
                        t.src = URL.createObjectURL(v)
                    }
                    e.Sf(), setTimeout(function () {
                        t.play()
                    }, 50)
                }).catch(function () {
                    e.Rf()
                }), t.addEventListener("loadedmetadata", function () {
                    var v = document.createElement("canvas"), l = v.getContext("2d");
                    e.vf = v, e.context = l, l = 320 / t.videoWidth, v.width = Math.floor(t.videoWidth * l), v.height = Math.floor(t.videoHeight * l), e.Af = e._malloc(v.width * v.height * 4), e.Uf()
                }))
            }, e.shutdown = function () {
                e.stopVideo(), d()
            }, e.setVideoElement = function (m, q) {
                function t() {
                    var v = document.createElement("canvas"), l = v.getContext("2d");
                    e.vf = v, e.context = l, l = 320 / m.videoWidth, v.width = Math.floor(m.videoWidth * l), v.height = Math.floor(m.videoHeight * l), e.Af = e._malloc(v.width * v.height * 4), m.removeEventListener("loadedmetadata", t)
                }

                e.Mf = !!q, e.Lf = !0, (e.video = m).readyState === m.HAVE_ENOUGH_DATA ? t() : m.addEventListener("loadedmetadata", t)
            }, e.stopVideo = function () {
                var m;
                e.Gf && (e.Gf.parentNode.removeChild(e.Gf), e.Gf = null), e.video && (e.Lf || ((m = e.video.srcObject.getVideoTracks()) && 0 < m.length && m[0].stop(), e.video.pause()), e.video = null), e.vf = null, e.Af && e._free(e.Af), e.Af = 0, e.context = null
            }, e.gg = function (m, q, t) {
                if (e.apiObject.onFaceTracked) {
                    for (var v = [], l = 0; l < t; l++) {
                        var w = {
                            detected: 0,
                            translation: [],
                            rotation: [],
                            poseMatrix: [],
                            landmarks: [],
                            landmarks2d: [],
                            faceRect: []
                        }, x = m + l * q, D = x + 4, N = D + 12, ea = N + 12, fa = ea + 64, Kc = fa + 816;
                        for (w.detected = !!e.HEAP32[x / Float32Array.BYTES_PER_ELEMENT], x = 0; x < 3; x++) w.translation.push(e.HEAPF32[D / Float32Array.BYTES_PER_ELEMENT + x]), w.rotation.push(e.HEAPF32[N / Float32Array.BYTES_PER_ELEMENT + x]);
                        for (x = 0; x < 16; x++) w.poseMatrix.push(e.HEAPF32[ea / Float32Array.BYTES_PER_ELEMENT + x]);
                        for (x = 0; x < 204; x++) w.landmarks.push(e.HEAPF32[fa / Float32Array.BYTES_PER_ELEMENT + x]), x < 136 && w.landmarks2d.push(e.HEAPF32[Kc / Float32Array.BYTES_PER_ELEMENT + x]);
                        v.push(w)
                    }
                    e.apiObject.onFaceTracked(v)
                }
            }, e.Uf = function () {
                e.apiObject.onVideoStarted && e.apiObject.onVideoStarted()
            }, e.jg = function () {
                e.apiObject.onInitialize && e.apiObject.onInitialize()
            }, e.hg = function (m) {
                e.apiObject.onFaceVisibilityChanged && e.apiObject.onFaceVisibilityChanged(m)
            }, e.ig = function (m) {
                e.apiObject.onImageVisibilityChanged && e.apiObject.onImageVisibilityChanged(m)
            }, e.Sf = function () {
                e.apiObject.onCameraPermissionGranted && e.apiObject.onCameraPermissionGranted()
            }, e.Rf = function () {
                e.apiObject.onCameraPermissionDenied && e.apiObject.onCameraPermissionDenied()
            }, e.Qf = function () {
                e.apiObject.onCameraPermissionAsked && e.apiObject.onCameraPermissionAsked()
            }, e.Tf = function (m, q, t) {
                var v = document.createElement("canvas"), l = v.getContext("2d");
                v.width = q, v.height = t;
                for (var w = l.getImageData(0, 0, v.width, v.height), x = w.data, D = 0; D < t; D++) for (var N = 0; N < q; N++) {
                    var ea = 4 * ((t - D - 1) * q + N), fa = 4 * (D * q + N);
                    x[fa] = e.HEAPU8[m + ea + 2], x[1 + fa] = e.HEAPU8[m + ea + 1], x[2 + fa] = e.HEAPU8[m + ea + 0], x[3 + fa] = e.HEAPU8[m + ea + 3]
                }
                l.putImageData(w, 0, 0), e.apiObject.onScreenshotTakenCanvas && e.apiObject.onScreenshotTakenCanvas(v), e.apiObject.onScreenshotTaken && e.apiObject.onScreenshotTaken(v.toDataURL("image/png"))
            }, e.fg = function (m) {
                e.apiObject.onAnimationTransitionedToState && e.apiObject.onAnimationTransitionedToState(m)
            }, e.noInitialRun = !0, e.onRuntimeInitialized = function () {
                c = e.cwrap("switchEffect", null, ["string", "number", "number", "number"]), f = e.cwrap("clearEffect", null, ["string"]), g = e.cwrap("takeScreenshot", null, []), e.changeParameterFloat = e.cwrap("changeParameterFloat", null, ["string", "string", "string", "number"]), e.changeParameterVector = e.cwrap("changeParameterVector", null, "string string string number number number number".split(" ")), e.changeParameterBool = e.cwrap("changeParameterBool", null, ["string", "string", "string", "number"]), e.changeParameterTexture = e.cwrap("changeParameterTexture", null, "string string string number number number number".split(" ")), e.fireTrigger = e.cwrap("fireTrigger", null, ["string"]), e.setFaceDetectionSensitivity = e.cwrap("setFaceDetectionSensitivity", null, ["number"]), e.reset = e.cwrap("reset", null, ["number", "number"]), e.showStats = e.cwrap("showStats", null, ["number"]), e.setLicenseKey = e.cwrap("setLicenseKey", null, ["string"]), e.stringToC = e.cwrap("stringToC", null, ["string", "string"]), d = e.cwrap("shutdownEngine", null, []);
                var m = window.localStorage.getItem("k39d");
                m || (m = function () {
                    var m = (new Date).getTime(), q = performance && performance.now && 1e3 * performance.now() || 0;
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
                        var v = 16 * Math.random();
                        return 0 < m ? (v = (m + v) % 16 | 0, m = Math.floor(m / 16)) : (v = (q + v) % 16 | 0, q = Math.floor(q / 16)), ("x" === t ? v : 3 & v | 8).toString(16)
                    })
                }(), window.localStorage.setItem("k39d", m)), e.stringToC("uuid", m), e.stringToC("userAgent", navigator.userAgent), e.stringToC("screenResolution", window.screen.width + "x" + window.screen.height), (m = document.title) && 0 !== m.length || (m = "No title"), e.stringToC("applicationName", m), e.stringToC("applicationId", document.domain), e.stringToC("applicationVersion", "1.0.0"), (m = navigator.vendor) && 0 !== m.length || (m = "N/A");
                var q = navigator.platform;
                q && 0 !== q.length || (q = "N/A"), e.stringToC("deviceVendor", m), e.stringToC("deviceModel", q), e.stringToC("operatingSystem", q), e.setLicenseKey(e.licenseKey), e.cwrap("initialize", null, [])()
            }, e.print = function (m) {
                1 < arguments.length && (m = Array.prototype.slice.call(arguments).join(" ")), console.log(m)
            }, e.printErr = function (m) {
                1 < arguments.length && (m = Array.prototype.slice.call(arguments).join(" ")), "string" == typeof m && 0 === m.indexOf("bad name in getProcAddress:") || console.log(m)
            }
        }();
        var n, ba = {};
        for (n in e) e.hasOwnProperty(n) && (ba[n] = e[n]);
        var ca = "./this.program";

        function da(a, b) {
            throw b
        }

        var la, ma, na, oa, ha = !1, ia = !1, ha = "object" == typeof window, ia = "function" == typeof importScripts,
            ja = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
            ka = !ha && !ja && !ia, u = "";
        ja ? (u = ia ? require("path").dirname(u) + "/" : __dirname + "/", la = function (a, b) {
            return na = na || require("fs"), a = (oa = oa || require("path")).normalize(a), na.readFileSync(a, b ? null : "utf8")
        }, ma = function (a) {
            return (a = la(a, !0)).buffer || (a = new Uint8Array(a)), assert(a.buffer), a
        }, 1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), process.on("uncaughtException", function (a) {
            if (!(a instanceof pa)) throw a
        }), process.on("unhandledRejection", qa), da = function (a) {
            process.exit(a)
        }, e.inspect = function () {
            return "[Emscripten Module object]"
        }) : ka ? ("undefined" != typeof read && (la = function (a) {
            return read(a)
        }), ma = function (a) {
            return "function" == typeof readbuffer ? new Uint8Array(readbuffer(a)) : (assert("object" == typeof (a = read(a, "binary"))), a)
        }, "function" == typeof quit && (da = function (a) {
            quit(a)
        }), "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print)) : (ha || ia) && (ia ? u = self.location.href : document.currentScript && (u = document.currentScript.src), _scriptDir && (u = _scriptDir), u = 0 !== u.indexOf("blob:") ? u.substr(0, u.lastIndexOf("/") + 1) : "", la = function (a) {
            var b = new XMLHttpRequest;
            return b.open("GET", a, !1), b.send(null), b.responseText
        }, ia && (ma = function (a) {
            var b = new XMLHttpRequest;
            return b.open("GET", a, !1), b.responseType = "arraybuffer", b.send(null), new Uint8Array(b.response)
        }));
        var ra = e.print || console.log.bind(console), y = e.printErr || console.warn.bind(console);
        for (n in ba) ba.hasOwnProperty(n) && (e[n] = ba[n]);
        ba = null, e.thisProgram && (ca = e.thisProgram), e.quit && (da = e.quit);
        var ta, va, noExitRuntime, ua = 0;
        e.wasmBinary && (va = e.wasmBinary), e.noExitRuntime && (noExitRuntime = e.noExitRuntime), "object" != typeof WebAssembly && y("no native wasm support detected");
        var wa, xa = new WebAssembly.Table({initial: 1809, maximum: 1809, element: "anyfunc"}), ya = !1;

        function assert(a, b) {
            a || qa("Assertion failed: " + b)
        }

        function za(a) {
            var b = e["_" + a];
            return assert(b, "Cannot call unknown function " + a + ", make sure it is exported"), b
        }

        function Aa(a, b, c, d) {
            var m, f = {
                string: function (m) {
                    var t, q = 0;
                    return null != m && 0 !== m && (t = 1 + (m.length << 2), q = Ba(t), z(m, A, q, t)), q
                }, array: function (m) {
                    var q = Ba(m.length);
                    return Ca.set(m, q), q
                }
            }, g = za(a), k = [];
            if (a = 0, d) for (var p = 0; p < d.length; p++) {
                var r = f[c[p]];
                r ? (0 === a && (a = B()), k[p] = r(d[p])) : k[p] = d[p]
            }
            return c = g.apply(null, k), m = c, c = "string" === b ? C(m) : "boolean" === b ? !!m : m, 0 !== a && E(a), c
        }

        var Ia, Ca, A, Ja, F, Ka, G, La, Da = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

        function Ea(a, b, c) {
            var d = b + c;
            for (c = b; a[c] && !(d <= c);) ++c;
            if (16 < c - b && a.subarray && Da) return Da.decode(a.subarray(b, c));
            for (d = ""; b < c;) {
                var g, k, f = a[b++];
                128 & f ? (g = 63 & a[b++], 192 == (224 & f) ? d += String.fromCharCode((31 & f) << 6 | g) : (k = 63 & a[b++], (f = 224 == (240 & f) ? (15 & f) << 12 | g << 6 | k : (7 & f) << 18 | g << 12 | k << 6 | 63 & a[b++]) < 65536 ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | 1023 & f)))) : d += String.fromCharCode(f)
            }
            return d
        }

        function C(a, b) {
            return a ? Ea(A, a, b) : ""
        }

        function z(a, b, c, d) {
            if (!(0 < d)) return 0;
            var f = c;
            d = c + d - 1;
            for (var g = 0; g < a.length; ++g) {
                var k = a.charCodeAt(g);
                if (55296 <= k && k <= 57343 && (k = 65536 + ((1023 & k) << 10) | 1023 & a.charCodeAt(++g)), k <= 127) {
                    if (d <= c) break;
                    b[c++] = k
                } else {
                    if (k <= 2047) {
                        if (d <= c + 1) break;
                        b[c++] = 192 | k >> 6
                    } else {
                        if (k <= 65535) {
                            if (d <= c + 2) break;
                            b[c++] = 224 | k >> 12
                        } else {
                            if (d <= c + 3) break;
                            b[c++] = 240 | k >> 18, b[c++] = 128 | k >> 12 & 63
                        }
                        b[c++] = 128 | k >> 6 & 63
                    }
                    b[c++] = 128 | 63 & k
                }
            }
            return b[c] = 0, c - f
        }

        function Fa(a) {
            for (var b = 0, c = 0; c < a.length; ++c) {
                var d = a.charCodeAt(c);
                55296 <= d && d <= 57343 && (d = 65536 + ((1023 & d) << 10) | 1023 & a.charCodeAt(++c)), d <= 127 ? ++b : b = d <= 2047 ? b + 2 : d <= 65535 ? b + 3 : b + 4
            }
            return b
        }

        function Ga(a) {
            var b = Fa(a) + 1, c = Ha(b);
            return c && z(a, Ca, c, b), c
        }

        function Ma(a) {
            Ia = a, e.HEAP8 = Ca = new Int8Array(a), e.HEAP16 = new Int16Array(a), e.HEAP32 = F = new Int32Array(a), e.HEAPU8 = A = new Uint8Array(a), e.HEAPU16 = Ja = new Uint16Array(a), e.HEAPU32 = Ka = new Uint32Array(a), e.HEAPF32 = G = new Float32Array(a), e.HEAPF64 = La = new Float64Array(a)
        }

        var Na = e.INITIAL_MEMORY || 16777216;

        function Oa(a) {
            for (; 0 < a.length;) {
                var c, b = a.shift();
                "function" == typeof b ? b(e) : "number" == typeof (c = b.If) ? void 0 === b.wf ? e.dynCall_v(c) : e.dynCall_vi(c, b.wf) : c(void 0 === b.wf ? null : b.wf)
            }
        }

        (wa = e.wasmMemory ? e.wasmMemory : new WebAssembly.Memory({
            initial: Na / 65536,
            maximum: 32768
        })) && (Ia = wa.buffer), Na = Ia.byteLength, Ma(Ia), F[147584] = 5833376;
        var Pa = [], Qa = [], Ra = [], Sa = [], Ta = [];
        var Va = Math.ceil, Wa = Math.floor, Xa = 0, Ya = null, Za = null;

        function qa(a) {
            throw e.onAbort && e.onAbort(a), ra(a), y(a), ya = !0, new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.")
        }

        function $a(a) {
            var b = ab;
            return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a)
        }

        function bb() {
            return $a("data:application/octet-stream;base64,")
        }

        e.preloadedImages = {}, e.preloadedAudios = {};
        var cb, ab = "deepar.wasm";

        function db() {
            try {
                if (va) return new Uint8Array(va);
                if (ma) return ma(ab);
                throw"both async and sync fetching of the wasm failed"
            } catch (a) {
                qa(a)
            }
        }

        bb() || (cb = ab, ab = e.locateFile ? e.locateFile(cb, u) : u + cb);
        var fb = {
            1024: function (a, b, c, d, f, g) {
                var k = document.createElement("canvas"), p = k.getContext("2d");
                k.width = b, k.height = c, a = new Uint8ClampedArray(e.HEAPU8.subarray(a, a + k.width * k.height * 4)), a = new ImageData(a, k.width, k.height), p.putImageData(a, 0, 0), a = (p = document.createElement("canvas")).getContext("2d"), p.width = f, p.height = g, a.drawImage(k, 0, 0, p.width, p.height), f = a.getImageData(0, 0, p.width, p.height), f = new Uint8Array(f.data.buffer), e.HEAPU8.set(f, d)
            }, 2319: function () {
                console.log("License key not valid")
            }, 2358: function () {
                return e.canvasWidth
            }, 2392: function () {
                return e.canvasHeight
            }, 2427: function () {
                return e.numberOfFaces
            }, 2708: function () {
                e.endLoop()
            }, 2729: function () {
                return e.video.videoWidth
            }, 2765: function () {
                return e.video.videoHeight
            }, 2802: function () {
                if (!h) return 0;
                var a = e.video, b = h.tf, c = b.createTexture();
                e.Of = c;
                var d = H(I);
                return c.name = d, I[d] = c, b.bindTexture(b.TEXTURE_2D, c), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a), d
            }, 3468: function () {
                alert("DeepAR license not valid")
            }, 3502: function () {
                var a = e.faceTrackingModelByteArray;
                if (!a) return 0;
                var b = e._malloc(a.length);
                return e.HEAPU8.set(a, b), b
            }, 3800: function (a, b, c) {
                e.Tf(a, b, c)
            }, 5696: function () {
                return e.video.videoWidth
            }, 5732: function () {
                return e.video.videoHeight
            }, 5769: function () {
                return e.vf.width
            }, 5806: function () {
                return e.vf.height
            }, 5844: function (a) {
                var b = e.context, d = (c = e.vf).width, c = c.height;
                b.drawImage(e.video, 0, 0, d, c), b = b.getImageData(0, 0, d, c), b = new Float64Array(b.data.buffer), e.HEAPF64.set(b, a / 8)
            }
        };

        function hb() {
            return 0 < hb.Cf
        }

        function ib(a) {
            F[jb() >> 2] = a
        }

        Qa.push({
            If: function () {
                gb()
            }
        });
        var kb = {}, lb = [null, [], []];

        function mb(a, b) {
            var c = lb[a];
            0 === b || 10 === b ? ((1 === a ? ra : y)(Ea(c, 0)), c.length = 0) : c.push(b)
        }

        var ub, nb = {};

        function ob(a, b) {
            var c;
            pb = a, qb = b, rb && (0 == a ? sb = function () {
                var d = 0 | Math.max(0, tb + b - ub());
                setTimeout(vb, d)
            } : 1 == a ? sb = function () {
                wb(vb)
            } : 2 == a && ("undefined" == typeof setImmediate && (c = [], addEventListener("message", function (d) {
                "setimmediate" !== d.data && "setimmediate" !== d.data.target || (d.stopPropagation(), c.shift()())
            }, !0), setImmediate = function (d) {
                c.push(d), ia ? (void 0 === e.setImmediates && (e.setImmediates = []), e.setImmediates.push(d), postMessage({target: "setimmediate"})) : postMessage("setimmediate", "*")
            }), sb = function () {
                setImmediate(vb)
            }))
        }

        ub = ja ? function () {
            var a = process.hrtime();
            return 1e3 * a[0] + a[1] / 1e6
        } : "undefined" != typeof dateNow ? dateNow : function () {
            return performance.now()
        };
        var tb, vb, Bb, sb = null, zb = 0, rb = null, yb = 0, pb = 0, qb = 0, Db = 0, Ab = [], Cb = {}, Eb = !1,
            Fb = !1, Gb = [];

        function Hb() {
            function a() {
                Fb = document.pointerLockElement === e.canvas || document.mozPointerLockElement === e.canvas || document.webkitPointerLockElement === e.canvas || document.msPointerLockElement === e.canvas
            }

            if (e.preloadPlugins || (e.preloadPlugins = []), !Ib) {
                Ib = !0;
                try {
                    Jb = !0
                } catch (c) {
                    Jb = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
                }
                Kb = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Jb ? null : console.log("warning: no BlobBuilder"), Lb = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0, e.Nf || void 0 !== Lb || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), e.Nf = !0), e.preloadPlugins.push({
                    canHandle: function (c) {
                        return !e.Nf && /\.(jpg|jpeg|png|bmp)$/i.test(c)
                    }, handle: function (c, d, f, g) {
                        var k = null;
                        if (Jb) try {
                            (k = new Blob([c], {type: Mb(d)})).size !== c.length && (k = new Blob([new Uint8Array(c).buffer], {type: Mb(d)}))
                        } catch (m) {
                            !function (a) {
                                (ta = ta || {})[a] || (ta[a] = 1, y(a))
                            }("Blob constructor present but fails: " + m + "; falling back to blob builder")
                        }
                        k || ((k = new Kb).append(new Uint8Array(c).buffer), k = k.getBlob());
                        var p = Lb.createObjectURL(k), r = new Image;
                        r.onload = function () {
                            assert(r.complete, "Image " + d + " could not be decoded");
                            var m = document.createElement("canvas");
                            m.width = r.width, m.height = r.height, m.getContext("2d").drawImage(r, 0, 0), e.preloadedImages[d] = m, Lb.revokeObjectURL(p), f && f(c)
                        }, r.onerror = function () {
                            console.log("Image " + p + " could not be decoded"), g && g()
                        }, r.src = p
                    }
                }), e.preloadPlugins.push({
                    canHandle: function (c) {
                        return !e.wg && c.substr(-4) in {".ogg": 1, ".wav": 1, ".mp3": 1}
                    }, handle: function (c, d, f, g) {
                        function k(t) {
                            r || (r = !0, e.preloadedAudios[d] = t, f && f(c))
                        }

                        function p() {
                            r || (r = !0, e.preloadedAudios[d] = new Audio, g && g())
                        }

                        var r = !1;
                        if (!Jb) return p();
                        try {
                            var m = new Blob([c], {type: Mb(d)})
                        } catch (t) {
                            return p()
                        }
                        m = Lb.createObjectURL(m);
                        var a, q = new Audio;
                        q.addEventListener("canplaythrough", function () {
                            k(q)
                        }, !1), q.onerror = function () {
                            if (!r) {
                                console.log("warning: browser could not fully decode audio " + d + ", trying slower base64 approach");
                                for (var t = "", v = 0, l = 0, w = 0; w < c.length; w++) for (v = v << 8 | c[w], l += 8; 6 <= l;) {
                                    var x = v >> l - 6 & 63;
                                    l -= 6, t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[x]
                                }
                                2 == l ? (t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(3 & v) << 4], t += "==") : 4 == l && (t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(15 & v) << 2], t += "="), q.src = "data:audio/x-" + d.substr(-3) + ";base64," + t, k(q)
                            }
                        }, q.src = m, a = function () {
                            k(q)
                        }, noExitRuntime = !0, setTimeout(function () {
                            ya || a()
                        }, 1e4)
                    }
                });
                var b = e.canvas;
                b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || function () {
                }, b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function () {
                }, b.exitPointerLock = b.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", a, !1), document.addEventListener("mozpointerlockchange", a, !1), document.addEventListener("webkitpointerlockchange", a, !1), document.addEventListener("mspointerlockchange", a, !1), e.elementPointerLock && b.addEventListener("click", function (c) {
                    !Fb && e.canvas.requestPointerLock && (e.canvas.requestPointerLock(), c.preventDefault())
                }, !1))
            }
        }

        var Sb = !1, Tb = void 0, Ub = void 0;

        function Wb() {
            return !!Eb && ((document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function () {
            }).apply(document, []), !0)
        }

        var Zb = 0;

        function wb(a) {
            if ("function" == typeof requestAnimationFrame) requestAnimationFrame(a); else {
                var b = Date.now();
                if (0 === Zb) Zb = b + 1e3 / 60; else for (; Zb <= b + 2;) Zb += 1e3 / 60;
                setTimeout(a, Math.max(Zb - b, 0))
            }
        }

        function Mb(a) {
            return {
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                png: "image/png",
                bmp: "image/bmp",
                ogg: "audio/ogg",
                wav: "audio/wav",
                mp3: "audio/mpeg"
            }[a.substr(a.lastIndexOf(".") + 1)]
        }

        var $b = [];

        function Yb() {
            var a = e.canvas;
            $b.forEach(function (b) {
                b(a.width, a.height)
            })
        }

        function Xb(a, b, c) {
            b && c ? (a.eg = b, a.Wf = c) : (b = a.eg, c = a.Wf);
            var g, d = b, f = c;
            e.forcedAspectRatio && 0 < e.forcedAspectRatio && (d / f < e.forcedAspectRatio ? d = Math.round(f * e.forcedAspectRatio) : f = Math.round(d / e.forcedAspectRatio)), (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen && (g = Math.min(screen.width / d, screen.height / f), d = Math.round(d * g), f = Math.round(f * g)), Ub ? (a.width != d && (a.width = d), a.height != f && (a.height = f), void 0 !== a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != c && (a.height = c), void 0 !== a.style && (d != b || f != c ? (a.style.setProperty("width", d + "px", "important"), a.style.setProperty("height", f + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))))
        }

        var Ib, Jb, Kb, Lb, ic, ac = {}, bc = 0, cc = !1, dc = 0, ec = 0, fc = 0,
            L = {alpha: !1, depth: !1, stencil: !1, antialias: !1}, hc = {};
        var mc = 1, nc = 0, M = [], O = [], P = [], Q = [], I = [], R = [], S = [], oc = [], J = [], h = null, T = [],
            U = {}, pc = {}, qc = 4;

        function V(a) {
            nc = nc || a
        }

        function H(a) {
            for (var b = mc++, c = a.length; c < b; c++) a[c] = null;
            return b
        }

        var W = [0], rc = [0];

        function sc(a, b, c) {
            for (var d = "", f = 0; f < a; ++f) {
                var g = c ? F[c + 4 * f >> 2] : -1;
                d += C(F[b + 4 * f >> 2], g < 0 ? void 0 : g)
            }
            return d
        }

        function Qb(a, b) {
            var c, d;
            return e.preinitializedWebGLContext ? (a = e.preinitializedWebGLContext, b.Jf = 1) : a = a.getContext("webgl", b), b = a ? (d = {
                pg: c = H(J),
                attributes: b,
                version: b.Jf,
                tf: a
            }, a.canvas && (a.canvas.Pf = d), J[c] = d, void 0 !== b.Vf && !b.Vf || function (a) {
                {
                    var b, c;
                    (a = a || h).Xf || (a.Xf = !0, function (a) {
                        var b = a.getExtension("ANGLE_instanced_arrays");
                        b && (a.vertexAttribDivisor = function (c, d) {
                            b.vertexAttribDivisorANGLE(c, d)
                        }, a.drawArraysInstanced = function (c, d, f, g) {
                            b.drawArraysInstancedANGLE(c, d, f, g)
                        }, a.drawElementsInstanced = function (c, d, f, g, k) {
                            b.drawElementsInstancedANGLE(c, d, f, g, k)
                        })
                    }(b = a.tf), function (a) {
                        var b = a.getExtension("OES_vertex_array_object");
                        b && (a.createVertexArray = function () {
                            return b.createVertexArrayOES()
                        }, a.deleteVertexArray = function (c) {
                            b.deleteVertexArrayOES(c)
                        }, a.bindVertexArray = function (c) {
                            b.bindVertexArrayOES(c)
                        }, a.isVertexArray = function (c) {
                            return b.isVertexArrayOES(c)
                        })
                    }(b), function (a) {
                        var b = a.getExtension("WEBGL_draw_buffers");
                        b && (a.drawBuffers = function (c, d) {
                            b.drawBuffersWEBGL(c, d)
                        })
                    }(b), b.qf = b.getExtension("EXT_disjoint_timer_query"), c = "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod EXT_texture_norm16 WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2 WEBKIT_WEBGL_compressed_texture_pvrtc".split(" "), (b.getSupportedExtensions() || []).forEach(function (d) {
                        -1 != c.indexOf(d) && b.getExtension(d)
                    }))
                }
            }(d), c) : 0
        }

        function Rb(a) {
            h = J[a], e.yf = K = h && h.tf
        }

        function uc(a) {
            for (var b = O[a], c = (a = U[a] = {
                Kf: {},
                Bf: 0,
                rf: -1,
                sf: -1
            }).Kf, d = K.getProgramParameter(b, 35718), f = 0; f < d; ++f) {
                var g = K.getActiveUniform(b, f), k = g.name;
                a.Bf = Math.max(a.Bf, k.length + 1), "]" == k.slice(-1) && (k = k.slice(0, k.lastIndexOf("[")));
                var p = K.getUniformLocation(b, k);
                if (p) {
                    var r = H(R);
                    c[k] = [g.size, r], R[r] = p;
                    for (var m = 1; m < g.size; ++m) p = K.getUniformLocation(b, k + "[" + m + "]"), r = H(R), R[r] = p
                }
            }
        }

        var vc, wc, Pb = {}, xc = [];

        function X(a, b, c, d) {
            for (var f = 0; f < a; f++) {
                var g = K[c](), k = g && H(d);
                g ? d[g.name = k] = g : V(1282), F[b + 4 * f >> 2] = k
            }
        }

        function yc(a, b) {
            Ka[a >> 2] = b, Ka[a + 4 >> 2] = (b - Ka[a >> 2]) / 4294967296
        }

        function zc(a, b, c) {
            if (b) {
                var d = void 0;
                switch (a) {
                    case 36346:
                        d = 1;
                        break;
                    case 36344:
                        return void (0 != c && 1 != c && V(1280));
                    case 36345:
                        d = 0;
                        break;
                    case 34466:
                        var f = K.getParameter(34467), d = f ? f.length : 0
                }
                if (void 0 === d) switch (f = K.getParameter(a), typeof f) {
                    case"number":
                        d = f;
                        break;
                    case"boolean":
                        d = f ? 1 : 0;
                        break;
                    case"string":
                        return void V(1280);
                    case"object":
                        if (null === f) switch (a) {
                            case 34964:
                            case 35725:
                            case 34965:
                            case 36006:
                            case 36007:
                            case 32873:
                            case 34229:
                            case 34068:
                                d = 0;
                                break;
                            default:
                                return void V(1280)
                        } else {
                            if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                                for (a = 0; a < f.length; ++a) switch (c) {
                                    case 0:
                                        F[b + 4 * a >> 2] = f[a];
                                        break;
                                    case 2:
                                        G[b + 4 * a >> 2] = f[a];
                                        break;
                                    case 4:
                                        Ca[b + a >> 0] = f[a] ? 1 : 0
                                }
                                return
                            }
                            try {
                                d = 0 | f.name
                            } catch (g) {
                                return V(1280), void y("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + g + ")")
                            }
                        }
                        break;
                    default:
                        return V(1280), void y("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + f + " of type " + typeof f + "!")
                }
                switch (c) {
                    case 1:
                        yc(b, d);
                        break;
                    case 0:
                        F[b >> 2] = d;
                        break;
                    case 2:
                        G[b >> 2] = d;
                        break;
                    case 4:
                        Ca[b >> 0] = d ? 1 : 0
                }
            } else V(1281)
        }

        function Ac(a) {
            var b = Fa(a) + 1, c = Ha(b);
            return z(a, A, c, b), c
        }

        function Bc(a, b, c, d) {
            if (c) if ("number" == typeof (a = K.getUniform(O[a], R[b])) || "boolean" == typeof a) switch (d) {
                case 0:
                    F[c >> 2] = a;
                    break;
                case 2:
                    G[c >> 2] = a;
                    break;
                default:
                    throw"internal emscriptenWebGLGetUniform() error, bad type: " + d
            } else for (b = 0; b < a.length; b++) switch (d) {
                case 0:
                    F[c + 4 * b >> 2] = a[b];
                    break;
                case 2:
                    G[c + 4 * b >> 2] = a[b];
                    break;
                default:
                    throw"internal emscriptenWebGLGetUniform() error, bad type: " + d
            } else V(1281)
        }

        function Cc(a, b, c, d) {
            if (c) if (a = K.getVertexAttrib(a, b), 34975 == b) F[c >> 2] = a && a.name; else if ("number" == typeof a || "boolean" == typeof a) switch (d) {
                case 0:
                    F[c >> 2] = a;
                    break;
                case 2:
                    G[c >> 2] = a;
                    break;
                case 5:
                    F[c >> 2] = Math.fround(a);
                    break;
                default:
                    throw"internal emscriptenWebGLGetVertexAttrib() error, bad type: " + d
            } else for (b = 0; b < a.length; b++) switch (d) {
                case 0:
                    F[c + 4 * b >> 2] = a[b];
                    break;
                case 2:
                    G[c + 4 * b >> 2] = a[b];
                    break;
                case 5:
                    F[c + 4 * b >> 2] = Math.fround(a[b]);
                    break;
                default:
                    throw"internal emscriptenWebGLGetVertexAttrib() error, bad type: " + d
            } else V(1281)
        }

        function Dc(a, b, c, d, f) {
            a = 1 == (a -= 5120) ? A : 4 == a ? F : 6 == a ? G : 5 == a || 28922 == a ? Ka : Ja;
            var g = 31 - Math.clz32(a.BYTES_PER_ELEMENT);
            return a.subarray(f >> g, f + d * (c * ({
                5: 3,
                6: 4,
                8: 2,
                29502: 3,
                29504: 4
            }[b - 6402] || 1) * (1 << g) + qc - 1 & -qc) >> g)
        }

        var Ec = 0;
        var Jc, Hc = {};

        function Ic() {
            if (!Jc) {
                var b, a = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                    _: ca || "./this.program"
                };
                for (b in Hc) a[b] = Hc[b];
                var c = [];
                for (b in a) c.push(b + "=" + a[b]);
                Jc = c
            }
            return Jc
        }

        function Lc(a) {
            return 0 == a % 4 && (0 != a % 100 || 0 == a % 400)
        }

        function Mc(a, b) {
            for (var c = 0, d = 0; d <= b; c += a[d++]) ;
            return c
        }

        var Sc, Nc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            Oc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        function Pc(a, b) {
            for (a = new Date(a.getTime()); 0 < b;) {
                var c = a.getMonth(), d = (Lc(a.getFullYear()) ? Nc : Oc)[c];
                if (!(b > d - a.getDate())) {
                    a.setDate(a.getDate() + b);
                    break
                }
                b -= d - a.getDate() + 1, a.setDate(1), c < 11 ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1))
            }
            return a
        }

        function Qc(a, b, c, d) {
            function f(l, w, x) {
                for (l = "number" == typeof l ? l.toString() : l || ""; l.length < w;) l = x[0] + l;
                return l
            }

            function g(l, w) {
                return f(l, w, "0")
            }

            function k(l, w) {
                function x(N) {
                    return N < 0 ? -1 : 0 < N ? 1 : 0
                }

                var D;
                return 0 === (D = x(l.getFullYear() - w.getFullYear())) && 0 === (D = x(l.getMonth() - w.getMonth())) && (D = x(l.getDate() - w.getDate())), D
            }

            function p(l) {
                switch (l.getDay()) {
                    case 0:
                        return new Date(l.getFullYear() - 1, 11, 29);
                    case 1:
                        return l;
                    case 2:
                        return new Date(l.getFullYear(), 0, 3);
                    case 3:
                        return new Date(l.getFullYear(), 0, 2);
                    case 4:
                        return new Date(l.getFullYear(), 0, 1);
                    case 5:
                        return new Date(l.getFullYear() - 1, 11, 31);
                    case 6:
                        return new Date(l.getFullYear() - 1, 11, 30)
                }
            }

            function r(l) {
                l = Pc(new Date(l.pf + 1900, 0, 1), l.Ff);
                var w = new Date(l.getFullYear() + 1, 0, 4), x = p(new Date(l.getFullYear(), 0, 4)), w = p(w);
                return k(x, l) <= 0 ? k(w, l) <= 0 ? l.getFullYear() + 1 : l.getFullYear() : l.getFullYear() - 1
            }

            var m = F[d + 40 >> 2];
            for (var q in d = {
                ag: F[d >> 2],
                $f: F[d + 4 >> 2],
                Df: F[d + 8 >> 2],
                zf: F[d + 12 >> 2],
                uf: F[d + 16 >> 2],
                pf: F[d + 20 >> 2],
                Ef: F[d + 24 >> 2],
                Ff: F[d + 28 >> 2],
                zg: F[d + 32 >> 2],
                Zf: F[d + 36 >> 2],
                bg: m ? C(m) : ""
            }, c = C(c), m = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
                "%Ec": "%c",
                "%EC": "%C",
                "%Ex": "%m/%d/%y",
                "%EX": "%H:%M:%S",
                "%Ey": "%y",
                "%EY": "%Y",
                "%Od": "%d",
                "%Oe": "%e",
                "%OH": "%H",
                "%OI": "%I",
                "%Om": "%m",
                "%OM": "%M",
                "%OS": "%S",
                "%Ou": "%u",
                "%OU": "%U",
                "%OV": "%V",
                "%Ow": "%w",
                "%OW": "%W",
                "%Oy": "%y"
            }) c = c.replace(new RegExp(q, "g"), m[q]);
            var t = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                v = "January February March April May June July August September October November December".split(" "),
                m = {
                    "%a": function (l) {
                        return t[l.Ef].substring(0, 3)
                    }, "%A": function (l) {
                        return t[l.Ef]
                    }, "%b": function (l) {
                        return v[l.uf].substring(0, 3)
                    }, "%B": function (l) {
                        return v[l.uf]
                    }, "%C": function (l) {
                        return g((l.pf + 1900) / 100 | 0, 2)
                    }, "%d": function (l) {
                        return g(l.zf, 2)
                    }, "%e": function (l) {
                        return f(l.zf, 2, " ")
                    }, "%g": function (l) {
                        return r(l).toString().substring(2)
                    }, "%G": r, "%H": function (l) {
                        return g(l.Df, 2)
                    }, "%I": function (l) {
                        return 0 == (l = l.Df) ? l = 12 : 12 < l && (l -= 12), g(l, 2)
                    }, "%j": function (l) {
                        return g(l.zf + Mc(Lc(l.pf + 1900) ? Nc : Oc, l.uf - 1), 3)
                    }, "%m": function (l) {
                        return g(l.uf + 1, 2)
                    }, "%M": function (l) {
                        return g(l.$f, 2)
                    }, "%n": function () {
                        return "\n"
                    }, "%p": function (l) {
                        return 0 <= l.Df && l.Df < 12 ? "AM" : "PM"
                    }, "%S": function (l) {
                        return g(l.ag, 2)
                    }, "%t": function () {
                        return "\t"
                    }, "%u": function (l) {
                        return l.Ef || 7
                    }, "%U": function (l) {
                        var w = new Date(l.pf + 1900, 0, 1), x = 0 === w.getDay() ? w : Pc(w, 7 - w.getDay());
                        return k(x, l = new Date(l.pf + 1900, l.uf, l.zf)) < 0 ? g(Math.ceil((31 - x.getDate() + (Mc(Lc(l.getFullYear()) ? Nc : Oc, l.getMonth() - 1) - 31) + l.getDate()) / 7), 2) : 0 === k(x, w) ? "01" : "00"
                    }, "%V": function (l) {
                        var w = new Date(l.pf + 1901, 0, 4), x = p(new Date(l.pf + 1900, 0, 4)), w = p(w),
                            D = Pc(new Date(l.pf + 1900, 0, 1), l.Ff);
                        return k(D, x) < 0 ? "53" : k(w, D) <= 0 ? "01" : g(Math.ceil((x.getFullYear() < l.pf + 1900 ? l.Ff + 32 - x.getDate() : l.Ff + 1 - x.getDate()) / 7), 2)
                    }, "%w": function (l) {
                        return l.Ef
                    }, "%W": function (l) {
                        var w = new Date(l.pf, 0, 1),
                            x = 1 === w.getDay() ? w : Pc(w, 0 === w.getDay() ? 1 : 7 - w.getDay() + 1);
                        return k(x, l = new Date(l.pf + 1900, l.uf, l.zf)) < 0 ? g(Math.ceil((31 - x.getDate() + (Mc(Lc(l.getFullYear()) ? Nc : Oc, l.getMonth() - 1) - 31) + l.getDate()) / 7), 2) : 0 === k(x, w) ? "01" : "00"
                    }, "%y": function (l) {
                        return (l.pf + 1900).toString().substring(2)
                    }, "%Y": function (l) {
                        return l.pf + 1900
                    }, "%z": function (l) {
                        var w = 0 <= (l = l.Zf);
                        return l = Math.abs(l) / 60, (w ? "+" : "-") + String("0000" + (l / 60 * 100 + l % 60)).slice(-4)
                    }, "%Z": function (l) {
                        return l.bg
                    }, "%%": function () {
                        return "%"
                    }
                };
            for (q in m) 0 <= c.indexOf(q) && (c = c.replace(new RegExp(q, "g"), m[q](d)));
            return (q = function (a) {
                var b = Array(Fa(a) + 1);
                return z(a, b, 0, b.length), b
            }(c)).length > b ? 0 : (Ca.set(q, a), q.length - 1)
        }

        e.requestFullscreen = function (a, b) {
            !function (a, b) {
                function c() {
                    Eb = !1;
                    var g = d.parentNode;
                    (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === g ? (d.exitFullscreen = Wb, Tb && d.requestPointerLock(), Eb = !0, Ub ? ("undefined" != typeof SDL && (F[SDL.screen >> 2] = 8388608 | Ka[SDL.screen >> 2]), Xb(e.canvas), Yb()) : Xb(d)) : (g.parentNode.insertBefore(d, g), g.parentNode.removeChild(g), Ub ? ("undefined" != typeof SDL && (F[SDL.screen >> 2] = -8388609 & Ka[SDL.screen >> 2]), Xb(e.canvas), Yb()) : Xb(d)), e.onFullScreen && e.onFullScreen(Eb), e.onFullscreen && e.onFullscreen(Eb)
                }

                void 0 === (Tb = a) && (Tb = !0), void 0 === (Ub = b) && (Ub = !1);
                var d = e.canvas;
                Sb || (Sb = !0, document.addEventListener("fullscreenchange", c, !1), document.addEventListener("mozfullscreenchange", c, !1), document.addEventListener("webkitfullscreenchange", c, !1), document.addEventListener("MSFullscreenChange", c, !1));
                var f = document.createElement("div");
                d.parentNode.insertBefore(f, d), f.appendChild(d), f.requestFullscreen = f.requestFullscreen || f.mozRequestFullScreen || f.msRequestFullscreen || (f.webkitRequestFullscreen ? function () {
                    f.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
                } : null) || (f.webkitRequestFullScreen ? function () {
                    f.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                } : null), f.requestFullscreen()
            }(a, b)
        }, e.requestAnimationFrame = function (a) {
            wb(a)
        }, e.setCanvasSize = function (a, b, c) {
            Xb(e.canvas, a, b), c || Yb()
        }, e.pauseMainLoop = function () {
            sb = null, zb++
        }, e.resumeMainLoop = function () {
            zb++;
            var a = pb, b = qb, c = rb;
            rb = null, function (a) {
                var b = yb;
                noExitRuntime = !0, assert(!rb, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."), rb = a;
                var c = void 0 !== (yb = b) ? function () {
                    e.dynCall_vi(a, b)
                } : function () {
                    e.dynCall_v(a)
                }, d = zb;
                vb = function () {
                    if (!ya) if (0 < Ab.length) {
                        var k, p, f = Date.now(), g = Ab.shift();
                        g.If(g.wf), Bb && (p = 0 == (k = Bb) % 1 ? k - 1 : Math.floor(k), Bb = g.lg ? p : (8 * k + (p + .5)) / 9), console.log('main loop blocker "' + g.name + '" took ' + (Date.now() - f) + " ms"), e.setStatus && (f = e.statusMessage || "Please wait...", g = Bb, k = Cb.ng, g ? g < k ? e.setStatus(f + " (" + (k - g) + "/" + k + ")") : e.setStatus(f) : e.setStatus("")), d < zb || setTimeout(vb, 0)
                    } else if (!(d < zb)) if (Db = Db + 1 | 0, 1 == pb && 1 < qb && 0 != Db % qb) sb(); else {
                        0 == pb && (tb = ub());
                        a:if (!(ya || e.preMainLoop && !1 === e.preMainLoop())) {
                            try {
                                c()
                            } catch (r) {
                                if (r instanceof pa) break a;
                                throw r && "object" == typeof r && r.stack && y("exception thrown: " + [r, r.stack]), r
                            }
                            e.postMainLoop && e.postMainLoop()
                        }
                        d < zb || ("object" == typeof SDL && SDL.audio && SDL.audio.Yf && SDL.audio.Yf(), sb())
                    }
                }
            }(c), ob(a, b), sb()
        }, e.getUserMedia = function () {
            window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia), window.getUserMedia(void 0)
        }, e.createContext = function (a, b, c, d) {
            if (b && e.yf && a == e.canvas) return e.yf;
            var f;
            if (b) {
                var p, g = {antialias: !1, alpha: !1, Jf: 1};
                if (d) for (var k in d) g[k] = d[k];
                void 0 !== Pb && (f = Qb(a, g)) && (p = J[f].tf)
            } else p = a.getContext("2d");
            return p ? (c && (b || assert(void 0 === K, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), e.yf = p, b && Rb(f), e.cg = b, Gb.forEach(function (r) {
                r()
            }), Hb()), p) : null
        };
        for (var K, Tc = new Float32Array(256), Y = 0; Y < 256; Y++) W[Y] = Tc.subarray(0, Y + 1);
        for (var Uc = new Int32Array(256), Y = 0; Y < 256; Y++) rc[Y] = Uc.subarray(0, Y + 1);
        for (var Vc = 0; Vc < 32; Vc++) xc.push(Array(Vc));
        Sa.push(function () {
            "undefined" != typeof _fflush && _fflush(0), lb[1].length && mb(1, 10), lb[2].length && mb(2, 10)
        });
        var gd = {
            a: function (a, b, c, d) {
                qa("Assertion failed: " + C(a) + ", at: " + [b ? C(b) : "unknown filename", c, d ? C(d) : "unknown function"])
            }, K: function (a) {
                return Ha(a)
            }, f: function (a, b) {
                Sa.unshift({If: a, wf: b})
            }, H: function (a) {
                throw"uncaught_exception" in hb ? hb.Cf++ : hb.Cf = 1, a
            }, ke: function () {
                return ib(63), -1
            }, wa: function () {
                return 0
            }, oe: function () {
                return 0
            }, je: function (a, b) {
                var c;
                return a = -1 == (0 | a) || 0 === b ? -28 : ((c = kb[a]) && b === c.qg && (kb[a] = null, c.kg && Wc(c.sg)), 0)
            }, pe: function () {
            }, s: function () {
                qa()
            }, Ya: function (a, b, c) {
                if (!e.xf) {
                    if (!window.AudioContext) {
                        if (!window.webkitAudioContext) return;
                        window.AudioContext = window.webkitAudioContext
                    }
                    e.xf = new AudioContext
                }
                for (var d = new ArrayBuffer(b), f = new Uint8Array(d), g = 0; g < b; g++) f[g] = A[g + a];
                e.xf.decodeAudioData(d, function (k) {
                    var p = e.xf.createBufferSource();
                    (e.Hf = p).loop = c, p.buffer = k, p.connect(e.xf.destination), p.start(0)
                })
            }, Sa: function () {
                e.xf && e.Hf && (e.Hf.stop(), e.Hf = null)
            }, $a: function (a) {
                try {
                    var b = Function('return (function() {}.constructor("return this")( ));')()
                } catch (k) {
                    b = window
                }
                var c;
                for (c in b) if (8 == c.length && 116 == c.charCodeAt(7) && 101 == c.charCodeAt(5) && 117 == c.charCodeAt(3) && 100 == c.charCodeAt(0)) {
                    var d = c;
                    break
                }
                for (var f in b[d]) if (6 == f.length && 110 == f.charCodeAt(5) && 100 == f.charCodeAt(0)) {
                    var g = f;
                    break
                }
                return b[d][g].charCodeAt(a)
            }, _a: function (a, b, c, d, f) {
                if (62e3 != a) c = 0; else {
                    if (b) for (; ;) {
                        if (12321 == (a = F[b >> 2])) L.alpha = 0 < F[b + 4 >> 2]; else if (12325 == a) L.depth = 0 < F[b + 4 >> 2]; else if (12326 == a) L.stencil = 0 < F[b + 4 >> 2]; else if (12337 == a) a = F[b + 4 >> 2], L.antialias = 0 < a; else if (12338 == a) a = F[b + 4 >> 2], L.antialias = 1 == a; else if (12544 == a) L.rg = 12547 != F[b + 4 >> 2]; else if (12344 == a) break;
                        b += 8
                    }
                    c = c && d || f ? (f && (F[f >> 2] = 1), c && 0 < d && (F[c >> 2] = 62002), 1) : 0
                }
                return c
            }, X: function (a, b, c, d) {
                if (62e3 != a) return 0;
                for (a = 1; ;) {
                    if (12440 != (b = F[d >> 2])) {
                        if (12344 == b) break;
                        return 0
                    }
                    a = F[d + 4 >> 2], d += 8
                }
                return 2 != a ? 0 : (L.Jf = a - 1, (L.tg = 0) != (ic = Qb(e.canvas, L)) ? (Rb(ic), e.cg = !0, Gb.forEach(function (f) {
                    f()
                }), Rb(null), 62004) : 0)
            }, ra: function (a, b) {
                return 62e3 != a || 62002 != b ? 0 : 62006
            }, pa: function (a, b) {
                return 62e3 != a || 62004 != b ? 0 : (h === J[a = ic] && (h = null), "object" == typeof JSEvents && JSEvents.yg(J[a].tf.canvas), J[a] && J[a].tf.canvas && (J[a].tf.canvas.Pf = void 0), J[a] = null, dc == b && (dc = 0), 1)
            }, oa: function (a, b) {
                return 62e3 != a ? 0 : (62006 != b || (ec == b && (ec = 0), fc == b && (fc = 0)), 1)
            }, tb: function () {
                return 62e3
            }, b: function (a) {
                return Xc(a)
            }, ib: function (a, b, c) {
                return 62e3 == a ? (b && (F[b >> 2] = 1), c && (F[c >> 2] = 4), cc = !0, 1) : 0
            }, v: function (a, b, c, d) {
                return 62e3 != a || 0 != d && 62004 != d || 0 != c && 62006 != c || 0 != b && 62006 != b ? 0 : (Rb(d ? ic : null), dc = d, fc = b, ec = c, 1)
            }, L: function (a, b) {
                if (62e3 != a) return 0;
                if (hc[b]) return hc[b];
                switch (b) {
                    case 12371:
                        a = Ga("Emscripten");
                        break;
                    case 12372:
                        a = Ga("1.4 Emscripten EGL");
                        break;
                    case 12373:
                        a = Ga("");
                        break;
                    case 12429:
                        a = Ga("OpenGL_ES");
                        break;
                    default:
                        return 0
                }
                return hc[b] = a
            }, na: function () {
                return cc && e.yf && !e.yf.isContextLost() ? 1 : 0
            }, qa: function (a, b) {
                return 62e3 != a ? 0 : (0 == b ? ob(0, 0) : ob(1, b), 1)
            }, Za: function (a) {
                return 62e3 != a ? 0 : (fc = ec = dc = 0, cc = !1, 1)
            }, n: function (a, b, c) {
                var f, d = Sc = Sc || [];
                for (d.length = 0; f = A[b++];) 100 === f || 102 === f ? (c = c + 7 & -8, d.push(La[c >> 3]), c += 8) : (c = c + 3 & -4, d.push(F[c >> 2]), c += 4);
                return fb[a].apply(null, d)
            }, Xc: function (a, b, c, d, f, g, k, p) {
                var r = C(a);
                a = C(b), c = C(c);
                var m = new XMLHttpRequest;
                m.open(a, r, !0), m.responseType = "arraybuffer";
                var q = ++bc;
                return m.onload = function () {
                    var t, v;
                    200 <= m.status && m.status < 300 || 0 === m.status && "http" != r.substr(0, 4).toLowerCase() ? (t = new Uint8Array(m.response), v = Ha(t.length), A.set(t, v), g && Yc(g, q, d, v, t.length), f && Wc(v)) : k && Yc(k, q, d, m.status, m.statusText), delete ac[q]
                }, m.onerror = function () {
                    k && Yc(k, q, d, m.status, m.statusText), delete ac[q]
                }, m.onprogress = function (t) {
                    p && Yc(p, q, d, t.loaded, t.lengthComputable || void 0 === t.lengthComputable ? t.total : 0)
                }, m.onabort = function () {
                    delete ac[q]
                }, "POST" == a ? (m.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), m.send(c)) : m.send(null), ac[q] = m, q
            }, hc: ub, Od: function (a) {
                K.activeTexture(a)
            }, Nd: function (a, b) {
                K.attachShader(O[a], S[b])
            }, ce: function (a, b) {
                K.qf.beginQueryEXT(a, T[b])
            }, Md: function (a, b, c) {
                K.bindAttribLocation(O[a], b, C(c))
            }, Ld: function (a, b) {
                K.bindBuffer(a, M[b])
            }, Kd: function (a, b) {
                K.bindFramebuffer(a, P[b])
            }, Jd: function (a, b) {
                K.bindRenderbuffer(a, Q[b])
            }, Id: function (a, b) {
                K.bindTexture(a, I[b])
            }, Wd: function (a) {
                K.bindVertexArray(oc[a])
            }, Hd: function (a, b, c, d) {
                K.blendColor(a, b, c, d)
            }, Gd: function (a) {
                K.blendEquation(a)
            }, Fd: function (a, b) {
                K.blendEquationSeparate(a, b)
            }, Ed: function (a, b) {
                K.blendFunc(a, b)
            }, Dd: function (a, b, c, d) {
                K.blendFuncSeparate(a, b, c, d)
            }, Cd: function (a, b, c, d) {
                K.bufferData(a, c ? A.subarray(c, c + b) : b, d)
            }, Bd: function (a, b, c, d) {
                K.bufferSubData(a, b, A.subarray(d, d + c))
            }, Ad: function (a) {
                return K.checkFramebufferStatus(a)
            }, zd: function (a) {
                K.clear(a)
            }, yd: function (a, b, c, d) {
                K.clearColor(a, b, c, d)
            }, xd: function (a) {
                K.clearDepth(a)
            }, wd: function (a) {
                K.clearStencil(a)
            }, vd: function (a, b, c, d) {
                K.colorMask(!!a, !!b, !!c, !!d)
            }, ud: function (a) {
                K.compileShader(S[a])
            }, td: function (a, b, c, d, f, g, k, p) {
                K.compressedTexImage2D(a, b, c, d, f, g, p ? A.subarray(p, p + k) : null)
            }, sd: function (a, b, c, d, f, g, k, p, r) {
                K.compressedTexSubImage2D(a, b, c, d, f, g, k, r ? A.subarray(r, r + p) : null)
            }, rd: function (a, b, c, d, f, g, k, p) {
                K.copyTexImage2D(a, b, c, d, f, g, k, p)
            }, qd: function (a, b, c, d, f, g, k, p) {
                K.copyTexSubImage2D(a, b, c, d, f, g, k, p)
            }, pd: function () {
                var a = H(O), b = K.createProgram();
                return b.name = a, O[a] = b, a
            }, od: function (a) {
                var b = H(S);
                return S[b] = K.createShader(a), b
            }, nd: function (a) {
                K.cullFace(a)
            }, md: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2], f = M[d];
                    f && (K.deleteBuffer(f), f.name = 0, M[d] = null, d == vc && (vc = 0), d == wc && (wc = 0))
                }
            }, ld: function (a, b) {
                for (var c = 0; c < a; ++c) {
                    var d = F[b + 4 * c >> 2], f = P[d];
                    f && (K.deleteFramebuffer(f), f.name = 0, P[d] = null)
                }
            }, kd: function (a) {
                var b;
                a && ((b = O[a]) ? (K.deleteProgram(b), b.name = 0, O[a] = null, U[a] = null) : V(1281))
            }, ee: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2], f = T[d];
                    f && (K.qf.deleteQueryEXT(f), T[d] = null)
                }
            }, jd: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2], f = Q[d];
                    f && (K.deleteRenderbuffer(f), f.name = 0, Q[d] = null)
                }
            }, id: function (a) {
                var b;
                a && ((b = S[a]) ? (K.deleteShader(b), S[a] = null) : V(1281))
            }, hd: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2], f = I[d];
                    f && (K.deleteTexture(f), f.name = 0, I[d] = null)
                }
            }, Vd: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2];
                    K.deleteVertexArray(oc[d]), oc[d] = null
                }
            }, gd: function (a) {
                K.depthFunc(a)
            }, fd: function (a) {
                K.depthMask(!!a)
            }, ed: function (a, b) {
                K.depthRange(a, b)
            }, dd: function (a, b) {
                K.detachShader(O[a], S[b])
            }, cd: function (a) {
                K.disable(a)
            }, bd: function (a) {
                K.disableVertexAttribArray(a)
            }, ad: function (a, b, c) {
                K.drawArrays(a, b, c)
            }, Rd: function (a, b, c, d) {
                K.drawArraysInstanced(a, b, c, d)
            }, Sd: function (a, b) {
                for (var c = xc[a], d = 0; d < a; d++) c[d] = F[b + 4 * d >> 2];
                K.drawBuffers(c)
            }, $c: function (a, b, c, d) {
                K.drawElements(a, b, c, d)
            }, Qd: function (a, b, c, d, f) {
                K.drawElementsInstanced(a, b, c, d, f)
            }, _c: function (a) {
                K.enable(a)
            }, Zc: function (a) {
                K.enableVertexAttribArray(a)
            }, be: function (a) {
                K.qf.endQueryEXT(a)
            }, Yc: function () {
                K.finish()
            }, Wc: function () {
                K.flush()
            }, Vc: function (a, b, c, d) {
                K.framebufferRenderbuffer(a, b, c, Q[d])
            }, Uc: function (a, b, c, d, f) {
                K.framebufferTexture2D(a, b, c, I[d], f)
            }, Tc: function (a) {
                K.frontFace(a)
            }, Sc: function (a, b) {
                X(a, b, "createBuffer", M)
            }, Qc: function (a, b) {
                X(a, b, "createFramebuffer", P)
            }, fe: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = K.qf.createQueryEXT();
                    if (!d) {
                        for (V(1282); c < a;) F[b + 4 * c++ >> 2] = 0;
                        break
                    }
                    var f = H(T);
                    d.name = f, T[f] = d, F[b + 4 * c >> 2] = f
                }
            }, Pc: function (a, b) {
                X(a, b, "createRenderbuffer", Q)
            }, Oc: function (a, b) {
                X(a, b, "createTexture", I)
            }, Ud: function (a, b) {
                X(a, b, "createVertexArray", oc)
            }, Rc: function (a) {
                K.generateMipmap(a)
            }, Nc: function (a, b, c, d, f, g, k) {
                a = O[a], (a = K.getActiveAttrib(a, b)) && (c = 0 < c && k ? z(a.name, A, k, c) : 0, d && (F[d >> 2] = c), f && (F[f >> 2] = a.size), g && (F[g >> 2] = a.type))
            }, Mc: function (a, b, c, d, f, g, k) {
                a = O[a], (a = K.getActiveUniform(a, b)) && (c = 0 < c && k ? z(a.name, A, k, c) : 0, d && (F[d >> 2] = c), f && (F[f >> 2] = a.size), g && (F[g >> 2] = a.type))
            }, Lc: function (a, b, c, d) {
                var f = (a = K.getAttachedShaders(O[a])).length;
                for (b < f && (f = b), F[c >> 2] = f, b = 0; b < f; ++b) F[d + 4 * b >> 2] = S.indexOf(a[b])
            }, Kc: function (a, b) {
                return K.getAttribLocation(O[a], C(b))
            }, Jc: function (a, b) {
                zc(a, b, 4)
            }, Ic: function (a, b, c) {
                c ? F[c >> 2] = K.getBufferParameter(a, b) : V(1281)
            }, Hc: function () {
                var a = K.getError() || nc;
                return nc = 0, a
            }, Gc: function (a, b) {
                zc(a, b, 2)
            }, Fc: function (a, b, c, d) {
                ((a = K.getFramebufferAttachmentParameter(a, b, c)) instanceof WebGLRenderbuffer || a instanceof WebGLTexture) && (a = 0 | a.name), F[d >> 2] = a
            }, Ec: function (a, b) {
                zc(a, b, 0)
            }, Cc: function (a, b, c, d) {
                null === (a = K.getProgramInfoLog(O[a])) && (a = "(unknown error)"), b = 0 < b && d ? z(a, A, d, b) : 0, c && (F[c >> 2] = b)
            }, Dc: function (a, b, c) {
                if (c) if (mc <= a) V(1281); else {
                    var d = U[a];
                    if (d) if (35716 == b) null === (a = K.getProgramInfoLog(O[a])) && (a = "(unknown error)"), F[c >> 2] = a.length + 1; else if (35719 == b) F[c >> 2] = d.Bf; else if (35722 == b) {
                        if (-1 == d.rf) {
                            a = O[a];
                            var f = K.getProgramParameter(a, 35721);
                            for (b = d.rf = 0; b < f; ++b) d.rf = Math.max(d.rf, K.getActiveAttrib(a, b).name.length + 1)
                        }
                        F[c >> 2] = d.rf
                    } else if (35381 == b) {
                        if (-1 == d.sf) for (a = O[a], f = K.getProgramParameter(a, 35382), b = d.sf = 0; b < f; ++b) d.sf = Math.max(d.sf, K.getActiveUniformBlockName(a, b).length + 1);
                        F[c >> 2] = d.sf
                    } else F[c >> 2] = K.getProgramParameter(O[a], b); else V(1282)
                } else V(1281)
            }, Yd: function (a, b, c) {
                c ? yc(c, "boolean" == typeof (a = K.qf.getQueryObjectEXT(T[a], b)) ? a ? 1 : 0 : a) : V(1281)
            }, _d: function (a, b, c) {
                var d;
                c ? (d = "boolean" == typeof (a = K.qf.getQueryObjectEXT(T[a], b)) ? a ? 1 : 0 : a, F[c >> 2] = d) : V(1281)
            }, Xd: function (a, b, c) {
                c ? yc(c, "boolean" == typeof (a = K.qf.getQueryObjectEXT(T[a], b)) ? a ? 1 : 0 : a) : V(1281)
            }, Zd: function (a, b, c) {
                var d;
                c ? (d = "boolean" == typeof (a = K.qf.getQueryObjectEXT(T[a], b)) ? a ? 1 : 0 : a, F[c >> 2] = d) : V(1281)
            }, $d: function (a, b, c) {
                c ? F[c >> 2] = K.qf.getQueryEXT(a, b) : V(1281)
            }, Bc: function (a, b, c) {
                c ? F[c >> 2] = K.getRenderbufferParameter(a, b) : V(1281)
            }, zc: function (a, b, c, d) {
                null === (a = K.getShaderInfoLog(S[a])) && (a = "(unknown error)"), b = 0 < b && d ? z(a, A, d, b) : 0, c && (F[c >> 2] = b)
            }, yc: function (a, b, c, d) {
                a = K.getShaderPrecisionFormat(a, b), F[c >> 2] = a.rangeMin, F[c + 4 >> 2] = a.rangeMax, F[d >> 2] = a.precision
            }, xc: function (a, b, c, d) {
                (a = K.getShaderSource(S[a])) && (b = 0 < b && d ? z(a, A, d, b) : 0, c && (F[c >> 2] = b))
            }, Ac: function (a, b, c) {
                c ? 35716 == b ? (null === (a = K.getShaderInfoLog(S[a])) && (a = "(unknown error)"), F[c >> 2] = a.length + 1) : 35720 == b ? (a = K.getShaderSource(S[a]), F[c >> 2] = null === a || 0 == a.length ? 0 : a.length + 1) : F[c >> 2] = K.getShaderParameter(S[a], b) : V(1281)
            }, wc: function (a) {
                if (pc[a]) return pc[a];
                switch (a) {
                    case 7939:
                        var b = K.getSupportedExtensions() || [];
                        b = Ac((b = b.concat(b.map(function (d) {
                            return "GL_" + d
                        }))).join(" "));
                        break;
                    case 7936:
                    case 7937:
                    case 37445:
                    case 37446:
                        (b = K.getParameter(a)) || V(1280), b = Ac(b);
                        break;
                    case 7938:
                        b = Ac("OpenGL ES 2.0 (" + K.getParameter(7938) + ")");
                        break;
                    case 35724:
                        var c = (b = K.getParameter(35724)).match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                        null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")"), b = Ac(b);
                        break;
                    default:
                        return V(1280), 0
                }
                return pc[a] = b
            }, vc: function (a, b, c) {
                c ? G[c >> 2] = K.getTexParameter(a, b) : V(1281)
            }, uc: function (a, b, c) {
                c ? F[c >> 2] = K.getTexParameter(a, b) : V(1281)
            }, qc: function (a, b) {
                var d, c = 0;
                return "]" == (b = C(b))[b.length - 1] && (d = b.lastIndexOf("["), c = "]" != b[d + 1] ? parseInt(b.slice(d + 1)) : 0, b = b.slice(0, d)), (a = U[a] && U[a].Kf[b]) && 0 <= c && c < a[0] ? a[1] + c : -1
            }, tc: function (a, b, c) {
                Bc(a, b, c, 2)
            }, rc: function (a, b, c) {
                Bc(a, b, c, 0)
            }, nc: function (a, b, c) {
                c ? F[c >> 2] = K.getVertexAttribOffset(a, b) : V(1281)
            }, pc: function (a, b, c) {
                Cc(a, b, c, 2)
            }, oc: function (a, b, c) {
                Cc(a, b, c, 5)
            }, mc: function (a, b) {
                K.hint(a, b)
            }, lc: function (a) {
                return (a = M[a]) ? K.isBuffer(a) : 0
            }, kc: function (a) {
                return K.isEnabled(a)
            }, jc: function (a) {
                return (a = P[a]) ? K.isFramebuffer(a) : 0
            }, ic: function (a) {
                return (a = O[a]) ? K.isProgram(a) : 0
            }, de: function (a) {
                return (a = T[a]) ? K.qf.isQueryEXT(a) : 0
            }, gc: function (a) {
                return (a = Q[a]) ? K.isRenderbuffer(a) : 0
            }, fc: function (a) {
                return (a = S[a]) ? K.isShader(a) : 0
            }, ec: function (a) {
                return (a = I[a]) ? K.isTexture(a) : 0
            }, Td: function (a) {
                return (a = oc[a]) ? K.isVertexArray(a) : 0
            }, dc: function (a) {
                K.lineWidth(a)
            }, cc: function (a) {
                K.linkProgram(O[a]), uc(a)
            }, bc: function (a, b) {
                3317 == a && (qc = b), K.pixelStorei(a, b)
            }, ac: function (a, b) {
                K.polygonOffset(a, b)
            }, ae: function (a, b) {
                K.qf.queryCounterEXT(T[a], b)
            }, $b: function (a, b, c, d, f, g, k) {
                (k = Dc(g, f, c, d, k)) ? K.readPixels(a, b, c, d, f, g, k) : V(1280)
            }, _b: function () {
            }, Zb: function (a, b, c, d) {
                K.renderbufferStorage(a, b, c, d)
            }, Yb: function (a, b) {
                K.sampleCoverage(a, !!b)
            }, Xb: function (a, b, c, d) {
                K.scissor(a, b, c, d)
            }, Wb: function () {
                V(1280)
            }, Vb: function (a, b, c, d) {
                b = sc(b, c, d), K.shaderSource(S[a], b)
            }, Ub: function (a, b, c) {
                K.stencilFunc(a, b, c)
            }, Tb: function (a, b, c, d) {
                K.stencilFuncSeparate(a, b, c, d)
            }, Sb: function (a) {
                K.stencilMask(a)
            }, Rb: function (a, b) {
                K.stencilMaskSeparate(a, b)
            }, Qb: function (a, b, c) {
                K.stencilOp(a, b, c)
            }, Pb: function (a, b, c, d) {
                K.stencilOpSeparate(a, b, c, d)
            }, Ob: function (a, b, c, d, f, g, k, p, r) {
                K.texImage2D(a, b, c, d, f, g, k, p, r ? Dc(p, k, d, f, r) : null)
            }, Nb: function (a, b, c) {
                K.texParameterf(a, b, c)
            }, Mb: function (a, b, c) {
                K.texParameterf(a, b, G[c >> 2])
            }, Lb: function (a, b, c) {
                K.texParameteri(a, b, c)
            }, Kb: function (a, b, c) {
                K.texParameteri(a, b, F[c >> 2])
            }, Jb: function (a, b, c, d, f, g, k, p, r) {
                var m = null;
                r && (m = Dc(p, k, f, g, r)), K.texSubImage2D(a, b, c, d, f, g, k, p, m)
            }, Ib: function (a, b) {
                K.uniform1f(R[a], b)
            }, Hb: function (a, b, c) {
                if (b <= 256) for (var d = W[b - 1], f = 0; f < b; ++f) d[f] = G[c + 4 * f >> 2]; else d = G.subarray(c >> 2, c + 4 * b >> 2);
                K.uniform1fv(R[a], d)
            }, Gb: function (a, b) {
                K.uniform1i(R[a], b)
            }, Fb: function (a, b, c) {
                if (b <= 256) for (var d = rc[b - 1], f = 0; f < b; ++f) d[f] = F[c + 4 * f >> 2]; else d = F.subarray(c >> 2, c + 4 * b >> 2);
                K.uniform1iv(R[a], d)
            }, Db: function (a, b, c) {
                K.uniform2f(R[a], b, c)
            }, Cb: function (a, b, c) {
                if (2 * b <= 256) for (var d = W[2 * b - 1], f = 0; f < 2 * b; f += 2) d[f] = G[c + 4 * f >> 2], d[f + 1] = G[c + (4 * f + 4) >> 2]; else d = G.subarray(c >> 2, c + 8 * b >> 2);
                K.uniform2fv(R[a], d)
            }, Bb: function (a, b, c) {
                K.uniform2i(R[a], b, c)
            }, Ab: function (a, b, c) {
                if (2 * b <= 256) for (var d = rc[2 * b - 1], f = 0; f < 2 * b; f += 2) d[f] = F[c + 4 * f >> 2], d[f + 1] = F[c + (4 * f + 4) >> 2]; else d = F.subarray(c >> 2, c + 8 * b >> 2);
                K.uniform2iv(R[a], d)
            }, zb: function (a, b, c, d) {
                K.uniform3f(R[a], b, c, d)
            }, yb: function (a, b, c) {
                if (3 * b <= 256) for (var d = W[3 * b - 1], f = 0; f < 3 * b; f += 3) d[f] = G[c + 4 * f >> 2], d[f + 1] = G[c + (4 * f + 4) >> 2], d[f + 2] = G[c + (4 * f + 8) >> 2]; else d = G.subarray(c >> 2, c + 12 * b >> 2);
                K.uniform3fv(R[a], d)
            }, xb: function (a, b, c, d) {
                K.uniform3i(R[a], b, c, d)
            }, wb: function (a, b, c) {
                if (3 * b <= 256) for (var d = rc[3 * b - 1], f = 0; f < 3 * b; f += 3) d[f] = F[c + 4 * f >> 2], d[f + 1] = F[c + (4 * f + 4) >> 2], d[f + 2] = F[c + (4 * f + 8) >> 2]; else d = F.subarray(c >> 2, c + 12 * b >> 2);
                K.uniform3iv(R[a], d)
            }, vb: function (a, b, c, d, f) {
                K.uniform4f(R[a], b, c, d, f)
            }, ub: function (a, b, c) {
                if (4 * b <= 256) {
                    var d = W[4 * b - 1], f = G;
                    c >>= 2;
                    for (var g = 0; g < 4 * b; g += 4) {
                        var k = c + g;
                        d[g] = f[k], d[g + 1] = f[k + 1], d[g + 2] = f[k + 2], d[g + 3] = f[k + 3]
                    }
                } else d = G.subarray(c >> 2, c + 16 * b >> 2);
                K.uniform4fv(R[a], d)
            }, sb: function (a, b, c, d, f) {
                K.uniform4i(R[a], b, c, d, f)
            }, rb: function (a, b, c) {
                if (4 * b <= 256) for (var d = rc[4 * b - 1], f = 0; f < 4 * b; f += 4) d[f] = F[c + 4 * f >> 2], d[f + 1] = F[c + (4 * f + 4) >> 2], d[f + 2] = F[c + (4 * f + 8) >> 2], d[f + 3] = F[c + (4 * f + 12) >> 2]; else d = F.subarray(c >> 2, c + 16 * b >> 2);
                K.uniform4iv(R[a], d)
            }, qb: function (a, b, c, d) {
                if (4 * b <= 256) for (var f = W[4 * b - 1], g = 0; g < 4 * b; g += 4) f[g] = G[d + 4 * g >> 2], f[g + 1] = G[d + (4 * g + 4) >> 2], f[g + 2] = G[d + (4 * g + 8) >> 2], f[g + 3] = G[d + (4 * g + 12) >> 2]; else f = G.subarray(d >> 2, d + 16 * b >> 2);
                K.uniformMatrix2fv(R[a], !!c, f)
            }, pb: function (a, b, c, d) {
                if (9 * b <= 256) for (var f = W[9 * b - 1], g = 0; g < 9 * b; g += 9) f[g] = G[d + 4 * g >> 2], f[g + 1] = G[d + (4 * g + 4) >> 2], f[g + 2] = G[d + (4 * g + 8) >> 2], f[g + 3] = G[d + (4 * g + 12) >> 2], f[g + 4] = G[d + (4 * g + 16) >> 2], f[g + 5] = G[d + (4 * g + 20) >> 2], f[g + 6] = G[d + (4 * g + 24) >> 2], f[g + 7] = G[d + (4 * g + 28) >> 2], f[g + 8] = G[d + (4 * g + 32) >> 2]; else f = G.subarray(d >> 2, d + 36 * b >> 2);
                K.uniformMatrix3fv(R[a], !!c, f)
            }, ob: function (a, b, c, d) {
                if (16 * b <= 256) {
                    var f = W[16 * b - 1], g = G;
                    d >>= 2;
                    for (var k = 0; k < 16 * b; k += 16) {
                        var p = d + k;
                        f[k] = g[p], f[k + 1] = g[p + 1], f[k + 2] = g[p + 2], f[k + 3] = g[p + 3], f[k + 4] = g[p + 4], f[k + 5] = g[p + 5], f[k + 6] = g[p + 6], f[k + 7] = g[p + 7], f[k + 8] = g[p + 8], f[k + 9] = g[p + 9], f[k + 10] = g[p + 10], f[k + 11] = g[p + 11], f[k + 12] = g[p + 12], f[k + 13] = g[p + 13], f[k + 14] = g[p + 14], f[k + 15] = g[p + 15]
                    }
                } else f = G.subarray(d >> 2, d + 64 * b >> 2);
                K.uniformMatrix4fv(R[a], !!c, f)
            }, nb: function (a) {
                K.useProgram(O[a])
            }, mb: function (a) {
                K.validateProgram(O[a])
            }, lb: function (a, b) {
                K.vertexAttrib1f(a, b)
            }, kb: function (a, b) {
                K.vertexAttrib1f(a, G[b >> 2])
            }, jb: function (a, b, c) {
                K.vertexAttrib2f(a, b, c)
            }, hb: function (a, b) {
                K.vertexAttrib2f(a, G[b >> 2], G[b + 4 >> 2])
            }, gb: function (a, b, c, d) {
                K.vertexAttrib3f(a, b, c, d)
            }, fb: function (a, b) {
                K.vertexAttrib3f(a, G[b >> 2], G[b + 4 >> 2], G[b + 8 >> 2])
            }, eb: function (a, b, c, d, f) {
                K.vertexAttrib4f(a, b, c, d, f)
            }, db: function (a, b) {
                K.vertexAttrib4f(a, G[b >> 2], G[b + 4 >> 2], G[b + 8 >> 2], G[b + 12 >> 2])
            }, Pd: function (a, b) {
                K.vertexAttribDivisor(a, b)
            }, cb: function (a, b, c, d, f, g) {
                K.vertexAttribPointer(a, b, c, !!d, f, g)
            }, bb: function (a, b, c, d) {
                K.viewport(a, b, c, d)
            }, k: function (a, b) {
                throw Z(a, b || 1), "longjmp"
            }, ge: function (a, b, c) {
                A.copyWithin(a, b, b + c)
            }, he: function (a) {
                a >>>= 0;
                var b = A.length;
                if (2147483648 < a) return !1;
                for (var c = 1; c <= 4; c *= 2) {
                    var d = b * (1 + .2 / c), d = Math.min(d, a + 100663296);
                    0 < (d = Math.max(16777216, a, d)) % 65536 && (d += 65536 - d % 65536);
                    a:{
                        try {
                            wa.grow(Math.min(2147483648, d) - Ia.byteLength + 65535 >>> 16), Ma(wa.buffer);
                            var f = 1;
                            break a
                        } catch (g) {
                        }
                        f = void 0
                    }
                    if (f) return !0
                }
                return !1
            }, Xa: function (a, b) {
                Xb(e.canvas, a, b), Yb()
            }, le: function (a, b) {
                var c = 0;
                return Ic().forEach(function (d, f) {
                    var g = b + c;
                    for (f = F[a + 4 * f >> 2] = g, g = 0; g < d.length; ++g) Ca[f++ >> 0] = d.charCodeAt(g);
                    Ca[f >> 0] = 0, c += d.length + 1
                }), 0
            }, me: function (a, b) {
                var c = Ic();
                F[a >> 2] = c.length;
                var d = 0;
                return c.forEach(function (f) {
                    d += f.length + 1
                }), F[b >> 2] = d, 0
            }, Ha: function (a) {
                !noExitRuntime && (ya = !0, Oa(Sa), e.onExit) && e.onExit(a), da(a, new pa(a))
            }, ua: function () {
                return 0
            }, ne: function (a, b, c, d) {
                return a = nb.og(a), b = nb.mg(a, b, c), F[d >> 2] = b, 0
            }, ab: function () {
            }, va: function (a, b, c, d) {
                for (var f = 0, g = 0; g < c; g++) {
                    for (var k = F[b + 8 * g >> 2], p = F[b + (8 * g + 4) >> 2], r = 0; r < p; r++) mb(a, A[k + r]);
                    f += p
                }
                return F[d >> 2] = f, 0
            }, c: function () {
                return 0 | ua
            }, fa: function (a) {
                K.activeTexture(a)
            }, ma: function (a, b) {
                K.attachShader(O[a], S[b])
            }, l: function (a, b) {
                K.bindBuffer(a, M[b])
            }, i: function (a, b) {
                K.bindFramebuffer(a, P[b])
            }, w: function (a, b) {
                K.bindRenderbuffer(a, Q[b])
            }, h: function (a, b) {
                K.bindTexture(a, I[b])
            }, Ae: function (a, b, c, d) {
                K.blendColor(a, b, c, d)
            }, Be: function (a, b) {
                K.blendEquationSeparate(a, b)
            }, Da: function (a, b, c, d) {
                K.blendFuncSeparate(a, b, c, d)
            }, xa: function (a, b, c, d) {
                K.bufferData(a, c ? A.subarray(c, c + b) : b, d)
            }, Ca: function (a, b, c, d) {
                K.bufferSubData(a, b, A.subarray(d, d + c))
            }, S: function (a) {
                return K.checkFramebufferStatus(a)
            }, we: function (a) {
                K.clear(a)
            }, Ba: function (a, b, c, d) {
                K.clearColor(a, b, c, d)
            }, ye: function (a) {
                K.clearDepth(a)
            }, xe: function (a) {
                K.clearStencil(a)
            }, D: function (a, b, c, d) {
                K.colorMask(!!a, !!b, !!c, !!d)
            }, Ga: function (a) {
                K.compileShader(S[a])
            }, Eb: function (a, b, c, d, f, g, k, p) {
                K.compressedTexImage2D(a, b, c, d, f, g, p ? A.subarray(p, p + k) : null)
            }, La: function (a, b, c, d, f, g, k, p, r) {
                K.compressedTexSubImage2D(a, b, c, d, f, g, k, r ? A.subarray(r, r + p) : null)
            }, Ua: function () {
                var a = H(O), b = K.createProgram();
                return b.name = a, O[a] = b, a
            }, Ja: function (a) {
                var b = H(S);
                return S[b] = K.createShader(a), b
            }, $: function (a) {
                K.cullFace(a)
            }, ha: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2], f = M[d];
                    f && (K.deleteBuffer(f), f.name = 0, M[d] = null, d == vc && (vc = 0), d == wc && (wc = 0))
                }
            }, R: function (a, b) {
                for (var c = 0; c < a; ++c) {
                    var d = F[b + 4 * c >> 2], f = P[d];
                    f && (K.deleteFramebuffer(f), f.name = 0, P[d] = null)
                }
            }, la: function (a) {
                var b;
                a && ((b = O[a]) ? (K.deleteProgram(b), b.name = 0, O[a] = null, U[a] = null) : V(1281))
            }, U: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2], f = Q[d];
                    f && (K.deleteRenderbuffer(f), f.name = 0, Q[d] = null)
                }
            }, da: function (a) {
                var b;
                a && ((b = S[a]) ? (K.deleteShader(b), S[a] = null) : V(1281))
            }, G: function (a, b) {
                for (var c = 0; c < a; c++) {
                    var d = F[b + 4 * c >> 2], f = I[d];
                    f && (K.deleteTexture(f), f.name = 0, I[d] = null)
                }
            }, B: function (a) {
                K.depthFunc(a)
            }, O: function (a) {
                K.depthMask(!!a)
            }, ka: function (a, b) {
                K.detachShader(O[a], S[b])
            }, j: function (a) {
                K.disable(a)
            }, q: function (a) {
                K.disableVertexAttribArray(a)
            }, Aa: function (a, b, c) {
                K.drawArrays(a, b, c)
            }, za: function (a, b, c, d) {
                K.drawElements(a, b, c, d)
            }, m: function (a) {
                K.enable(a)
            }, ja: function (a) {
                K.enableVertexAttribArray(a)
            }, ze: function () {
                K.flush()
            }, T: function (a, b, c, d) {
                K.framebufferRenderbuffer(a, b, c, Q[d])
            }, E: function (a, b, c, d, f) {
                K.framebufferTexture2D(a, b, c, I[d], f)
            }, ya: function (a, b) {
                X(a, b, "createBuffer", M)
            }, F: function (a, b) {
                X(a, b, "createFramebuffer", P)
            }, V: function (a, b) {
                X(a, b, "createRenderbuffer", Q)
            }, J: function (a, b) {
                X(a, b, "createTexture", I)
            }, ea: function (a) {
                K.generateMipmap(a)
            }, Qa: function (a, b, c, d, f, g, k) {
                a = O[a], (a = K.getActiveAttrib(a, b)) && (c = 0 < c && k ? z(a.name, A, k, c) : 0, d && (F[d >> 2] = c), f && (F[f >> 2] = a.size), g && (F[g >> 2] = a.type))
            }, Pa: function (a, b, c, d, f, g, k) {
                a = O[a], (a = K.getActiveUniform(a, b)) && (c = 0 < c && k ? z(a.name, A, k, c) : 0, d && (F[d >> 2] = c), f && (F[f >> 2] = a.size), g && (F[g >> 2] = a.type))
            }, y: function (a, b) {
                return K.getAttribLocation(O[a], C(b))
            }, g: function () {
                var a = K.getError() || nc;
                return nc = 0, a
            }, Va: function (a, b) {
                zc(a, b, 2)
            }, C: function (a, b) {
                zc(a, b, 0)
            }, Ra: function (a, b, c, d) {
                null === (a = K.getProgramInfoLog(O[a])) && (a = "(unknown error)"), b = 0 < b && d ? z(a, A, d, b) : 0, c && (F[c >> 2] = b)
            }, z: function (a, b, c) {
                if (c) if (mc <= a) V(1281); else {
                    var d = U[a];
                    if (d) if (35716 == b) null === (a = K.getProgramInfoLog(O[a])) && (a = "(unknown error)"), F[c >> 2] = a.length + 1; else if (35719 == b) F[c >> 2] = d.Bf; else if (35722 == b) {
                        if (-1 == d.rf) {
                            a = O[a];
                            var f = K.getProgramParameter(a, 35721);
                            for (b = d.rf = 0; b < f; ++b) d.rf = Math.max(d.rf, K.getActiveAttrib(a, b).name.length + 1)
                        }
                        F[c >> 2] = d.rf
                    } else if (35381 == b) {
                        if (-1 == d.sf) for (a = O[a], f = K.getProgramParameter(a, 35382), b = d.sf = 0; b < f; ++b) d.sf = Math.max(d.sf, K.getActiveUniformBlockName(a, b).length + 1);
                        F[c >> 2] = d.sf
                    } else F[c >> 2] = K.getProgramParameter(O[a], b); else V(1282)
                } else V(1281)
            }, Ea: function (a, b, c, d) {
                null === (a = K.getShaderInfoLog(S[a])) && (a = "(unknown error)"), b = 0 < b && d ? z(a, A, d, b) : 0, c && (F[c >> 2] = b)
            }, Fa: function (a, b, c) {
                c ? 35716 == b ? (null === (a = K.getShaderInfoLog(S[a])) && (a = "(unknown error)"), F[c >> 2] = a.length + 1) : 35720 == b ? (a = K.getShaderSource(S[a]), F[c >> 2] = null === a || 0 == a.length ? 0 : a.length + 1) : F[c >> 2] = K.getShaderParameter(S[a], b) : V(1281)
            }, W: function (a) {
                if (pc[a]) return pc[a];
                switch (a) {
                    case 7939:
                        var b = K.getSupportedExtensions() || [];
                        b = Ac((b = b.concat(b.map(function (d) {
                            return "GL_" + d
                        }))).join(" "));
                        break;
                    case 7936:
                    case 7937:
                    case 37445:
                    case 37446:
                        (b = K.getParameter(a)) || V(1280), b = Ac(b);
                        break;
                    case 7938:
                        b = Ac("OpenGL ES 2.0 (" + K.getParameter(7938) + ")");
                        break;
                    case 35724:
                        var c = (b = K.getParameter(35724)).match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                        null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")"), b = Ac(b);
                        break;
                    default:
                        return V(1280), 0
                }
                return pc[a] = b
            }, Oa: function (a, b) {
                var d, c = 0;
                return "]" == (b = C(b))[b.length - 1] && (d = b.lastIndexOf("["), c = "]" != b[d + 1] ? parseInt(b.slice(d + 1)) : 0, b = b.slice(0, d)), (a = U[a] && U[a].Kf[b]) && 0 <= c && c < a[0] ? a[1] + c : -1
            }, Ta: function (a) {
                K.linkProgram(O[a]), uc(a)
            }, I: function (a, b) {
                3317 == a && (qc = b), K.pixelStorei(a, b)
            }, Y: function (a, b, c, d, f, g, k) {
                (k = Dc(g, f, c, d, k)) ? K.readPixels(a, b, c, d, f, g, k) : V(1280)
            }, ga: function (a, b, c, d) {
                K.renderbufferStorage(a, b, c, d)
            }, P: function (a, b, c, d) {
                K.scissor(a, b, c, d)
            }, Ia: function (a, b, c, d) {
                b = sc(b, c, d), K.shaderSource(S[a], b)
            }, ba: function (a, b, c, d) {
                K.stencilFuncSeparate(a, b, c, d)
            }, aa: function (a, b, c, d) {
                K.stencilOpSeparate(a, b, c, d)
            }, Wa: function (a, b, c, d, f, g, k, p, r) {
                K.texImage2D(a, b, c, d, f, g, k, p, r ? Dc(p, k, d, f, r) : null)
            }, Na: function (a, b, c) {
                K.texParameterf(a, b, c)
            }, Ma: function (a, b, c) {
                K.texParameterf(a, b, G[c >> 2])
            }, r: function (a, b, c) {
                K.texParameteri(a, b, c)
            }, Ka: function (a, b, c, d, f, g, k, p, r) {
                var m = null;
                r && (m = Dc(p, k, f, g, r)), K.texSubImage2D(a, b, c, d, f, g, k, p, m)
            }, te: function (a, b) {
                K.uniform1i(R[a], b)
            }, ve: function (a, b, c) {
                if (b <= 256) for (var d = rc[b - 1], f = 0; f < b; ++f) d[f] = F[c + 4 * f >> 2]; else d = F.subarray(c >> 2, c + 4 * b >> 2);
                K.uniform1iv(R[a], d)
            }, _: function (a, b, c) {
                if (4 * b <= 256) {
                    var d = W[4 * b - 1], f = G;
                    c >>= 2;
                    for (var g = 0; g < 4 * b; g += 4) {
                        var k = c + g;
                        d[g] = f[k], d[g + 1] = f[k + 1], d[g + 2] = f[k + 2], d[g + 3] = f[k + 3]
                    }
                } else d = G.subarray(c >> 2, c + 16 * b >> 2);
                K.uniform4fv(R[a], d)
            }, ue: function (a, b, c, d) {
                if (9 * b <= 256) for (var f = W[9 * b - 1], g = 0; g < 9 * b; g += 9) f[g] = G[d + 4 * g >> 2], f[g + 1] = G[d + (4 * g + 4) >> 2], f[g + 2] = G[d + (4 * g + 8) >> 2], f[g + 3] = G[d + (4 * g + 12) >> 2], f[g + 4] = G[d + (4 * g + 16) >> 2], f[g + 5] = G[d + (4 * g + 20) >> 2], f[g + 6] = G[d + (4 * g + 24) >> 2], f[g + 7] = G[d + (4 * g + 28) >> 2], f[g + 8] = G[d + (4 * g + 32) >> 2]; else f = G.subarray(d >> 2, d + 36 * b >> 2);
                K.uniformMatrix3fv(R[a], !!c, f)
            }, Z: function (a, b, c, d) {
                if (16 * b <= 256) {
                    var f = W[16 * b - 1], g = G;
                    d >>= 2;
                    for (var k = 0; k < 16 * b; k += 16) {
                        var p = d + k;
                        f[k] = g[p], f[k + 1] = g[p + 1], f[k + 2] = g[p + 2], f[k + 3] = g[p + 3], f[k + 4] = g[p + 4], f[k + 5] = g[p + 5], f[k + 6] = g[p + 6], f[k + 7] = g[p + 7], f[k + 8] = g[p + 8], f[k + 9] = g[p + 9], f[k + 10] = g[p + 10], f[k + 11] = g[p + 11], f[k + 12] = g[p + 12], f[k + 13] = g[p + 13], f[k + 14] = g[p + 14], f[k + 15] = g[p + 15]
                    }
                } else f = G.subarray(d >> 2, d + 64 * b >> 2);
                K.uniformMatrix4fv(R[a], !!c, f)
            }, x: function (a) {
                K.useProgram(O[a])
            }, ia: function (a, b, c, d, f, g) {
                K.vertexAttribPointer(a, b, c, !!d, f, g)
            }, ca: function (a, b, c, d) {
                K.viewport(a, b, c, d)
            }, A: function (a, b) {
                var c = B();
                try {
                    return ld(a, b)
                } catch (d) {
                    if (E(c), d !== d + 0 && "longjmp" !== d) throw d;
                    Z(1, 0)
                }
            }, M: function (a, b, c) {
                var d = B();
                try {
                    return md(a, b, c)
                } catch (f) {
                    if (E(d), f !== f + 0 && "longjmp" !== f) throw f;
                    Z(1, 0)
                }
            }, Q: function (a, b, c, d) {
                var f = B();
                try {
                    return nd(a, b, c, d)
                } catch (g) {
                    if (E(f), g !== g + 0 && "longjmp" !== g) throw g;
                    Z(1, 0)
                }
            }, ta: function (a, b, c, d, f) {
                var g = B();
                try {
                    return od(a, b, c, d, f)
                } catch (k) {
                    if (E(g), k !== k + 0 && "longjmp" !== k) throw k;
                    Z(1, 0)
                }
            }, sa: function (a, b, c, d, f, g, k, p, r, m) {
                var q = B();
                try {
                    return pd(a, b, c, d, f, g, k, p, r, m)
                } catch (t) {
                    if (E(q), t !== t + 0 && "longjmp" !== t) throw t;
                    Z(1, 0)
                }
            }, N: function (a, b) {
                var c = B();
                try {
                    id(a, b)
                } catch (d) {
                    if (E(c), d !== d + 0 && "longjmp" !== d) throw d;
                    Z(1, 0)
                }
            }, t: function (a, b, c) {
                var d = B();
                try {
                    jd(a, b, c)
                } catch (f) {
                    if (E(d), f !== f + 0 && "longjmp" !== f) throw f;
                    Z(1, 0)
                }
            }, o: function (a, b, c, d) {
                var f = B();
                try {
                    kd(a, b, c, d)
                } catch (g) {
                    if (E(f), g !== g + 0 && "longjmp" !== g) throw g;
                    Z(1, 0)
                }
            }, memory: wa, sc: function (a, b) {
                if (0 === a) return ib(28), -1;
                var c = F[a >> 2];
                if ((a = F[a + 4 >> 2]) < 0 || 999999999 < a || c < 0) return ib(28), -1;
                for (0 !== b && (F[b >> 2] = 0, F[b + 4 >> 2] = 0), b = 1e6 * c + a / 1e3, c = ub(); ub() - c < b / 1e3;) ;
            }, qe: function () {
                return 6
            }, se: function () {
            }, p: function (a) {
                return 0 <= (a = +a) ? +Wa(a + .5) : +Va(a - .5)
            }, u: function Fc(a, b, c, d) {
                b |= 0, c |= 0, d |= 0;
                var f = 0;
                for (Ec = Ec + 1 | 0, F[(a |= 0) >> 2] = Ec; (0 | f) < (0 | d);) {
                    if (0 == (0 | F[c + (f << 3) >> 2])) return F[c + (f << 3) >> 2] = Ec, F[c + (4 + (f << 3)) >> 2] = b, F[c + (8 + (f << 3)) >> 2] = 0, ua = 0 | d, 0 | c;
                    f = f + 1 | 0
                }
                return c = 0 | Fc(0 | a, 0 | b, 0 | (c = 0 | Gc(0 | c, 8 * (1 + (d = 2 * d | 0) | 0) | 0)), 0 | d), ua = 0 | d, 0 | c
            }, d: function (a) {
                ua = 0 | a
            }, ie: Qc, re: function (a) {
                switch (a) {
                    case 30:
                        return 16384;
                    case 85:
                        return 131072;
                    case 132:
                    case 133:
                    case 12:
                    case 137:
                    case 138:
                    case 15:
                    case 235:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 149:
                    case 13:
                    case 10:
                    case 236:
                    case 153:
                    case 9:
                    case 21:
                    case 22:
                    case 159:
                    case 154:
                    case 14:
                    case 77:
                    case 78:
                    case 139:
                    case 80:
                    case 81:
                    case 82:
                    case 68:
                    case 67:
                    case 164:
                    case 11:
                    case 29:
                    case 47:
                    case 48:
                    case 95:
                    case 52:
                    case 51:
                    case 46:
                    case 79:
                        return 200809;
                    case 27:
                    case 246:
                    case 127:
                    case 128:
                    case 23:
                    case 24:
                    case 160:
                    case 161:
                    case 181:
                    case 182:
                    case 242:
                    case 183:
                    case 184:
                    case 243:
                    case 244:
                    case 245:
                    case 165:
                    case 178:
                    case 179:
                    case 49:
                    case 50:
                    case 168:
                    case 169:
                    case 175:
                    case 170:
                    case 171:
                    case 172:
                    case 97:
                    case 76:
                    case 32:
                    case 173:
                    case 35:
                        return -1;
                    case 176:
                    case 177:
                    case 7:
                    case 155:
                    case 8:
                    case 157:
                    case 125:
                    case 126:
                    case 92:
                    case 93:
                    case 129:
                    case 130:
                    case 131:
                    case 94:
                    case 91:
                        return 1;
                    case 74:
                    case 60:
                    case 69:
                    case 70:
                    case 4:
                        return 1024;
                    case 31:
                    case 42:
                    case 72:
                        return 32;
                    case 87:
                    case 26:
                    case 33:
                        return 2147483647;
                    case 34:
                    case 1:
                        return 47839;
                    case 38:
                    case 36:
                        return 99;
                    case 43:
                    case 37:
                        return 2048;
                    case 0:
                        return 2097152;
                    case 3:
                        return 65536;
                    case 28:
                        return 32768;
                    case 44:
                        return 32767;
                    case 75:
                        return 16384;
                    case 39:
                        return 1e3;
                    case 89:
                        return 700;
                    case 71:
                        return 256;
                    case 40:
                        return 255;
                    case 2:
                        return 100;
                    case 180:
                        return 64;
                    case 25:
                        return 20;
                    case 5:
                        return 16;
                    case 6:
                        return 6;
                    case 73:
                        return 4;
                    case 84:
                        return "object" == typeof navigator && navigator.hardwareConcurrency || 1
                }
                return ib(28), -1
            }, table: xa, e: function (a, b, c) {
                a |= 0, b |= 0, c |= 0;
                for (var f, d = 0; (0 | d) < (0 | c) && 0 != (0 | (f = 0 | F[b + (d << 3) >> 2]));) {
                    if ((0 | f) == (0 | a)) return 0 | F[b + (4 + (d << 3)) >> 2];
                    d = d + 1 | 0
                }
                return 0
            }, Ce: function (a) {
                var b = Date.now() / 1e3 | 0;
                return a && (F[a >> 2] = b), b
            }
        }, hd = function () {
            function a(f) {
                e.asm = f.exports, Xa--, e.monitorRunDependencies && e.monitorRunDependencies(Xa), 0 == Xa && (null !== Ya && (clearInterval(Ya), Ya = null), Za && (f = Za, Za = null, f()))
            }

            function b(f) {
                a(f.instance)
            }

            function c(f) {
                return (va || !ha && !ia || "function" != typeof fetch || $a("file://") ? new Promise(function (a) {
                    a(db())
                }) : fetch(ab, {credentials: "same-origin"}).then(function (a) {
                    if (!a.ok) throw"failed to load wasm binary file at '" + ab + "'";
                    return a.arrayBuffer()
                }).catch(db)).then(function (g) {
                    return WebAssembly.instantiate(g, d)
                }).then(f, function (g) {
                    y("failed to asynchronously prepare wasm: " + g), qa(g)
                })
            }

            var d = {a: gd};
            if (Xa++, e.monitorRunDependencies && e.monitorRunDependencies(Xa), e.instantiateWasm) try {
                return e.instantiateWasm(d, a)
            } catch (f) {
                return y("Module.instantiateWasm callback failed with error: " + f), !1
            }
            return va || "function" != typeof WebAssembly.instantiateStreaming || bb() || $a("file://") || "function" != typeof fetch ? c(b) : fetch(ab, {credentials: "same-origin"}).then(function (f) {
                return WebAssembly.instantiateStreaming(f, d).then(b, function (g) {
                    y("wasm streaming compile failed: " + g), y("falling back to ArrayBuffer instantiation"), c(b)
                })
            }), {}
        }();
        e.asm = hd;
        var gb = e.___wasm_call_ctors = function () {
            return (gb = e.___wasm_call_ctors = e.asm.De).apply(null, arguments)
        };
        e._initialize = function () {
            return (e._initialize = e.asm.Ee).apply(null, arguments)
        }, e._setLicenseKey = function () {
            return (e._setLicenseKey = e.asm.Fe).apply(null, arguments)
        }, e._stringToC = function () {
            return (e._stringToC = e.asm.Ge).apply(null, arguments)
        }, e._shutdownEngine = function () {
            return (e._shutdownEngine = e.asm.He).apply(null, arguments)
        }, e._processFrameVideo = function () {
            return (e._processFrameVideo = e.asm.Ie).apply(null, arguments)
        }, e._processFrameRawPixels = function () {
            return (e._processFrameRawPixels = e.asm.Je).apply(null, arguments)
        }, e._takeScreenshot = function () {
            return (e._takeScreenshot = e.asm.Ke).apply(null, arguments)
        }, e._switchEffect = function () {
            return (e._switchEffect = e.asm.Le).apply(null, arguments)
        }, e._clearEffect = function () {
            return (e._clearEffect = e.asm.Me).apply(null, arguments)
        }, e._showStats = function () {
            return (e._showStats = e.asm.Ne).apply(null, arguments)
        }, e._render = function () {
            return (e._render = e.asm.Oe).apply(null, arguments)
        }, e._fireTrigger = function () {
            return (e._fireTrigger = e.asm.Pe).apply(null, arguments)
        }, e._setFaceDetectionSensitivity = function () {
            return (e._setFaceDetectionSensitivity = e.asm.Qe).apply(null, arguments)
        }, e._changeParameterFloat = function () {
            return (e._changeParameterFloat = e.asm.Re).apply(null, arguments)
        }, e._changeParameterBool = function () {
            return (e._changeParameterBool = e.asm.Se).apply(null, arguments)
        }, e._changeParameterVector = function () {
            return (e._changeParameterVector = e.asm.Te).apply(null, arguments)
        }, e._changeParameterTexture = function () {
            return (e._changeParameterTexture = e.asm.Ue).apply(null, arguments)
        }, e._reset = function () {
            return (e._reset = e.asm.Ve).apply(null, arguments)
        };
        var qd, Ha = e._malloc = function () {
            return (Ha = e._malloc = e.asm.We).apply(null, arguments)
        }, Wc = e._free = function () {
            return (Wc = e._free = e.asm.Xe).apply(null, arguments)
        }, Gc = e._realloc = function () {
            return (Gc = e._realloc = e.asm.Ye).apply(null, arguments)
        }, jb = e.___errno_location = function () {
            return (jb = e.___errno_location = e.asm.Ze).apply(null, arguments)
        }, Xc = e._emscripten_GetProcAddress = function () {
            return (Xc = e._emscripten_GetProcAddress = e.asm._e).apply(null, arguments)
        }, Z = e._setThrew = function () {
            return (Z = e._setThrew = e.asm.$e).apply(null, arguments)
        }, id = e.dynCall_vi = function () {
            return (id = e.dynCall_vi = e.asm.af).apply(null, arguments)
        }, jd = e.dynCall_vii = function () {
            return (jd = e.dynCall_vii = e.asm.bf).apply(null, arguments)
        }, kd = e.dynCall_viii = function () {
            return (kd = e.dynCall_viii = e.asm.cf).apply(null, arguments)
        }, Yc = e.dynCall_viiii = function () {
            return (Yc = e.dynCall_viiii = e.asm.df).apply(null, arguments)
        }, ld = e.dynCall_ii = function () {
            return (ld = e.dynCall_ii = e.asm.ef).apply(null, arguments)
        }, md = e.dynCall_iii = function () {
            return (md = e.dynCall_iii = e.asm.ff).apply(null, arguments)
        }, nd = e.dynCall_iiii = function () {
            return (nd = e.dynCall_iiii = e.asm.gf).apply(null, arguments)
        }, od = e.dynCall_iiiii = function () {
            return (od = e.dynCall_iiiii = e.asm.hf).apply(null, arguments)
        }, pd = e.dynCall_iiiiiiiiii = function () {
            return (pd = e.dynCall_iiiiiiiiii = e.asm.jf).apply(null, arguments)
        }, B = e.stackSave = function () {
            return (B = e.stackSave = e.asm.kf).apply(null, arguments)
        }, Ba = e.stackAlloc = function () {
            return (Ba = e.stackAlloc = e.asm.lf).apply(null, arguments)
        }, E = e.stackRestore = function () {
            return (E = e.stackRestore = e.asm.mf).apply(null, arguments)
        };

        function pa(a) {
            this.name = "ExitStatus", this.message = "Program terminated with exit(" + a + ")", this.status = a
        }

        function sd() {
            function a() {
                if (!qd && (qd = !0, e.calledRun = !0, !ya)) {
                    if (Oa(Qa), Oa(Ra), aa(e), e.onRuntimeInitialized && e.onRuntimeInitialized(), e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
                        var b = e.postRun.shift();
                        Ta.unshift(b)
                    }
                    Oa(Ta)
                }
            }

            if (!(0 < Xa)) {
                if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) !function () {
                    var a = e.preRun.shift();
                    Pa.unshift(a)
                }();
                Oa(Pa), 0 < Xa || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
                    setTimeout(function () {
                        e.setStatus("")
                    }, 1), a()
                }, 1)) : a())
            }
        }

        if (e.dynCall_v = function () {
            return (e.dynCall_v = e.asm.nf).apply(null, arguments)
        }, e.asm = hd, e.ccall = Aa, e.cwrap = function (a, b, c, d) {
            var f = (c = c || []).every(function (g) {
                return "number" === g
            });
            return "string" !== b && f && !d ? za(a) : function () {
                return Aa(a, b, c, arguments)
            }
        }, Za = function rd() {
            qd || sd(), qd || (Za = rd)
        }, e.run = sd, e.preInit) for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
        return sd(), createDeepARModule.ready
    }
}();
"object" == typeof exports && "object" == typeof module ? module.exports = createDeepARModule : "function" == typeof define && define.amd ? define([], function () {
    return createDeepARModule
}) : "object" == typeof exports && (exports.createDeepARModule = createDeepARModule);
var DeepAR = function (params) {
    for (var module = null, functionsToCallOnInitialize = [], callbackFuncs = ["onInitialize", "onVideoStarted", "onAnimationTransitionedToState", "onScreenshotTaken", "onScreenshotTakenCanvas", "onCameraPermissionAsked", "onCameraPermissionDenied", "onCameraPermissionGranted", "onImageVisibilityChanged", "onFaceVisibilityChanged", "onFaceTracked"], apiObject = {
        switchEffect: function (face, slot, path, cb) {
            module ? module.switchEffect(face, slot, path, cb) : console.log("DeepAR not yet initialized.")
        }, switchEffectByteArray: function (face, slot, byteArray) {
            module ? module.switchEffectByteArray(face, slot, byteArray) : console.log("DeepAR not yet initialized.")
        }, clearEffect: function (slot) {
            module ? module.clearEffect(slot) : console.log("DeepAR not yet initialized.")
        }, startVideo: function (mirror, videoOptions) {
            module ? (module.startVideo(mirror, videoOptions), module.startLoop()) : console.log("DeepAR not yet initialized.")
        }, stopVideo: function () {
            module ? module.stopVideo() : console.log("DeepAR not yet initialized.")
        }, setVideoElement: function (videoElement, mirror) {
            module ? module.setVideoElement(videoElement, mirror) : console.log("DeepAR not yet initialized.")
        }, shutdown: function () {
            module ? module.shutdown() : console.log("DeepAR not yet initialized.")
        }, setCanvasSize: function (width, height) {
            module ? module.reset(width, height) : functionsToCallOnInitialize.push(function () {
                module.reset(width, height)
            })
        }, downloadFaceTrackingModel: function (path, cb) {
            var modelFileXHR = new XMLHttpRequest;
            modelFileXHR.open("GET", path, !0), modelFileXHR.responseType = "arraybuffer", modelFileXHR.onreadystatechange = function (event) {
                var byteArray;
                4 == modelFileXHR.readyState && 200 == modelFileXHR.status && (byteArray = new Uint8Array(modelFileXHR.response), module ? (module.setFaceTrackingModel(byteArray), cb && cb()) : functionsToCallOnInitialize.push(function () {
                    module.setFaceTrackingModel(byteArray), cb && cb()
                }))
            }, modelFileXHR.send(null)
        }, setFaceTrackingModel: function (byteArray) {
            module ? module.setFaceTrackingModel(byteArray) : functionsToCallOnInitialize.push(function () {
                module.setFaceTrackingModel(byteArray)
            })
        }, showStats: function (enabled) {
            module ? module.showStats(enabled) : console.log("DeepAR not yet initialized.")
        }, processFrame: function (frame, width, height, mirror) {
            module ? module.processFrameRawPixels(frame, width, height, mirror) : console.log("DeepAR not yet initialized.")
        }, processImageAtUrl: function (url) {
        }, processImage: function (image) {
            var canvas, ctx, imageData, byteArray;
            module ? (ctx = (canvas = document.createElement("canvas")).getContext("2d"), canvas.width = image.width, canvas.height = image.height, ctx.drawImage(image, 0, 0), imageData = ctx.getImageData(0, 0, canvas.width, canvas.height), byteArray = new Uint8Array(imageData.data.buffer), deepAR.processFrame(byteArray, image.width, image.height, !1)) : console.log("DeepAR not yet initialized.")
        }, resume: function () {
            module ? module.startLoop() : console.log("DeepAR not yet initialized.")
        }, pause: function () {
            module ? module.endLoop() : console.log("DeepAR not yet initialized.")
        }, changeParameterFloat: function (gameObject, component, parameter, value) {
            module ? module.changeParameterFloat(gameObject, component, parameter, value) : console.log("DeepAR not yet initialized.")
        }, changeParameterBool: function (gameObject, component, parameter, value) {
            module ? module.changeParameterBool(gameObject, component, parameter, value) : console.log("DeepAR not yet initialized.")
        }, changeParameterVector: function (gameObject, component, parameter, x, y, z, w) {
            module ? module.changeParameterVector(gameObject, component, parameter, x, y, z, w) : console.log("DeepAR not yet initialized.")
        }, changeParameterTexture: function (gameObject, component, parameter, textureUrl) {
            var img;
            module ? ((img = new Image).onload = function () {
                var imgCanvas = document.createElement("canvas"), imgCanvasContext = imgCanvas.getContext("2d");
                imgCanvas.width = img.width, imgCanvas.height = img.height, imgCanvasContext.drawImage(img, 0, 0);
                var imageData = imgCanvasContext.getImageData(0, 0, imgCanvas.width, imgCanvas.height),
                    byteArray = new Uint8Array(imageData.data.buffer), buffer = module._malloc(byteArray.length);
                module.HEAPU8.set(byteArray, buffer), module.changeParameterTexture(gameObject, component, parameter, buffer, byteArray.length, imgCanvas.width, imgCanvas.height)
            }, img.src = textureUrl) : console.log("DeepAR not yet initialized.")
        }, takeScreenshot: function () {
            module ? module.takeScreenshot() : console.log("DeepAR not yet initialized.")
        }, setFps: function (fps) {
            module ? module.setFps(fps) : console.log("DeepAR not yet initialized.")
        }
    }, i = 0; i < callbackFuncs.length; i++) params[callbackFuncs[i]] && (apiObject[callbackFuncs[i]] = params[callbackFuncs[i]]);
    var p = {
        licenseKey: params.licenseKey,
        canvasWidth: params.canvasWidth,
        canvasHeight: params.canvasHeight,
        canvas: params.canvas,
        numberOfFaces: params.numberOfFaces,
        apiObject: apiObject
    };
    return createDeepARModule(p).then(function (_module) {
        module = _module, apiObject.onInitialize();
        for (var i = 0; i < functionsToCallOnInitialize.length; i++) functionsToCallOnInitialize[i]()
    }), apiObject
};
