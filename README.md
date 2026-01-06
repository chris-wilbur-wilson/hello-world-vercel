# Hello World App with Supabase Authentication

A simple hello world application with email authentication using Supabase.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Wait for the project to be provisioned

### 2. Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure Email Templates (optional)
4. Add your deployment URL to **URL Configuration** → **Site URL** and **Redirect URLs**

### 3. Get Your Supabase Credentials

1. Go to **Project Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public** key

### 4. Update the Code

Open `main.js` and replace these lines:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

With your actual values from step 3.

### 5. Deploy to Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Add Supabase authentication"
   git push
   ```

2. Vercel will automatically redeploy your app

### 6. Configure Supabase Redirect URLs

After deploying, add your Vercel URL to Supabase:

1. Go to **Authentication** → **URL Configuration**
2. Add your Vercel URL (e.g., `https://your-app.vercel.app`) to **Redirect URLs**

## How It Works

- Users enter their email and receive a magic link
- Clicking the magic link signs them in
- The hello world app is only accessible to authenticated users
- Users can sign out at any time

## Local Development

```bash
npm run dev
```

Visit `http://localhost:3000` to test locally.
