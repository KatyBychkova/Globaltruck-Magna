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

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
    };

    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        console.log(selectedOptions.length, nextQues);
        if (selectedOptions.length < nextQues) {
            console.log('ошибка');
            setNoAnswer(true);
        } else {
            setNoAnswer(false);
            nextQues < questions.length && setCurrentQuestion(nextQues);
        }
    };
    const handleAnswerOption = (answer) => {
        console.log(answer);
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
                        <div className={noAnswer ? styles.answersError : styles.answers}>
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

                            {/* <button
                                className={styles.butttonNext}
                                onClick={
                                    currentQuestion + 1 === questions.length
                                        ? handleSubmitButton
                                        : handleNext
                                }
                            >
                                {currentQuestion + 1 === questions.length ? submitButttonText : butttonNextText }
                            </button> */}

                            <button
                                className={currentQuestion + 1 === questions.length ? styles.butttonNextWithoutArrow : styles.butttonNext}
                                onClick={
                                    currentQuestion + 1 === questions.length
                                        ? handleSubmitButton
                                        : handleNext
                                }
                            >
                                {butttonNextText }
                            </button>

                        </div>
                    </div>

                </div>
            )}

        </div>

    );
}

export default SyrveyQuestions;
