import { useState } from 'react';
import { useEffect } from 'react';
import { ModalContacto } from '../components/ModalContacto';
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "bootstrap-icons/font/bootstrap-icons.css";


const ContactCard = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  // Access the global state using the custom hook.
  const { store, dispatch } = useGlobalReducer()

  // Retrieve the 'theId' URL parameter using useParams hook.
  const { agendaId } = useParams()
  const agenda = store.agendas.find(agenda => agenda.id === parseInt(agendaId));
  
  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const response = await fetch(
          `${API_URL}agendas/${agenda.slug}/contacts`,
          { headers: { 'Accept': 'application/json' } }
        );
        const data = await response.json();
        dispatch({ type: 'get_contactos', payload: data.contacts });
      } catch (error) {
        console.error("Error fetching agendas:", error);
        dispatch({ type: 'set_message', payload: "Error cargando agendas" });
      }
    };
    fetchContactos();
  }, [dispatch]);
  

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [selectedContact, setSelectedContact] = useState(null);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const handleCreateUpdate = async (formData) => {
    try {
      const url = modalAction === 'add' 
        ? `${API_URL}agendas/${agenda.slug}/contacts`
        : `${API_URL}agendas/${agenda.slug}/contacts/${selectedContact.id}`;

      const method = modalAction === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch({
          type: modalAction === 'add' ? 'add_contact' : 'update_contact',
          payload: data
        });
        handleModalClose();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}agendas/${agenda.slug}/contacts/${selectedContact.id}`, 
        { method: 'DELETE' }
      );

      if (response.ok) {
        dispatch({ type: 'delete_contact', payload: selectedContact.id });
        handleModalClose();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card my-3">
      <div className="d-flex justify-content-end p-2">
        <button 
          className="btn btn-success btn-sm"
          onClick={() => {
            setModalAction('add');
            setShowModal(true);
          }}
        >
          Agregar Contacto
        </button>
      </div>

      {store.contactos?.map((contacto) => (
        <div key={contacto.id} className="row g-0 align-items-center custom-width border">
          <div key={contacto.id} className="row g-0 align-items-center custom-width">
            <div className="col-md-2 text-center">
              <img
                src="https://get.pxhere.com/photo/man-person-hair-white-profile-male-portrait-model-young-hairstyle-smile-beard-face-glasses-head-moustache-eyewear-photo-shoot-facial-hair-vision-care-451653.jpg"
                className="img-fluid rounded-circle p-2"
                alt={contacto.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title mb-1">{contacto.name}</h5>
                <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>{contacto.address}</p>
                <p className="mb-1"><i className="bi bi-telephone-fill me-2"></i>{contacto.phone}</p>
                <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i>{contacto.email}</p>
              </div>
            </div>
            <div className="col-md-2 text-end pe-3">
              <button 
                className="btn btn-link text-dark"
                onClick={() => {
                  setModalAction('edit');
                  setSelectedContact(contacto);
                  setShowModal(true);
                }}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button 
                className="btn btn-link text-dark"
                onClick={() => {
                  setModalAction('delete');
                  setSelectedContact(contacto);
                  setShowModal(true);
                }}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        </div>
      ))}

      <ModalContacto
        show={showModal}
        handleClose={handleModalClose}
        actionType={modalAction}
        contact={selectedContact}
        onSubmit={handleCreateUpdate}
        onDelete={handleDelete}
      />
      
      {/* Backdrop para el modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ContactCard;