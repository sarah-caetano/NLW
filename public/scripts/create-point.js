function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    /*Arrow function => */
    .then( res => res.json() ) //.then( (res) => {return res.json()} ), mas pode escrever do outro jeito pq tem só um
                                                                     // argumento e uma resposta...
    .then( states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}`
        } 
    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade </option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) 
    .then( cities => {

        for (const city of cities) {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}`
        } 

        citySelect.disabled = false
    } )

} 

document
    .querySelector("select[name=uf]") /*Pegar o select que tem o nome de uf, no caso*/
    .addEventListener("change", getCities) 

//Itens de coleta
// pegar todos os li´s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem) //handleSelectedItem é a função mais abaixo
}

const collectedItems = document.querySelector("input[name=items]") //variável que guarda os itens selecionados

let selectedItems = [] //let = nome de variável, do mesmo modo que const, mas aqui o array não será constante
//essa variável começa vazia pq a página começa sem nenhum item selecionado


function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com javascript... famoso toggle!! -> se existe a classe, ele remove, o contrário tbm acontece :)
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    console.log('ITEM ID', itemId) //se tivesse só event.target, apareceria o endereço todo do li, assim, aparece só o id, no caso, números

    // verificar se existem itens selecionados, se sim, pegar
    // os itens selecionados
    const alreadySelected = selectedItems.findIndex( function(item){
        const itemFound = item == itemId  //true when find the item, false if dont´t and repeat the steps again till it´s true
        return itemFound 
    } )
    // se já estiver selecioando, tirar da seleção
    if(alreadySelected >= 0 ){ //existe no array (vetor), ou seja, está selecionado
        const filteredItems = selectedItems.filter( item => { //a função filter, tira o elemento do array
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
        })

        selectedItems = filteredItems //atualiza os valores selecionados
    } else { //se não estiver, adicionar à selecão
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)
    //atualizar o campo escondido (hidden) com os itens selecionados 
    collectedItems.value=selectedItems 
}
