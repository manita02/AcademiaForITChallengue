import React, { useEffect, useState } from 'react';

interface CustomModalProps {
  title: string;
  body: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

const CustomModal: React.FC = () => {
  const [modalState, setModalState] = useState<CustomModalProps>({
    title: '',
    body: '',
  });

  const handleShowModal = async () => {
    const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
    const modalEl = document.getElementById('customModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  useEffect(() => {
    (window as any).openCustomModal = (props: CustomModalProps) => {
      setModalState(props);
      handleShowModal();
    };
  }, []);

  const handleConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
  };

  return (
    <div
      className="modal fade"
      id="customModal"
      tabIndex={-1}
      aria-labelledby="customModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="customModalLabel">
              {modalState.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{modalState.body}</div>
          <div className="modal-footer">
            {modalState.showCancel !== false && (
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <i className="bi bi-arrow-left-square-fill"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleConfirm}
            >
              <i className="bi bi-check-square-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;