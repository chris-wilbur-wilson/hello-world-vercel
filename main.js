import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
// Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://lpbovzikrmrxmsprskvo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vosLItwLqsBcPb2pb3cL1g_7mp6vf-5';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const authContainer = document.getElementById('authContainer');
const appContainer = document.getElementById('appContainer');
const emailInput = document.getElementById('emailInput');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const authMessage = document.getElementById('authMessage');
const userEmail = document.getElementById('userEmail');
const helloBtn = document.getElementById('helloBtn');
const message = document.getElementById('message');

// Check if user is already logged in
checkUser();

// Sign In with Magic Link
signInBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    
    if (!email) {
        showAuthMessage('Please enter your email', 'error');
        return;
    }
    
    signInBtn.disabled = true;
    signInBtn.textContent = 'Sending...';
    
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: window.location.origin
        }
    });
    
    if (error) {
        showAuthMessage('Error: ' + error.message, 'error');
        signInBtn.disabled = false;
        signInBtn.textContent = 'Send Magic Link';
    } else {
        showAuthMessage('✅ Check your email for the magic link!', 'success');
        emailInput.value = '';
        signInBtn.disabled = false;
        signInBtn.textContent = 'Send Magic Link';
    }
});

// Sign Out
signOutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    showApp(false);
});

// Hello Button functionality
helloBtn.addEventListener('click', function() {
    message.textContent = '👋 Hello, World!';
    message.classList.remove('hidden');
    this.textContent = 'Click Again!';
});

// Check authentication state
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        showApp(true, session.user.email);
    } else {
        showApp(false);
    }
}

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        showApp(true, session.user.email);
    } else if (event === 'SIGNED_OUT') {
        showApp(false);
    }
});

// Show/Hide app based on auth state
function showApp(isAuthenticated, email = '') {
    if (isAuthenticated) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        userEmail.textContent = email;
    } else {
        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }
}

// Show authentication messages
function showAuthMessage(msg, type) {
    authMessage.textContent = msg;
    authMessage.className = 'message';
    authMessage.classList.add(type);
    authMessage.classList.remove('hidden');
    
    setTimeout(() => {
        authMessage.classList.add('hidden');
    }, 5000);
}
