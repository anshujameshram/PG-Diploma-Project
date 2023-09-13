import React,{useState} from 'react'

export default function AlertDialog({title,desc,type,onClose}) {
    const [isOpen, setIsOpen] = useState(true);

  const handleCloseDialog = () => {
    setIsOpen(false);
    try {
      onClose()
    } catch (error) {
      window.location.href = "/";
    }
    
  };  


  return (
    <div className={`alert-dialog-overlay ${isOpen ? 'display-flex' : ''}`}>
        <div className="alert-dialog-box">
            <img src={`/img/${type}.svg`} alt=""/>
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br>') }}></p>
            <button onClick={handleCloseDialog}>Ok</button>
        </div>
    </div>
  )
}
