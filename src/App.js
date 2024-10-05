import './App.css';
import axios, * as others from 'axios';
import {useState} from 'react';

function App() {

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState();

  const add = () =>{
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      apellido: apellido,
      email: email
    }).then(()=>{
      getRegistros();
      alert('Registro enviado exitosamente :D');
    })
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
                <input id="name" onChange={((event)=>{setNombre(event.target.value)})} className='rounded form-control'></input>
              </div>
              <div className='col-md-12 p-1 input-group'>
                <label className='input-group-text'>Apellido</label>
                <input id="apellido" onChange={((event)=>{setApellido(event.target.value)})} className='rounded form-control'></input>
              </div>
              <div className='col-md-12 p-1 input-group'>
                <label className='input-group-text'>Correo</label>
                <input id="email" onChange={((event)=>{setEmail(event.target.value)})} className='rounded form-control'></input>
              </div>
              <div className='col-md-12 p-1 mt-2'>
                <button onClick={add} className='btn btn-success col-md-12'>Enviar</button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div>
        <div className='col-md-12 p-3 m-2'>
          <button className='btn btn-primary col-md-12 p-2' onClick={getRegistros}>Alistar</button>
        </div>
        <div>
          {
            registrosList.map((val,key)=>{
              return <div className='col-md-12'>{val.nombre} - {val.apellido}</div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
