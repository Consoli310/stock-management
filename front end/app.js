// Selecionar os elementos do DOM
const btnAddProduct = document.getElementById("btnAddProduct");
const btnViewList = document.getElementById("btnViewList");
const addProductScreen = document.getElementById("addProductScreen");
const viewListScreen = document.getElementById("viewListScreen");
const screens = document.querySelectorAll(".screen");

// Função para alternar entre as telas
function showScreen(screenId) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// Adicionar eventos aos botões
btnAddProduct.addEventListener("click", () => showScreen("addProductScreen"));
btnViewList.addEventListener("click", () => showScreen("viewListScreen"));

// Mostrar a tela inicial
showScreen("addProductScreen");

// Placeholder para adicionar funcionalidades futuras
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");

// Lógica para adicionar produtos (exemplo inicial)
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Capturar valores do formulário
  const productName = document.getElementById("productName").value;
  const productQty = document.getElementById("productQty").value;

  // Criar item de lista
  const listItem = document.createElement("li");
  listItem.textContent = `${productName} - Quantidade: ${productQty}`;

  // Adicionar à lista
  productList.appendChild(listItem);

  // Limpar formulário
  addProductForm.reset();
});
