const userType = localStorage.getItem("userType"); // 'turista' ou 'guia'

// Dados iniciais
let attractions = JSON.parse(localStorage.getItem("attractions")) || [
  {
    id: 1,
    name: "Jogo dos Artistas",
    category: "evento",
    description: "Partida de futebol beneficente com artistas locais.",
    time: "10:00",
    date: "2023-10-01"
  },
  {
    id: 2,
    name: "Festival de Verão",
    category: "evento",
    description: "Música ao vivo e comidas típicas.",
    time: "18:00",
    date: "2023-12-15"
  }
];

let editingId = null;

// Renderiza os cards
function renderAttractions() {
  const container = document.getElementById("attractions-container");
  container.innerHTML = '';

  attractions.forEach(attraction => {
    const div = document.createElement("div");
    div.className = "attraction-card";
    div.innerHTML = `
      <h3>${attraction.name}</h3>
      <p><strong>Categoria:</strong> ${attraction.category}</p>
      <p>${attraction.description}</p>
      <p><strong>Horário:</strong> ${attraction.time}</p>
      <p><strong>Data:</strong> ${attraction.date}</p>
      ${userType === "guia" ? `
        <div class="card-buttons">
          <button onclick="editAttraction(${attraction.id})">Editar</button>
          <button onclick="deleteAttraction(${attraction.id})">Excluir</button>
        </div>
      ` : ""}
    `;
    container.appendChild(div);
  });
}

function openModal(attraction = null) {
  const modal = document.getElementById("task-modal");
  modal.style.display = "block";

  if (attraction) {
    editingId = attraction.id;
    document.getElementById("modal-title").innerText = "Editar Ponto";
    document.getElementById("task-text").value = attraction.name;
    document.getElementById("task-category").value = attraction.category;
    document.getElementById("task-description").value = attraction.description;
    document.getElementById("task-time").value = attraction.time;
    document.getElementById("task-date").value = attraction.date;
  } else {
    editingId = null;
    document.getElementById("modal-title").innerText = "Adicionar Ponto";
    document.getElementById("task-text").value = '';
    document.getElementById("task-category").value = 'quiosque';
    document.getElementById("task-description").value = '';
    document.getElementById("task-time").value = '';
    document.getElementById("task-date").value = '';
  }
}

function closeModal() {
  document.getElementById("task-modal").style.display = "none";
  editingId = null;
}

function saveAttraction() {
  const name = document.getElementById("task-text").value;
  const category = document.getElementById("task-category").value;
  const description = document.getElementById("task-description").value;
  const time = document.getElementById("task-time").value;
  const date = document.getElementById("task-date").value;

  if (!name || !category || !description || !time || !date) {
    alert("Preencha todos os campos.");
    return;
  }

  if (editingId) {
    const index = attractions.findIndex(a => a.id === editingId);
    attractions[index] = { id: editingId, name, category, description, time, date };
  } else {
    const newAttraction = {
      id: Date.now(),
      name,
      category,
      description,
      time,
      date
    };
    attractions.push(newAttraction);
  }

  localStorage.setItem("attractions", JSON.stringify(attractions));
  renderAttractions();
  closeModal();
}

function editAttraction(id) {
  const attraction = attractions.find(a => a.id === id);
  if (attraction) {
    openModal(attraction);
  }
}

function deleteAttraction(id) {
  if (!confirm("Deseja excluir esta atração?")) return;

  attractions = attractions.filter(a => a.id !== id);
  localStorage.setItem("attractions", JSON.stringify(attractions));
  renderAttractions();
}

document.addEventListener("DOMContentLoaded", () => {
  renderAttractions();

  const addBtn = document.getElementById("add-btn");
  const cancelBtn = document.getElementById("cancel-task-btn");
  const saveBtn = document.getElementById("save-task-btn");

  if (userType === "guia") {
    addBtn.style.display = "inline-block";
    addBtn.addEventListener("click", () => openModal());
    saveBtn.addEventListener("click", saveAttraction);
  } else {
    addBtn.style.display = "none";
  }

  cancelBtn.addEventListener("click", closeModal);
});
