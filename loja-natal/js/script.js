let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
}

function atualizarContador() {
  let total = 0;
  carrinho.forEach(function (item) { total += item.qtd; });
  document.getElementById("contador-carrinho").textContent = total;
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function precoFinal(produto) {
  return produto.oferta ? produto.preco * 0.8 : produto.preco;
}

function mostrarAviso(texto) {
  const aviso = document.createElement("div");
  aviso.className = "aviso";
  aviso.textContent = texto;
  document.body.appendChild(aviso);
  setTimeout(function () { aviso.remove(); }, 2000);
}

function criarCard(p) {
  let preco = '<span class="preco">' + formatarPreco(precoFinal(p)) + "</span>";
  let selo = "";
  if (p.oferta) {
    preco = '<span class="preco-antigo">' + formatarPreco(p.preco) + "</span> " + preco;
    selo = '<span class="selo">-20%</span>';
  }
  return `
    <article class="card">
      ${selo}
      <h3>${p.nome}</h3>
      <p class="categoria">${p.categoria}</p>
      <p>${preco}</p>
      <button onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
    </article>`;
}

function mostrarProdutos(idDaLista, lista) {
  const area = document.getElementById(idDaLista);
  area.innerHTML = "";
  lista.forEach(function (p) { area.innerHTML += criarCard(p); });
}

function adicionarAoCarrinho(id) {
  const itemExistente = carrinho.find(function (item) { return item.id === id; });
  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({ id: id, qtd: 1 });
  }
  salvarCarrinho();
  mostrarAviso("Produto adicionado ao carrinho!");
}

function atualizarListaDeProdutos() {
  const texto = document.getElementById("busca").value.toLowerCase();
  const categoria = document.getElementById("filtro").value;
  const ordem = document.getElementById("ordem").value;

  const lista = produtos.filter(function (p) {
    const achouTexto = p.nome.toLowerCase().includes(texto);
    const achouCategoria = categoria === "todas" || p.categoria === categoria;
    return achouTexto && achouCategoria;
  });

  if (ordem === "menor") lista.sort(function (a, b) { return precoFinal(a) - precoFinal(b); });
  if (ordem === "maior") lista.sort(function (a, b) { return precoFinal(b) - precoFinal(a); });

  mostrarProdutos("lista-produtos", lista);
  document.getElementById("vazio").hidden = lista.length > 0;
}

function iniciarContagem() {
  const tela = document.getElementById("contagem");
  const hoje = new Date();
  const natal = new Date(hoje.getFullYear(), 11, 25);
  if (hoje > natal) natal.setFullYear(hoje.getFullYear() + 1);

  function atualizar() {
    const falta = natal - new Date();
    const dias = Math.floor(falta / 86400000);
    const horas = Math.floor(falta / 3600000) % 24;
    const minutos = Math.floor(falta / 60000) % 60;
    const segundos = Math.floor(falta / 1000) % 60;
    tela.textContent = dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
  }
  atualizar();
  setInterval(atualizar, 1000);
}

let nevando = true;
let temporizadorNeve;

function criarFloco() {
  const floco = document.createElement("div");
  floco.className = "floco";
  floco.style.left = Math.random() * 100 + "vw";
  floco.style.fontSize = 10 + Math.random() * 20 + "px";
  floco.style.animationDuration = 5 + Math.random() * 5 + "s";
  document.body.appendChild(floco);
  setTimeout(function () { floco.remove(); }, 10000);
}

function ligarNeve() {
  temporizadorNeve = setInterval(criarFloco, 400);
}

function alternarNeve() {
  nevando = !nevando;
  if (nevando) {
    ligarNeve();
  } else {
    clearInterval(temporizadorNeve);
  }
}

let cupomAtivo = false;

function mudarQuantidade(id, mudanca) {
  const item = carrinho.find(function (i) { return i.id === id; });
  item.qtd += mudanca;
  if (item.qtd <= 0) {
    carrinho = carrinho.filter(function (i) { return i.id !== id; });
  }
  salvarCarrinho();
  mostrarCarrinho();
}

