// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      window.location.href = 'dashboard.html';
    }
  });
}

// Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data: signupData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://yourdomain.com/index.html' // change if needed
      }
    });

    if (!error && signupData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: signupData.user.id, email, full_name: "New User", bio: "" }]);

      if (profileError) {
        console.error("❌ Error saving profile:", profileError.message);
      } else {
        console.log("✅ Profile saved!");
      }
      alert('Signup successful! Check your email to verify.');
      window.location.href = 'index.html';
    } else {
      alert('Signup failed: ' + error.message);
    }
  });
}

// Password reset
function resetPassword() {
  const email = prompt("Enter your email to reset password:");
  if (!email) return;

  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://yourdomain.com/reset.html'
  }).then(({ error }) => {
    if (error) {
      alert("Error sending reset link: " + error.message);
    } else {
      alert("Password reset email sent.");
    }
  });
}

// Google login
function loginWithGoogle() {
  supabase.auth.signInWithOAuth({ provider: 'google' });
}

// Dashboard info
const userInfo = document.getElementById('user-info');
if (userInfo) {
  (async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();

      if (profile) {
        userInfo.innerHTML = `
          <h3>Welcome, ${profile.full_name}</h3>
          <p>${profile.bio}</p>
          <p>Email: ${profile.email}</p>
        `;
      }
    }
  })();

  document.getElementById('logout').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
  });
}
