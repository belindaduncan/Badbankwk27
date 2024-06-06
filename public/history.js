function History(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Transaction History"
      status={status}
      body={show ?
        <HistoryForm setShow={setShow} setStatus={setStatus}/> : // Using HistoryForm instead
        <HistoryMsg setShow={setShow}/>}
    />
  )
}

function HistoryMsg(props){
  return (
    <>
      <h5>Transactions Loaded</h5>
      <button type="button" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Load Again
      </button>
    </>
  );
}

function HistoryForm(props){
  // Form specifics for handling transactions
  return (
    <>
      {/* Implement form specifics here */}
      <h5>Transaction Form</h5>
      <button type="button" 
        className="btn btn-light" 
        onClick={() => props.setShow(false)}>
          Submit Transaction
      </button>
    </>
  );
}