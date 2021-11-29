"use strict";
window.addEventListener("load", function () {
  //откуда пришли
  var referrer_url = document.referrer;
  console.log(referrer_url);

  console.log("It's loaded!");
  const leftSide = document.querySelector(".left-side");
  const allElements = leftSide.children;
  console.log(allElements);
  const drinks = document.querySelectorAll(".drinks");
  //console.log(drinks);
  const deserts = document.querySelectorAll(".deserts");
  //console.log(deserts);
  const reviewBlock = document.querySelector(".menu-list");
  // console.log (reviewBlock)
  const contactsBlock = document.querySelector(".contacts-list");
  // console.log(contactsBlock)
  console.clear();
  const breadscrumbs = document.querySelector(".breadcrumbs");
  console.log(breadscrumbs);
  const breadscrumbsElements = breadscrumbs.querySelectorAll("a");
  console.log(breadscrumbsElements);
  const drinksSelector = document.querySelector(".drinks-selector");
  const desertsSelector = document.querySelector(".deserts-selector");
  const reviewSelector = document.querySelector(".review-selector");
  const contactsSelector = document.querySelector(".contacts-selector");

  //конструктор одиночного селектора скрыть/показать
  function OneItemShowHideConstructor(blockName) {
    this.blockName = blockName;
    this.show = function () {
      this.blockName.classList.add("_active");
    };
    this.hide = function () {
      this.blockName.classList.remove("_active");
    };
  }

  //множественный конструктор
  function MultipleShowHideConstructor(blockName) {
    this.blockName = blockName;
    this.hide = function () {
      for (let elem of blockName) {
        elem.classList.add("_hide");
      }
    };

    this.show = function () {
      for (let elem of blockName) {
        elem.classList.remove("_hide");
      }
    };
  }

  //конструктор для выбора активных хлебных крошек
  function BreadcrumbsActiveSelector(
    blockName,
    drinks,
    deserts,
    review,
    contacts
  ) {
    this.hideAll = function () {
      for (let i of blockName) {
        console.log(i);
        i.classList.remove("current");
      }
    };
    this.setActiveToDrinks = function () {
      drinks.classList.add("current");
    };
    this.setActiveToDeserts = function () {
      deserts.classList.add("current");
    };
    this.setActiveToReview = function () {
      review.classList.add("current");
    };
    this.setActiveToContacts = function () {
      contacts.classList.add("current");
    };
  }

  let BreadcrumbsObject = new BreadcrumbsActiveSelector(
    breadscrumbsElements,
    drinksSelector,
    desertsSelector,
    reviewSelector,
    contactsSelector
  );

  //создаем объекты (множественные селекторы) сразу с 2 методами, show/hide через конструктор
  let AllDesertsObject = new MultipleShowHideConstructor(deserts);
  let AllDrinksObject = new MultipleShowHideConstructor(drinks);
  let AllElementsObject = new MultipleShowHideConstructor(allElements);

  //создаем объекты (одиночные селекторы) сразу с 2 методами, show/hide через конструктор
  let ReviewBlockObject = new OneItemShowHideConstructor(reviewBlock);
  let ContactsBlockObject = new OneItemShowHideConstructor(contactsBlock);

  function reviewCounter() {
    //добавляем счетчик символов
    const txtItem = document.querySelector(".input-menu");
    //получаем ограничение из html тега
    const txtLimit = txtItem.getAttribute("maxlength");
    //console.log(txtLimit);
    const txtCounter = document.querySelector(".counter-span");
    //console.log(txtCounter);
    //вставляем в спан  максимальную длинну
    txtCounter.innerHTML = txtLimit;

    //событие на нажатие клавиши по которму вызовется функция, отнимающая введенные
    // символы от максимального
    txtItem.addEventListener("keyup", txtSetCounter);
    function txtSetCounter() {
      const txtCounterResult = txtLimit - txtItem.value.length;
      txtCounter.innerHTML = txtCounterResult;
    }
    txtItem.addEventListener("keydown", function (event) {
      if (event.repeat) {
        txtSetCounter();
      }
    });
  }

  //console.log(drinksSelector);
  drinksSelector.addEventListener("click", function (event) {
    AllElementsObject.show();
    ReviewBlockObject.hide();
    ContactsBlockObject.hide();
    AllDesertsObject.hide();
    BreadcrumbsObject.hideAll();
    BreadcrumbsObject.setActiveToDrinks();
  });

  //console.log(desertsSelector);
  desertsSelector.addEventListener("click", function (event) {
    AllElementsObject.show();
    ReviewBlockObject.hide();
    ContactsBlockObject.hide();
    AllDrinksObject.hide();
    BreadcrumbsObject.hideAll();
    BreadcrumbsObject.setActiveToDeserts();
  });

  //console.log(reviewSelector);
  reviewSelector.addEventListener("click", function (event) {
    AllElementsObject.hide();
    ContactsBlockObject.hide();
    ReviewBlockObject.show();
    
    BreadcrumbsObject.hideAll();
    BreadcrumbsObject.setActiveToReview();
    reviewCounter();
  });

  //console.log(contactsSelector);
  contactsSelector.addEventListener("click", function (event) {
    AllElementsObject.hide();
    ReviewBlockObject.hide();
    ContactsBlockObject.show();
    BreadcrumbsObject.hideAll();
    BreadcrumbsObject.setActiveToContacts();
  });
});
