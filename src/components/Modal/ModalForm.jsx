'use client';

import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/material.css';

import { validator } from '@/utils/validator.jsx';
import inputStyles from '@/styles/inputTelStyles.json';
import { geo, content } from '@/config/index.js';

import styles from './ModalForm.module.css';

const { cities } = geo;
const { modal } = content;
const {
    placeholderName, labelTel, labelDept, submitBtnText,
} = modal;
const { inputTelStylesModal, inputTelStylesModalError } = inputStyles;

function ModalForm({ openModalSubmitted, onClose }) {
    const [nameDirty, setNameDirty] = useState(false);
    const [telDirty, setTelDirty] = useState(false);

    const [data, setData] = useState({
        name: '',
        tel: '',
        dept: 'Екатеринбург',
    });

    const [errors, setErrors] = useState({});

    const blurHandlerName = (e) => {
        if (e.target.name === 'name') {
            setNameDirty(true);
        }
    };

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTelChange = (value) => {
        setData((prev) => ({
            ...prev,
            tel: value,
        }));
    };

    const handleDeptChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Поле обязательно для заполнения',
            },
            min: {
                message: 'Имя должно содержать минимум 2 символа',
                value: 2,
            },
            isName: {
                message: 'Имя некорректно',
            },
        },
        tel: {
            isRequired: {
                message: 'Поле обязательно для заполнения',
            },
            isTel: {
                message: 'Номер введен некорректно',
            },
            min: {
                message: 'Слишком короткий номер',
                value: 9,
            },
        },
    };

    const validate = () => {
        const validatorErrors = validator(data, validatorConfig);
        setErrors(validatorErrors);
        return Object.keys(validatorErrors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) {
            setNameDirty(true);
            setTelDirty(true);
            return;
        }

        // eslint-disable-next-line no-console
        console.log(JSON.stringify(data));

        onClose();
        openModalSubmitted();
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.wrapper}
                onClick={(e) => e.stopPropagation()}
            >
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div
                        className={
                            telDirty && errors.tel
                                ? styles.form_error
                                : styles.form_name
                        }
                    >
                        <input
                            id="name"
                            name="name"
                            placeholder={placeholderName}
                            style={
                                errors.name && nameDirty
                                    ? {
                                        borderColor: '#d1274a',
                                        boxShadow: 'none',
                                    }
                                    : { borderColor: '#c9c9c9' }
                            }
                            type="text"
                            value={data.name}
                            onBlur={(e) => blurHandlerName(e)}
                            onChange={handleNameChange}
                        />
                        {errors.name && nameDirty ? (
                            <div className={styles.error_text}>
                                {errors.name}
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.form_tel}>
                        <label className={styles.label_tel} htmlFor="tel">
                            {labelTel}
                        </label>
                        <PhoneInput
                            country="ru"
                            error={errors.tel}
                            id="tel"
                            inputProps={{ required: true }}
                            inputStyle={
                                telDirty && errors.tel
                                    ? { ...inputTelStylesModalError }
                                    : { ...inputTelStylesModal }
                            }
                            name="tel"
                            placeholder={placeholderName}
                            specialLabel={null}
                            value={data.tel}
                            onBlur={() => setTelDirty(true)}
                            onChange={handleTelChange}
                        />
                        {telDirty && errors.tel ? (
                            <div className={styles.error_text}>
                                {errors.tel}
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.form_dept}>
                        <div className={styles.label_dept}>{labelDept}</div>
                        <select
                            className={styles.depts}
                            name="dept"
                            onChange={handleDeptChange}
                        >
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.callToAction}>
                        <button
                            className={styles.callToAction_btn}
                            type="submit"
                        >
                            {submitBtnText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalForm;
