import React from "react";

function Gasto({ gasto, guardarEliminarGasto }) {
  const handleClick = clave => {
    guardarEliminarGasto(clave);
  };

  return (
    <li className="gastos">
      <p>
        {gasto.nombreGasto}
        <span className="gasto">$ {gasto.cantidadGasto}</span>

        <button type="button" onClick={() => handleClick(gasto.id)}>
          Eliminar
        </button>
      </p>
    </li>
  );
}

export default Gasto;
