import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const Modal = ({ children, isVisible, setIsVisible }: ModalProps) => {
  const modalRef = useRef(null);

  return (
    <CSSTransition
      in={isVisible}
      timeout={500}
      unmountOnExit
      classNames={{
        enter: styles.modalEnter,
        enterActive: styles.modalEnterActive,
        exit: styles.modalExit,
        exitActive: styles.modalExitActive,
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={() => setIsVisible(false)}
        role="presentation"
      >
        <div
          className={styles.modalContent}
          onClick={(evt) => evt.stopPropagation()}
          role="presentation"
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
