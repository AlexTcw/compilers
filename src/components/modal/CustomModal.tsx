import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Complex {
  real: number;
  imag: number;
}

interface CustomModalProps {
  solucion: Array<number | Complex>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function formatSolution(solution: number | Complex): string {
  if (typeof solution === 'number') {
    return solution.toString();
  } else {
    return `${solution.real} + ${solution.imag}i`;
  }
}

function CustomModal({ solucion, show, setShow }: CustomModalProps) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Soluciones para la ecuación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {solucion.map((item, index) => (
              <li key={index}>{formatSolution(item)}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button className="text-center" variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
