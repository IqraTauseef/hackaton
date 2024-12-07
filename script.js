let isAuthenticated = false;

// Open login/signup modal
document.getElementById('create-post-btn').addEventListener('click', () => {
    if (!isAuthenticated) {
        document.getElementById('auth-modal').style.display = 'flex';
    } else {
        document.getElementById('post-modal').style.display = 'flex';
    }
});

// Authenticate user
function authenticate() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (username && email && password) {
        // Storing user info in session storage
        sessionStorage.setItem('user', JSON.stringify({ username, email }));
        isAuthenticated = true;
        document.getElementById('auth-modal').style.display = 'none';
    } else {
        alert('Please fill in all fields');
    }
}

// Create a post
function submitPost() {
    
    const title = document.getElementById('post-title').value;
    const description = document.getElementById('post-description').value;
    const details = document.getElementById('post-details').value;

    if (title && description && details) {
        const postContainer = document.getElementById('blog-posts');
        const postId = Date.now(); // Unique post ID

        // Save post in session storage
        const post = { title, description, details };
        sessionStorage.setItem(postId, JSON.stringify(post));

        // Append post to blog section
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.setAttribute('data-id', postId);
        postElement.innerHTML = `
            <h2>${title}</h2>
            <p class="description">${description}</p>
            <span class="details-toggle" onclick="showDetails(${postId})">→ Details</span>
        `;
        postContainer.appendChild(postElement);

        document.getElementById('post-modal').style.display = 'none';
    } else {
        alert('Please fill in all fields');
    }
}

// Show post details
function showDetails(postId) {
    const post = JSON.parse(sessionStorage.getItem(postId));
    
    document.getElementById('detail-title').innerText = post.title;
    document.getElementById('detail-description').innerText = post.description;
    document.getElementById('detail-details').innerText = post.details;
    
    document.getElementById('details-modal').style.display = 'flex';
}

// Close post details
function closeDetails() {
    document.getElementById('details-modal').style.display = 'none';
}

// Close modals on clicking outside
window.onclick = function(event) {
    const authModal = document.getElementById('auth-modal');
    const postModal = document.getElementById('post-modal');
    const detailsModal = document.getElementById('details-modal');
    
    if (event.target == authModal) {
        authModal.style.display = 'none';
    }
    if (event.target == postModal) {
        postModal.style.display = 'none';
    }
    if (event.target == detailsModal) {
        detailsModal.style.display = 'none';
    }
}
