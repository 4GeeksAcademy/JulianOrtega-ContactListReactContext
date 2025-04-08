import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useEffect } from 'react';

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await fetch(
          'https://playground.4geeks.com/contact/agendas?offset=0&limit=100',
          { headers: { 'Accept': 'application/json' } }
        );
        const data = await response.json();
        dispatch({ type: 'set_agendas', payload: data });
      } catch (error) {
        console.error("Error fetching agendas:", error);
        dispatch({ type: 'set_message', payload: "Error cargando agendas" });
      }
    };
    fetchAgendas();
  }, [dispatch]);

  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {store.agendas?.map((agenda) => (
          <div key={agenda.id} className="col">
            <Link 
              to={`/agenda/${agenda.id}`} 
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-hover">
                <div className="card-body">
                  <p className="card-text text-muted mb-0">
                    ID: {agenda.id}
                  </p>
                  <h5 className="card-title">Nombre: {agenda.slug}</h5>
                </div>
                <div className="card-footer bg-transparent">
                  <small className="text-primary">
                    Click para ver detalles →
                  </small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};