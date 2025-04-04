const registrationFormData = JSON.parse(localStorage.getItem("registrationFormData"));
const userEmail = registrationFormData.emailUser;

let Despesas = JSON.parse(localStorage.getItem(`FormDespesas_${userEmail}`)) || [];
let Receitas = JSON.parse(localStorage.getItem(`FormReceitas_${userEmail}`)) || [];
let Metas = JSON.parse(localStorage.getItem(`FormMetas_${userEmail}`)) || [];

const qtdMetas = document.getElementById('qtdMetas');
const LogOut = document.getElementById("LogOut");
const fecharModalDespesas = document.getElementById("fecharModalDespesas");

const modalFormDespesas = document.getElementById("modalFormDespesas");
const modalFormReceitas = document.getElementById("modalFormReceitas");

const fecharModalMetas = document.getElementById("fecharModalMetas");
const modalFormMetas = document.getElementById("modalFormMetas");

var ctx = document.getElementsByClassName('chart')
const valoresDespesas = Despesas.map(despesa => despesa.valorDespesas);
const nomesDespesas = Despesas.map(despesa => despesa.nomeDespesas);
const valoresReceitas = Receitas.map(receita => receita.valorReceitas);
const nomesReceitas = Receitas.map(receita => receita.nomesReceitas);

const valorDespesas = Despesas.reduce((acc, despesa) => acc + despesa.valorDespesas, 0);
const valorReceitas = Receitas.reduce((acc, receita) => acc + receita.valorReceitas, 0);

let valorAtualizado = valorReceitas - valorDespesas ;

let labels = [...nomesDespesas, ...nomesReceitas];

if (!Array.isArray(Despesas)) {
  Despesas = [];
}

if (!Array.isArray(Receitas)) {
  Receitas = [];
}

if (!Array.isArray(Metas)) {
  Metas = [];
}

window.addEventListener("load", () => {
  saldoAtualizado();
  mostrarSaldoDespesas();
  mostrarSaldoReceitas();
  mostrarQuantidadeDeMetas()
  dadosNaTabelaReceitas();
  dadosNaTabelaDespesas();
  dadosNaTabelaMetas();
});


/*MOSTRAR SALDO NO CARD*/
const cardSaldoAtual = document.getElementById("cardSaldoAtual");
cardSaldoAtual.innerText = `${valorAtualizado}`;

/*ABRIR MODAL SIDEBAR MOBILE*/
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("Navbar");
  const toggleButton = document.getElementById("toggleNavbar");

  toggleButton.addEventListener("click", function () {
    navbar.classList.add('open')
    navbar.classList.remove("close");
  });
});

/*FECHAR MODAL SIDEBAR MOBILE*/
const fecharNavbar = document.getElementById('fecharNavbar').addEventListener('click', function(){
    const navbar = document.getElementById("Navbar");
    navbar.classList.remove('open')
    navbar.classList.add("close");
});

function mostrarQuantidadeDeMetas(){
  qtdMetas.textContent = `${Metas.length}`
}

LogOut.addEventListener("click", function () {
  const logOutModal = document.getElementById("logOutModal");
  logOutModal.classList.remove("d-none");
  logOutModal.classList.add("d-flex");
  logOutModal.classList.add("animate-fade");
});

const modalSair = document.getElementById("modalSair").addEventListener("click", function () {
  window.location.href = "https://app-finance-flame.vercel.app/pages/Login.html";
});
const modalCancelar = document.getElementById("modalCancelar").addEventListener("click", function () {
  logOutModal.classList.remove("d-flex");
  logOutModal.classList.add("d-none");
});


/*BUTTON ABRIR MODAL ADICIONAR DESPESAS*/
const adicionarDespesas = document.getElementById("adicionarDespesas").addEventListener("click", function () {
  const formAdicionarDespesas = document.getElementById("formAdicionarDespesas");
  formAdicionarDespesas.classList.remove("d-none");
  formAdicionarDespesas.classList.add("d-flex");
});

/*BUTTON FECHAR MODAL ADICIONAR DESPESAS*/
fecharModalDespesas.addEventListener("click", function () {
  const formAdicionarDespesas = document.getElementById("formAdicionarDespesas");

  formAdicionarDespesas.classList.remove("d-flex");
  formAdicionarDespesas.classList.add("d-none");
});

