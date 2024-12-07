// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXqodJ4jh_4TV7jaOO29pzKSxlHqzbGAI",
    authDomain: "hackaton-project-1f65e.firebaseapp.com",
    projectId: "hackaton-project-1f65e",
    storageBucket: "hackaton-project-1f65e.firebasestorage.app",
    messagingSenderId: "102037829481",
    appId: "1:102037829481:web:c688798f82be2d4a972ff8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to fetch a user by email from Firestore
async function getUserByEmail(email) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching user found.");
      return null;
    }

    const user = querySnapshot.docs[0].data();
    console.log("Fetched user:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

// Signup function
async function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password || !username) {
        alert("Please fill out all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed up:", user);

        // Save user data in Firestore
        await writeData(username, email);
        console.log("User stored in database.");

        alert("Sign up successful! Welcome, " + user.email);
    } catch (error) {
        console.error("Error signing up:", error.code, error.message);
        alert("Error: " + error.message);
    }
}

// Function to write user data to Firestore
async function writeData(username, email) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            username,
            email
        });
        console.log("Document written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document:", error);
    }
}

// Attach event listener to signup button
document.getElementById("signupButton")?.addEventListener("click", (e) => {
    e.preventDefault();  // Prevent form from submitting
    signup();
});

// Function to add a post
async function addingPost() {
  const postuser = document.getElementById('post-user').value;
  const title = document.getElementById("post-title").value;
  const description = document.getElementById("post-description").value; 
  const detail = document.getElementById("post-details").value;

  // Check if all fields are filled
  if (!title || !description || !detail || !postuser) {
      alert("Please fill out all fields.");
      return;
  }

  // Debugging: Log form values to check
  console.log("post-user:", postuser);
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Detail:", detail);

  try {
      // Add post data to Firestore
      const docRef = await addDoc(collection(db, "addingPost"), {
        postuser,  
        title,
          description,
          detail
      });
      console.log("Post added to Firestore with ID:", docRef.id);
      alert("Post added to Firestore successfully!");

      // Redirect to home page after successful post submission
      // window.location.href = "./index.html";
  } catch (error) {
      console.error("Error adding post:", error);
      alert("Error: " + error.message);
  }
}

// Attach event listener to the post submission button
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("postadd");
  if (submitButton) {
      submitButton.addEventListener("click", (e) => {
          e.preventDefault();  // Prevent the form from submitting
          addingPost();
      });
  } else {
      console.error("Submit button with id='postadd' not found");
  }
});
