import React, { Component } from "react";
import { toast } from 'react-toastify';
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

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
        score: 0,
        isWelcomeMsgShown: false
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

    showWelcomeMsg = pseudo => {
        if (!this.state.isWelcomeMsgShown) {
            toast.warn(`Bienvenue ${pseudo} et bonne chance!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                ...this.state,
                isWelcomeMsgShown: true
            })
        }
    }

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

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo);
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
            toast.success(`Bravo +1`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(`Raté 0`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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


