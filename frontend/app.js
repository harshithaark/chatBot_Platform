// Dynamic API URL - works for both local and deployed environments
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://${window.location.hostname}:8000`
  : `${window.location.protocol}//${window.location.hostname}:8000`;

let token = localStorage.getItem("token");
let selectedProjectId = null;

// ---------------- AUTH ----------------
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: email, password })
  });

  if (!res.ok) {
    document.getElementById("authMessage").innerText = "Login failed";
    return;
  }

  const data = await res.json();
  localStorage.setItem("token", data.access_token);
  window.location.href = "frontend/dashboard.html";
}

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, password })
  });

  if (!res.ok) {
    document.getElementById("authMessage").innerText = "Registration failed";
    return;
  }

  document.getElementById("authMessage").innerText =
    "Registered successfully. Please login.";
}

// ---------------- PROJECTS ----------------
async function loadProjects() {
  const res = await fetch(`${API_BASE}/projects/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const projects = await res.json();
  const list = document.getElementById("projects");
  list.innerHTML = "";

  projects.forEach(p => {
    const li = document.createElement("li");
    li.className = "project-item";

    const dot = document.createElement("span");
    dot.className = "project-dot";

    const name = document.createElement("span");
    name.innerText = p.name;
    name.onclick = () => {
      selectedProjectId = p.id;
      document.getElementById("currentProject").innerText =
        `Selected project: ${p.name}`;

      document.querySelectorAll(".project-dot")
        .forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    };

    const del = document.createElement("button");
    del.innerText = "🗑";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteProject(p.id);
    };

    li.appendChild(dot);
    li.appendChild(name);
    li.appendChild(del);
    list.appendChild(li);
  });
}

async function deleteProject(id) {
  if (!confirm("Delete this project?")) return;

  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (!res.ok) {
    alert("Failed to delete project");
    return;
  }

  if (id === selectedProjectId) {
    selectedProjectId = null;
    document.getElementById("currentProject").innerText =
      "No project selected";
    document.getElementById("chat").innerHTML = "";
  }

  loadProjects();
}







async function createProject() {
  const name = document.getElementById("projectName").value;

  await fetch(`${API_BASE}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ name })
  });

  document.getElementById("projectName").value = "";
  loadProjects();
}

// ---------------- CHAT ----------------
async function sendMessage() {
  if (!selectedProjectId) {
    alert("Select a project first");
    return;
  }

  const msg = document.getElementById("message").value;
  document.getElementById("message").value = "";

  const chat = document.getElementById("chat");
  chat.innerHTML += `<p><b>You:</b> ${msg}</p>`;

  const res = await fetch(
    `${API_BASE}/projects/${selectedProjectId}/chat/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ message: msg })
    }
  );

  const data = await res.json();
  chat.innerHTML += `<p><b>Bot:</b> ${data.assistant_response}</p>`;
}




// async function deleteProject(projectId) {
//   if (!confirm("Delete this project?")) return;

//   const res = await fetch(`${API_BASE}/projects/${projectId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   });

//   if (!res.ok) {
//     alert("Failed to delete project");
//     return;
//   }

//   if (selectedProjectId === projectId) {
//     selectedProjectId = null;
//     document.getElementById("currentProject").innerText = "No project selected";
//     document.getElementById("chat").innerHTML = "";
//   }

//   loadProjects(); // 🔥 THIS was missing earlier
// }
