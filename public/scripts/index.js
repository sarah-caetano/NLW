//botão para ir para a tela preta (o verde)
const buttonSearch = document.querySelector("#page-home main a") 
//ir para a tela preta
const modal = document.querySelector("#modal")
//botão para fechar a tela preta (o X)
const close = document.querySelector("#modal .header a")


buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})