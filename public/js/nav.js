var mobileNavToggle = document.querySelector(".menu-icon");
    htmlElement = document.querySelector("html");
    contentOverlay = document.querySelector(".content-wrapper__overlay");
    openedBodyClass  = 'is-open';
    xmlhttp = new XMLHttpRequest();
    getUrl = "/api/nav.json";

/**
 * Function to pull in nav from included api
 */
function getMainNav() {
  function myResponse() {
    var myArr = JSON.parse(this.responseText);
    makeMainNav(myArr);
  };
  xmlhttp.open("get", getUrl, true);
  xmlhttp.send();
  xmlhttp.onload = myResponse;
};

/* Creating primary and secondary navs */
function makeMainNav(myArr) {
  console.log(myArr);
  var firstNav = "";
      secondNav = "";
  var i, z, mainNav = myArr.items;
  for(i = 0; i < mainNav.length; i++) {
  if(mainNav[i].items.length !=0){
     for (z = 0; z < mainNav[i].items.length; z++){
       secondNav += '<li><a href="' + mainNav[i].items[z].url +'" class="nav__secondary-link">' + mainNav[i].items[z].label +'</a></li>'
     }
     firstNav += '<li class="nav__primary-nav-item"><a href="#" class="nav__primary-link nav__primary-link--children">' +
     mainNav[i].label + '<span class="nav__dropdown"></span></a> <ul class="nav__secondary-nav">'+ secondNav +'</ul></li>';
   } else {
     firstNav += '<li class="nav__primary-nav-item"><a href="' + mainNav[i].url + '" class="nav__primary-link">' +
     mainNav[i].label + '</a></li>';
   }
   document.getElementById("mainNav").innerHTML = firstNav;
   getSubNav();
  }
}

getMainNav();

/**
 * Function to toggle .global-header__panel
 * (hamburger icon & panel, mobile only)
 */
function toggleMobileNav() {
  mobileNavToggle.addEventListener("click", () => {
    if (htmlElement.classList.contains(this.openedBodyClass)) {
      htmlElement.classList.remove(this.openedBodyClass);
    } else {
      htmlElement.classList.add(this.openedBodyClass);
    }
  });
}

toggleMobileNav();

/**
 * Function to toggle .nav__primary-link--children & respective .nav__secondary-nav
 * (caret icon, mobile only; sub nav, mobile & desktop)
 */
function toggleSubNav() {
  const thisItem = this.parentNode;
  navItem.forEach(navItem => {
    if (thisItem == navItem) {
      thisItem.classList.toggle('nav__primary-nav-item--open');
      return;
    }
    navItem.classList.remove('nav__primary-nav-item--open');
  });

  /* Adding overlay background to content area */
  if (contentOverlay.classList.contains(openedBodyClass)) {
    contentOverlay.classList.remove(openedBodyClass);
  } else {
    contentOverlay.classList.add(openedBodyClass);
  }
}

/* Setting varible to be used in subnav toggle */
function getSubNav() {
  navClass = document.querySelector('.nav');
  navItem = navClass.querySelectorAll('.nav__primary-nav-item');
  subNavToggle = navClass.querySelectorAll('.nav__primary-link--children');
  subNavToggle.forEach(subNavToggle => subNavToggle.addEventListener('click', toggleSubNav));
}
