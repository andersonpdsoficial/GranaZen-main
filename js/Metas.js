const registrationFormData = JSON.parse(localStorage.getItem("registrationFormData"));
const userEmail = registrationFormData.emailUser;

let pageMetas = JSON.parse(localStorage.getItem(`FormMetas_${userEmail}`)) || [];
const quantidadeDeMetas = document.getElementById('quantidadeDeMetas');
const pesquisarMetas = document.getElementById('pesquisarMetas');

if (!Array.isArray(pageMetas)) {
    pageDespesas = [];
};

window.addEventListener("load", () => {
    mostrarQuantidadeDeMetas();
    dadosNaTabelaDaPaginaMetas(pageMetas)
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
    window.location.href = "https://grana-zen-main.vercel.app/pages/Login.html";
});
  const modalCancelar = document.getElementById("modalCancelar").addEventListener("click", function () {
    logOutModal.classList.remove("d-flex");
    logOutModal.classList.add("d-none");
});

const adicionarMetas = document.getElementById("adicionarMetas").addEventListener("click", function (){
    const formAdicionarMetas = document.getElementById("formAdicionarMetas");

    formAdicionarMetas.classList.remove("d-none");
    formAdicionarMetas.classList.add("d-flex");
});

fecharModalMetas.addEventListener("click", function () {
    const formAdicionarMetas = document.getElementById("formAdicionarMetas");
  
    formAdicionarMetas.classList.remove("d-flex");
    formAdicionarMetas.classList.add("d-none");
});

modalFormMetas.addEventListener("submit", function (evento) {
    evento.preventDefault();
  
    const dataMetas = document.getElementById("dataMetas").value;
    const nomeMetas = document.getElementById("nomeMetas").value;
    const valorObjetivo = Number(document.getElementById("valorObjetivo").value);
    const valorInvestido = Number(document.getElementById("valorInvestido").value);
  
    const dadosMetas = {
        dataMetas: dataMetas,
        nomeMetas: nomeMetas,
        valorObjetivo: valorObjetivo,
        valorInvestido: valorInvestido,
    };
  
    const editando = modalFormMetas.getAttribute("data-editando");
    const index = modalFormMetas.getAttribute("data-index");

    if (editando) {
        pageMetas[index] = dadosMetas;
        
        modalFormMetas.removeAttribute("data-editando");
        modalFormMetas.removeAttribute("data-index");
    } else{
        pageMetas.push(dadosMetas);
    }
  
    localStorage.setItem(`FormMetas_${userEmail}`, JSON.stringify(pageMetas));
    modalFormMetas.reset();
}); 

function mostrarQuantidadeDeMetas(){
    quantidadeDeMetas.textContent = `${pageMetas.length}`
};

function dadosNaTabelaDaPaginaMetas(listaMetas) {
    const tBodyTodasMetas = document.getElementById("tBodyTodasMetas");
    
    tBodyTodasMetas.innerHTML = "";
  
    listaMetas.forEach((meta, index) =>  {
        const tr = document.createElement("tr");
        const acoesSvg = document.createElement("div");
        acoesSvg.classList.add('d-flex')
        acoesSvg.classList.add('d-flex')
        acoesSvg.classList.add('gap-4')
        acoesSvg.classList.add('cursor-pointer')
        acoesSvg.classList.add('border-table.d-flex')

        const tdData = document.createElement("td");
        const tdNome = document.createElement("td");
        const tdObjetivo = document.createElement("td");
        const tdInvestido = document.createElement("td");
    
        const pen = document.createElement('svg');
        pen.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`;

        const x = document.createElement('svg');
        x.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

        tdData.classList.add("border-table");
        tdNome.classList.add("border-table");
        tdObjetivo.classList.add("border-table");
        tdInvestido.classList.add("border-table");
        acoesSvg.classList.add("border-table");
        
        pen.addEventListener('click', function(){
            openModalEditarMetas(meta)
        })

        x.addEventListener('click', function(){
            removeMetas(index)
        })

        tdData.textContent = meta.dataMetas.split('-').reverse().join('/');
        tdNome.textContent = meta.nomeMetas;
        tdObjetivo.textContent = meta.valorObjetivo.toLocaleString("pt-br", { style: "currency", currency: "BRL", });
        tdInvestido.textContent = meta.valorInvestido.toLocaleString("pt-br", { style: "currency", currency: "BRL", });
    
        acoesSvg.append(pen, x)
        tr.append(tdData, tdNome, tdObjetivo, tdInvestido, acoesSvg );
        tBodyTodasMetas.append(tr);
    });
}

pesquisarMetas.addEventListener('keyup', (e) => {
    const searchValue = e.target.value.toLowerCase().trim(); 

    if (searchValue === "") {
        dadosNaTabelaDaPaginaMetas(pageMetas);
    } else {
        const search = pageMetas.filter((meta) => {
            return meta.nomeMetas.toLowerCase().includes(searchValue);
        });

        dadosNaTabelaDaPaginaMetas(search); 
    }
});

function openModalEditarMetas(meta){
    document.getElementById("nomeMetas").value = meta.nomeMetas;
    document.getElementById("valorObjetivo").value = meta.valorObjetivo;
    document.getElementById("valorInvestido").value = meta.valorInvestido;
    
    const formAdicionarMetas = document.getElementById("formAdicionarMetas");
    formAdicionarMetas.classList.remove("d-none");
    formAdicionarMetas.classList.add("d-flex");
    
    modalFormMetas.setAttribute("data-editando", true);
    const index = pageMetas.findIndex(item => item === meta);
    modalFormMetas.setAttribute("data-index", index);    

}

function removeMetas(index) {
    pageMetas.splice(index, 1);

    localStorage.setItem(`FormMetas_${userEmail}`, JSON.stringify(pageMetas));

    dadosNaTabelaDaPaginaMetas(pageMetas);
    mostrarQuantidadeDeMetas();
}