import React, { Component } from "react"
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
export default class Quiz extends Component {
    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        isBtnDisabled: true,
        userAnswer: null,
        score: 0
    };

    storedDataRef = React.createRef();

    loadQuestion = level => {
        const questions = QuizMarvel[0].quizz[level];
        if (questions.length >= this.state.maxQuestions) {
            this.storedDataRef.current = questions.slice();
            const newQuestionsArray = questions.map(({ answer, ...keepRest }) => keepRest);
            this.setState({ ...this.state, storedQuestions: newQuestionsArray });
        } else {
            this.setState({
                ...this.state,
                idQuestion: this.state.idQuestion + 1
            });
        }
        
    };

    componentDidMount() {
        this.loadQuestion(this.state.levelNames[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                ...this.state,
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            });
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                ...this.state,
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                isBtnDisabled: true,
                userAnswer: null,
            });
        }
    }
    onSubmitAnwser = selectedAnswer => {
        this.setState({
            ...this.state,
            userAnswer: selectedAnswer,
            isBtnDisabled: false
        });
    };
    onClickNextBtn = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {

        } else {
            this.setState(prevState => ({
                ...prevState,
                idQuestion: prevState.idQuestion + 1
            }));
        }

        const userAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

        if (this.state.userAnswer === userAnswer) {
            this.setState(prevState => ({
                ...prevState,
                score: prevState.score + 1
            }));
        }
    }
    render() {
        // const { pseudo } = this.props.userData;
        const { question, options } = this.state;
        const displayQuestions = options.map((option, index) =>
            <p
                key={index}
                className={`answerOptions ${this.state.userAnswer === option ? "selected" : ""}`}
                onClick={() => this.onSubmitAnwser(option)}
            >
                {option}
            </p>);
        return (
            <div>
                <Levels />
                <ProgressBar />
                <h2>{question}</h2>
                {displayQuestions}
                <button
                    disabled={this.state.isBtnDisabled}
                    className="btnSubmit"
                    onClick={this.onClickNextBtn}
                >
                    Suivant
                </button>
            </div>
        )
    }
}


