import React, { useState, useEffect } from 'react';
import styles from './Quiz.module.css';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
            });
    }, []);

    const handleAnswer = answer => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].answer) {
            setIsCorrect(true);
            setScore(prevScore => prevScore + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setIsCorrect(null);
            setSelectedAnswer(null);
        } else {
            // End of quiz
            setFinished(true);
        }
    };

    return (

        <div className={styles.quizContainer}>
            {!finished ? (
                <>
                    <h2 className={styles.quizTitle}>{questions[currentQuestionIndex]?.question_text}</h2>
                    {questions[currentQuestionIndex]?.choices.split(',').map(choice => (
                        <button
                            key={choice}
                            onClick={() => handleAnswer(choice)}
                            disabled={selectedAnswer}
                            className={styles.choiceButton}
                        >
                            {choice}
                        </button>
                    ))}
                    {isCorrect !== null && (
                        <p className={isCorrect ? styles.correct : styles.wrong}>
                            {isCorrect ? 'Correct!' : `Wrong. The correct answer is ${questions[currentQuestionIndex]?.answer}.`}
                        </p>
                    )}
                    {selectedAnswer && <button className={styles.nextButton} onClick={nextQuestion}>Next</button>}
                </>
            ) : (
                <>
                    <h2 className={styles.score}>Your Score: {score}/{questions.length}</h2>
                </>
            )}
        </div>
    );
}

export default Quiz;
