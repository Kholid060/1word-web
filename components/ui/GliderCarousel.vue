<template>
  <div :class="[`main-carousel${_uid}`]">
    <div class="glider-track">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Glider from 'glider-js';
import 'glider-js/glider.min.css';

export default {
  data: () => ({
    carousel: null
  }),
  mounted() {
    const carouselEl = document.querySelector(`.main-carousel${this._uid}`);

    this.carousel = new Glider(carouselEl, {
      slidesToShow: 1,
      swipeToSlide: true,
      draggable: true,
      arrows: false,
      infinite: false,
      duration: 1.5,
      dragVelocity: 1.2,
      skipTrack: true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    });
  }
};
</script>
