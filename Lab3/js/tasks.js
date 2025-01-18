// Lấy các phần tử cần thiết
const addTaskBtn = document.getElementById("addTaskBtn");
const newTaskInput = document.getElementById("newTaskInput");
const todoList = document.getElementById("todoList");

// Thêm nhiệm vụ mới khi nhấn nút Add
addTaskBtn.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText === "") {
    alert("Vui lòng nhập nhiệm vụ của bạn.");
    return;
  }

  // Tạo phần tử nhiệm vụ mới
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";

  todoItem.innerHTML = `
           <div>
               <input type="checkbox">
               <span class="text">${taskText}</span>
           </div>
           <div class="actions">
               <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
               <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
           </div>
       `;

  // Thêm nhiệm vụ vào danh sách
  todoList.appendChild(todoItem);

  // Làm sạch input
  newTaskInput.value = "";

  // Lưu danh sách nhiệm vụ
  saveTasks();
});

// Xử lý sự kiện cho các nút Edit và Delete và Checkbox
todoList.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    const todoItem = e.target.closest(".todo-item");
    todoItem.remove();
    saveTasks();
  }

  if (e.target.closest(".edit-btn")) {
    const todoItem = e.target.closest(".todo-item");
    const textSpan = todoItem.querySelector(".text");
    const currentText = textSpan.textContent;
    const newText = prompt("Chỉnh sửa nhiệm vụ:", currentText);
    if (newText !== null && newText.trim() !== "") {
      textSpan.textContent = newText.trim();
      saveTasks();
    }
  }

  if (e.target.closest('input[type="checkbox"]')) {
    const todoItem = e.target.closest(".todo-item");
    if (e.target.checked) {
      todoItem.classList.add("done");
    } else {
      todoItem.classList.remove("done");
    }
    saveTasks();
  }
});

// Lưu danh sách nhiệm vụ vào localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".todo-item").forEach((item) => {
    const task = {
      text: item.querySelector(".text").textContent,
      done: item.classList.contains("done"),
    };
    tasks.push(task);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tải danh sách nhiệm vụ từ localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      const todoItem = document.createElement("div");
      todoItem.className = "todo-item";
      if (task.done) {
        todoItem.classList.add("done");
      }

      todoItem.innerHTML = `
                   <div>
                       <input type="checkbox" ${task.done ? "checked" : ""}>
                       <span class="text">${task.text}</span>
                   </div>
                   <div class="actions">
                       <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                       <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
                   </div>
               `;
      todoList.appendChild(todoItem);
    });
  }
}

// Tải nhiệm vụ khi trang được tải
document.addEventListener("DOMContentLoaded", loadTasks);

// Smooth scrolling function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Enable smooth scrolling
  });
}

// Show or hide the button based on scroll position
window.onscroll = function () {
  const button = document.querySelector(".back-to-top");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};
