//implementar if e else no número de perguntas

import { useHistory } from "react-router-dom";

import { Question } from "../components/Question";

import { useState, FormEvent, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/deleteImg.svg";
import check from "../assets/images/check.svg";
import answer from "../assets/images/answer.svg";

import "../styles/room.scss";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
  }
>;

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir está pergunta?"))
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <div>
            <img src={logoImg} alt="togetherproject" />
            <div className="user-icon">
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>
                    <div>Logado como: </div>
                    {user.name}
                  </span>
                </div>
              ) : (
                <span>
                  <button>faça seu login</button>
                </span>
              )}
            </div>
          </div>
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <body>
          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={check} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answer} alt="Dar destque a pergunta" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover Pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        </body>
      </main>
    </div>
  );
}
