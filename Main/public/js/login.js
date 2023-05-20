const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.getElementById('emailLogInput').value.trim();
    const password = document.getElementById('passwordLogInput').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/member/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  const signupFormHandler = async (event) =>{
    event.preventDefault();

    const username = document.getElementById('usernameSignInput').value.trim();
    const email = document.getElementById('emailSignInput').value.trim();
    const password = document.getElementById('passwordSignInput').value.trim();

    if(username && email && password){
        const response = await fetch('/api/member', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-type':'application/json'},
        });
        if(response.ok){
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
  };

  document.getElementById('login-form').addEventListener('submit', loginFormHandler);
  
  document.getElementById('signup-form').addEventListener('submit', signupFormHandler);