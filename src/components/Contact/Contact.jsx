import styles from './Contact.module.css';
import PropTypes from 'prop-types';
import { FiUser, FiPhone, FiTrash2 } from 'react-icons/fi';

const Contact = ({ id, name, number, deleteContact }) => {
  return (
    <li className={styles.item}>
      <div className={styles.contactInfo}>
        <div className={styles.contactDetail}>
          <FiUser className={styles.icon} />
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.contactDetail}>
          <FiPhone className={styles.icon} />
          <p className={styles.number}>{number}</p>
        </div>
      </div>
      <button onClick={() => deleteContact(id)} className={styles.deleteButton}>
        Delete <FiTrash2 className={styles.deleteIcon} />
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;