/*MODAL ADICIONAR DESPESAS*/
modalFormDespesas.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeDespesas = document.getElementById("nomeDespesas").value;
  const pagamentoDespesas = document.getElementById('pagamentoDespesas').value;
  const descricaoDespesas = document.getElementById('descricaoDespesas').value;
  const valorDespesas = Number(document.getElementById("valorDespesas").value);
  const dataDespesas = document.getElementById("dataDespesas").value;

  const dadosDespesas = {
    nomeDespesas: nomeDespesas,
    pagamentoDespesas: pagamentoDespesas,
    descricaoDespesas: descricaoDespesas,
    valorDespesas: valorDespesas,
    dataDespesas: dataDespesas,
  };

  Despesas.push(dadosDespesas);

  localStorage.setItem(`FormDespesas_${userEmail}`, JSON.stringify(Despesas));

  const totalDespesas = Despesas.reduce((acc, despesa) => acc + despesa.valorDespesas, 0);
  localStorage.setItem(`valorFormDespesas_${userEmail}`, JSON.stringify(totalDespesas));

  modalFormDespesas.reset();
  mostrarSaldoDespesas();
  dadosNaTabelaDespesas();
  saldoAtualizado();
}); 

/*MOSTRAR VALOR NO CARD DESPESA*/
function mostrarSaldoDespesas() {
  const totalDespesas = document.getElementById("totalDespesas");

  const total = Despesas.reduce((acc, despesa) => acc + despesa.valorDespesas, 0);

  const saldoFormatado = total.toLocaleString("pt-br", {style: "currency", currency: "BRL",})
  totalDespesas.textContent = `${saldoFormatado}`;
}


/*BUTTON ABRIR MODAL ADICIONAR RECEITAS*/
const adicionarReceitas = document.getElementById("adicionarReceitas").addEventListener("click", function () {
  const formAdicionarReceitas = document.getElementById("formAdicionarReceitas");

  formAdicionarReceitas.classList.remove("d-none");
  formAdicionarReceitas.classList.add("d-flex");
});

/*BUTTON FECHAR MODAL ADICIONAR RECEITAS*/
const fecharModalReceitas = document.getElementById("fecharModalReceitas").addEventListener("click", function () {
  const formAdicionarReceitas = document.getElementById("formAdicionarReceitas");

  formAdicionarReceitas.classList.remove("d-flex");
  formAdicionarReceitas.classList.add("d-none");
});

/*MODAL ADICIONAR RECEITAS*/
modalFormReceitas.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeReceitas = document.getElementById("nomeReceitas").value;
  const pagamentoReceitas = document.getElementById('pagamentoReceitas').value;
  const descricaoReceitas = document.getElementById('descricaoReceitas').value
  const valorReceitas = Number(document.getElementById("valorReceitas").value);
  const dataReceitas = document.getElementById("dataReceitas").value;

  const dadosReceitas = {
    nomeReceitas: nomeReceitas,
    pagamentoReceitas: pagamentoReceitas,
    descricaoReceitas: descricaoReceitas,
    valorReceitas: valorReceitas,
    dataReceitas: dataReceitas,
  };

  Receitas.push(dadosReceitas);

  localStorage.setItem(`FormReceitas_${userEmail}`, JSON.stringify(Receitas));

  const totalReceitas = Receitas.reduce((acc, receita) => acc + receita.valorReceitas, 0);
  localStorage.setItem(`valorFormReceitas_${userEmail}`, JSON.stringify(totalReceitas));

  modalFormReceitas.reset();
  mostrarSaldoReceitas();
  saldoAtualizado()
  dadosNaTabelaReceitas()
});


/*BUTTON ABRIR MODAL ADICIONAR METAS*/
const adicionarMetas = document.getElementById("adicionarMetas").addEventListener("click", function () {
  const formAdicionarMetas = document.getElementById("formAdicionarMetas");
  formAdicionarMetas.classList.remove("d-none");
  formAdicionarMetas.classList.add("d-flex");
});

/*BUTTON FECHAR MODAL ADICIONAR METAS*/
fecharModalMetas.addEventListener("click", function () {
  const formAdicionarMetas = document.getElementById("formAdicionarMetas");

  formAdicionarMetas.classList.remove("d-flex");
  formAdicionarMetas.classList.add("d-none");
});

/*MODAL ADICIONAR METAS*/
modalFormMetas.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeMetas = document.getElementById("nomeMetas").value;
  const valorObjetivo = Number(document.getElementById("valorObjetivo").value);
  const valorInvestido = Number(document.getElementById("valorInvestido").value);

  const dadosMetas = {
    nomeMetas: nomeMetas,
    valorObjetivo: valorObjetivo,
    valorInvestido: valorInvestido,
  };

  Metas.push(dadosMetas);

  localStorage.setItem(`FormMetas_${userEmail}`, JSON.stringify(Metas));

  modalFormMetas.reset();
  dadosNaTabelaMetas();
  mostrarQuantidadeDeMetas();
}); 


