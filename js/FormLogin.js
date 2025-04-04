const registrationFormData = JSON.parse(localStorage.getItem("registrationFormData"));

const LoginForm = document.getElementById('LoginForm').addEventListener('submit', function(evento){
    evento.preventDefault();

    const emailLogin = document.getElementById('emailLogin').value
    const passwordLogin = document.getElementById('passwordLogin').value

    if (emailLogin == '' || passwordLogin == '') {
        const errorInputsNull = document.querySelector('.errorInputsNull');
        errorInputsNull.classList.remove('d-none');
        errorInputsNull.style.display = 'flex';
        errorInputsNull.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <img src="../assets/Error.svg" width='17'>
            <p class='m-0 fs-5'>Existem campos vazios, verifique.</p>
        </div>`;
        return
    }
    if (registrationFormData.emailUser != emailLogin || registrationFormData.passwordUser != passwordLogin) {
        const errorInputsNull = document.querySelector('.errorInputsNull');
        errorInputsNull.classList.remove('d-none');
        errorInputsNull.style.display = 'flex';
        errorInputsNull.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <img src="../assets/Error.svg" width='17'>
            <p class='m-0 fs-5'>Dados inválidos, verifique.</p>
        </div>`
    } else {
        window.location.href = 'https://app-finance-flame.vercel.app/pages/Home.html';
    }

})