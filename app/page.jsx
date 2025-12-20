'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const POINTS_PAR_QUESTION = 2.2225;

const QUESTIONS = [
  {
    id: 'I0',
    imageSrc: '/I0.jpg',
    imageSrcSecondary: '/I0(2).jpg',
    title: 'I0',
    prompt:
      'Quelle est la fonction du gabarit de contrôle associé au détecteur I0 ?',
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
    imageSrcSecondary: '/I1(2).jpg',
    title: 'I1',
    prompt:
      'Quelle est la fonction du gabarit de contrôle associé au détecteur I1 ?',
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
    imageSrcSecondary: '/O2(2).jpg',
    title: 'O2',
    prompt:
      'Quel est le rôle du support de rattrape-câbles O2 ?',
    correctAnswer: 'Maintien le câble porteur-tracteur en position si le câble déraille de son logement',
    choices: [
      'Maintien le câble porteur-tracteur en position si le câble déraille de son logement',
      'Position du câble dans la zone d’embrayage - entrée',
      'Ouverture de l’attache vide',
      'Position de repos de l’attache, présence des galets de guidage et de roulement',
    ],
  },
  {
    id: 'I2I3',
    imageSrc: '/I3-I2.jpg',
    imageSrcSecondary: '/I3-I2(2).jpg',
    title: 'I3-I2',
    prompt:
      'Quel est le rôle du support de rattrape-câbles I3-I2 ?',
    correctAnswer: 'Maintien le câble tracteur en position si le câble déraille de son logement en entrant dans la zone de débrayage',
    choices: [
      'Position du câble avant et après lembrayage',
      'Maintien le câble tracteur en position si le câble déraille de son logement en entrant dans la zone de débrayage',
      'Présence du galet de débrayage',
      'Position de l’attache accouplée au câble',
    ],
  },
  {
    id: 'I4',
    imageSrc: '/I4.jpg',
    imageSrcSecondary: '/I4(2).jpg',
    title: 'I4/O4',
    prompt:
      'Quel est le rôle des supports de rattrape-câbles I4/O4 ?',
    correctAnswer: 'Position du câble après débrayage et avant l’embrayage',
    choices: [
      'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
      'Position du câble avec attache',
      'Usure sur les mors d’attache et les paliers lisses',
      'Position du câble après débrayage et avant l’embrayage',
    ],
  },
  {
    id: 'I6',
    imageSrc: '/I6.jpg',
    imageSrcSecondary: '/I6(2).jpg',
    title: 'I6',
    prompt:
      'Quelle est la fonction du gabarit de contrôle associé au détecteur I6 ?',
    correctAnswer: 'Présence du galet manoeuvre',
    choices: [
      'Présence du galet manoeuvre',
      'Position du câble avec attache',
      'Position de repos de l’attache, présence des galets de guidage et de roulement',
      'Ouverture de l’attache vide',
    ],
  },
  {
    id: 'I5',
    imageSrc: '/I5.jpg',
    imageSrcSecondary: '/I5(2).jpg',
    title: 'I5/O5',
    prompt:
      'Quelle est la fonction du gabarit de contrôle associé au détecteur I5/O5 ?',
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
    imageSrcSecondary: '/O3(2).jpg',
    title: 'O3',
    prompt:
      'Quel est le rôle du mécanisme O3 ?',
    correctAnswer:
      'Dispositif de positionnement forcé du câble porteur-tracteur',
    choices: [
      'Dispositif de positionnement forcé du câble porteur-tracteur',
      'Position du câble dans la zone d’embrayage - entrée',
      'Présence du galet de débrayage',
      'Position du câble avec attache',
    ],
  },
  {
    id: 'O7',
    imageSrc: '/O7.jpg',
    imageSrcSecondary: '/O7(2).jpg',
    title: 'O7',
    prompt:
      'Quelle est la fonction du gabarit de contrôle associé aux détecteurs O7 ?',
    correctAnswer:
      'Position de repos de l’attache, présence du galet de guidage et des galets de roulement',
    choices: [
      'Ouverture de lattache vide',
      'Position du câble avant et après lembrayage',
      'Position de repos de l’attache, présence du galet de guidage et des galets de roulement',
      'Usure sur les mors d’attache et les paliers lisses',
    ],
  },
];

