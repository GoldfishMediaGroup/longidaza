import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
function help() {
  const section = document.querySelector('.help');

  if (!section) return;

  const swiperEl = section.querySelector('.swiper');

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(4),

    navigation: {
      prevEl: section.querySelector('.swiper-button--prev'),
      nextEl: section.querySelector('.swiper-button--next')
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: rem(2)
      }
    }
  });
}

export default help;
