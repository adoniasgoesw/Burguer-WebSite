const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const addCart = document.getElementById("add-to-cart-btn")
const spanItem = document.getElementById("data-span")

let cart = [];

// abrir modal
cartBtn.addEventListener("click", function (){
    updateCartModal();
    cartModal.style.display = "flex"
})

// fechar modal 

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {
  
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)
    }

    
    


})


// função para add cart 

function addToCart(name, price ) {

    const existingItem = cart.find(item => item.name === name)

    if(existingItem) {
        existingItem.quantity += 1;
        
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    

    updateCartModal()
}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElemnt = document.createElement("div");
        cartItemElemnt.classList.add("flex", "justify-content", "mb-4", "flex-col")

        cartItemElemnt.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium ">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$${item.price.toFixed(2)}</p>
            </div>

            <div>
                <button > 
                   <i class="fa-solid fa-trash text-red-500 remove-btn" data-name="${item.name}"></i>
                </button>
            </div>
        </div>`

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElemnt)
    })

    cartTotal.textContent = "total: " + total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.reduce((total, item) => total + item.quantity, 0);

}

// função para remover 

cartItemsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        const name = event.target.getAttribute("data-name")   

        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1) {
        const item = cart[index];

        if(item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event) {
    let inputValue = event.target.value;

    if(inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function() {

    

    if(cart.length === 0) return;

    if(addressInput.value.trim() === "") { 
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    } 

     
    const cartItens = cart.map(item => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItens)
    const phone = "4399618852"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")
    

});

function checkOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;

}


const isOpen = checkOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500")
}
