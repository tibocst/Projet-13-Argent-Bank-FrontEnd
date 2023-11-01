import { useState } from "react";
import "../../styles/index.css";

function InputForm(props) {
  const { description, type, name, id, required, errorDescription } = props;
  const [error, setError] = useState(false)

  const handleOnCHange = (e) => {
    var regex = ''
    switch (name) {
      case "firstname":
      case "lastname":
        regex = /^[A-Za-z]+$/
        break;
      case "password":
        regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        break;
      case "username":
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        break;
      default:
        break;
    }
    if(regex.test(e.target.value)){
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <div className="input-wrapper">
      <label>
        {description}
        <input type={type} name={name} id={id} required={required} onChange={handleOnCHange} />
      </label>
      {error ? <p className="errorInput">{errorDescription}</p> : null}
    </div>
  );
}

export default InputForm;
