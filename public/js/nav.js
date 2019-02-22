(function () {
  var htmlElement = document.querySelector('html'),
      mobileNavToggle = document.querySelector('.menu-icon'),
      mainNavUl = document.getElementById('mainNav'),
      overlayToggle = document.querySelector('.content-wrapper__overlay'),
      openedClass = 'is-open',
      navItemOpenClass = 'nav__primary-nav-item--open',
      subNavToggle = 'nav__primary-nav-item--children',
      XML_REQUEST = new XMLHttpRequest(),
      API_URL = '/api/nav.json',
      SCREEN_WIDTH = window.innerWidth,
      navItem,
      htmlOpenCheck,
      clickTarget,
      mainNavId;

  /**
   * Function to get nav items from API_URL
   */
  function getMainNav() {
   function myResponse() {
     var myArr = JSON.parse(this.responseText);
     makeMainNav(myArr);
   };
   XML_REQUEST.open('get', API_URL, true);
   XML_REQUEST.send();
   XML_REQUEST.onload = myResponse;
  };

  /* Functions to build primary and secondary navs */
  function makeMainNav(myArr) {
    var i, z, mainNav = myArr.items,
        primaryNavFrag = document.createDocumentFragment();

    for(i = 0; i < mainNav.length; i++) {
      var navItem = document.createElement('li'),
          navLink = document.createElement('a');

      navLink.innerText = mainNav[i].label;
      navLink.href = mainNav[i].url;
      navLink.classList.add('nav__primary-link');
      navItem.classList.add('nav__primary-nav-item');

      navItem.appendChild(navLink);
      primaryNavFrag.appendChild(navItem);

      /* Checking if there are subnav items */
      if(mainNav[i].items.length != 0){
        var secondaryNavFrag = document.createDocumentFragment(),
            secondaryNav = document.createElement('ul');

        secondaryNav.classList.add('nav__secondary-nav');

        for (z = 0; z < mainNav[i].items.length; z++){
          var secondaryNavItem = document.createElement('li'),
              secondaryNavLink = document.createElement('a');

          secondaryNavLink.innerText = mainNav[i].items[z].label;
          secondaryNavLink.href = mainNav[i].items[z].url;
          secondaryNavLink.classList.add('nav__secondary-link');
          secondaryNavItem.classList.add('nav__secondary-nav-item');
          secondaryNavItem.appendChild(secondaryNavLink);
          secondaryNav.appendChild(secondaryNavItem);
        }
        secondaryNavFrag.appendChild(secondaryNav);
        navItem.classList.add('nav__primary-nav-item--children');
        navItem.appendChild(secondaryNavFrag);
      }
      mainNavUl.appendChild(primaryNavFrag);
    }
    getSubNav();
  }
  getMainNav();

  /**
   * Function to handle open and closing of nav items
   */
  // Toggle menu for mobile only
  function toggleNavPanel() {
    htmlElement.classList.toggle(openedClass);
  }

  // Toggle subnav items mobile and desktop navigations
  function toggleSubNav() {
    navItem.forEach(navItem => {
      if ((navItem == this) && (this.classList.contains(subNavToggle))) {
        this.classList.toggle(navItemOpenClass);
        return;
      }
      navItem.classList.remove(navItemOpenClass);
    });
    toggleOverlay();
  }

  // Toggle overlay for both mobile and desktop navigations
  function toggleOverlay() {
    navItemOpen = document.querySelector('.nav__primary-nav-item--open');
    htmlOpenCheck = htmlElement.classList.contains(openedClass);

    if ((SCREEN_WIDTH > 768 && navItemOpen)) {
      overlayToggle.classList.add(openedClass);
    } else {
      overlayToggle.classList.remove(openedClass);
    }
  }

  //Reset all classes associated with the navs and overlays
  function resetMenu() {
    navItem.forEach(navItem => {
      navItem.classList.remove(navItemOpenClass);
    });
    htmlElement.classList.remove(openedClass);
    overlayToggle.classList.remove(openedClass);
  }

  /**
   * Function to set event listeners and variables for subNav
   * (after dom build)
   */
  function getSubNav() {
    navItem = document.querySelectorAll('.nav__primary-nav-item');

    mobileNavToggle.addEventListener('click', toggleNavPanel);
    navItem.forEach(navItem => navItem.addEventListener('click', toggleSubNav));

    document.addEventListener('click', function (event) {
      clickTarget = event.target;
      mainNavId = '#mainNav'
      if ((SCREEN_WIDTH > 768) && (!clickTarget.closest(mainNavId))) {
        toggleSubNav();
      }
    }, false);
  }

  window.addEventListener("resize", function () {
    SCREEN_WIDTH = window.innerWidth;

    if (SCREEN_WIDTH >= 700 && SCREEN_WIDTH <= 900) {
      resetMenu();
    }

  }, false);
})();
