import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import { EmailShareButton, EmailIcon, TwitterShareButton, WhatsappShareButton,WhatsappIcon,TwitterIcon } from "react-share";

const QuizAnswer = ({ quiz: { quiz, loading } }) => {
  //TODO: Ainda não implementei a função para comparar a string para ver se a opção é a certa ou não !!

  const [startQuiz, setStartQuiz] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [incre, setIncre] = useState(0);
  const [sizeQ, setSizeQ] = useState(0);

  const handleNextQuestion = (respostaclicada) => {
    //ver se a pergunta esta correta
    if (respostaclicada === quiz.question_possibility[incre].correct_answer) {
      setScore(score + 1);
    }

    const tam = quiz.question_possibility.length - 1;
    //incrementador para passar a proxima pergunta se for maior mostra o score
    if (!(incre === tam)) {
      setSizeQ(sizeQ + 1);
      setIncre(incre + 1);
    } else {
      setSizeQ(sizeQ + 1);
      setShowScore(true);
    }
  };

  const subj = `Resultado do quiz ${quiz.name}`;
  const bod = `Aqui vão os resultados do quiz (${subj}) tiveste uma pontuação de ${score} em ${sizeQ}.`;

  return loading ? (
    <Spinner />
  ) : (
    <div className="app">
      {startQuiz ? (
        <div>
          {showScore ? (
            <div className="score-section">
              
              <div class="container flex flex-wrap px-5 py-24 mx-auto items-center">
              <div class="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Fizeste {score} Pontos de {sizeQ}</h1>
        <p class="leading-relaxed text-base">Podes agora partilhar o resultado com a tua professora ou os teus amigos, se não gostas te do resultado repete o quiz e partilha para obteres sempre uma experiência agradavel e informação !</p>
         </div>
         <div class="flex flex-col md:w-1/2 md:pl-12">
        <h2 class="title-font font-semibold text-gray-800 tracking-wider text-sm mb-3">PARTILHA:</h2>
        <nav class="flex flex-wrap list-none -mb-1">
          <li class="lg:w-1/3 mb-1 w-1/2">
          <EmailShareButton subject={subj} body={`${bod}`}>
                <EmailIcon round={true} size={32}></EmailIcon>
              </EmailShareButton>
          </li>
          <li class="lg:w-1/3 mb-1 w-1/2">
          <TwitterShareButton subject={subj} body={`${bod}`}>
                <TwitterIcon round={true} size={32}></TwitterIcon>
              </TwitterShareButton>
          </li>
          <li class="lg:w-1/3 mb-1 w-1/2">
            <a class="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li class="lg:w-1/3 mb-1 w-1/2">
            <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
          <li class="lg:w-1/3 mb-1 w-1/2">
            <a class="text-gray-600 hover:text-gray-800">Fifth Link</a>
          </li>
          <li class="lg:w-1/3 mb-1 w-1/2">
            <a class="text-gray-600 hover:text-gray-800">Sixth Link</a>
          </li>
          <li class="lg:w-1/3 mb-1 w-1/2">
            <a class="text-gray-600 hover:text-gray-800">Seventh Link</a>
          </li>
          <li class="lg:w-1/3 mb-1 w-1/2">
            <a class="text-gray-600 hover:text-gray-800">Eighth Link</a>
          </li>
        </nav>
      </div>
            </div>




              
            </div>
          ) : (
            <>
              <div className="question-section m-2">
                <h3 className="question-text "> 
                
                  Pergunta {incre + 1}:{" "}
                  {quiz.question_possibility[incre].title_question}
                  
                </h3>
              </div>
              <div className="answer-section">
                {quiz.question_possibility[incre].answers
                  .sort(() => Math.random() - 0.5)
                  .map((_id) => (
                    <button
                      className="buttonAnswer"
                      onClick={() => handleNextQuestion(_id)}
                      key={_id}
                    >
                      {_id}
                    </button>
                  ))}
              </div>
              <div class="flex items-center justify-center">
                <div className="question-count ">
                  <h4>
                    Pergunta {incre + 1} / {quiz.question_possibility.length}
                  </h4>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <button
            className="border border-yellow-500 text-yellow-500 rounded-md px-4 py-2 m-0 transition duration-500 ease select-none hover:text-white hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
            onClick={() => setStartQuiz(true)}
          >
            Começa o Quiz 

            <i  className="fas fa-long-arrow-alt-right m-1"></i>
          </button>
        </div>
      )}
    </div>
  );
};

QuizAnswer.propTypes = {
  quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  quiz: state.quiz,
});

export default connect(mapStateToProps, {})(QuizAnswer);
