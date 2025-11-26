'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';


const POINTS_PAR_QUESTION = 2.2225;

type QuestionId =
  | 'I0'
  | 'I1'
  | 'O2'
  | 'I2I3'
  | 'I4'
  | 'I5'
  | 'I6'
  | 'O3'
  | 'O7';

interface Question {
  id: QuestionId;
  imageSrc: string;
  title: string;
  prompt: string;
  correctAnswer: string;
  choices: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 'I0',
    imageSrc: '/I0.jpg',
    title: 'Capteur I0',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur I0 sur ce montage ?',
    correctAnswer: 'Usure sur les mors d’attache et les paliers lisses',
    choices: [
      'Présence du galet de débrayage',
      'Position du câble avec attache',
      'Usure sur les mors d’attache et les paliers lisses',
      'Ouverture de l’attache vide',
    ],
  },
  {
    id: 'I1',
    imageSrc: '/I1.jpg',
    title: 'Capteur I1',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur I1 sur ce montage ?',
    correctAnswer: 'Position de l’attache accouplée au câble',
    choices: [
      'Position du câble avant et après lembrayage',
      'Usure sur les mors d’attache et les paliers lisses',
      'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
      'Position de l’attache accouplée au câble',
    ],
  },
  {
    id: 'O2',
    imageSrc: '/O2.jpg',
    title: 'Capteur O2',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur O2 sur ce montage ?',
    correctAnswer: 'Position du câble avec attache',
    choices: [
      'Position du câble avec attache',
      'Position du câble dans la zone d’embrayage - entrée',
      'Ouverture de l’attache vide',
      'Position de repos de l’attache, présence des galets de guidage et de roulement',
    ],
  },
  {
    id: 'I2I3',
    imageSrc: '/I3-I2.jpg',
    title: 'Capteurs I2 / I3',
    prompt:
      'Quelle est la fonction de contrôle principale assurée par les capteurs I2 / I3 ?',
    correctAnswer: 'Position du câble dans la zone d’embrayage - entrée',
    choices: [
      'Position du câble avant et après lembrayage',
      'Position du câble dans la zone d’embrayage - entrée',
      'Présence du galet de débrayage',
      'Position de l’attache accouplée au câble',
    ],
  },
  {
    id: 'I4',
    imageSrc: '/I4.jpg',
    title: 'Capteur I4',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur I4 sur ce montage ?',
    correctAnswer: 'Position du câble avant et après lembrayage',
    choices: [
      'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
      'Position du câble avec attache',
      'Usure sur les mors d’attache et les paliers lisses',
      'Position du câble avant et après lembrayage',
    ],
  },
  {
    id: 'I6',
    imageSrc: '/I6.jpg',
    title: 'Capteur I6',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur I6 sur ce montage ?',
    correctAnswer: 'Présence du galet de débrayage',
    choices: [
      'Présence du galet de débrayage',
      'Position du câble avec attache',
      'Position de repos de l’attache, présence des galets de guidage et de roulement',
      'Ouverture de l’attache vide',
    ],
  },
  {
    id: 'I5',
    imageSrc: '/I5.jpg',
    title: 'Capteur I5',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur I5 sur ce montage ?',
    correctAnswer: 'Ouverture de lattache vide',
    choices: [
      'Position de l’attache accouplée au câble',
      'Position du câble avant et après lembrayage',
      'Ouverture de lattache vide',
      'Usure sur les mors d’attache et les paliers lisses',
    ],
  },
  {
    id: 'O3',
    imageSrc: '/O3.jpg',
    title: 'Capteur O3',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur O3 sur ce montage ?',
    correctAnswer:
      'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
    choices: [
      'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
      'Position du câble dans la zone d’embrayage - entrée',
      'Présence du galet de débrayage',
      'Position du câble avec attache',
    ],
  },
  {
    id: 'O7',
    imageSrc: '/O7.jpg',
    title: 'Capteur O7',
    prompt:
      'Quelle est la fonction de contrôle assurée par le capteur O7 sur ce montage ?',
    correctAnswer:
      'Position de repos de l’attache, présence des galets de guidage et de roulement',
    choices: [
      'Ouverture de lattache vide',
      'Position du câble avant et après lembrayage',
      'Position de repos de l’attache, présence des galets de guidage et de roulement',
      'Usure sur les mors d’attache et les paliers lisses',
    ],
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => Array(QUESTIONS.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedForCurrent = answers[currentIndex];

  const handleChoiceClick = (choice: string) => {
    if (showResults) return;
    if (answers[currentIndex] !== null) return;

    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = choice;
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex === QUESTIONS.length - 1) {
      setShowResults(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
  };

  const totalCorrect = QUESTIONS.reduce((sum, question, index) => {
    const answered = answers[index];
    if (answered === question.correctAnswer) return sum + 1;
    return sum;
  }, 0);

  const scoreSur20 =
    Math.round(totalCorrect * POINTS_PAR_QUESTION * 100) / 100;

  const quizTermine = answers.every((value) => value !== null);

  // On prépare le JSX dans une variable unique
  let content: ReactNode;

  if (showResults) {
    content = (
      <main className="min-h-screen bg-slate-900 text-slate-50 flex justify-center">
        <div className="w-full max-w-3xl p-4 sm:p-8">
          <header className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Quiz fonction de contrôle
            </h1>
            <p className="text-slate-300">
              Résumé de tes réponses sur les 9 dispositifs de contrôle.
            </p>
          </header>

          <section className="mb-8 rounded-xl border border-slate-700 bg-slate-800/60 p-6">
            <p className="text-lg mb-2">
              Bonnes réponses :{' '}
              <span className="font-semibold">
                {totalCorrect} / {QUESTIONS.length}
              </span>
            </p>
            <p className="text-lg mb-2">
              Note sur 20 :{' '}
              <span className="font-semibold">
                {scoreSur20.toFixed(2)} / 20
              </span>
            </p>

          </section>

          <section className="space-y-4 mb-8">
            {QUESTIONS.map((question, index) => {
              const answer = answers[index];
              const isCorrect = answer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="rounded-lg border border-slate-700 bg-slate-800/70 p-4 text-sm"
                >
                  <p className="font-semibold mb-1">
                    Q{index + 1}. {question.title}
                  </p>
                  <p className="mb-2 text-slate-300">{question.prompt}</p>
                  <p>
                    Ta réponse :{' '}
                    <span
                      className={
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }
                    >
                      {answer ?? 'Aucune réponse'}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 text-slate-300">
                      Bonne réponse :{' '}
                      <span className="font-semibold">
                        {question.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </section>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-sm sm:text-base font-medium shadow-md"
            >
              Recommencer le quiz
            </button>
          </div>
        </div>
      </main>
    );
  } else {
    content = (
      <main className="min-h-screen bg-slate-900 text-slate-50 flex justify-center">
        <div className="w-full max-w-5xl p-4 sm:p-8">
          <header className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Quiz fonction de contrôle des gabarits
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              9 questions, chaque bonne réponse vaut à peu près 2 
              points. Note finale sur 20.
            </p>
          </header>

          <section className="mb-6 flex justify-between items-center text-sm sm:text-base">
            <span>
              Question{' '}
              <span className="font-semibold">{currentIndex + 1}</span> /{' '}
              {QUESTIONS.length}
            </span>
            <span className="text-slate-300">
              Bonnes réponses pour l’instant :{' '}
              <span className="font-semibold">{totalCorrect}</span>
            </span>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 sm:p-4">
              <Image
                src={currentQuestion.imageSrc}
                alt={currentQuestion.title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-lg border border-slate-700 bg-slate-900"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 sm:p-5 flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold mb-3">
                {currentQuestion.title}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base mb-4">
                {currentQuestion.prompt}
              </p>

              <div className="space-y-3">
                {currentQuestion.choices.map((choice) => {
                  const selected = selectedForCurrent;
                  const isSelected = selected === choice;
                  const isCorrect = choice === currentQuestion.correctAnswer;
                  const isAnswered = selected !== null;

                  let stateClasses =
                    'bg-slate-800/60 border-slate-600 hover:border-sky-400 hover:bg-slate-800 cursor-pointer';

                  if (isAnswered) {
                    if (isCorrect) {
                      stateClasses = 'bg-emerald-900/40 border-emerald-400';
                    } else if (isSelected) {
                      stateClasses = 'bg-rose-900/40 border-rose-500';
                    } else {
                      stateClasses =
                        'bg-slate-900/40 border-slate-700 opacity-70';
                    }
                  } else if (isSelected) {
                    stateClasses = 'bg-sky-900/40 border-sky-400';
                  }

                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => handleChoiceClick(choice)}
                      disabled={isAnswered}
                      className={`w-full text-left rounded-lg border px-4 py-3 text-sm sm:text-base transition ${stateClasses}`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {selectedForCurrent && (
                <p className="mt-4 text-sm sm:text-base">
                  {selectedForCurrent === currentQuestion.correctAnswer ? (
                    <span className="text-emerald-400">
                      Bonne réponse, le contrôle est correctement identifié.
                    </span>
                  ) : (
                    <span className="text-rose-400">
                      Mauvaise réponse. La bonne fonction de contrôle est :{' '}
                      <span className="font-semibold">
                        {currentQuestion.correctAnswer}
                      </span>
                      .
                    </span>
                  )}
                </p>
              )}

              <div className="mt-6 flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-300">
                  {quizTermine
                    ? 'Toutes les questions ont été répondues.'
                    : 'Réponds à chaque question pour voir ta note finale.'}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedForCurrent}
                  className="ml-3 px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs sm:text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {currentIndex === QUESTIONS.length - 1
                    ? 'Voir le résultat'
                    : 'Question suivante'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return content;
}
