import { Component } from "react"
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import {QuizMarvel} from "../QuizMarvel";
export default class Quiz extends Component{
    state = {
        levelNames: ["debutant","confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
    }
    loadQuestion = level => {
        const questions = QuizMarvel[0].quizz[level];
        if(questions.length >= this.state.maxQuestions){
            const newQuestionsArray = questions.map( ({answer, ...keepRest}) => keepRest); 
            this.setState({...this.state, storedQuestions:newQuestionsArray});
        }else {

        }
    };

    componentDidMount() {
        this.loadQuestion(this.state.levelNames[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps,prevState) {
        if(this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                ...this.state,
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            });
        }
    }

    render() {
        // const { pseudo } = this.props.userData;
        const {question,options} = this.state;
        const displayQuestions = options.map((option,index) => <p key={index} className="answerOptions">{option}</p>)
        return (
            <div>
                <Levels />
                <ProgressBar />
                <h2>{question}</h2>
                {displayQuestions}
                <button className="btnSubmit">Suivant</button>
            </div>
        )
    }
}


