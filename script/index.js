// DOM REFERENCES
const menu = document.querySelector("#menu-btn");
const exit = document.querySelector("#exit-btn");
const navLinks = document.querySelectorAll(".nav__link");
const projectsDiv = document.querySelector(".projects");

// function to open the nav menu on mobile
menu.addEventListener("click", () => {
  document.querySelector(".nav").classList.add("open-nav");
});

// function to close the nav menu on mobile
exit.addEventListener("click", () => {
  document.querySelector(".nav").classList.remove("open-nav");
});

// function to close the nav menu on mobile when user choses a menu item
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav").classList.remove("open-nav");
  });
});

// making reCAPTCHA required
window.onload = function () {
  var el = document.getElementById("g-recaptcha-response");
  if (el) {
    el.setAttribute("required", "required");
  }
};

/* =====================
    FETCH PROJECTS LIST
========================*/

// function to fetch project data from projects.json file
async function getAllProjects() {
  let response = await fetch("projects.json");
  let projects = await response.json();
  return projects;
}

// function to set up html containers for each project retrieved
function getProjectHtml(aProject) {
  return `
        <div class='project-container'>
            <div class='project-image' style="background:url(${aProject.projectImg}); background-size:cover"></div>
            <div class='project-details'>
                <h3 class='project-title'>${aProject.projectTitle}</h3>
                <p class='project-desc'>${aProject.projectDesc}</p>
                <div class='tech-used'>
                    <img src="${aProject.techUsed.icon1}"/>    
                    <img src="${aProject.techUsed.icon2}"/>    
                    <img src="${aProject.techUsed.icon3}"/>    
                </div>
                <p class='demo-link'><a href="${aProject.demoLink}">Go to demo <i class="far fa-arrow-alt-circle-right "></i></a></p>
                <p class='repo-link'><a href="${aProject.repoLink}">GitHub Repo <i class="far fa-arrow-alt-circle-right "></i></a></p>
                  
            </div>
        </div>
    
    
    `;
}

// function to display projects in the 'projects' div of html doc
function displayProjects(allProjects) {
  projectsDiv.innerHTML = `
        ${allProjects.map((project) => getProjectHtml(project)).join("")}
    `;
}

// call the function
getAllProjects()
  .then((projects) => {
    displayProjects(projects);
  })
  .catch(
    (error) =>
      (projectsDiv.innerHTML = `Oops! Something went wrong! Error: ${response.status}`)
  );