function mostrarCarrinho() {
  const area = document.getElementById("itens-carrinho");
  area.innerHTML = "";
  let subtotal = 0;

  carrinho.forEach(function (item) {
    const p = produtos.find(function (x) { return x.id === item.id; });
    subtotal += precoFinal(p) * item.qtd;
    area.innerHTML += `
      <div class="linha-carrinho">
        <span>${p.nome}</span>
        <span>
          <button onclick="mudarQuantidade(${p.id}, -1)">-</button>
          ${item.qtd}
          <button onclick="mudarQuantidade(${p.id}, 1)">+</button>
        </span>
        <strong>${formatarPreco(precoFinal(p) * item.qtd)}</strong>
      </div>`;
  });

  if (carrinho.length === 0) area.innerHTML = "<p>Seu carrinho está vazio.</p>";

  const desconto = cupomAtivo ? subtotal * 0.02 : 0;
  document.getElementById("subtotal").textContent = formatarPreco(subtotal);
  document.getElementById("desconto").textContent = "- " + formatarPreco(desconto);
  document.getElementById("total").textContent = formatarPreco(subtotal - desconto);
}

function aplicarCupom() {
  const codigo = document.getElementById("cupom").value.trim().toUpperCase();
  if (codigo === "NATALGAMER") {
    cupomAtivo = true;
    mostrarAviso("Cupom aplicado: 2% de desconto!");
  } else {
    cupomAtivo = false;
    mostrarAviso("Cupom inválido.");
  }
  mostrarCarrinho();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    mostrarAviso("Adicione produtos antes de finalizar.");
    return;
  }
  carrinho = [];
  salvarCarrinho();
  mostrarCarrinho();
  mostrarAviso("Compra finalizada! Feliz Natal!");
}

function validarContato(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  let tudoCerto = true;

  document.getElementById("erro-nome").textContent = "";
  document.getElementById("erro-email").textContent = "";
  document.getElementById("erro-mensagem").textContent = "";
  document.getElementById("sucesso").textContent = "";

  if (nome.length < 3) {
    document.getElementById("erro-nome").textContent = "Digite seu nome (mínimo 3 letras).";
    tudoCerto = false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("erro-email").textContent = "Digite um e-mail válido.";
    tudoCerto = false;
  }
  if (mensagem.length < 10) {
    document.getElementById("erro-mensagem").textContent = "Escreva pelo menos 10 caracteres.";
    tudoCerto = false;
  }

  if (tudoCerto) {
    document.getElementById("sucesso").textContent = "Mensagem enviada! Obrigado, " + nome;
    document.getElementById("form-contato").reset();
  }
}

atualizarContador();
ligarNeve();
document.getElementById("botao-neve").onclick = alternarNeve;

if (document.getElementById("contagem")) iniciarContagem();

if (document.getElementById("destaques")) {
  const emOferta = produtos.filter(function (p) { return p.oferta; });
  mostrarProdutos("destaques", emOferta.slice(0, 4));
}

if (document.getElementById("lista-ofertas")) {
  mostrarProdutos("lista-ofertas", produtos.filter(function (p) { return p.oferta; }));
}

if (document.getElementById("lista-produtos")) {
  atualizarListaDeProdutos();
  document.getElementById("busca").oninput = atualizarListaDeProdutos;
  document.getElementById("filtro").onchange = atualizarListaDeProdutos;
  document.getElementById("ordem").onchange = atualizarListaDeProdutos;
}

if (document.getElementById("itens-carrinho")) {
  mostrarCarrinho();
  document.getElementById("botao-cupom").onclick = aplicarCupom;
  document.getElementById("botao-finalizar").onclick = finalizarCompra;
}

if (document.getElementById("form-contato")) {
  document.getElementById("form-contato").onsubmit = validarContato;
}
