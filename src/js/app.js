//import * as flsFunctions from "./modules/functions.js";
//flsFunctions.thisTest();

// 'use strict';

//language select
let lang_menu = document.querySelector('.header__language-choice');
let user_lang = document.querySelector('.header__language');
user_lang.addEventListener('click', function (e) {
  lang_menu.classList.toggle('_active');
});
document.documentElement.addEventListener('click', function (e) {
  if (!e.target.closest('.header__language')) {
    lang_menu.classList.remove('_active');
  }
});

// burger

// let header_menu = document.querySelector('.menu__body');
// let burger_icon = document.querySelector('.icon-menu');
// burger_icon.addEventListener('click', function (e) {
//   header_menu.classList.toggle('_active');
//   burger_icon.classList.toggle('_active');
//   document.body.classList.toggle('_lock');
// });

// =========================================================

ibg;

function ibg() {
  let ibg = document.querySelectorAll('._ibg');
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();

// =========================================================

// smooth scroll
// data-goto=".main-slider"

// const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// if (menuLinks.length > 0) {
//   menuLinks.forEach((menuLink) => {
//     menuLink.addEventListener('click', onMenuLinkClick);
//   });

//   function onMenuLinkClick(e) {
//     const menuLink = e.target;
//     if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
//       const gotoBlock = document.querySelector(menuLink.dataset.goto);
//       const gotoBlockValue =
//         gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

//       if (burger_icon.classList.contains('_active')) {
//         document.body.classList.remove('_lock');
//         burger_icon.classList.remove('_active');
//         header_menu.classList.remove('_active');
//       }

//       window.scrollTo({
//         top: gotoBlockValue,
//         behavior: 'smooth',
//       });
//       e.preventDefault();
//     }
//   }
// }

// =========================================================

// Dynamic Adaptive
// data-da=".menu__body,767,1"

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  const _this = this;
  // ???????????? ????????????????
  this.??bjects = [];
  this.daClassname = '_dynamic_adapt_';
  // ???????????? DOM-??????????????????
  this.nodes = document.querySelectorAll('[data-da]');

  // ???????????????????? ??bjects ????????????????
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(',');
    const ??bject = {};
    ??bject.element = node;
    ??bject.parent = node.parentNode;
    ??bject.destination = document.querySelector(dataArray[0].trim());
    ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
    ??bject.place = dataArray[2] ? dataArray[2].trim() : 'last';
    ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
    this.??bjects.push(??bject);
  }

  this.arraySort(this.??bjects);

  // ???????????? ???????????????????? ??????????-????????????????
  this.mediaQueries = Array.prototype.map.call(
    this.??bjects,
    function (item) {
      return '(' + this.type + '-width: ' + item.breakpoint + 'px),' + item.breakpoint;
    },
    this
  );
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  });

  // ?????????????????????? ?????????????????? ???? ??????????-????????????
  // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1];

    // ???????????? ???????????????? ?? ???????????????????? ????????????????????????
    const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, ??bjectsFilter);
    });
    this.mediaHandler(matchMedia, ??bjectsFilter);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < ??bjects.length; i++) {
      const ??bject = ??bjects[i];
      ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
      this.moveTo(??bject.place, ??bject.element, ??bject.destination);
    }
  } else {
    for (let i = 0; i < ??bjects.length; i++) {
      const ??bject = ??bjects[i];
      if (??bject.element.classList.contains(this.daClassname)) {
        this.moveBack(??bject.parent, ??bject.element, ??bject.index);
      }
    }
  }
};

// ?????????????? ??????????????????????
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
};

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
};

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === 'min') {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === 'first' || b.place === 'last') {
          return -1;
        }

        if (a.place === 'last' || b.place === 'first') {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === 'first' || b.place === 'last') {
          return 1;
        }

        if (a.place === 'last' || b.place === 'first') {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

const da = new DynamicAdapt('max');
da.init();

// =========================================================

// sliders
let main_slider = new Swiper('.main__full-screen', {
  loop: true,
  speed: 2000,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
});
