<template>
    <ul ref="socials" class="socials">
        <li>
            <a
                href="https://www.instagram.com/romain___maret/"
                rel="noopener noreferrer"
                target="_blank"
                >Instagram</a
            >
        </li>
        <li>
            <a
                href="https://www.instagram.com/romain___maret/"
                rel="noopener noreferrer"
                target="_blank"
                >Mail</a
            >
        </li>
    </ul>
</template>

<script>
export default {
    mounted() {
        this.staggerLink = [].slice.call(
            this.$refs.socials.querySelectorAll('a')
        )
        gsap.fromTo(
            this.staggerLink,
            { y: '200%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                ease: 'power4.out',
                force3D: true,
                duration: 1.2,
                delay: this.isLoaderAnimationDone ? 1.3 : 3,
                stagger: 0.2
            }
        )
    }
}
</script>

<style></style>
