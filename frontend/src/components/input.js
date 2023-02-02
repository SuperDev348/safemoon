import React from "react";

export default function Input(props) {
  const {type, name, placeholder, value, onChange, error} = props;
  const [style, setStyle] = React.useState({});


  return (
    <>
      <input type={type} 
        name={name} 
        placeholder={placeholder} 
        value={value} 
        onChange={ onChange}
        // style={style}
      />
      {error ? <div style={{color: "red", fontSize: 12, paddingLeft: 12}}>{error}</div> : <div style={{paddingBottom: 18}}> </div>} 
    </>
  );
}