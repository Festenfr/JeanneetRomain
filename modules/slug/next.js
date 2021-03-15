import * as THREE from 'three'
import { vertexShader } from '~/assets/shader/slider.vs'
import { fragmentShader } from '~/assets/shader/slider.fs'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
export default class Scene {
    constructor(images, config) {
        this.vertex = vertexShader
        this.fragment = fragmentShader
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.container = document.querySelector('.next')
        this.images = images
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.textures = []
        this.config = config
        this.clock = new THREE.Clock()
        this.position = new THREE.Vector3(0, 0, 0)
        this.uniforms = {
            strength: { value: 0.5 },
            alpha: { value: 1 },
            uOffset: {
                value: new THREE.Vector2(0.0, 0.0)
            },
            uTime: { value: 0 },
            progress: { type: 'f', value: 0 },
            texture1: { type: 'f', value: '' },
            texture2: { type: 'f', value: '' }
        }
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)
        this.renderer = new THREE.WebGLRenderer()
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
        this.camera.position.z = 1
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
    tick(progress) {
        this.uniforms.uTime.value = this.clock.getElapsedTime()
        this.renderer.render(this.scene, this.camera)
        if (!this.plane) return
        let offset = this.plane.position
            .clone()
            .sub(this.position)
            .multiplyScalar(-0.5)
        offset.y = offset.y - ScrollHelper.deltaEase / 2000
        this.uniforms.uOffset.value = offset
        gsap.set(this.plane.rotation, {
            y: (progress - 1) * 0.5,
            z: (1 - progress) * 0.5
        })
        gsap.set(this.camera.position, {
            x: -1 * (progress - 1)
        })
        gsap.set(this.uniforms.alpha, {
            value: progress
        })
        gsap.set(this.uniforms.progress, {
            value: 1.05 - progress
        })
    }
    calcImageAspect() {
        this.imageAspect =
            this.textures[0].image.naturalHeight /
            this.textures[0].image.naturalWidth
        if (this.imageAspect >= 1) {
            this.isPortrait = true
        } else {
            this.isPortrait = false
        }
    }
    onWindowResize() {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
        if (!this.plane) return
        this.calcImageAspect()
        this.plane.scale.y = this.isPortrait
            ? (0.75 / 2) * this.imageAspect
            : 0.5
        this.plane.scale.x = this.isPortrait
            ? 0.75 / 2
            : 0.5 * (1 / this.imageAspect)
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
