/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { content } from '@/config/index.js';

import styles from './SurveyQuestions.module.css';
import SurveyForm from './SurveyForm.jsx';

const { survey, afterSubmitText } = content;
const { surveyBlock } = survey;
const {
    SurveyDescription, questions, buttonNextText, buttonPreviousText,
} = surveyBlock;

const validatorConfig = {
    answer: {
        isChecked: {
            message: 'Пожалуйста, выберите один из вариантов ответа',
        },
    },
};

function SurveyQuestions() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showSurveyForm, setShowSurveyForm] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allAnswers, setAllAnswers] = useState({});
    const [noAnswer, setNoAnswer] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;

        if (prevQues >= 0) {
            setCurrentQuestion(prevQues);
        }

        setShowSurveyForm(false);
    };

    const handleNext = () => {
        const nextQuestion = currentQuestion + 1;

        if (currentQuestion + 1 === questions.length) {
            setShowSurveyForm(true);
        }
        // проверка отмечен ли ответ
        if (selectedOptions.length < nextQuestion) {
            setNoAnswer(true);
        } else {
            setNoAnswer(false);
            setProgress((100 / questions.length) * (currentQuestion + 1));

            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            }
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
        setShowSurveyForm(true);
    };

    const handleSubmitted = () => {
        setIsSubmitted(true);
    };

    return (

        <div className={styles.container}>
            <div className={styles.wrapper}>

                {showSurveyForm ? (
                    <>
                        <div className={styles.surveyTopInSurveyForm}>
                            <h5 className={styles.surveyDescriptionInSurveyForm}>{SurveyDescription}</h5>
                        </div>
                        <div className={styles.surveyProgressBarInSurveyForm} />
                        <div className={styles.surveyForm}>

                            {!isSubmitted ? (
                                <SurveyForm
                                    allAnswers={allAnswers}
                                    buttonPreviousText={buttonPreviousText}
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
                                {' '}
                                /
                                {' '}
                                {questions.length}
                            </p>

                        </div>
                        <div className={styles.surveyProgressBar}>
                            <span className={styles.surveyProgressLine} style={{ width: `${progress}%` }} />
                        </div>
                        <div className={styles.surveyContent}>
                            <div className={styles.question}>
                                {questions[currentQuestion].question}
                            </div>
                            <div className={styles.answers}>
                                {questions[currentQuestion].answerOptions.map((answerItem) => (
                                    <label
                                        key={answerItem.answer}
                                        className={styles.answer}
                                        onChange={() => handleAnswerOption(answerItem.answer)}
                                    >
                                        <input
                                            checked={
                                                answerItem.answer === selectedOptions[currentQuestion]?.answerByUser
                                            }
                                            className={styles.answerInput}
                                            name={answerItem.answer}
                                            type="radio"
                                            value={answerItem.answer}
                                            onChange={() => handleAnswerOption(answerItem.answer)}
                                        />
                                        <p className={styles.answerText}>{answerItem.answer}</p>
                                    </label>
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
                                    className={styles.buttonPrevious}
                                    onClick={handlePrevious}
                                >
                                    {buttonPreviousText}
                                </button>

                                {currentQuestion + 1 === questions.length ? (
                                    <button
                                        className={styles.buttonNextWithoutArrow}
                                        onClick={handleSubmitSurveyButton}
                                    >
                                        {buttonNextText}
                                    </button>
                                ) : (
                                    <button
                                        className={styles.buttonNext}
                                        onClick={handleNext}
                                    >
                                        {buttonNextText}
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

export default SurveyQuestions;
