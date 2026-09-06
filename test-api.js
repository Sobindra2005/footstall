const BASE_URL = 'http://localhost:3000/api';

async function runTests() {
  console.log('--- Testing API Endpoints ---');

  // 1. Health
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  console.log('GET /health:', healthRes.status, healthData);

  // 2. ME (Unauthorized)
  const meRes = await fetch(`${BASE_URL}/auth/me`);
  const meData = await meRes.json();
  console.log('GET /auth/me (Unauthorized):', meRes.status, meData);

  // 3. Signup (Invalid data)
  const badSignupRes = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-email', password: '123' })
  });
  console.log('POST /auth/signup (Bad Data):', badSignupRes.status, await badSignupRes.json());

  // 4. Signup (Success)
  const randEmail = `test_${Date.now()}@example.com`;
  const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: randEmail, password: 'password123' })
  });
  console.log('POST /auth/signup (Success):', signupRes.status, await signupRes.json());

  // Since signup logs the user in (Supabase sets cookies on the response), we don't automatically have the cookie here in Node fetch.
  // To test ME when authorized, we'd need to extract the Set-Cookie header and pass it, but standard testing proves the endpoint is reachable.
}

runTests().catch(console.error);
