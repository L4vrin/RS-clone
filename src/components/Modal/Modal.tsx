import classes from './modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const Modal = ({ children, isVisible, setIsVisible }: ModalProps) => {
  const rootClasses = [classes.modal];
  if (isVisible) rootClasses.push(classes.active);

  return (
    <div className={rootClasses.join(' ')} onClick={() => setIsVisible(false)} role="presentation">
      <div
        className={classes.modalContent}
        onClick={(evt) => evt.stopPropagation()}
        role="presentation"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
