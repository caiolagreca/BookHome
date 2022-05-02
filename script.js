// Fazendo com que o Script seja executado quando carregar o documento inicial HTML
if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', carrega)
} else{
    carrega();
}

function carrega(){
// Removendo itens da lista de compras
    var tagBotaoRemove = document.querySelectorAll('.botao__remove');
    for( var i=0; i<tagBotaoRemove.length; i++){
        var botaoRemove = tagBotaoRemove[i];
        botaoRemove.addEventListener('click', removeItensCarrinho);  
    }

// Impedindo que o valor da quantidade seja menor que zero
    var quantidadesInput = document.querySelectorAll('.carrinho__quantidade__input');
    for (var i=0; i<quantidadesInput.length; i++){
        var input = quantidadesInput[i];
        input.addEventListener('change', quantidadeAlterada);
    }

// Adicionando itens no carrinho
    var adicionaAoCarrinho = document.querySelectorAll('.populares__cartao__botao');
    for (var i=0; i< adicionaAoCarrinho.length; i++){
        addCarrinho = adicionaAoCarrinho[i];
        addCarrinho.addEventListener('click', adicionaAoCarrinhoNoClique);
    }

// Chamando a classe do botão de compra para finalizar a compra e limpar o carrinho
    document.querySelector('.botao__compra').addEventListener('click', compraFinalizada);
}

function removeItensCarrinho(evento){
    var botaoCliqueRemove = evento.target;
    botaoCliqueRemove.parentElement.parentElement.remove();
    atualizaTotal();
}

function quantidadeAlterada(evento){
    input=evento.target;
    if (isNaN(input.value) || input.value<=0){
        input.value = 1;
    }
    atualizaTotal();
}

function adicionaAoCarrinhoNoClique(evento){
    addCarrinho = evento.target;
    var addProduto = addCarrinho.parentElement.parentElement.parentElement;
    var addTitulo = addProduto.querySelector('.populares__cartao__titulo').innerText;
    var addPreco = addProduto.querySelector('.populares__cartao__compra__valor').innerText;
    var addImagem = addProduto.querySelector('.populares__cartao__imagem').src;
    addElementosNaLista(addTitulo, addPreco, addImagem);
    atualizaTotal();
}

function addElementosNaLista(addTitulo, addPreco, addImagem){
    var addDiv = document.createElement('div');
    addDiv.classList.add('carrinho__linha');
    var elementoCarrinho = document.querySelector('.carrinho__itens');
// Verificando se já há um item existente no carrinho:
    var linhaRepetida = elementoCarrinho.querySelectorAll('.carrinho__item__titulo');
    for (var i = 0; i<linhaRepetida.length; i++){
        if (linhaRepetida[i].innerText == addTitulo){
            alert('Este item já está no carrinho.')
            return;
        }
    }
    var addElementosNaLinha = `
        <span class="carrinho__item carrinho__coluna">
            <img class='carrinho__item__imagem' src="${addImagem}">
            <span class="carrinho__item__titulo">${addTitulo}</span>
        </span>
        <span class="carrinho__preco carrinho__coluna">${addPreco}</span>
        <div class="carrinho__quantidade carrinho__coluna">
            <input type="number" value="1" class="carrinho__quantidade__input">
            <button class="botao__remove" type="button">REMOVE</button>
        </div>`
    addDiv.innerHTML = addElementosNaLinha;
    elementoCarrinho.append(addDiv);

// Adicionando dinamismo aos botões dos novos itens inseridos no carrinho (quantidade e botão REMOVE):
    addDiv.querySelector('.botao__remove').addEventListener('click', removeItensCarrinho);
    addDiv.querySelector('.carrinho__quantidade__input').addEventListener('change', quantidadeAlterada);
}

function atualizaTotal(){
    var carrinhoTotal = document.querySelector('.carrinho__itens');
    var carrinhoLinhas = carrinhoTotal.querySelectorAll('.carrinho__linha');
    var total = 0;
    for (var i=0; i<carrinhoLinhas.length; i++){
        var carrinhoLinha = carrinhoLinhas[i];
        var carrinhoPreco = carrinhoLinha.querySelector('.carrinho__preco');
        var carrinhoQuantidade = carrinhoLinha.querySelector('.carrinho__quantidade__input');
        var preco = parseFloat(carrinhoPreco.innerText.replace('R$', ''));
        var quantidade = carrinhoQuantidade.value;
        total = total + (preco * quantidade);
    }
    total = Math.round((total * 100) / 100);
    document.querySelector('.carrinho__total__preco').innerText = 'R$' + total;
}
// Funcionalidade do botão de compra, o qual irá limpar todo o carrinho.
function compraFinalizada(){
    alert('Obrigado, sua compra foi confirmada e já está sendo processada!');
    var elementoPaiCarrinho = document.querySelector('.carrinho__itens');
    while (elementoPaiCarrinho.hasChildNodes()){
        elementoPaiCarrinho.removeChild(elementoPaiCarrinho.firstChild);
    }
    atualizaTotal();
}
