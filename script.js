
document.body.style.background = "lightblue";


let nomesProdutos = [];
let precosProdutos = [];
let totaisVendas = [];



function exibirMenu() {
    alert("=== SISTEMA DE LANCHONETE ===\n" +
          "1. Cadastrar produto\n" +
          "2. Listar produtos\n" +
          "3. Realizar venda\n" +
          "4. Total de vendas do dia\n" +
          "5. Encerrar");
}


function cadastrarProduto() {
    let nome = prompt("Nome do produto:");
    if (nome === null) return;
    nome = nome.trim();
    
    if (!nome) {
        alert("Erro: O nome não pode estar vazio!");
        return;
    }
    if (nomesProdutos.includes(nome)) {
        alert("Erro: Produto já cadastrado!");
        return;
    }
    
    let preco = parseFloat(prompt("Preço do produto:"));
    if (isNaN(preco) || preco <= 0) {
        alert("Erro: O preço deve ser maior que zero!");
        return;
    }
    
    nomesProdutos.push(nome);
    precosProdutos.push(preco);
    alert(`Produto "${nome}" cadastrado!\nPreço: R$ ${preco.toFixed(2)}`);
}


function listarProdutos() {
    if (nomesProdutos.length === 0) {
        alert("Nenhum produto cadastrado.");
        return;
    }
    let lista = "=== PRODUTOS ===\n";
    for (let i = 0; i < nomesProdutos.length; i++) {
        lista += `Código ${i+1} — ${nomesProdutos[i]} — R$ ${precosProdutos[i].toFixed(2)}\n`;
    }
    alert(lista);
}


function calcularTotalVenda(preco, quantidade) {
    return preco * quantidade;
}


function calcularDesconto(total) {
    if (total > 50) {
        return total * 0.10;
    }
    return 0;
}


function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
    let final = subtotal - desconto;
    alert("=== RESUMO DA VENDA ===\n" +
          `Produto: ${nome}\n` +
          `Preço unitário: R$ ${preco.toFixed(2)}\n` +
          `Quantidade: ${quantidade}\n` +
          `Subtotal: R$ ${subtotal.toFixed(2)}\n` +
          `Desconto: R$ ${desconto.toFixed(2)}\n` +
          `Total a pagar: R$ ${final.toFixed(2)}`);
}


function obterTotalVendasDia() {
    let soma = 0;
    for (let i = 0; i < totaisVendas.length; i++) {
        soma += totaisVendas[i];
    }
    return soma;
}


function exibirTotalVendasDia() {
    if (totaisVendas.length === 0) {
        alert("Não há vendas registradas.");
        return;
    }
    let total = obterTotalVendasDia();
    alert("=== TOTAL DO DIA ===\n" +
          `Quantidade de vendas: ${totaisVendas.length}\n` +
          `Valor total: R$ ${total.toFixed(2)}`);
}

function realizarVenda() {
    if (nomesProdutos.length === 0) {
        alert("Não há produtos disponíveis.");
        return;
    }
    listarProdutos();
    
    let cod = parseInt(prompt("Código do produto:")) - 1;
    if (isNaN(cod) || cod < 0 || cod >= nomesProdutos.length) {
        alert("Código inválido!");
        return;
    }
    
    let qtd = parseInt(prompt("Quantidade:"));
    if (isNaN(qtd) || qtd <= 0) {
        alert("Quantidade inválida!");
        return;
    }
    
    let subtotal = calcularTotalVenda(precosProdutos[cod], qtd);
    let desconto = calcularDesconto(subtotal);
    
    exibirResumoVenda(nomesProdutos[cod], precosProdutos[cod], qtd, subtotal, desconto);
    
    if (confirm("Confirmar venda?")) {
        totaisVendas.push(subtotal - desconto);
        alert("Venda registrada!");
    }
}


function iniciar() {
    let opcao;
    do {
        exibirMenu();
        opcao = prompt("Escolha uma opção (1 a 5):");
        
        switch (opcao) {
            case "1": cadastrarProduto(); break;
            case "2": listarProdutos(); break;
            case "3": realizarVenda(); break;
            case "4": exibirTotalVendasDia(); break;
            case "5": alert("Encerrando... Obrigado!"); break;
            default: alert("Opção inválida!");
        }
    } while (opcao !== "5");
}

iniciar();
