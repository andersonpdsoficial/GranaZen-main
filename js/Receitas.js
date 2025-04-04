const registrationFormData = JSON.parse(localStorage.getItem("registrationFormData"));
const userEmail = registrationFormData.emailUser;

let pageReceitas = JSON.parse(localStorage.getItem(`FormReceitas_${userEmail}`)) || [];
const modalFormReceitas = document.getElementById("modalFormReceitas");

const mediaDiariaGanhosReceitas = document.getElementById('mediaDiariaGanhosReceitas');
const totalReceitas = pageReceitas.reduce((acc, receita) => acc + receita.valorReceitas, 0);
const pesquisarReceitas = document.getElementById('pesquisarReceitas');

if (!Array.isArray(pageReceitas)) {
    pageReceitas  = [];
}

window.addEventListener("load", () => {
    dadosNaTabelaDaPaginaReceitas(pageReceitas);
    mostrarMediaDeGanhos()
    
});

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

const adicionarReceitas = document.getElementById("adicionarReceitas").addEventListener("click", function (){
    const formAdicionarReceitas = document.getElementById("formAdicionarReceitas");

    formAdicionarReceitas.classList.remove("d-none");
    formAdicionarReceitas.classList.add("d-flex");
});

fecharModalReceitas.addEventListener("click", function () {
    const formAdicionarReceitas = document.getElementById("formAdicionarReceitas");
  
    formAdicionarReceitas.classList.remove("d-flex");
    formAdicionarReceitas.classList.add("d-none");
});

modalFormReceitas.addEventListener("submit", function (evento) {
    evento.preventDefault();
  
    const nomeReceitas = document.getElementById("nomeReceitas").value;
    const pagamentoReceitas = document.getElementById('pagamentoReceitas').value;
    const descricaoReceitas = document.getElementById('descricaoReceitas').value;
    const valorReceitas = Number(document.getElementById("valorReceitas").value);
    const dataReceitas = document.getElementById("dataReceitas").value;
  
    const dadosReceitas = {
        nomeReceitas: nomeReceitas,
        pagamentoReceitas: pagamentoReceitas,
        descricaoReceitas: descricaoReceitas,
        valorReceitas: valorReceitas,
        dataReceitas: dataReceitas,
    };
  
    pageReceitas.push(dadosReceitas);
  
    localStorage.setItem(`FormReceitas_${userEmail}`, JSON.stringify(pageReceitas));
    modalFormReceitas.reset();
    dadosNaTabelaDaPaginaReceitas();
    saldoAtualizado();
});

function mostrarMediaDeGanhos(){
    mediaReceitas = totalReceitas / pageReceitas.length || 0
    mediaDiariaGanhosReceitas.textContent = mediaReceitas.toLocaleString("pt-br", {style: "currency", currency: "BRL",}) || 0
};

function dadosNaTabelaDaPaginaReceitas(listaReceitas) {
    const tBodyTodasReceitas = document.getElementById("tBodyTodasReceitas");
    
    tBodyTodasReceitas.innerHTML = "";
  
    listaReceitas.forEach((receita, index) =>  {
        const tr = document.createElement("tr");
        const acoesSvg = document.createElement("div");
        acoesSvg.classList.add('d-flex')
        acoesSvg.classList.add('gap-4')
        acoesSvg.classList.add('cursor-pointer')
        acoesSvg.classList.add('border-table.d-flex')

        const tdData = document.createElement("td");
        const tdDescricao = document.createElement("td");
        const tdValor = document.createElement("td");
        const tdPagamento = document.createElement("td");
    
        const pen = document.createElement('svg');
        pen.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`;

        const x = document.createElement('svg');
        x.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

        tdData.classList.add("border-table");
        tdDescricao.classList.add("border-table");
        tdValor.classList.add("border-table");
        tdValor.classList.add("text-green");
        tdPagamento.classList.add("border-table");
        acoesSvg.classList.add("border-table");

        pen.addEventListener('click', function(){
            openModalEditarReceitas(receita)
        })
        x.addEventListener('click', function(){
            removeReceitas(index)
        })
        
        tdData.textContent = receita.dataReceitas.split('-').reverse().join('/');
        tdDescricao.textContent = receita.descricaoReceitas;
        tdValor.textContent = receita.valorReceitas.toLocaleString("pt-br", { style: "currency", currency: "BRL", });
        tdPagamento.textContent = receita.pagamentoReceitas;
    
        acoesSvg.append(pen, x)
        tr.append(tdData, tdDescricao, tdValor, tdPagamento, acoesSvg );
        tBodyTodasReceitas.append(tr);
    });
}

pesquisarReceitas.addEventListener('keyup', (e) => {
    const searchValue = e.target.value.toLowerCase().trim(); 

    if (searchValue === "") {
        dadosNaTabelaDaPaginaReceitas(pageReceitas);
    } else {
        const search = pageReceitas.filter((receita) => {
            return receita.descricaoReceitas.toLowerCase().includes(searchValue);
        });

        dadosNaTabelaDaPaginaReceitas(search); 
    }
});

function openModalEditarReceitas(receita){
    document.getElementById("nomeReceitas").value = receita.nomeReceitas;
    document.getElementById("pagamentoReceitas").value = receita.pagamentoReceitas;
    document.getElementById("descricaoReceitas").value = receita.descricaoReceitas;
    document.getElementById("valorReceitas").value = receita.valorReceitas;
    document.getElementById("dataReceitas").value = receita.dataReceitas;
    
    const formAdicionarReceitas = document.getElementById("formAdicionarReceitas");
    formAdicionarReceitas.classList.remove("d-none");
    formAdicionarReceitas.classList.add("d-flex");
    
    modalFormReceitas.setAttribute("data-editando", true);
    const index = pageReceitas.findIndex(item => item === receita);
    modalFormReceitas.setAttribute("data-index", index);    

}

function removeReceitas(index) {
    pageReceitas.splice(index, 1);

    localStorage.setItem(`FormReceitas_${userEmail}`, JSON.stringify(pageReceitas));

    dadosNaTabelaDaPaginaReceitas(pageReceitas);
    mostrarMediaDeGanhos();
}
