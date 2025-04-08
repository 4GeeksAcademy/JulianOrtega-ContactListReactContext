import { useEffect, useState } from 'react';

export const ModalContacto = ({ 
  show, 
  handleClose, 
  actionType, 
  contact, 
  onSubmit, 
  onDelete 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (actionType === 'edit' && contact) {
      setFormData(contact);
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: ''
      });
    }
  }, [contact, actionType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div 
      className={`modal fade ${show ? 'show' : ''}`} 
      style={{ display: show ? 'block' : 'none' }}
      tabIndex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {actionType === 'add' && 'Nuevo Contacto'}
              {actionType === 'edit' && 'Editar Contacto'}
              {actionType === 'delete' && 'Confirmar Eliminación'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            {actionType !== 'delete' ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    {actionType === 'add' ? 'Crear' : 'Guardar'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p>¿Estás seguro de eliminar este contacto?</p>
                <div className="d-flex justify-content-end gap-2">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={onDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalContacto;