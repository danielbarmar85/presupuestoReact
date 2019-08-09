import React, { useState } from "react";
import shortid from "shortid";
import Error from "./Error";

function Formulario(props) {
  // Props
  const { guardarGasto, guardarCrearGasto } = props;

  // Initial state.
  const initialState = {
    nombreGasto: "",
    cantidadGasto: 0
  };

  // State.
  const [busqueda, guardarBusqueda] = useState(initialState);
  const [error, guardarError] = useState(false);

  // Submit.
  const handleSubmit = e => {
    e.preventDefault();

    // Validate.
    if (
      isNaN(busqueda.cantidadGasto) ||
      busqueda.cantidadGasto <= 0 ||
      busqueda.nombreGasto === ""
    ) {
      guardarError(true);
      return;
    }

    // Contruir objeto.
    const gasto = {
      ...busqueda,
      id: shortid.generate()
    };

    // Pasar el gasto al componente principal.
    guardarGasto(gasto);

    // Indica al componente principal que se ha agregado un gasto.
    guardarCrearGasto(true);

    // Eliminar error
    guardarError(false);

    // Resetear form.
    guardarBusqueda(initialState);
  };

  //Onchange inputs
  const handleChange = e => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Gastos aquí</h2>

      {error ? (
        <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto." />
      ) : null}

      <div className="campo">
        <label>Nombre del gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          name="nombreGasto"
          onChange={handleChange}
          value={busqueda.nombreGasto}
        />
      </div>
      <div className="campo">
        <label>Cantidad del gasto</label>
        <input
          type="number"
          min={0}
          className="u-full-width"
          placeholder="Ej. Transporte"
          name="cantidadGasto"
          onChange={handleChange}
          value={busqueda.cantidadGasto}
        />
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar gasto"
      />
    </form>
  );
}

export default Formulario;
