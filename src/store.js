export const initialStore=()=>{
  return{
    message: null,
    contactos: [],
    agendas: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':
      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'set_agendas':
      return {
        ...store,
        agendas: action.payload.agendas
      };
    default:
      throw Error('Unknown action.');
  }    
}
