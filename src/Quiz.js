import React, { useState, useEffect } from 'react';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log("Fetching questions...");  // Log here
            const response = await fetch('http://localhost:5000/api/questions'); // NOTE the URL change
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Questions fetched:", data);  // Log the fetched data
            setQuestions(data);
            setCurrentQuestionIndex(0); // To start from the first question after they're fetched
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };



    if (!questions.length) {
        return <div>Loading questions...</div>;
    }

    if (currentQuestionIndex >= questions.length) {
        return <div>Quiz completed! Your score is: {score}</div>;
    }

    const handleSubmit = () => {
        if (selectedAnswer === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
    };

    return (
        <div>
            <h2>{questions[currentQuestionIndex].question_text}</h2>
            {questions[currentQuestionIndex].choices.split(',').map((choice, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        value={choice}
                        checked={selectedAnswer === choice}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                    {choice}
                </div>
            ))}
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
}

export default Quiz;
