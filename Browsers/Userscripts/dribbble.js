// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://dribbble.com/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const nav = document.querySelector('.site-nav-desktop-nav');

  const fragment = new DocumentFragment();

  const li = document.createElement('li');
  const link = document.createElement('a');

  li.classList.add('site-nav-desktop-item');

  link.href= '/suggestions';
  link.textContent = 'Suggestions';

  li.append(link);
  fragment.append(li);


  const li2 = document.createElement('li');
  const link2 = document.createElement('a');

  li2.classList.add('site-nav-desktop-item');

  link2.textContent = 'My Stats';
  link2.href= '/stats';

  li2.append(link2);
  fragment.append(li2);


  nav.append(fragment);
})();
