/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
/* eslint-enable no-unused-vars */
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { FiLock } from 'react-icons/fi';

const ContactForm = ({ addContact, isSearchFocused }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    number: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { id: nanoid(), name, number };
    addContact(newContact);
    setName('');
    setNumber('');
  };

  const handleNameFocus = () => {
    setIsNameFocused(true);
    setShowPasswordHint(true);
  };

  const handleNameBlur = () => {
    setIsNameFocused(false);
    setShowPasswordHint(false);
    if (name === '') {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'required' }));
    } else if (name.length < 3) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'too-short' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: false }));
    }
  };

  const handleNumberFocus = () => {
    setIsNumberFocused(true);
    setErrors((prevErrors) => ({ ...prevErrors, number: false }));
  };

  const handleNumberBlur = () => {
    setIsNumberFocused(false);
    if (number === '') {
      setErrors((prevErrors) => ({ ...prevErrors, number: 'required' }));
    } else if (number.length < 3) {
      setErrors((prevErrors) => ({ ...prevErrors, number: 'too-short' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, number: false }));
    }
  };

  
  const shouldShowErrors = !isSearchFocused;  // Якщо фокус на полі пошуку, то приховати error у інпутах

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            required
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
          {showPasswordHint && !name && (
            <div className={styles.hint}>Use 1 Password</div>
          )}
          {shouldShowErrors && errors.name === 'required' && (
            <div className={styles.error}>Required</div>
          )}
          {shouldShowErrors && errors.name === 'too-short' && (
            <div className={styles.error}>Too Short</div>
          )}
        </div>
      </label>
      <label className={styles.label}>
        Number
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
            onFocus={handleNumberFocus}
            onBlur={handleNumberBlur}
            required
            minLength={3}
            className={`${styles.input} ${isNumberFocused ? styles.focused : ''}`}
          />
          {shouldShowErrors && errors.number === 'required' && (
            <div className={styles.error}>Required</div>
          )}
          {shouldShowErrors && errors.number === 'too-short' && (
            <div className={styles.error}>Too Short</div>
          )}
        </div>
      </label>
      <button type="submit" className={styles.button}>Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  isSearchFocused: PropTypes.bool.isRequired, // Додаємо проп для відслідковування фокуса на SearchBox
};

export default ContactForm;