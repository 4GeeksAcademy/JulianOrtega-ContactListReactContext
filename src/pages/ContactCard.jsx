// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

const ContactCard = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()

  // Retrieve the 'theId' URL parameter using useParams hook.
  const { agendaId } = useParams()
  const agenda = store.agendas.find(agenda => agenda.id === parseInt(agendaId));

  useEffect(() => {
    const fetchcontactos = async () => {
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
    fetchcontactos();
  }, [dispatch]);

  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-2 text-center">
          <img
            src="https://get.pxhere.com/photo/man-person-hair-white-profile-male-portrait-model-young-hairstyle-smile-beard-face-glasses-head-moustache-eyewear-photo-shoot-facial-hair-vision-care-451653.jpg"
            className="img-fluid rounded-circle p-2"
            alt={agenda.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title mb-1">{agenda.name}</h5>
            <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>{agenda.address}</p>
            <p className="mb-1"><i className="bi bi-telephone-fill me-2"></i>{agenda.phone}</p>
            <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i>{agenda.email}</p>
          </div>
        </div>
        <div className="col-md-2 text-end pe-3">
          <button className="btn btn-link text-dark" onClick={() => onEdit(agenda.id)}>
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button className="btn btn-link text-dark" onClick={() => onDelete(agenda.id)}>
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
ContactCard.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};

export default ContactCard;