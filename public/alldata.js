function AllData() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
  
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);  
      });
  }, []);

  return (
    <div className="card mb-3" style={{ maxWidth: "18rem", margin: "auto", marginTop: "1rem" }}>
      <div className="card-header bg-dark text-white">All Data</div>
      <div className="card-body bg-white text-dark">
        {data.length > 0 ? (
          <ul className="list-group">
            {data.map((item) => (
              <li className="list-group-item" key={item._id}>
                <strong>User: {item.name}</strong><br/>
                Email: {item.email}<br/>
                Password: {item.password} 
              </li>
            ))}
          </ul>
        ) : (
          <div>No data found.</div>
        )}
      </div>
    </div>
  );
}