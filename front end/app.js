// Alternar telas
const btnAddProduct = document.getElementById("btnAddProduct");
const btnViewList = document.getElementById("btnViewList");
const screens = document.querySelectorAll(".screen");
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");

function showScreen(screenId) {
  screens.forEach((screen) => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// Alternar entre as telas de adicionar produto e lista de produtos
btnAddProduct.addEventListener("click", () => showScreen("addProductScreen"));
btnViewList.addEventListener("click", async () => {
  await loadProductList();
  showScreen("viewListScreen");
});

// Adicionar produto via API (Spring Boot)
addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const productName = document.getElementById("productName").value.trim();
  const productQty = parseInt(document.getElementById("productQty").value);  // parseInt pode retornar NaN
  const productPrice = parseFloat(document.getElementById("productPrice").value);  // parseFloat também pode retornar NaN

  // Verificando se os dados são válidos antes de enviar
  if (!productName || isNaN(productQty) || productQty <= 0 || isNaN(productPrice) || productPrice <= 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        quantity: productQty,  // Corrigido para "quantity" (não "qty")
        price: productPrice,
      }),
    });

    if (response.ok) {
      const newProduct = await response.json();
      alert(`Produto "${newProduct.name}" adicionado com sucesso!`);
      addProductForm.reset();
    } else {
      alert("Erro ao adicionar produto. Verifique os dados e tente novamente.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao conectar com o servidor.");
  }
});

// Carregar lista de produtos via API (Spring Boot)
// Carregar lista de produtos via API (Spring Boot)
async function loadProductList() {
  try {
    const response = await fetch("http://localhost:8080/products/get");

    if (!response.ok) {
      throw new Error("Erro ao carregar a lista de produtos.");
    }

    const products = await response.json();

    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = "<li>Nenhum produto cadastrado.</li>";
    } else {
      products.forEach((product) => {
        const listItem = document.createElement("li");

        // Verificar se `quantity` e `price` são válidos antes de exibir
        const quantity = product.quantity || "Indefinido";
        const price = product.price ? `R$ ${product.price.toFixed(2)}` : "Indefinido";

        listItem.textContent = `${product.name} - Quantidade: ${quantity} - Preço: ${price}`;

        // Criar o botão de deletar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Deletar";
        deleteButton.style.marginLeft = "10px"; // Adicionando margem para separar do texto
        deleteButton.addEventListener("click", async () => {
          const confirmed = confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`);
          if (confirmed) {
            await deleteProduct(product.id, listItem);
          }
        });

        // Adicionar o botão de deletar à lista
        listItem.appendChild(deleteButton);

        // Adicionar o item à lista de produtos
        productList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    productList.innerHTML = "<li>Erro ao carregar lista de produtos.</li>";
  }
}

// Função para deletar um produto
async function deleteProduct(productId, listItem) {
  try {
    const response = await fetch(`http://localhost:8080/products/delete/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remover o item visualmente
      listItem.remove();
      alert("Produto deletado com sucesso!");
    } else {
      alert("Erro ao deletar o produto.");
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    alert("Erro ao conectar com o servidor.");
  }
}
// Carregar lista de produtos via API (Spring Boot)
async function loadProductList() {
  try {
    const response = await fetch("http://localhost:8080/products/get");

    if (!response.ok) {
      throw new Error("Erro ao carregar a lista de produtos.");
    }

    const products = await response.json();

    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = "<li>Nenhum produto cadastrado.</li>";
    } else {
      products.forEach((product) => {
        const listItem = document.createElement("li");

        // Verificar se `quantity` e `price` são válidos antes de exibir
        const quantity = product.quantity || "Indefinido";
        const price = product.price ? `R$ ${product.price.toFixed(2)}` : "Indefinido";

        listItem.textContent = `${product.name} - Quantidade: ${quantity} - Preço: ${price}`;

        // Criar o botão de deletar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Deletar";
        deleteButton.style.marginLeft = "10px"; // Adicionando margem para separar do texto
        deleteButton.addEventListener("click", async () => {
          const confirmed = confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`);
          if (confirmed) {
            await deleteProduct(product.id, listItem);
          }
        });

        // Criar o botão de atualizar
        const updateButton = document.createElement("button");
        updateButton.textContent = "Atualizar";
        updateButton.style.marginLeft = "10px"; // Adicionando margem
        updateButton.addEventListener("click", () => {
          showUpdateForm(product);
        });

        // Adicionar os botões ao item
        listItem.appendChild(deleteButton);
        listItem.appendChild(updateButton);

        // Adicionar o item à lista de produtos
        productList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    productList.innerHTML = "<li>Erro ao carregar lista de produtos.</li>";
  }
}

// Função para deletar um produto
async function deleteProduct(productId, listItem) {
  try {
    const response = await fetch(`http://localhost:8080/products/delete/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remover o item visualmente
      listItem.remove();
      alert("Produto deletado com sucesso!");
    } else {
      alert("Erro ao deletar o produto.");
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

// Função para mostrar o formulário de atualização
function showUpdateForm(product) {
  // Preencher os campos do formulário com os dados do produto
  const form = document.getElementById("updateForm");
  form.style.display = "block"; // Mostrar o formulário

  document.getElementById("updateName").value = product.name;
  document.getElementById("updateQuantity").value = product.quantity || '';
  document.getElementById("updatePrice").value = product.price || '';

  // Definir o id do produto que será atualizado
  form.dataset.productId = product.id;
}

// Função para atualizar o produto
async function updateProduct(event) {
  event.preventDefault();

  const form = document.getElementById("updateForm");
  const productId = form.dataset.productId;

  const updatedProduct = {
    name: document.getElementById("updateName").value,
    quantity: document.getElementById("updateQuantity").value,
    price: document.getElementById("updatePrice").value,
  };

  try {
    const response = await fetch(`http://localhost:8080/products/update/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      const updated = await response.json();
      alert("Produto atualizado com sucesso!");
      form.style.display = "none"; // Esconder o formulário de edição
      loadProductList(); // Recarregar a lista de produtos
    } else {
      alert("Erro ao atualizar o produto.");
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

// Evento de submissão do formulário de atualização
document.getElementById("updateForm").addEventListener("submit", updateProduct);


