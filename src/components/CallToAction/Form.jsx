import { useEffect, useState } from 'react';

import { content } from '@/config/index.js';
import { validator } from '@/utils/validator.js';

import styles from './Form.module.css';

const { form } = content;

const { placeholderName, placeholderTelephone } = form;

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

function Form({ onSubmitted }) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
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
        console.log(JSON.stringify(data));

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
                                        borderColor: '#d1274a',
                                        boxShadow: 'none',
                                    }
                                    : { borderColor: '#4a4a4a' }
                            }
                            type="text"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div
                        className={
                            telDirty && errors.tel
                                ? styles.formError
                                : styles.formName
                        }
                    >
                        <input
                            id="tel"
                            name="tel"
                            placeholder={placeholderTelephone}
                            style={
                                telDirty && errors.tel
                                    ? {
                                        borderColor: '#d1274a',
                                        boxShadow: 'none',
                                    }
                                    : { borderColor: '#4a4a4a' }
                            }
                            type="text"
                            value={data.tel}
                            onChange={handleChange}
                        />
                    </div>

                    {userError && (
                        <div className={styles.errorAlertMiddle}>
                            {userError}
                        </div>
                    )}
                    <div className={styles.formSubmit}>
                        <div>
                            <button
                                className={styles.formSubmitBtn}
                                type="submit"
                            >
                                Text
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Form;
