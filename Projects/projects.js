const username = "SerotoninShane";
const imageBase = `https://raw.githubusercontent.com/${username}`;
let projects = [];
let activeProject = 0;

async function fetchProjectData(repo) {
  const jsonUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/project.json`;
  console.log(`📦 Fetching project.json from ${jsonUrl}`);

  try {
    const res = await fetch(jsonUrl);
    if (!res.ok) throw new Error("No project.json found");
    const meta = await res.json();

    const imageUrl = `${imageBase}/${repo.name}/main/${meta.image}`;
    return {
      title: repo.name,
      description: repo.description || "No description provided.",
      technologies: meta.technologies || [],
      image: imageUrl
    };
  } catch (err) {
    console.warn(`⚠️ Skipping ${repo.name}: ${err.message}`);
    return null;
  }
}

async function loadProjects() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();
  console.log(`📄 Found ${repos.length} repos.`);

  const fetches = await Promise.all(
    repos.map(async repo => {
      const project = await fetchProjectData(repo);
      return project;
    })
  );

  projects = fetches.filter(Boolean);
  console.log(`🎯 Loaded ${projects.length} valid project(s).`);
  renderProject();
}

function renderProject() {
  if (!projects.length) {
    console.log("🚫 No projects to display.");
    return;
  }

  const project = projects[activeProject];
  console.log(`🖼️ Rendering project:`, project);

  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-number").textContent = `#${activeProject + 1}`;
  document.getElementById("project-image").src = project.image;
  document.getElementById("project-image").alt = project.title;

  const techsEl = document.getElementById("project-techs");
  techsEl.innerHTML = "";
  project.technologies.forEach(tech => {
    const span = document.createElement("span");
    span.textContent = tech;
    techsEl.appendChild(span);
  });

  const indicators = document.getElementById("project-indicators");
  indicators.innerHTML = "";
  projects.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.classList.toggle("active", idx === activeProject);
    dot.addEventListener("click", () => {
      activeProject = idx;
      console.log(`🔄 Switched to project #${activeProject + 1}`);
      renderProject();
    });
    indicators.appendChild(dot);
  });
}

function navigateProject(direction) {
  if (direction === 'next') {
    activeProject = (activeProject + 1) % projects.length;
  } else {
    activeProject = (activeProject - 1 + projects.length) % projects.length;
  }
  console.log(`➡️ Navigated to: ${projects[activeProject].title}`);
  renderProject();
}

window.onload = () => {
  console.log("🚀 Initializing project viewer...");
  loadProjects();
};


const modal = document.getElementById("myModal");
const btns = document.querySelectorAll("#modalBtn");
const span = document.getElementsByClassName("close")[0];

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
    console.log('modal')
  });
});

span.onclick = () => {
  modal.style.display = "none";
};

window.onclick = event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
