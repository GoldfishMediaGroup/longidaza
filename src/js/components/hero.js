import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
function hero() {
  const section = document.querySelector('.hero');

  if (!hero) return;

  if (window.innerWidth > 768) {
    const swiperEl = section.querySelector('.swiper');

    const swiper = new Swiper(swiperEl, {
      slidesPerView: 3,
      grabCursor: true,
      speed: 800,
      spaceBetween: rem(2),

      navigation: {
        prevEl: section.querySelector('.swiper-button--prev'),
        nextEl: section.querySelector('.swiper-button--next')
      }
    });


  }
}

export default hero;
