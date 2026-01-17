/**
 * ChatBot Platform Frontend
 * Manages authentication, project operations, and chat interface
 */

// Determine API base URL based on environment (local or deployed)
const getAPIBase = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;
  const protocol = window.location.protocol;
  
  // Local development: use port 8000 for backend
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:8000`;
  }
  
  // GitHub Codespaces: hostname contains "-5500.app.github.dev", replace with "-8000"
  if (hostname.includes('app.github.dev') && hostname.includes('-5500')) {
    const apiHostname = hostname.replace('-5500', '-8000');
    return `${protocol}//${apiHostname}`;
  }
  
  // GitHub Codespaces with port 5500 in port field
  if (port === '5500' && hostname.includes('app.github.dev')) {
    const apiHostname = hostname.replace('-5500', '-8000');
    return `${protocol}//${apiHostname}`;
  }
  
  // Production: use same origin (backend serves frontend)
  return window.location.origin;
};

const API_BASE = getAPIBase();
console.log("Connected to API:", API_BASE);

let token = localStorage.getItem("token");
let selectedProjectId = null;

/**
 * USER AUTHENTICATION
 */

// Login user with email and password
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    document.getElementById("authMessage").innerText = "Please fill in all fields";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password })
    });

    if (!res.ok) {
      const error = await res.json();
      document.getElementById("authMessage").innerText = error.detail || "Login failed";
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    window.location.href = "/static/dashboard.html";
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById("authMessage").innerText = "Error connecting to server: " + error.message;
  }
}

// Register new user account
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

/**
 * PROJECT MANAGEMENT
 */

// Load all projects for current user
async function loadProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) {
      console.error("Failed to load projects:", res.status);
      return;
    }

    const projects = await res.json();
    const list = document.getElementById("projects");

    list.innerHTML = "";

    if (projects.length === 0) {
      const emptyMsg = document.createElement("li");
      emptyMsg.style.padding = "12px";
      emptyMsg.style.color = "#999";
      emptyMsg.innerText = "No projects yet. Create one to get started!";
      list.appendChild(emptyMsg);
      return;
    }

    projects.forEach(p => {
      const li = document.createElement("li");
      li.className = "project-item";

      const dot = document.createElement("span");
      dot.className = "project-dot";

      const name = document.createElement("span");
      name.className = "project-name";
      name.innerText = p.name;

      const del = document.createElement("button");
      del.textContent = "Delete";
      del.className = "delete-btn";
      del.onclick = (e) => {
        e.stopPropagation();
        deleteProject(p.id);
      };

      // Make entire list item clickable for selection (except delete button)
      li.onclick = () => {
        selectedProjectId = p.id;
        document.getElementById("currentProject").innerText =
          `Selected project: ${p.name}`;

        document.querySelectorAll(".project-dot")
          .forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
      };

      li.appendChild(dot);
      li.appendChild(name);
      li.appendChild(del);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
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
