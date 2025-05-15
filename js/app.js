// tableau pour les taches
let todos = [];
// changr les taches 
function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        updateDisplay();
    }
}

// Sauvegarder les taches 
function savedTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Ajoute une tache 
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.querySelector("input[name='title']");
    const title = input.value.trim();
    if (title) {
        const newTodo = {
            id: Date.now(),
            title: title,
            done: false
        };
        todos.push(newTodo);
        savedTodos();
        input.value = "";
        updateDisplay();
    }
});

// Mettre a jour affichage des taches
function updateDisplay() {
    const list = document.querySelector("ul");
    list.innerHTML = "";
    const filter = document.querySelector(".btn-group button.active").data.filter;

    todos.filter(todo => {
        if (filter === "all") return true;
        if (filter === "todo") return !todo.done;
        if (filter === "done") return todo.done;
    }).forEach(todo => {
        const li = document.createElement("li");
        li.className = "todovliste-group-item d-flex align-item-centre justify-content-between";
        li.innerHTML = `
        <div class = "form-check">
        <input class = "form-check-input" type = "checkbox" id = "todo-${todo.id}" ${todo.done ? "checked" : ""}>
        <label class = "form-check-label ms-2 ${todo.done ? "text-decoration-line-through" : ""}" for = "todo-${todo.id}"> ${todo.title}
        </label></div>
        <button class = "btn btn-danger btn-sm" aria-label = "Supprimer">
        <i class = "bi-trash"></i></button>`;
        list.appendChild(li);
    });

}

// Gerer la tache cochee
document.querySelector("ul").addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
        const id = parseInt(event.target.id.split("_")[1]);
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todo.done = event.target.checked;
            savedTodos();
            updateDisplay();
        }
    }
});
//  Suprime les filtres 
document.querySelector("ul").addEventListener("click", function (event) {
    if (event.target.closest("button")) {
        const li = event.target.closest("li");
        const id = parseInt(li.querySelector("input").id.splip("_")[1]);
        todos = todos.filter(todo => todo.id !== id);
        savedTodos();
        updateDisplay();
    }

});

// Charger les taches au changement de la page 
document.addEventListener("DOMContentLoaded", function () {
    // select tous les button de suppression
    const deleteButtons = document.querySelectorAll(".btn-danger");
    // Ajouter un ecouteur d evenement a chaque button de suppression
    deleteButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            // Stocke le button de suppression clique
            const deleteButtons = this;
            // Affiche le modal de confirmation de suppression 
            const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
            deleteModal.show();
            // Gere l evenement de confirmation de suppression 
            document.getElementById("confirmDelete").addEventListener("click", function () {
                // Supprimer la tache 
                deleteButtons.closest(".todo").remove();
                // Fermer le modal
                deleteModal.hide();

            });

        });


    });

});
