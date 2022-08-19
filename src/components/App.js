import {useState ,useEffect} from 'react';
import "../css/App.css";
import ListContacts from "./ListContacts"
import * as ContactsAPI from "../utils/ContactsAPI"
import CreateContact from './CreateContact';
import {userNavigate, Route , Routes, useNavigate} from "react-router-dom"


const App = () => {

  const [contacts, setContacts] = useState([])
  let navigate = useNavigate();
  
  const removeContact = (contact) => {

    ContactsAPI.remove(contact)
    setContacts(contacts.filter((c) => c.id !== contact.id))
    // contacts = contacts.filter((c) => c.id !== contact.id)
  }

  const createContact = (contact) => {
    const create = async () => {
      const res = await ContactsAPI.create(contact)
      setContacts(contacts.concat(res))
    }

    create();
    navigate("/");
  };

  useEffect(() => {
    const getContacts = async () => {
      const response = await ContactsAPI.getAll()
      setContacts(response)
    }

    getContacts()
  }, [])  


 

  return (
      <Routes>
        <Route exact path="/"  element={ <ListContacts contacts={contacts} onDeleteContact={removeContact}/> } />
        <Route exact path="/create" element={ <CreateContact onCreateContact={ (contact) => {createContact(contact)} }/> }/>
      </Routes>
       
  )

  
}

export default App
