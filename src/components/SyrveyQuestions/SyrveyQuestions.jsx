import { useState } from 'react';

import styles from '@/components/SyrveyQuestions/SyrveyQuestions.module.css';
import { content } from '@/config/index.js';

const { survey } = content;
const { surveyBlock } = survey;
const {
    SurveyDescription, questions, butttonNextText, butttonPreviousText, submitButttonText,
} = surveyBlock;

function SyrveyQuestions() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
    };

    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        nextQues < questions.length && setCurrentQuestion(nextQues);
    };
    const handleAnswerOption = (answer) => {
        setSelectedOptions([
            (selectedOptions[currentQuestion] = { answerByUser: answer }),
        ]);
        setSelectedOptions([...selectedOptions]);
        console.log(selectedOptions);
    };

    const handleSubmitButton = () => {
        setShowContactForm(true);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                {showContactForm ? (
                    <h1 className={styles.inner}>
                        You scored

                    </h1>
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
                            <div className={styles.answers}>
                                {questions[currentQuestion].answerOptions.map((answer, index) => (
                                    <div
                                        key={index}
                                        className={styles.answer}
                                        onClick={(e) => handleAnswerOption(answer.answer)}
                                    >
                                        <input
                                            checked={
                                                answer.answer === selectedOptions[currentQuestion]?.answerByUser
                                            }
                                            className={styles.answerInput}
                                            name={answer.answer}
                                            type="radio"
                                            value={answer.answer}
                                            onChange={(e) => handleAnswerOption(answer.answer)}
                                        />
                                        <p className={styles.answerText}>{answer.answer}</p>
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

                    </>
                )}

            </div>
        </section>
    );
}

export default SyrveyQuestions;
