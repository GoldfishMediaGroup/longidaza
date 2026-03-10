import { gsap, ScrollTrigger } from 'gsap/all';
window.$ = window.jQuery = require('jquery');

import popup from '../utils/popup';
import form from '../utils/form';
import fancybox from '../utils/fancybox';
import scroll from '../utils/scroll';

import header from '../components/header';
import hero from '../components/hero';
import help from '../components/help';
import faq from '../components/faq';
import tabs from '../components/tabs';

import '../libs/dynamic_adapt';

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

  popup();
  form();
  scroll();

  fancybox();

  header();
  hero();
  help();
  faq();
  tabs();
});
