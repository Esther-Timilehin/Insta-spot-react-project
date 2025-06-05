import { useEffect, useRef} from 'react'

const PreviewableCard = ({ card, onClose }) => {
    const modalRef = useRef();

if (!card) return null;

// Close modal when clicking outside the modal content
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div>
        {/* <!-- previewable-modals --> */}
      <dialog className="previewable-modal modal" open >
      <button className="btn btn-close" onClick={onClose}>X</button>
      <div className="previewable-images" ref={modalRef}>
        <div className="card-img-container">
          <img
            src={card.imgSrc} 
            alt={card.imgAlt}
            className="card-img preview-img"
          />
        </div>
        <p className="previewable-title">{card.title}</p>
      </div>
      
    </dialog>

    </div>
  )
}

export default PreviewableCard
