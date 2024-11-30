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
        productList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    productList.innerHTML = "<li>Erro ao carregar lista de produtos.</li>";
  }
}
