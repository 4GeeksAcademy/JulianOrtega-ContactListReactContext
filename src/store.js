export const initialStore=()=>{
  return{
    message: null,
    contactos: [],
    agendas: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'get_contactos':
      return { ...store, contactos: action.payload };

    case 'set_agendas':
      return { ...store, agendas: action.payload.agendas };
    
    case 'add_contact':
      return { ...store, contactos: [...store.contactos, action.payload] };
    
    case 'update_contact':
      return {
        ...store,
        contactos: store.contactos.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    
    case 'delete_contact':
      return {
        ...store,
        contactos: store.contactos.filter(contact => contact.id !== action.payload)
      };
      
    default:
      return store;
  }    
}
