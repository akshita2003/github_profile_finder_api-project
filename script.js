const fetchBtn = document.getElementById('fetchBtn');
const usernameInput = document.getElementById('username');
const profileDiv = document.getElementById('profile');

fetchBtn.addEventListener('click', () => {
    const username = usernameInput.value;

    // Clear previous profile data
    profileDiv.innerHTML = '';

    // Fetch user data from GitHub API
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then((data) => {
            const { login, name, avatar_url, html_url, public_repos, followers, following } = data;

            // Create profile card
            const profileCard = document.createElement('div');
            profileCard.className = 'profile';
            profileCard.innerHTML = `
                <img src="${avatar_url}" alt="${login}'s avatar" width="100">
                <h2>${name ? name : login}</h2>
                <p>Username: ${login}</p>
                <p>Repositories: ${public_repos}</p>
                <p>Followers: ${followers}</p>
                <p>Following: ${following}</p>
                <a href="${html_url}" target="_blank">View on GitHub</a>
            `;

            profileDiv.appendChild(profileCard);
        })
        .catch((error) => {
            profileDiv.innerHTML = `<p>${error.message}</p>`;
        });
});
