const registerForm = document.getElementById('register-form');

registerForm?.addEventListener('submit', (event) =>{
    event.preventDefault();
    const {login, password, passwordRepeat} = registerForm;
    if(password.value !== passwordRepeat.value){
        return alert("Паролі не спіпадають")
    }
    const user = JSON.stringify({
        login: login.value,
        password: password.value
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register');
    xhr.send(user);
    xhr.onload = () => alert(xhr.response);
})

const loginform = document.getElementById('login-form');

loginform?.addEventListener('submit', (event) =>{
    event.preventDefault();
    const {login, password} = loginform;
   
    const user = JSON.stringify({
        login: login.value,
        password: password.value
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/login');
    xhr.send(user);
    xhr.onload = () => {
        if(xhr.status === 200){
            const token = xhr.response;
            document.cookie = `token=${token}`;
            window.location.assign('/');
        }else{
            return alert(xhr.response);
        }
    };
})