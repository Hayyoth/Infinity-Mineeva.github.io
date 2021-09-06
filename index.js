//  import the data from project.js file to scroll through projects
import { projects } from "./projects.js";

/*======================
    DOM REFERENCES
======================= */

// to set the year
const year = document.getElementById("date");

// for toggling mobile menu
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

// for fixed navbar

const navBar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

// get the links for smooth scrolling
const scrollLinks = document.querySelectorAll(".scroll-link");

// references for project items
const img = document.getElementById("project-img");
const projectName = document.getElementById("projectName");
const projectDesc = document.getElementById("projectDesc");
const techBtnContainer = document.querySelector(".tech-button-container");
const techBtn = document.getElementById("techButton");
const demoLink = document.getElementById("demoLink");
const repoLink = document.getElementById("repoLink");
const number = document.getElementById("number");
const totalProjects = document.getElementById("total");

// buttons to cycle through projects
const backBtn = document.getElementById("leftArrow");
const nextBtn = document.getElementById("rightArrow");

/*=========================
    SET THE YEAR
========================= */
year.innerHTML = new Date().getFullYear();

/*======================================
    NAV BAR AND SMOOTH SCROLL FEATURE
========================================*/

// toggle the nav links for mobile display

navToggle.addEventListener("click", () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// fixed navbar for desktop
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navBar.classList.add("fixed-nav");
  } else {
    navBar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// smooth scroll feature
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // navigate to the section
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    // calculate heights
    const navHeight = navBar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navBar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 90) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});

/* ============================
    NAVIGATING PROJECTS
================================*/

// set starting Item
let currentItem = 0;

// load first quote in reviews file upon successful page render
window.addEventListener("DOMContentLoaded", () => {
  showProject(currentItem);
});

// function to change values in DOM
const showProject = (project) => {
  const item = projects[project];
  // grab the entries in the nested techUsed object
  const techIcons = Object.values(item.techUsed);

  const tools = techIcons
    .map((icon) => {
      return `
        <p class="tech-button" id="techButton">${icon}</p>
        `;
    })
    .join("");

  // set items in the DOM
  totalProjects.textContent = projects.length;

  number.textContent = item.id;
  img.src = item.projectImg;
  img.alt = item.projectTitle;
  projectName.textContent = item.projectTitle;
  projectDesc.textContent = item.projectDesc;
  demoLink.href = item.demoLink;
  repoLink.href = item.repoLink;
  techBtnContainer.innerHTML = tools;
};

// function to show next Project;
const showNext = () => {
  currentItem++;
  if (currentItem > projects.length - 1) {
    currentItem = 0;
  }
  showProject(currentItem);
};

// function to show previous Project

const showPrev = () => {
  currentItem--;
  if (currentItem < 0) {
    currentItem = projects.length - 1;
  }
  showProject(currentItem);
};

// functionality for next button
nextBtn.addEventListener("click", showNext);

// functionality for previous button
backBtn.addEventListener("click", showPrev);
