const renderField = ({ input, placeholder, type, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type}/>
    {touched ? 
      ((error ? <div style={{color: "red", fontSize: 12}}>{error}</div> : <div style={{marginBottom: 18}}></div>) || 
      (warning ? <div style={{color: "yellow", fontSize: 12}}>{warning}</div> : <div style={{marginBottom: 18}}></div>)) : <div style={{marginBottom: 18}}></div>}
  </div>
);

export default renderField