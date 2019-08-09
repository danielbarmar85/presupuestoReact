import React, { Fragment, useState } from "react";
import Error from "./Error";

function Pregunta(props) {
  const {
    guardarPresupuesto,
    guardarPreguntaPresupuesto,
    guardarRestante
  } = props;

  // Define state
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const handleChange = e => {
    guardarCantidad(parseInt(e.target.value, 10));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validate
    if (isNaN(cantidad) || cantidad <= 0) {
      guardarError(true);
      return;
    }

    // Agregar el presupuesto
    guardarError(false);
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    guardarPreguntaPresupuesto(false);
  };

  return (
    <Fragment>
      <h2>Tu presupuesto es:</h2>

      {error ? (
        <Error mensaje="El presupuesto indicado no es correcto." />
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Añade el presupuesto"
          onChange={handleChange}
        />
        <input
          type="submit"
          className="button-primary u-full-width"
          value="Presupuesto"
        />
      </form>
    </Fragment>
  );
}

export default Pregunta;
