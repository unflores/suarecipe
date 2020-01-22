import * as React from 'react'
import * as styles from './styles.css'


interface Props {
  onClose: () => void
  title?: string
  children: React.ReactNode
}

const defaultProps = {
  title: ''
}

const Modal = ({ onClose, title, children }: Props) => {
  return (
    <div className={styles.modal}>
      <section className={`container ${styles.main}`}>
        <div className="row mt-3">
          <div className="col-12">{title}</div>
        </div>
        {children}
        <div className="row mt-3">
          <div className="col-10" />
          <div className="col-2 text-right">
            <button className="btn btn-dark" onClick={onClose}>close</button>
          </div>
        </div>
      </section>
    </div>
  )
}

Modal.defaultProps = defaultProps

export default Modal
