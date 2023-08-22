import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BaseColaboradores } from './database/BaseColaboradores';
import Listado from './components/Listado';
import Formulario from './components/Formulario';
import Alert from './components/Alert';
import { useState } from 'react';
import Buscador from './components/Buscador';

function App() {

  const [alert, setAlert] = useState({ msg: "", color: ""});
  const [colaboradores, setColaboradores] = useState(BaseColaboradores);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredColaboradores = colaboradores.filter((c) => {
    if(
    c.nombre.toLowerCase().includes(search.toLowerCase()) || 
    c.correo.toLowerCase().includes(search.toLowerCase()) ||
    c.edad.toLowerCase().includes(search.toLowerCase()) ||
    c.cargo.toLowerCase().includes(search.toLowerCase()) ||
    c.telefono.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const handleSubmit = (nuevoColaborador) => {
    const colaboradorConId = {...nuevoColaborador, id: colaboradores.length + 1};
    setColaboradores([...colaboradores, colaboradorConId])
  }

  return (
    <>
    <div>
      <h1>Lista de colaboradores</h1>
      <Buscador onChange={handleChange} search={search}></Buscador>
      <Listado colaboradores = {filteredColaboradores}></Listado>
      </div>
      <div>
      <Formulario onSubmit={handleSubmit} setAlert={setAlert}></Formulario>
      {alert.msg && <Alert msg={alert.msg} color={alert.color}></Alert>}
      </div>
    </>
  );
};

export default App
