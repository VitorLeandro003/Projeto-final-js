// Alternância entre exemplos
function mostrarExemplo(n) {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`exemplo${i}`).style.display = (i === n) ? "block" : "none";
  }
}

// Exemplo 1 - Lista de frutas
let frutas = [];

function atualizarLista() {
  document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
}

function adicionarFruta() {
  const input = document.getElementById('frutaInput');
  const valor = input.value.trim();
  if (valor) {
    frutas.push(valor);
    input.value = "";
    atualizarLista();
  }
}

function metodo(acao) {
  if (acao === 'push') {
    const fruta = prompt("Fruta ao final:");
    if (fruta) frutas.push(fruta);
  } else if (acao === 'pop') {
    frutas.pop();
  } else if (acao === 'shift') {
    frutas.shift();
  } else if (acao === 'unshift') {
    const fruta = prompt("Fruta no início:");
    if (fruta) frutas.unshift(fruta);
  }
  atualizarLista();
}

function verificarBanana() {
  const msg = frutas.includes('banana') ? "🍌 Banana está no array!" : "🚫 Banana não está no array.";
  document.getElementById('saida').textContent = msg;
}

function mostrarIndex(fruta) {
  const index = frutas.indexOf(fruta);
  document.getElementById('saida').textContent = index !== -1
    ? `A fruta '${fruta}' está na posição ${index}.` : `'${fruta}' não encontrada.`;
}

function mostrarJoin() {
  document.getElementById('saida').textContent = frutas.join(', ');
}

function mostrarSlice() {
  document.getElementById('saida').textContent = JSON.stringify(frutas.slice(1, 3));
}

function fazerSplice() {
  frutas.splice(1, 1);
  atualizarLista();
  document.getElementById('saida').textContent = "splice(1, 1) aplicado.";
}

function mapMaiusculas() {
  document.getElementById('saida').textContent = JSON.stringify(frutas.map(f => f.toUpperCase()));
}

function filtrarGrandes() {
  document.getElementById('saida').textContent = JSON.stringify(frutas.filter(f => f.length > 4));
}

// Exemplo 2 - Formulário
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  const valores = [];
  for (let i = 1; i <= 5; i++) {
    const val = document.getElementById(`valor${i}`).value.trim();
    if (!val) return alert(`Campo ${i} vazio.`);
    valores.push(val);
  }
  const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "valores.txt";
  link.click();
});

// Exemplo 3 - Jogo número secreto
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() {
  let n = parseInt(Math.random() * numeroLimite + 1);
  if (listaDeNumerosSorteados.length === numeroLimite) listaDeNumerosSorteados = [];
  if (listaDeNumerosSorteados.includes(n)) return gerarNumeroAleatorio();
  listaDeNumerosSorteados.push(n);
  return n;
}

function verificarChute() {
  const chute = Number(document.getElementById("chuteInput").value);
  const msg = document.getElementById("mensagem");
  if (chute === numeroSecreto) {
    msg.textContent = `Acertou com ${tentativas} tentativa(s)!`;
    document.getElementById("reiniciar").disabled = false;
  } else {
    msg.textContent = chute > numeroSecreto ? "O número é menor!" : "O número é maior!";
    tentativas++;
  }
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  document.getElementById("mensagem").textContent = "";
  document.getElementById("chuteInput").value = "";
  document.getElementById("reiniciar").disabled = true;
}
