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
  const[description, setDescription] = useState(false)
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

//______SHOW

// const showOne =(monkeysData) =>{
//   axios.get(`http://localhost:3000/monkey/${monkeysData._id}`).then((response)=>{
//     setMonkeys(response.data)
//   })

//   }


const [showMonkey, setShowMonkey] = useState(false)
const [updateMonkey, setUpdateMonkey] = useState(false)
const [addForm, setAddForm] = useState(false)
  return (
  <>
  <header className='container'><h1>Monkey See, Monkey Do.</h1></header>

 <div className ="container">
 <button className ="btn btn-warning" onClick={()=>setAddForm(s=>!s)} >Add New Monkey</button>

 { addForm? <form className='create' onSubmit ={addMonkey}>
  
 <label>Name:</label>  <input className='form-control' type="text" onChange={newName}  /><br/>
 <label> Species:</label>  <input className='form-control' type="text"onChange={newSpecies}  /><br/>
 <label> Order:</label>  <input className='form-control' type="text" onChange={newOrder}  /><br/>
 <label> Family:</label>  <input className='form-control' type="text" onChange={newFamily}  /><br/>
 <label>Description:</label>  <textarea className='form-control' rows ="4" onChange={newDescription}></textarea><br/>
 <label>Image:</label>  <input className='form-control' type="url" onChange={newImage} /><br/>

  <input className ="btn btn-success" type ="submit" value="Add" />

</form> : "" }
 </div>
<div className='container'>
  <div className='row'>
 {monkeys.map((monkey)=>{
   return(
    
     <div className='monkeys col-sm-8'  key={monkey._id}>
      <h2>Name: {monkey.name}</h2>
      <img className ="img-thumbnail" src={monkey.image}/>
      
      <div>
      
      <button className ="btn btn-warning" onClick={()=>setShowMonkey(s=>!s)} >See the description</button>
      
      { showMonkey? 
      <ul>
      <li><h3><b>Species:</b></h3><i>{monkey.species}</i> </li>
      <li><h3><b>Family:</b></h3><i>{monkey.family}</i> </li>
      
      <li><h3><b> Short Description:</b></h3><i> {monkey.description} </i></li>
      </ul> : ""
      }
      
      <button className ="btn btn-warning" onClick={()=>setUpdateMonkey(s=>!s)} > Click Here to Update</button>
      { updateMonkey ?
      <form onSubmit ={(event)=>{updateMonkeys(event, monkey)}}>
  
  <input className='form-control' type="text" defaultValue={monkey.name}  onChange={newName}  /><br/>
  Species: <input className='form-control' type="text" defaultValue={monkey.species} onChange={newSpecies}  /><br/>
  Order: <input className='form-control' type="text" defaultValue={monkey.order} onChange={newOrder}  /><br/>
  Family: <input className='form-control' type="text" defaultValue={monkey.family} onChange={newFamily}  /><br/>
  Description: <textarea className='form-control' rows ="4" type="text" defaultValue={monkey.description} onChange={newDescription}></textarea><br/>
  Image: <input className='form-control' type="url" defaultValue={monkey.image} onChange={newImage} /><br/>

  <input className ="btn btn-success" type ="submit" value="Update This Monkey" />

</form> : "" }
      <button className ="btn btn-danger" onClick={(event)=>{deleteMonkey(monkey)}}>Delete Monkey</button> 
      </div> 
      </div>
   )})}
   </div>
</div>
  </>
  );
}

export default App;
