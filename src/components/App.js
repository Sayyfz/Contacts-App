import {useState ,useEffect} from 'react';
import "../css/App.css";
import ListContacts from "./ListContacts"
import * as ContactsAPI from "../utils/ContactsAPI"
import CreateContact from './CreateContact';
import {Route , Routes} from "react-router-dom"

const App = () => {
  
  const removeContact = (contact) => {

    ContactsAPI.remove(contact)
    setContacts(contacts.filter((c) => c.id !== contact.id))
    // contacts = contacts.filter((c) => c.id !== contact.id)
  }

  const [contacts, setContacts] = useState([])

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
        <Route exact path="/create" element={ <CreateContact /> }/>
      </Routes>
       
  )

  
}

export default App
