import {useState ,useEffect} from 'react';
import "../css/App.css";
import ListContacts from "./ListContacts"
import * as ContactsAPI from "../utils/ContactsAPI"
import CreateContact from './CreateContact';

const App = () => {
  
  const removeContact = (contact) => {

    ContactsAPI.remove(contact)
    setContacts(contacts.filter((c) => c.id !== contact.id))
    // contacts = contacts.filter((c) => c.id !== contact.id)
  }

  const [contacts, setContacts] = useState([])
  const [screen , setScreen] = useState("create")

  useEffect(() => {
    const getContacts = async () => {
      const response = await ContactsAPI.getAll()
      setContacts(response)
    }

    getContacts()
  }, [])  


 

  return (
    <div>
      {screen === "list" && (<ListContacts contacts = {contacts} onDeleteContact = {removeContact}/>)}
      {screen === "create" && (<CreateContact />)}
    </div>
  )

  
}

export default App
