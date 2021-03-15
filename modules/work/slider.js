import * as THREE from 'three'
import { TimelineLite } from 'gsap'
import { vertexShader } from '~/assets/shader/slider.vs'
import { fragmentShader } from '~/assets/shader/slider.fs'
import map from '~/assets/js/math/map'
import MouseHelper from '~/assets/js/utils/MouseHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'

import emitter from '~/assets/js/events/EventsEmitter'
export default class Slider {
    constructor(images, config) {
        this.vertex = vertexShader
        this.fragment = fragmentShader
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.container = document.getElementById('slider')
        this.images = images
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.textures = []
        this.clock = new THREE.Clock()
        this.mouse = new THREE.Vector2()
        this.current = 0
        this.imagesQueue = []
        this.isAnimate = false
        this.config = config
        this.uniforms = {
            strength: { value: 10 },
            alpha: { value: 0 },
            uOffset: {
                value: new THREE.Vector2(0.0, 0.0)
            },
            uTime: { value: 0 },
            progress: { type: 'f', value: 0 },
            texture1: { type: 'f', value: '' },
            texture2: { type: 'f', value: '' }
        }
        this.isEnter = false
        this.indexIsChange = false
        this.newI = 0
        this.prevI = 0
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(this.width, this.height)
        this.container.appendChild(this.renderer.domElement)
        this.setCamera()
        this.initiate(() => {
            this.setPlane()
            this.onWindowResize()
        })
    }
    canUseWebP() {
        var elem = document.createElement('canvas')

        if (elem.getContext && elem.getContext('2d')) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
        }
        return false
    }
    sizeAndFormatImage(url) {
        let awsUrl = this.config.awsUrl
        let size = ''
        if (this.width / 2 < 500) size = 'small_'
        else if (this.width / 2 < 750) size = 'medium_'
        else size = 'large_'
        let imageName = url
            .replace('.webp', '')
            .replace('.jpg', '')
            .replace(this.config.awsUrl, '')
        let format = this.canUseWebP() ? '.webp' : '.jpg'
        return `${awsUrl}${size}${imageName}${format}`
    }
    initiate(cb) {
        const promises = []
        let that = this
        emitter.on('INDEX:ENTER', (i) => {
            this.newI = i
        })
        this.images.forEach((url, i) => {
            let newUrl = this.sizeAndFormatImage(url)
            let promise = new Promise((resolve) => {
                const image = new Image()
                image.crossOrigin = 'anonymous'
                image.src = newUrl
                that.textures[i] = new THREE.Texture(image)
                image.addEventListener('load', () => {
                    that.textures[i].needsUpdate = true
                    resolve()
                })
            })
            promises.push(promise)
        })
        Promise.all(promises).then(() => {
            cb()
        })
    }
    setCamera() {
        this.camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.z = 2
    }
    setPlane() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 16, 16)
        this.uniforms.texture1.value = this.textures[0]
        this.uniforms.texture2.value = this.textures[1]
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertex,
            fragmentShader: this.fragment
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.plane)
    }
    onWorkEnter() {
        gsap.to(this.uniforms.alpha, {
            duration: 2,
            value: 1,
            ease: 'power4.out'
        })
        gsap.fromTo(
            this.plane.position,
            {
                z: -8
            },
            {
                z: 0,
                duration: 2,
                ease: 'power4.out'
            }
        )
        gsap.fromTo(
            this.plane.rotation,
            {
                y: Math.PI / 2,
                x: -Math.PI / 1.5
            },
            {
                x: 0,
                y: 0,
                duration: 2.5,
                ease: 'back.out(2)'
            }
        )
        gsap.fromTo(
            this.camera.rotation,
            {
                x: Math.PI / 4,
                y: -Math.PI / 2
            },
            {
                x: 0,
                y: 0,
                duration: 2,
                ease: 'power3.out'
            }
        )
        gsap.fromTo(
            this.camera.position,
            {
                z: 4
            },
            {
                z: 2,
                duration: 2,
                ease: 'power3.out'
            }
        )
    }
    onWorkLeave() {
        if (this.isEnter) return
        gsap.to('#slider', {
            opacity: 0,
            display: 'none',
            duration: 0.1
        })

        this.current = 0
        this.uniforms.texture1.value = this.textures[this.current]
        this.calcImageAspect()
        this.plane.scale.y = this.isPortrait ? 0.75 * this.imageAspect : 1
        this.plane.scale.x = this.isPortrait ? 0.75 : 1 * (1 / this.imageAspect)
    }
    doRouteTransition() {
        this.isEnter = true
        setTimeout(() => {
            gsap.set('#slider', {
                zIndex: 3
            })
        }, 500)
        let tl = new TimelineLite()
        gsap.to(this.uniforms.uOffset.value, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.2,
            ease: 'power3.out'
        })
        gsap.to(this.plane.position, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
        })
        tl.to(this.camera.position, {
            z: 1.8,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
        }).then(() => {
            gsap.set('#slider', {
                zIndex: 2
            })
            gsap.to(this.uniforms.alpha, {
                duration: 0.2,
                value: 0
            })
            setTimeout(() => {
                this.isEnter = false
                this.onWorkLeave()
            }, 500)
        })
    }
    onMouseMove() {
        if (this.isEnter) {
            gsap.to(this.mouse, {
                x: 0,
                y: 0,
                duration: 0.8
            })
            return
        }
        this.mouse.x =
            (Math.round(MouseHelper.easeSlowX) / this.viewport.width) * 2 - 1
        this.mouse.y =
            -(Math.round(MouseHelper.easeSlowY) / this.viewport.height) * 2 + 1
        let x = map(
            this.mouse.x,
            -5,
            5,
            -this.viewSize.width / 2,
            this.viewSize.width / 2
        )
        let y = map(
            this.mouse.y,
            -4,
            4,
            -this.viewSize.height / 2,
            this.viewSize.height / 2
        )
        if (!this.plane) return
        this.position = new THREE.Vector3(x, y, 0)
        setTimeout(() => {
            gsap.set(this.plane.position, {
                x: x,
                y: y
            })
        }, 50)
        let offset = this.plane.position
            .clone()
            .sub(this.position)
            .multiplyScalar(-1.25)
        offset.y = offset.y - ScrollHelper.deltaEase / 6000
        this.uniforms.uOffset.value = offset
    }
    calcImageAspect() {
        if (!this.textures[this.current].image) return
        this.imageAspect =
            this.textures[this.current].image.naturalHeight /
            this.textures[this.current].image.naturalWidth
        if (this.imageAspect >= 1) {
            this.isPortrait = true
        } else {
            this.isPortrait = false
        }
    }
    setIndex(i) {
        console.log('do')
        return new Promise((resolve) => {
            if (this.indexIsChange) return

            this.current = i
            if (this.uniforms.texture1.value !== this.textures[this.current]) {
                this.indexIsChange = true
                this.calcImageAspect()
                this.uniforms.texture2.value = this.textures[this.current]
                var tl = new TimelineLite()

                tl.to(this.plane.scale, {
                    x: this.isPortrait ? 0.75 : 1 * (1 / this.imageAspect),
                    y: this.isPortrait ? 0.75 * this.imageAspect : 1,
                    duration: 0.7,
                    ease: 'power3.out'
                })
                tl.to(this.uniforms.progress, {
                    duration: 0.7,
                    delay: -0.7,
                    value: 1,
                    ease: 'power3.out'
                })
                tl.play().then(() => {
                    this.uniforms.texture1.value = this.textures[this.current]
                    this.uniforms.progress.value = 0
                    this.indexIsChange = false
                    resolve()
                })
            }
        })
    }
    tick() {
        this.uniforms.uTime.value = this.clock.getElapsedTime()
        this.renderer.render(this.scene, this.camera)

        if (!this.plane) return
        if (this.newI !== this.prevI) {
            this.imagesQueue.push(this.newI)
            this.prevI = this.newI
        }
        if (this.imagesQueue.length < 1) return
        if (this.isAnimate) return
        this.isAnimate = true
        this.setIndex(this.imagesQueue[0]).then(() => {
            this.imagesQueue.shift()
            this.isAnimate = false
        })
    }
    onWindowResize() {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
        if (!this.plane) return
        this.calcImageAspect()
        this.plane.scale.y = this.isPortrait ? 0.75 * this.imageAspect : 1
        this.plane.scale.x = this.isPortrait ? 0.75 : 1 * (1 / this.imageAspect)
    }
    get viewport() {
        let aspectRatio = this.width / this.height
        return {
            width: this.width,
            height: this.height,
            aspectRatio
        }
    }
    get viewSize() {
        let distance = this.camera.position.z
        let vFov = (this.camera.fov * Math.PI) / 180
        let height = 2 * Math.tan(vFov / 2) * distance
        let width = height * this.viewport.aspectRatio
        return { width, height, vFov }
    }
}
