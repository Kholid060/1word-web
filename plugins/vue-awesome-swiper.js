import Vue from 'vue';
import { Swiper as SwiperClass, Virtual } from 'swiper/js/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import 'swiper/css/swiper.css';

SwiperClass.use([Virtual]);

Vue.use(getAwesomeSwiper(SwiperClass));
