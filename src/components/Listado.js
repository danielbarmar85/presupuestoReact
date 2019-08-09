import React from "react";
import Gasto from "./Gasto";

function Listado({ gastos, guardarEliminarGasto }) {
  return (
    <div className="gastos-realizados">
      <h2>Listado</h2>
      <ul>
        {gastos.map(gasto => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            guardarEliminarGasto={guardarEliminarGasto}
          />
        ))}
      </ul>
    </div>
  );
}

export default Listado;
