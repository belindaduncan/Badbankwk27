function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState(true);

  function handleLogin() {
    const loginData = { email, password };

    fetch('/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.user) {
        setStatus('');
        setShow(false); // Hide login form on successful login
        console.log('Login successful:', data);
      } else {
        throw new Error('Failed to login');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      setStatus('Login failed!'); // Update status to display error
    });
  }

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? (
        <>
          Email<br/>
          <input type="email" 
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)} /><br/>
          Password<br/>
          <input type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)} /><br/>
          <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
        </>
      ) : (
        <div>Login Successful!</div> // Message or redirect after successful login
      )}
    />
  );
}
