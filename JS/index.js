// Abertura de Menu
const menuToggle = document.querySelector('.menu-toggle');
const navHeader = document.querySelector('.nav-header');

function toggleMenu() {
    navHeader.classList.toggle('active');
}

menuToggle.onclick = toggleMenu;

// Modal para adição de ponto turístico
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("task-modal");
    const saveBtn = document.getElementById("save-task-btn");
    const cancelBtn = document.getElementById("cancel-task-btn");
    const creationButton = document.querySelector(".creation");

    const titleInput = document.getElementById("task-text");
    const categorySelect = document.getElementById("task-category");
    const recurrenceDisplay = document.getElementById("task-recurrence-display");
    const recurrenceCheckboxes = document.querySelectorAll("#task-recurrence-options input[type='checkbox']");
    const timeInput = document.getElementById("task-time");

    let isPageReloaded = false;

    // Abrir o modal
    creationButton.addEventListener("click", function () {
        document.getElementById("modal-title").textContent = "Novo Ponto";
        modal.style.display = "flex";
    });

    // Fechar o modal
    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Atualizar dias da semana com base na categoria
    function updateCheckboxes() {
        const isDiaria = categorySelect.value === "diaria";

        recurrenceCheckboxes.forEach(checkbox => {
            checkbox.disabled = isDiaria;
            if (isDiaria) checkbox.checked = false;
        });

        recurrenceDisplay.value = isDiaria ? "" : "Selecione os dias";
    }

    updateCheckboxes();
    categorySelect.addEventListener("change", updateCheckboxes);

    // Salvar ponto
    saveBtn.addEventListener("click", function () {
        const title = titleInput.value.trim();
        const selectedDays = Array.from(recurrenceCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const isDiaria = categorySelect.value === "diaria";
        const horario = timeInput.value.trim();

        if (!title) {
            alert("Por favor, preencha o nome do ponto.");
            return;
        }

        if (!horario) {
            alert("Por favor, selecione um horário.");
            return;
        }

        if (!isDiaria && selectedDays.length === 0) {
            alert("Selecione pelo menos um dia da semana.");
            return;
        }

        const ponto = {
            nome: title,
            tipo: categorySelect.value,
            dias: isDiaria ? ["Todos os dias"] : selectedDays,
            horario: horario
        };

        console.log("Ponto criado:", ponto);
        alert("Ponto turístico adicionado com sucesso!");

        modal.style.display = "none";

        // Limpar campos
        titleInput.value = "";
        categorySelect.value = "semanal";
        recurrenceCheckboxes.forEach(cb => cb.checked = false);
        recurrenceDisplay.value = "Selecione os dias";
        timeInput.value = "";

        if (!isPageReloaded) {
            isPageReloaded = true;
            location.reload(); // Pode ser removido se você salvar no backend
        }
    });
});

// Rolagem suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            smoothScrollTo(targetElement);
        }
    });
});

function smoothScrollTo(element) {
    const start = window.scrollY;
    const end = element.offsetTop;
    const distance = end - start;
    const duration = 200;
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;
        const eased = Math.min(progress, 1);
        window.scrollTo(0, start + distance * eased);

        if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
