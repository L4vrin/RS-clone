import styles from './modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const Modal = ({ children, isVisible, setIsVisible }: ModalProps) => {
  const rootClasses = [styles.modal];
  if (isVisible) rootClasses.push(styles.active);

  return (
    <div className={rootClasses.join(' ')} onClick={() => setIsVisible(false)} role="presentation">
      <div
        className={styles.modalContent}
        onClick={(evt) => evt.stopPropagation()}
        role="presentation"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
