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

// Seleção dos elementos de formulário e lista
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");

// Lógica para adicionar um produto (enviando dados ao back-end)
addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Capturar valores do formulário
  const productName = document.getElementById("productName").value;
  const productQty = document.getElementById("productQty").value;
  const productPrice = document.getElementById("productPrice").value; // Novo campo preço
  
  // Validar os campos
  if (!productName || !productQty || !productPrice) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  const newProduct = {
    name: productName,
    quantity: productQty,
    price: productPrice
  };

  try {
    // Enviar os dados do produto para o back-end via API
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    if (response.ok) {
      // Se o produto for criado com sucesso, atualizar a lista de produtos
      const savedProduct = await response.json();
      addProductToList(savedProduct);
    } else {
      alert("Erro ao adicionar produto");
    }

  } catch (error) {
    console.error("Erro ao enviar o produto:", error);
    alert("Erro na conexão com o servidor");
  }

  // Limpar formulário
  addProductForm.reset();
});

// Função para adicionar produto na lista
function addProductToList(product) {
  const listItem = document.createElement("li");
  listItem.textContent = `${product.name} - Quantidade: ${product.quantity} - Preço: R$${product.price}`;

  // Adicionar botão para deletar
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Deletar";
  deleteButton.addEventListener("click", () => deleteProduct(product.id));

  listItem.appendChild(deleteButton);
  productList.appendChild(listItem);
}

// Lógica para carregar a lista de produtos ao exibir a tela de lista
btnViewList.addEventListener("click", async () => {
  productList.innerHTML = "<li>Carregando produtos...</li>"; // Exibir mensagem de carregamento
  try {
    const response = await fetch("http://localhost:8080/products");
    if (response.ok) {
      const products = await response.json();
      productList.innerHTML = ""; // Limpar a lista antes de exibir
      products.forEach(product => addProductToList(product));
    } else {
      alert("Erro ao carregar produtos");
    }
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Erro na conexão com o servidor");
  }
});

// Lógica para deletar produto
async function deleteProduct(id) {
  if (confirm("Tem certeza que deseja deletar este produto?")) {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Produto deletado com sucesso");
        // Atualizar a lista após a remoção
        btnViewList.click();
      } else {
        alert("Erro ao deletar produto");
      }
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
      alert("Erro na conexão com o servidor");
    }
  }
}
