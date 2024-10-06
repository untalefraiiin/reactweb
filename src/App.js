import './App.css';
import axios, * as others from 'axios';
import {useState} from 'react';

function App() {

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState(0);
  const [editActive, setEditActive] = useState(false);

  const add = () =>{
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      apellido: apellido,
      email: email
    }).then(()=>{
      alert('Registro enviado exitosamente :D');
      getRegistros();
    })
  }

  const update = () =>{
    axios.post("http://localhost:3001/update", {
      nombre: nombre,
      apellido: apellido,
      email: email, 
      id
    }).then(()=>{
      alert('Editado enviado exitosamente :D');
      getRegistros();
    })
  }

  const deleteRegistro = (id) =>{
    axios.put('http://localhost:3001/delete/'+id+'').then(()=>{
      alert('Editado borrado exitosamente :c');
      getRegistros();
    })
  }

  const editRegistro = (value) =>{
    setEditActive(true);
    setNombre(value.nombre);
    setApellido(value.apellido);
    setEmail(value.email);
    setId(value.id);
  }

  const cancelEditRegistro = () =>{
    setEditActive(false);
    
    setNombre("");
    setApellido("");
    setEmail("");
    setId(0);
  }

  const [registrosList, setRegistrosList] = useState([]);

  const getRegistros = () =>{
    axios.get("http://localhost:3001/registros").then((response)=>{
      setRegistrosList(response.data);
    })
  }

  getRegistros();

  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <section className='card mt-3 input-group p-0'>
            <div className='card-header'>
              <span><strong>Formulario para enviar</strong></span>
            </div>
            <div className='card-body'>
              <div className='col-md-12 p-1 input-group'>
                <label className='input-group-text'>Nombre</label>
                <input id="name" onChange={((event)=>{setNombre(event.target.value)})} className='rounded form-control' value={nombre}></input>
              </div>
              <div className='col-md-12 p-1 input-group'>
                <label className='input-group-text'>Apellido</label>
                <input id="apellido" onChange={((event)=>{setApellido(event.target.value)})} className='rounded form-control' value={apellido}></input>
              </div>
              <div className='col-md-12 p-1 input-group'>
                <label className='input-group-text'>Correo</label>
                <input id="email" onChange={((event)=>{setEmail(event.target.value)})} className='rounded form-control' value={email}></input>
              </div>
              <div className='col-md-12 p-1 mt-2'>
                {
                  editActive ?
                  <div>
                    <button onClick={()=>{update()}} className='btn btn-warning col-md-12 m-2'>Actualizar</button>
                    <button onClick={()=>{cancelEditRegistro()}} className='btn btn-danger col-md-12 m-2'>Cancelar</button>
                  </div>
                  :
                  <button onClick={add} className='btn btn-success col-md-12'>Enviar</button>
                }
              </div>
              <input id='id' type="hidden" value={id}></input>
            </div>
          </section>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          
          <table className='table table-striped table-light'>
            <thead className="thead-light">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Editar</th>
                <th scope="col">Borrar</th>
              </tr>
            </thead>
            <tbody>
              {
                registrosList.map((val,key)=>{
                  return <tr className='col-md-12' scope="row"> <td>{val.nombre}</td> <td>{val.apellido}</td> <td>{val.email}</td> <td><button className='btn btn-success' onClick={()=>{editRegistro(val)}}>Editar</button></td> <td><button className='btn btn-danger' onClick={()=>{deleteRegistro(val.id)}}>Eliminar</button></td></tr>
                })
              }
            </tbody>
          </table>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
