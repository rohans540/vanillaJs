function fetchData() {
    fetch("https://reqres.in/api/users")
        .then(resp => {
            return resp.json();
        })
        .then(resp => {
            console.log(resp.data);
            const html = resp.data
                .map(user => {
                    return `
                    <div class="user">
                        <p> <img src="${user.avatar}" alt="image" /> </p>
                        <p>Name: ${user.first_name+" "+user.last_name}</p>
                        <p>Email: ${user.email}</p>
                    </div>
                    `;
                })
                .join("");
                console.log(html);
                document.querySelector('#app').insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
            console.log(error);
        });
}


fetchData();