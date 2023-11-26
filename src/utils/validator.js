function validate(validateMethod, data, config) {
    let statusValidate;

    switch (validateMethod) {
    case 'isRequired': {
        statusValidate = data.trim() === '';
        break;
    }
    case 'min': {
        statusValidate = data.length < config.value;
        break;
    }
    case 'isTel': {
        const emailRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
        statusValidate = !emailRegExp.test(data);
        break;
    }

    default: {
        break;
    }
    }

    if (statusValidate) {
        return config.message;
    }

    return null;
}

export function validator(data, config) {
    const errors = {};

    /* eslint-disable no-restricted-syntax, guard-for-in */
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    /* eslint-enable */

    return errors;
}
