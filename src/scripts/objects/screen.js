const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
         <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
             <div class="data">
                             <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                             <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                             <p>👥 Followers: ${user.numberFollowers ?? '0'}</p>
                             <p>👥 Following: ${user.numberFollowing ?? '0'}</p>
                        </div>
                      </div>`


        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens +=

            `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br>
            <section class="repoInformation">
            <div>🍴 ${repo.forks_count}</div>
            <div>⭐ ${repo.stargazers_count}</div>
            <div>👀 ${repo.watchers_count}</div>
            <div>👨‍💻 ${repo.language}</div>
            </section>
            
            </a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
    <h2>Repositórios</h2>
    <ul>${repositoriesItens}</ul>
    </div>`

        }

        let eventsItens = ''
        user.events.forEach(event => {
            const eventName = event.repo.name
            const eventsCommits = event.payload.commits
            if (event.type === "PushEvent") {
                eventsCommits.forEach(msg => {
                    const eventMsg = msg.message

                    eventsItens += `<li>"${eventName}" - "${eventMsg}" </li>`
                })
            } else if (event.type === "CreateEvent") {
                eventsItens += `<li><strong>${eventName}</strong> - Sem mensagem de commit</li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
    <h2>Events</h2>
    <ul>${eventsItens}</ul>
    </div>`
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },

    
}

export { screen }