export default function HomePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() =>
    Array(QUESTIONS.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [hasSentResults, setHasSentResults] = useState(false);
  const [submissionState, setSubmissionState] = useState('idle');
  const [submissionError, setSubmissionError] = useState(null);

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedForCurrent = answers[currentIndex];

  const handleChoiceClick = (choice) => {
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
    setFirstName('');
    setLastName('');
    setHasStarted(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
    setHasSentResults(false);
    setSubmissionState('idle');
    setSubmissionError(null);
  };

  const totalCorrect = QUESTIONS.reduce((sum, question, index) => {
    const answered = answers[index];
    if (answered === question.correctAnswer) return sum + 1;
    return sum;
  }, 0);

  const scoreSur20 =
    Math.round(totalCorrect * POINTS_PAR_QUESTION * 100) / 100;

  const quizTermine = answers.every((value) => value !== null);

  useEffect(() => {
    const sendResults = async () => {
      setSubmissionState('sending');
      setSubmissionError(null);

      const payload = {
        firstName,
        lastName,
        totalCorrect,
        scoreSur20,
        answers: QUESTIONS.map((question, index) => ({
          questionId: question.id,
          title: question.title,
          prompt: question.prompt,
          selectedAnswer: answers[index],
          correctAnswer: question.correctAnswer,
          isCorrect: answers[index] === question.correctAnswer,
        })),
      };

      try {
        const response = await fetch(
          'https://n8n.lazare974.tech/webhook/edaa9e62-a3ea-4a38-a9c8-90edb34570ce',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error('Le serveur a renvoyé une erreur');
        }

        setSubmissionState('success');
      } catch (error) {
        setSubmissionState('error');
        setSubmissionError(
          error instanceof Error
            ? error.message
            : 'Une erreur inconnue est survenue'
        );
      } finally {
        setHasSentResults(true);
      }
    };

    if (showResults && !hasSentResults) {
      void sendResults();
    }
  }, [
    answers,
    firstName,
    hasSentResults,
    lastName,
    scoreSur20,
    showResults,
    totalCorrect,
  ]);

  let content;

  if (!hasStarted) {
    content = (
      <main className="min-h-screen bg-slate-900 text-slate-50 flex justify-center">
        <div className="w-full max-w-xl p-4 sm:p-8">
          <header className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Quiz sur les sécurités de gare
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
             Les sécurités de gare surveillent le câble porteur-tracteur et l’attache à l’entrée (IN - I) et à
             la sortie (OUT - O) de la gare. En cas de défaillance, les dispositifs de sécurité arrêtent
             le téléphérique. L’exploitation ne peut être reprise qu’en repositionnant manuellement
             les gabarits de contrôle des détecteurs.
            </p>
          </header>

          <section className="space-y-4 rounded-xl border border-slate-700 bg-slate-800/60 p-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="text-sm sm:text-base font-medium"
              >
                Nom
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="text-sm sm:text-base font-medium"
              >
                Prénom
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 focus:border-sky-400 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setHasStarted(true)}
              disabled={!firstName.trim() || !lastName.trim()}
              className="w-full rounded-lg bg-sky-600 px-4 py-3 text-sm sm:text-base font-semibold hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Commencer le quiz
            </button>
          </section>
        </div>
      </main>
    );
  } else if (showResults) {
    content = (
      <main className="min-h-screen bg-slate-900 text-slate-50 flex justify-center">
        <div className="w-full max-w-3xl p-4 sm:p-8">
          <header className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Quiz sur les sécurités de gare
            </h1>
            <p className="text-slate-300">
              Résumé de tes réponses sur les 9 dispositifs de contrôle.
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Participant :{' '}
              <span className="font-semibold">
                {firstName} {lastName}
              </span>
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

          <section className="mb-8 rounded-xl border border-slate-700 bg-slate-800/60 p-4 text-sm sm:text-base">
            <p className="font-semibold mb-2">Envoi des résultats</p>
            {submissionState === 'sending' && (
              <p className="text-slate-300">Envoi en cours…</p>
            )}
            {submissionState === 'success' && (
              <p className="text-emerald-400">
                Résultats envoyés avec succès au serveur.
              </p>
            )}
            {submissionState === 'error' && (
              <p className="text-rose-400">
                Erreur lors de l’envoi : {submissionError ?? 'inconnue'}.
              </p>
            )}
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
              Quiz sur les sécurités de gare
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              9 questions, chaque bonne réponse vaut à peu près 2 points. Note
              finale sur 20.
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
              <div className="grid gap-3">
                <Image
                  src={currentQuestion.imageSrc}
                  alt={`${currentQuestion.title} - vue principale`}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg shadow-lg border border-slate-700 bg-slate-900"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  priority
                />
                <Image
                  src={currentQuestion.imageSrcSecondary}
                  alt={`${currentQuestion.title} - vue secondaire`}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg shadow-lg border border-slate-700 bg-slate-900"
                  sizes="(min-width: 1024px) 640px, 100vw"
                />
              </div>
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
