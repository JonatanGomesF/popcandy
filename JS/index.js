
const lucroPorUnidade = 5;
let dadosGlobal = [];

async function carregarDados() {
  const res = await fetch('dados.json');
  const dados = await res.json();
  dadosGlobal = dados;
  mostrarLista();
}

function mostrarLista() {
  document.getElementById('detalhe').innerHTML = '';
  const lista = document.getElementById('lista');
  lista.style.display = 'flex';
  lista.innerHTML = '';

  let totalGeral = 0;

  dadosGlobal.forEach((local, index) => {
    const totalUnidades = local.vendas.reduce((a,b)=>a+b.qtd,0);
    const lucro = totalUnidades * lucroPorUnidade;
    totalGeral += lucro;

    const div = document.createElement('div');
    div.className='card';
    div.onclick = () => abrirDetalhe(index);

    div.innerHTML = `
      <h2>${local.nome}</h2>
      <p>🍿 ${totalUnidades} unidades</p>
      <p>💰 R$ ${lucro.toFixed(2)}</p>
    `;

    lista.appendChild(div);
  });

  document.getElementById('resumo').innerHTML = `💰 Total geral: R$ ${totalGeral.toFixed(2)}`;
}

function abrirDetalhe(index) {
  const local = dadosGlobal[index];
  const lista = document.getElementById('lista');
  const detalhe = document.getElementById('detalhe');

  lista.style.display = 'none';

  const totalUnidades = local.vendas.reduce((a,b)=>a+b.qtd,0);
  const lucro = totalUnidades * lucroPorUnidade;

  detalhe.innerHTML = `
    <div class="card">
      <h2>${local.nome}</h2>
      <p><strong>🍿 Total:</strong> ${totalUnidades}</p>
      <p><strong>💰 Lucro:</strong> R$ ${lucro.toFixed(2)}</p>

      <h3>📅 Histórico</h3>
      <ul>
        ${local.vendas.map(v => `<li>${v.dia} - ${v.qtd}</li>`).join('')}
      </ul>

      <button class="btn btn-map" onclick="window.open('${local.link}','_blank')">📍 Localização</button>
      <br>
      <button class="btn btn-back" onclick="mostrarLista()">⬅ Voltar</button>
    </div>
  `;
}

carregarDados();