function saldoAtualizado() {
  localStorage.setItem(`saldoAtualizado_${userEmail}`, JSON.stringify(valorAtualizado));

  const saldoFormatado = valorAtualizado.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  cardSaldoAtual.innerText = `${saldoFormatado}`;
}

function mostrarSaldoReceitas() {
  const totalReceitas = document.getElementById("totalReceitas");

  const total = Receitas.reduce((acc, receita) => acc + receita.valorReceitas, 0);
  const saldoFormatado = total.toLocaleString("pt-br", {style: "currency", currency: "BRL",})

  totalReceitas.textContent = `${saldoFormatado}`;
}

function dadosNaTabelaDespesas() {
  const tBodyDespesas = document.getElementById("tBodyDespesas");
  const dadosDespesas = JSON.parse(localStorage.getItem(`FormDespesas_${userEmail}`)) || [];
  const ultimasDespesas = dadosDespesas.slice(-3);
  
  tBodyDespesas.innerHTML = "";

  ultimasDespesas.forEach((despesa) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    const tdData = document.createElement("td");
    const tdValor = document.createElement("td");

    tdNome.classList.add("border-table");
    tdData.classList.add("border-table");
    tdValor.classList.add("border-table");
    tdValor.classList.add("text-red");

    tdNome.textContent = despesa.nomeDespesas || "Nome não informado";
    tdValor.textContent = despesa.valorDespesas.toLocaleString("pt-br", { style: "currency", currency: "BRL", }) ? `${despesa.valorDespesas.toLocaleString("pt-br", { style: "currency", currency: "BRL", })}` : "Valor não informado";
    tdData.textContent = despesa.dataDespesas.split('-').reverse().join('/') || "Sem descrição";

    tr.append(tdNome, tdData, tdValor);
    tBodyDespesas.append(tr);
  });
}

function dadosNaTabelaReceitas() {
  const tBodyReceitas = document.getElementById("tBodyReceitas");
  const dadosReceitas = JSON.parse(localStorage.getItem(`FormReceitas_${userEmail}`)) || [];
  const ultimasReceitas = dadosReceitas.slice(-3);

  tBodyReceitas.innerHTML = "";
  
  ultimasReceitas.forEach((receita) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    const tdData = document.createElement("td");
    const tdValor = document.createElement("td");

    tdNome.classList.add("border-table");
    tdData.classList.add("border-table");
    tdValor.classList.add("border-table");
    tdValor.classList.add("text-green");

    tdNome.innerHTML = receita.nomeReceitas || "Nome não informado";
    tdValor.innerHTML = receita.valorReceitas.toLocaleString("pt-br", { style: "currency", currency: "BRL", }) ? `${receita.valorReceitas.toLocaleString("pt-br", { style: "currency", currency: "BRL", })}` : "Valor não informado";
    tdData.innerHTML = receita.dataReceitas.split('-').reverse().join('/') || "Sem descrição";

    tr.append(tdNome, tdData, tdValor);
    tBodyReceitas.append(tr);
  });
}

var chartGraph = new Chart(ctx, {

  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Despesas',
      data: valoresDespesas,
      borderWidth: 2,
      borderColor: '#EF4444',
      backgroundColor: '#EF4444'
    },
    {
      label: 'Receitas',
      data: valoresReceitas,
      borderWidth: 2,
      borderColor: '#10b981',
      backgroundColor: '#10b981'
    }
  ]
  },
});

function dadosNaTabelaMetas() {
  const tBodyMetas = document.getElementById("tBodyMetas");
  const dadosMetas = JSON.parse(localStorage.getItem(`FormMetas_${userEmail}`)) || [];
  const ultimasMetas = dadosMetas.slice(-3);

  tBodyMetas.innerHTML = "";
  
  ultimasMetas.forEach((metas) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    const tdObjetivo = document.createElement("td");
    const tdValorInvestido = document.createElement("td");

    tdNome.classList.add("border-table");
    tdObjetivo.classList.add("border-table");
    tdValorInvestido.classList.add("border-table");
    tdValorInvestido.classList.add("text-green");

    tdNome.innerHTML = metas.nomeMetas || "Nome não informado";
    tdObjetivo.innerHTML = metas.valorObjetivo.toLocaleString("pt-br", { style: "currency", currency: "BRL", }) ? `${metas.valorObjetivo.toLocaleString("pt-br", { style: "currency", currency: "BRL", })}` : "Valor não informado";
    tdValorInvestido.innerHTML = metas.valorInvestido.toLocaleString("pt-br", { style: "currency", currency: "BRL", }) ? `${metas.valorInvestido.toLocaleString("pt-br", { style: "currency", currency: "BRL", })}` : "Valor não informado";

    tr.append(tdNome, tdObjetivo, tdValorInvestido);
    tBodyMetas.append(tr);
  });
}