/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { content } from '@/config/index.js';

import styles from './SyrveyQuestions.module.css';
import ContactForm from './ContactForm.jsx';

const { survey } = content;
const { surveyBlock, afterSubmitText } = survey;
const {
    SurveyDescription, questions, butttonNextText, butttonPreviousText,
} = surveyBlock;

const validatorConfig = {
    answer: {
        isChecked: {
            message: 'Пожалуйста, заполните все обязательные поля',
        },
    },
};

function SyrveyQuestions() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allAnswers, setAllAnswers] = useState({});
    const [noAnswer, setNoAnswer] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isClickPrevious, setIsClickPrevious] = useState(false);

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
        setShowContactForm(false);
    };

    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        if (currentQuestion + 1 === questions.length) {
            setShowContactForm(true);
        }
        // проверка отмечен ли ответ
        if (selectedOptions.length < nextQues) {
            setNoAnswer(true);
        } else {
            setNoAnswer(false);
            nextQues < questions.length && setCurrentQuestion(nextQues);
        }
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

    const handleSubmitSurveyButton = () => {
        setShowContactForm(true);
        // console.log(JSON.stringify(allAnswers));
    };

    const handleSubmitted = () => {
        setIsSubmitted(true);
    };

    return (

        <div className={styles.container}>
            <div className={styles.wrapper}>

                {showContactForm ? (
                    <>
                        <div className={styles.surveyTopInContactForm}>
                            <h5 className={styles.surveyDescriptionInContactForm}>{SurveyDescription}</h5>

                        </div>
                        <div className={styles.contactForm}>

                            {!isSubmitted ? (
                                <ContactForm
                                    allAnswers={allAnswers}
                                    butttonPreviousText={butttonPreviousText}
                                    isClickPrevious={isClickPrevious}
                                    isSubmitted={isSubmitted}
                                    onClickPrevious={handlePrevious}
                                    onSubmitted={handleSubmitted}
                                />
                            ) : (
                                <div className={styles.afterSubmit}>
                                    <div className={styles.afterSubmitText}>
                                        {afterSubmitText}
                                    </div>
                                </div>
                            )}

                        </div>
                    </>
                ) : (
                    <>
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
                            <div className={noAnswer ? styles.errorAnswers : styles.answers}>
                                {questions[currentQuestion].answerOptions.map((answerItem, index) => (
                                    <div
                                        key={index}
                                        className={styles.answer}
                                        onChange={(e) => handleAnswerOption(answerItem.answer)}
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
                                        />
                                        <p className={styles.answerText}>{answerItem.answer}</p>
                                    </div>
                                ))}

                            </div>
                            {noAnswer && (
                                <div className={styles.errorAlert}>
                                    {validatorConfig.answer.isChecked.message}
                                </div>
                            )}
                        </div>
                        <div className={styles.surveyButtons}>
                            <div className={styles.buttons}>

                                <button
                                    className={styles.butttonPrevious}
                                    onClick={handlePrevious}
                                >
                                    {butttonPreviousText}
                                </button>

                                {currentQuestion + 1 === questions.length ? (
                                    <button
                                        className={styles.butttonNextWithoutArrow}
                                        onClick={handleSubmitSurveyButton}
                                    >
                                        {butttonNextText}
                                    </button>
                                ) : (
                                    <button
                                        className={styles.butttonNext}
                                        onClick={handleNext}
                                    >
                                        {butttonNextText}
                                    </button>
                                )}

                            </div>
                        </div>
                    </>
                )}

            </div>

        </div>

    );
}

export default SyrveyQuestions;
