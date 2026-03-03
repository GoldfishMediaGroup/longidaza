import { gsap, ScrollTrigger } from 'gsap/all';
window.$ = window.jQuery = require('jquery');

// import popup from '../utils/popup';
// import form from '../utils/form';
import fancybox from '../utils/fancybox';
import scroll from '../utils/scroll';

import '../libs/dynamic_adapt';
import header from '../components/header';
import hero from '../components/hero';
import help from '../components/help';
import faq from '../components/faq';

export const modules = {};

const isMobile = window.innerWidth < 768;
window.addEventListener('resize', () => {
  const nowMobile = window.innerWidth < 768;
  if (nowMobile !== isMobile) {
    location.reload();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  scroll();
  fancybox();
  header();
  hero();
  help();
  faq();
});
