import logo from './logo.svg';
import './App.css';
import{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'


function App() {
   //________STATES
  const[name, setName] = useState("")
  const[species, setSpecies] = useState("")
  const[order, setOrder] = useState("")
  const[family, setFamily] = useState("")
  const[description, setDescription] = useState("")
  const[image, setImage] = useState("")
  const [monkeys, setMonkeys] = useState([])
  
  
 
//____FUNCTIONS

const newName = (event) =>{
  setName(event.target.value)
}
const newSpecies = (event) =>{
setSpecies(event.target.value)
}
const newImage = (event) =>{
setImage(event.target.value)
}
const newOrder = (event) =>{
  setOrder(event.target.value)
  }
const newFamily = (event) =>{
  setFamily(event.target.value)
  }
const newDescription = (event) =>{
    setDescription(event.target.value)
    }

//____CREATE
const addMonkey = (event) =>{
  event.preventDefault();
  axios.post('http://localhost:3000/monkey', 
  {
    name: name,
    species: species,
    order: order,
    family: family,
    description: description,
    image: image

}).then(()=>{axios.get('http://localhost:3000/monkey').then((response)=>{
    setMonkeys(response.data)
  })
  })
  }

  useEffect(()=>{
    axios.get('http://localhost:3000/monkey').then((response)=>{
     
          setMonkeys(response.data);
        })
  },[])
//______DELETE
const deleteMonkey = (monkeysData) =>{
  axios.delete(`http://localhost:3000/monkey/${monkeysData._id}`).then(()=>{axios.get('http://localhost:3000/monkey').then((response)=>{
    setMonkeys(response.data)
  })
})
}

//______UPDATE

const updateMonkeys = (event, monkeysData) =>{
  event.preventDefault();
  axios.put(`http://localhost:3000/monkey/${monkeysData._id}`,
  {
    name: name,
    species: species,
    order: order,
    family: family,
    description: description,
    image: image

}).then(()=>{axios.get('http://localhost:3000/monkey').then((response)=>{
  setMonkeys(response.data)
})
})
}

//_____MAPS

  return (
  <>
  <header className='container'><h1>Monkey See, Monkey Do.</h1></header>

 <div className ="container">

 <form onSubmit ={addMonkey}>
  
  Name: <input className='form-control' type="text" onChange={newName}  /><br/>
  Species: <input className='form-control' type="text"onChange={newSpecies}  /><br/>
  Order: <input className='form-control' type="text" onChange={newOrder}  /><br/>
  Family: <input className='form-control' type="text" onChange={newFamily}  /><br/>
  Description: <textarea className='form-control' rows ="4" onChange={newDescription}></textarea><br/>
  Image: <input className='form-control' type="url" onChange={newImage} /><br/>

  <input className ="btn btn-primary" type ="submit" value="Add" />

</form>
 </div>
<div className='container'>
  <div className='row'>
 {monkeys.map((monkey)=>{
   return(
     <div className='monkeys col-sm-6'  key={monkey._id}>
      <h2>Name: {monkey.name}</h2>
      <ul>
      <li>Species:{monkey.species}</li>
      <li>Family: {monkey.family}</li>
      <li> Short Description: {monkey.description}</li>
      </ul>
      <img className ="img-thumbnail" src={monkey.image}/>
      <form onSubmit ={(event)=>{updateMonkeys(event, monkey)}}>
  
  Name: <input className='form-control' type="text" defaultValue={monkey.name}  onChange={newName}  /><br/>
  Species: <input className='form-control' type="text" defaultValue={monkey.species} onChange={newSpecies}  /><br/>
  Order: <input className='form-control' type="text" defaultValue={monkey.order} onChange={newOrder}  /><br/>
  Family: <input className='form-control' type="text" defaultValue={monkey.family} onChange={newFamily}  /><br/>
  Description: <textarea className='form-control' rows ="4" type="text" defaultValue={monkey.description} onChange={newDescription}></textarea><br/>
  Image: <input className='form-control' type="url" defaultValue={monkey.image} onChange={newImage} /><br/>

  <input className ="btn btn-primary" type ="submit" value="Update This Monkey" />

</form>
      <button className ="btn btn-primary" onClick={(event)=>{deleteMonkey(monkey)}}>Delete</button>
      </div>
   )})}
   </div>
</div>
  </>
  );
}

export default App;
