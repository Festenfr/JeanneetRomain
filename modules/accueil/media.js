import { Mesh, Program, Texture } from 'ogl/src/index.mjs'
import { fragment } from '~/assets/shader/autoScroll.fs.js'
import { vertex } from '~/assets/shader/autoScroll.vs.js'

export default class Media {
    constructor({
        element,
        geometry,
        gl,
        height,
        scene,
        screen,
        viewport,
        isLoaderAnimation,
        config
    }) {
        this.element = element
        this.image = this.element.querySelector('img')
        this.height = height
        this.geometry = geometry
        this.gl = gl
        this.scene = scene
        this.screen = screen
        this.viewport = viewport
        this.extra = 0
        this.isLoaderAnimation = isLoaderAnimation
        this.config = config

        this.createMesh()
        this.createBounds()

        this.onResize()
    }
    createMesh() {
        let texture = new Texture(this.gl)
        let that = this
        this.image.onload = function () {
            program.uniforms.uImageSizes.value = [
                that.image.naturalWidth,
                that.image.naturalHeight
            ]
            texture.image = that.image
        }
        //material in three
        const program = new Program(this.gl, {
            fragment,
            vertex,
            uniforms: {
                tMap: { value: texture },
                uImageSizes: { value: [0, 0] },
                uPlaneSizes: { value: [0, 0] },
                uViewportSizes: {
                    value: [this.viewport.width, this.viewport.height]
                },
                u_opacity: { value: 1 }
                // uStrength: { value: 0 }
            },
            transparent: true
        })

        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program
        })

        this.plane.setParent(this.scene)
    }
    createBounds() {
        this.bounds = this.element.getBoundingClientRect()
        this.updateScale()
        this.updateX()
        this.updateY()
        this.plane.program.uniforms.uPlaneSizes.value = [
            this.plane.scale.x,
            this.plane.scale.y
        ]
        gsap.fromTo(
            this.plane.program.uniforms.u_opacity,
            {
                value: 0
            },
            {
                value: 1,
                ease: 'Power2-in',
                delay: this.isLoaderAnimation ? 0.4 : 1.6,
                duration: 2
            }
        )
    }
    updateScale() {
        this.plane.scale.x =
            (this.viewport.width * this.bounds.width) / this.screen.width
        this.plane.scale.y =
            (this.viewport.height * this.bounds.height) / this.screen.height
    }

    updateX(x = 0) {
        this.plane.position.x =
            -(this.viewport.width / 2) +
            this.plane.scale.x / 2 +
            ((this.bounds.left - x) / this.screen.width) * this.viewport.width
    }

    updateY(y = 0) {
        this.plane.position.y =
            this.viewport.height / 2 -
            this.plane.scale.y / 2 -
            ((this.bounds.top - y) / this.screen.height) *
                this.viewport.height -
            this.extra
    }

    update(y, direction) {
        this.updateScale()
        this.updateX()
        this.updateY(y.current)
        // this.plane.program.uniforms.uStrength.value =
        //     ((y.current - y.last) / this.screen.width) * 10
        const planeOffset = this.plane.scale.y / 2
        const viewportOffset = this.viewport.height / 2

        this.isBefore = this.plane.position.y + planeOffset < -viewportOffset
        this.isAfter = this.plane.position.y - planeOffset > viewportOffset

        if (direction === 'up' && this.isBefore) {
            this.extra -= this.height

            this.isBefore = false
            this.isAfter = false
        }

        if (direction === 'down' && this.isAfter) {
            this.extra += this.height

            this.isBefore = false
            this.isAfter = false
        }
    }
    onResize(sizes) {
        this.extra = 0
        if (sizes) {
            const { height, screen, viewport } = sizes

            if (height) this.height = height
            if (screen) this.screen = screen
            if (viewport) {
                this.viewport = viewport
            }
        }
        this.createBounds()
    }
}
