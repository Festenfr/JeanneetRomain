<template>
    <div class="demo-1">
        <div class="demo-1__header">
            <h1 class="demo-1__title">Jeanne et Romain</h1>
        </div>
        <div class="demo-1__gallery">
            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/1.jpg" />
            </figure>
            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/2.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/3.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/4.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/5.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/6.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/7.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/8.jpg" />
            </figure>
            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/9.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/10.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/11.jpg" />
            </figure>

            <figure class="demo-1__gallery__figure">
                <img class="demo-1__gallery__image" src="../static/12.jpg" />
            </figure>
        </div>
    </div>
</template>

<script>
import App from '../modules/App'
export default {
    mounted() {
        new App(document.querySelector('.demo-1'))
    }
}
</script>

<style lang="scss">
.demo-1 {
    font-size: 15px;
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overscroll-behavior-y: none;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: #121212;
    &:after {
        animation: grain 6s steps(10) infinite;
        background-image: url('../static/grains.png');
        background-repeat: repeat;
        opacity: 0.05;
        content: '';
        height: 300%;
        left: -100%;
        pointer-events: none;
        position: fixed;
        top: -100%;
        width: 300%;
        will-change: transform;
        z-index: 3;
    }
    .demo-1__header {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
        user-select: none;
        .demo-1__title {
            color: $primary;
            font-size: 15rem;
            font-family: $OpenSansCondensed;
        }
    }
    .demo-1__gallery {
        height: 295rem;
        position: relative;
        visibility: hidden;

        @media (max-width: 1200px) {
            height: 650rem;
        }
    }
}
.demo-1__gallery__figure {
    position: absolute;

    &:nth-child(1) {
        height: 40rem;
        width: 70rem;
    }

    &:nth-child(2) {
        height: 50rem;
        left: 85rem;
        top: 30rem;
        width: 40rem;
    }

    &:nth-child(3) {
        height: 50rem;
        left: 15rem;
        top: 60rem;
        width: 60rem;
    }

    &:nth-child(4) {
        height: 30rem;
        right: 0;
        top: 10rem;
        width: 50rem;
    }

    &:nth-child(5) {
        height: 60rem;
        right: 15rem;
        top: 55rem;
        width: 40rem;
    }

    &:nth-child(6) {
        height: 75rem;
        left: 5rem;
        top: 120rem;
        width: 57.5rem;
    }

    &:nth-child(7) {
        height: 70rem;
        right: 0;
        top: 130rem;
        width: 50rem;
    }

    &:nth-child(8) {
        height: 50rem;
        left: 85rem;
        top: 95rem;
        width: 40rem;
    }

    &:nth-child(9) {
        height: 65rem;
        left: 75rem;
        top: 155rem;
        width: 50rem;
    }

    &:nth-child(10) {
        height: 43rem;
        right: 0;
        top: 215rem;
        width: 30rem;
    }

    &:nth-child(11) {
        height: 50rem;
        left: 70rem;
        top: 235rem;
        width: 80rem;
    }

    &:nth-child(12) {
        left: 0;
        top: 210rem;
        height: 70rem;
        width: 50rem;
    }

    @media (max-width: 1200px) {
        &:nth-child(1) {
            height: 60rem;
            width: 100rem;
        }

        &:nth-child(2) {
            height: 110rem;
            left: auto;
            right: 0;
            top: 25rem;
            width: 70rem;
        }

        &:nth-child(3) {
            height: 80rem;
            left: 12rem;
            top: 80rem;
            width: 89rem;
        }

        &:nth-child(4) {
            height: 60rem;
            right: 0;
            top: 153rem;
            width: 60rem;
        }

        &:nth-child(5) {
            height: 110rem;
            left: 0;
            right: auto;
            top: 180rem;
            width: 70rem;
        }

        &:nth-child(6) {
            height: 135rem;
            left: 95rem;
            top: 230rem;
            width: 87.5rem;
        }

        &:nth-child(7) {
            height: 110rem;
            left: 0;
            right: auto;
            top: 310rem;
            width: 80rem;
        }

        &:nth-child(8) {
            height: 50rem;
            left: auto;
            right: 0;
            top: 385rem;
            width: 80rem;
        }

        &:nth-child(9) {
            height: 100rem;
            left: 110rem;
            top: 450rem;
            width: 70rem;
        }

        &:nth-child(10) {
            height: 50rem;
            left: 20rem;
            right: auto;
            top: 440rem;
            width: 55rem;
        }

        &:nth-child(11) {
            height: 70rem;
            left: auto;
            right: 0;
            top: 570rem;
            width: 70rem;
        }

        &:nth-child(12) {
            left: 0;
            top: 515rem;
            height: 100rem;
            width: 90rem;
        }
    }
}

.demo-1__gallery__image {
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
}
</style>
