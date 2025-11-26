'use client';

import Image from 'next/image';
import { useState } from 'react';

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
      'Usure sur les mors d’attache et les paliers lisses',
      'Position du câble avec attache',
      'Présence du galet de débrayage',
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
      'Position de l’attache accouplée au câble',
      'Usure sur les mors d’attache et les paliers lisses',
      'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
      'Position du câble avant et après l’embrayage',
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
      'Position du câble dans la zone d’embrayage - entrée',
      'Position du câble avant et après l’embrayage',
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
    correctAnswer: 'Position du câble avant et après l’embrayage',
    choices: [
      'Position du câble avant et après l’embrayage',
      'Position du câble avec attache',
      'Usure sur les mors d’attache et les paliers lisses',
      'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
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
    correctAnswer: 'Ouverture de l’attache vide',
    choices: [
      'Ouverture de l’attache vide',
      'Position du câble avant et après l’embrayage',
      'Position de l’attache accouplée au câble',
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
      'Position de repos de l’attache, présence des galets de guidage et de roulement',
      'Position du câble avant et après l’embrayage',
      'Ouverture de l’attache vide',
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
    if (answers[currentIndex] !== null) return; // déjà répondu

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
    if (answered === question.correctAnswer) {
      return sum + 1;
    }
    return sum;
  }, 0);

  const scoreSur20 =
    Math.round(totalCorrect * POINTS_PAR_QUESTION * 100) / 100;

  const quizTermine = answers.every((value) => value !== null);

  if (showResults) {
    return (
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
            <p className="text-sm text-slate-300">
              Chaque bonne réponse rapporte {POINTS_PAR_QUESTION} points.
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
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 flex justify-center">
      <div className="w-full max-w-5xl p-4 sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
            Quiz fonction de contrôle des capteurs
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            9 questions, chaque bonne réponse vaut {POINTS_PAR_QUESTION} points.
            Note finale sur 20.
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
            <span classNa
