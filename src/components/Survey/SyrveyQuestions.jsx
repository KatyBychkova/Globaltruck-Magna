import { useEffect, useState } from 'react';

import { content } from '@/config/index.js';
import { validator } from '@/utils/validator.js';

import styles from './SyrveyQuestions.module.css';

const { survey } = content;
const { surveyBlock } = survey;
const {
    SurveyDescription, questions, butttonNextText, butttonPreviousText, submitButttonText,
} = surveyBlock;

const validatorConfig = {
    answer: {
        isRequired: {
            message: 'Пожалуйста, заполните все обязательные поля',
        },
    },

};

function SyrveyQuestions() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allAnswers, setAllAnswers] = useState({});
    const [inputPure, setInputPure] = useState(true);
    // const [data, setData] = useState(initialData);
    // const [data, setData] = useState({});
    const [errors, setErrors] = useState(false);
    const [userError, setUserError] = useState(null);

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
    };

    useEffect(() => {
        let message = null;

        if (errors) {
            message = errors.message;
        }
        setUserError(message);
    }, [errors]);

    const validate = () => {
        const validatorErrors = validator(selectedOptions, validatorConfig);
        setErrors(validatorErrors);
        return Object.keys(validatorErrors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [selectedOptions]);

    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        nextQues < questions.length && setCurrentQuestion(nextQues);
    };
    const handleAnswerOption = (answer) => {
        setSelectedOptions([
            (selectedOptions[currentQuestion] = { answerByUser: answer }),
        ]);
        setAllAnswers((prev) => ({
            ...prev,
            [questions[currentQuestion].question]: answer,
        }));
        setSelectedOptions([...selectedOptions]);
    };

    const handleSubmitButton = () => {
        setShowContactForm(true);
        console.log(JSON.stringify(allAnswers));
    };

    return (

        <div className={styles.container}>

            {showContactForm ? (
                <h1 className={styles.inner}>
                    You scored

                </h1>
            ) : (
                <div className={styles.wrapper}>

                    <div className={styles.surveyTop}>
                        <h5 className={styles.surveyDescription}>{SurveyDescription}</h5>

                        <p className={styles.questionCounter}>

                            {currentQuestion + 1}

                            /

                            {questions.length}
                        </p>

                    </div>

                    <div className={styles.surveyContent}>
                        <div className={styles.question}>
                            {questions[currentQuestion].question}
                        </div>
                        <div className={styles.answers}>
                            {questions[currentQuestion].answerOptions.map((answerItem, index) => (
                                <div
                                    key={index}
                                    className={styles.answer}
                                    onClick={(e) => handleAnswerOption(answerItem.answer)}

                                >
                                    <input
                                        checked={
                                            answerItem.answer === selectedOptions[currentQuestion]?.answerByUser
                                        }
                                        className={styles.answerInput}
                                        name={answerItem.answer}
                                        type="radio"
                                        value={answerItem.answer}
                                        onChange={(e) => handleAnswerOption(answerItem.answer)}
                                        // onChange={(e) => handleAnswerOption(e)}
                                    />
                                    <p className={styles.answerText}>{answerItem.answer}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className={styles.surveyButtons}>
                        <div className={styles.buttons}>

                            <button
                                className={styles.butttonPrevious}
                                onClick={handlePrevious}
                            >
                                {butttonPreviousText}
                            </button>

                            <button
                                className={styles.butttonNext}
                                onClick={
                                    currentQuestion + 1 === questions.length
                                        ? handleSubmitButton
                                        : handleNext
                                }
                            >
                                {currentQuestion + 1 === questions.length ? submitButttonText : butttonNextText }
                            </button>

                        </div>
                    </div>

                </div>
            )}

        </div>

    );
}

export default SyrveyQuestions;
