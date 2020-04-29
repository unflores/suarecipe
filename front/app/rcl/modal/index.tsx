import * as React from 'react'
import * as styles from './styles.css'

const ESCAPE_KEY = 27

interface Props {
  onClose: () => void
  title?: string
  children: React.ReactNode
}

class Modal extends React.Component<Props, {}> {

  static defaultProps = {
    title: ''
  }

  handleKeyDown = (event: KeyboardEvent): any => {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        this.props.onClose()
        break;
      default:
        break;
    }
  }

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }


  render() {

    const { onClose, title, children } = this.props

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
}

export default Modal
