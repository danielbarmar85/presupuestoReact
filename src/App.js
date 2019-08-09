import React, { useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  // State.
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [preguntaPresupuesto, guardarPreguntaPresupuesto] = useState(true);
  const [crearGasto, guardarCrearGasto] = useState(false);
  const [gasto, guardarGasto] = useState({});
  const [gastos, guardarGastos] = useState([]);
  const [eliminarGasto, guardarEliminarGasto] = useState("");

  useEffect(() => {
    // Previene que se ejecute hasta que no se
    // genera un gasto para ello se crea un nuevo
    // effecto que se pasa a Formulario y
    // si se crea un gasto nuevo se añade.

    if (crearGasto) {
      const listadoGastos = [...gastos, gasto];
      guardarGastos(listadoGastos);

      // Restar el presupuesto restante.
      const presupuestoRestante = restante - gasto.cantidadGasto;
      guardarRestante(presupuestoRestante);

      // Lo volvemos a establecer como falso.
      guardarCrearGasto(false);
    } else if (eliminarGasto !== "") {
      let listadoGastos = [];
      let gastoEliminado = {};
      gastos.forEach((gasto, index) => {
        if (gasto.id !== eliminarGasto) {
          listadoGastos[index] = gasto;
        } else {
          gastoEliminado = { ...gasto };
        }
      });
      guardarGastos(listadoGastos);

      // Restar el presupuesto restante.
      const presupuestoRestante =
        restante + parseInt(gastoEliminado.cantidadGasto, 10);
      guardarRestante(presupuestoRestante);

      guardarEliminarGasto("");
    }
  }, [crearGasto, gastos, gasto, restante, eliminarGasto]);

  return (
    <div className="App container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {preguntaPresupuesto ? (
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarPreguntaPresupuesto={guardarPreguntaPresupuesto}
              guardarRestante={guardarRestante}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                />
              </div>
              <div className="one-half column">
                <Listado
                  gastos={gastos}
                  guardarEliminarGasto={guardarEliminarGasto}
                />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
