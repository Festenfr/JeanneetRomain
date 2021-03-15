import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
}
window.gsap = gsap
window.ScrollTrigger = ScrollTrigger
