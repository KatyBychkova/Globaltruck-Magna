import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import { content } from '@/config/index.js';
import { validator } from '@/utils/validator.js';
import inputStyles from '@/styles/inputTelStyles.json';

import styles from './ContactForm.module.css';

import 'react-phone-input-2/lib/material.css';

const { survey } = content;
const { formAfterSurvey } = survey;
const {
    placeholderName, labelTelephone, placeholderTelephone, submitButttonText,
} = formAfterSurvey;
const { inputTelStyles, inputTelStylesError } = inputStyles;

const validatorConfig = {
    name: {
        isRequired: {
            message: 'Пожалуйста, заполните все обязательные поля',
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
            message: 'Пожалуйста, заполните все обязательные поля',
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

const initialData = {
    name: '',
    tel: '',

};

function ContactForm({
    onSubmitted, allAnswers, onClickPrevious, butttonPreviousText,
}) {
    const [nameDirty, setNameDirty] = useState(false);
    const [telDirty, setTelDirty] = useState(false);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [userError, setUserError] = useState(null);

    useEffect(() => {
        let message = null;

        if (telDirty && errors.tel) {
            message = errors.tel;
        } else if (nameDirty && errors.name) {
            message = errors.name;
        }

        setUserError(message);
    }, [telDirty, nameDirty, errors]);

    const cleanForm = () => {
        setNameDirty(false);
        setTelDirty(false);
        setData(initialData);
    };

    const handleClickPrevious = () => {
        onClickPrevious(true);
        // onSubmitted(true);

        // cleanForm();
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
        console.log(JSON.stringify({ ...data, ...allAnswers }));

        onSubmitted(true);

        cleanForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.formInner}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div
                        className={
                            nameDirty && errors.name
                                ? styles.formError
                                : styles.formName
                        }
                    >
                        <input
                            id="name"
                            name="name"
                            placeholder={placeholderName}
                            style={
                                nameDirty && errors.name
                                    ? {
                                        border: '1px solid #d1274a',
                                        boxShadow: 'none',
                                    }
                                    : { borderColor: '#b3b3b3' }
                            }
                            type="text"
                            value={data.name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div
                        className={
                            telDirty && errors.tel
                                ? styles.formError
                                : styles.formName
                        }
                    >
                        <label
                            className={styles.labelTelephone}
                            htmlFor="tel"
                        >
                            {labelTelephone}
                        </label>
                        <PhoneInput
                            country="ru"
                            error={errors.tel}
                            id="tel"
                            inputClass={styles.phone}
                            inputProps={{ required: true }}
                            inputStyle={
                                telDirty && errors.tel
                                    ? { ...inputTelStylesError }
                                    : { ...inputTelStyles }
                            }
                            name="tel"
                            placeholder={placeholderTelephone}
                            specialLabel={null}
                            value={data.tel}
                            onChange={handleTelChange}
                        />
                    </div>

                    {userError && (
                        <div className={styles.errorAlertMiddle}>
                            {userError}
                        </div>
                    )}
                    <div className={styles.formSubmit}>
                        <div>

                            <div className={styles.buttons}>

                                <button
                                    className={styles.butttonPrevious}
                                    onClick={handleClickPrevious}
                                >
                                    {butttonPreviousText}
                                </button>

                                <button
                                    className={styles.submitButtton}
                                    type="submit"
                                >
                                    {submitButttonText}
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default ContactForm;
