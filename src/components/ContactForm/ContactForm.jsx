/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
/* eslint-enable no-unused-vars */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { FiLock } from 'react-icons/fi';
import styles from './ContactForm.module.css';

const ContactForm = ({ addContact, isSearchFocused }) => {
  const [isNameFocused, setIsNameFocused] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Too Short')
        .required('Required'),
      number: Yup.string()
        .min(2, 'Too Short')
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newContact = { id: nanoid(), name: values.name, number: values.number };
      addContact(newContact);
      console.log('Form values before reset:', values); 
      resetForm();
      console.log('Form has been reset');
      setIsNameFocused(false);
    },
  });

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = () => {
    setIsNameFocused(false);
  };

  const shouldShowErrors = !isSearchFocused;

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <label className={styles.label}>
        Name
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleNameBlur();
            }}
            onFocus={handleNameFocus}
            value={formik.values.name}
            className={styles.input}
          />
          {isNameFocused && (
            <div className={styles.icon}>
              <div className={styles.outerCircle}>
                <div className={styles.innerCircle}>
                  <FiLock className={styles.lockIcon} />
                </div>
              </div>
            </div>
          )}
          {isNameFocused && !formik.values.name && (
            <div className={styles.hint}>Use 1 Password</div>
          )}
          {formik.touched.name && shouldShowErrors && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}
        </div>
      </label>
      <label className={styles.label}>
        Number
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => setIsNameFocused(false)}
            value={formik.values.number}
            className={styles.input}
          />
          {formik.touched.number && shouldShowErrors && formik.errors.number ? (
            <div className={styles.error}>{formik.errors.number}</div>
          ) : null}
        </div>
      </label>
      <button type="submit" className={styles.button}>Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  isSearchFocused: PropTypes.bool.isRequired,
};

export default ContactForm;