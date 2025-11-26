'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';

type Question = {
  id: string;
  code: string;
  image: string;
  correctLabel: string;
  options: string[];
};

const POINTS_PAR_QUESTION = 2.2225;

const controlFunctions = {
  I0: 'Usure sur les mors d’attache et les paliers lisses',
  I1: 'Position de l’attache accouplée au câble',
  O2I2: 'Position du câble avec attache',
  I3: 'Position du câble dans la zone d’embrayage - entrée',
  O3: 'Actionnement du dispositif de positionnement forcé du câble porteur-tracteur',
  O4I4: 'Position du câble avant et après l’embrayage',
  I6: 'Présence du galet de débrayage',
  O5I5: 'Ouverture de l’attache vide',
  O7: 'Position de repos de l’attache, présence des galets de guidage et de roulement',
} as const;

const questions: Question[] = [
  {
    id: 'I0',
    code: 'I0',
    image: '/I0.jpg',
    correctLabel: controlFunctions.I0,
    options: [
      controlFunctions.I0,
      controlFunctions.I1,
      controlFunctions.O4I4,
      controlFunctions.O7,
    ],
  },
  {
    id: 'I1',
    code: 'I1',
    image: '/I1.jpg',
    correctLabel: controlFunctions.I1,
    options: [
      controlFunctions.I1,
      controlFunctions.I6,
      controlFunctions.O2I2,
      controlFunctions.O3,
    ],
  },
  {
    id: 'O2',
    code: 'O2 / I2',
    image: '/O2.jpg',
    correctLabel: controlFunctions.O2I2,
    options: [
      controlFunctions.O2I2,
      controlFunctions.I0,
      controlFunctions.O3,
      controlFunctions.O5I5,
    ],
  },
  {
    id: 'I3',
    code: 'I3',
    image: '/I3-I2.jpg',
    correctLabel: controlFunctions.I3,
    options: [
      controlFunctions.I3,
      controlFunctions.O4I4,
      controlFunctions.I6,
      controlFunctions.O2I2,
    ],
  },
  {
    id: 'O3',
    code: 'O3',
    image: '/O3.jpg',
    correctLabel: controlFunctions.O3,
    options: [
      controlFunctions.O3,
      controlFunctions.I0,
      controlFunctions.O7,
      controlFunctions.O5I5,
    ],
  },
  {
    id: 'O4I4',
    code: 'O4 / I4',
    image: '/I4.jpg',
    correctLabel: controlFunctions.O4I4,
    options: [
      controlFunctions.O4I4,
      controlFunctions.I1,
      controlFunctions.O2I2,
      controlFunctions.I6,
    ],
  },
  {
    id: 'I6',
    code: 'I6',
    image: '/I6.jpg',
    correctLabel: controlFunctions.I6,
    options: [
      controlFunctions.I6,
      controlFunctions.O3,
      controlFunctions.O5I5,
      controlFunctions.I0,
    ],
  },
  {
    id: 'O5I5',
    code: 'O5 / I5',
    image: '/I5.jpg',
    correctLabel: controlFunctions.O5I5,
    options: [
      controlFunctions.O5I5,
      controlFunctions.O7,
      controlFunctions.O4I4,
      controlFunctions.I1,
    ],
  },
  {
    id: 'O7',
    code: 'O7',
    image: '/O7.jpg',
    correctLabel: controlFunctions.O7,
    options: [
      controlFunctions.O7,
      controlFunctions.I3,
      controlFunctions.I6,
      controlFunctions.I0,
    ],
  },
];

export default function HomePage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalQuestions = questions.length;

  const handleChange = (questionId: string, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const correctCount = questions.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctLabel ? 1 : 0);
  }, 0);

  const rawScore = correctCount * POINTS_PAR_QUESTION;
  const scoreSur20 = Math.round(rawScore * 100) / 100;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 flex justify-center">
      <div className="w-full max-w-5xl p-4 sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
            Quiz – Fonction des contrôles d’attache
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            9 questions. Chaque bonne réponse vaut{' '}
            {POINTS_PAR_QUESTION.toLocaleString('fr-FR', {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })}{' '}
            points. Note finale sur 20.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => {
            const selected = answers[q.id];
            const isCorrect = submitted && selected === q.correctLabel;

            return (
              <section
                key={q.id}
                className={`rounded-xl border p-4 sm:p-5 bg-slate-800/60
                ${
                  submitted
                    ? isCorrect
                      ? 'border-emerald-400'
                      : 'border-rose-400'
                    : 'border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-1/2 flex justify-center">
                    <Image
                      src={q.image}
                      alt={\`Contrôle \${q.code}\`}
                      width={480}
                      height={300}
                      className="rounded-lg object-contain max-h-64 bg-slate-900"
                    />
                  </div>

                  <div className="sm:w-1/2">
                    <h2 className="font-semibold mb-2">
                      Question {index + 1} – contrôle {q.code}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mb-3">
                      Sélectionne la fonction de contrôle correspondant à
                      l’élément représenté.
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const checked = selected === opt;
                        const isCorrectOption =
                          submitted && opt === q.correctLabel;
                        const isIncorrectSelected =
                          submitted && checked && opt !== q.correctLabel;

                        return (
                          <label
                            key={opt}
                            className={\`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition
                            \${
                              checked
                                ? 'border-sky-400 bg-sky-900/40'
                                : 'border-slate-700 hover:border-sky-400/70 hover:bg-slate-700/60'
                            }
                            \${
                              isCorrectOption
                                ? 'border-emerald-400 bg-emerald-900/40'
                                : ''
                            }
                            \${
                              isIncorrectSelected
                                ? 'border-rose-400 bg-rose-950/60'
                                : ''
                            \`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={checked}
                              onChange={() => handleChange(q.id, opt)}
                              className="mt-1"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>

                    {submitted && (
                      <p className="mt-3 text-xs text-slate-300">
                        Fonction attendue :{' '}
                        <span className="font-medium">
                          {q.correctLabel}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </section>
            );
          })}

          <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur pt-4 pb-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={
                  submitted || Object.keys(answers).length < totalQuestions
                }
                className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold disabled:bg-slate-700 disabled:text-slate-400"
              >
                {submitted ? 'Résultats affichés' : 'Valider mes réponses'}
              </button>
              <div className="text-sm text-slate-200">
                {Object.keys(answers).length}/{totalQuestions} questions
                renseignées
              </div>
            </div>

            {submitted && (
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/80 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm">
                    Bonnes réponses :{' '}
                    <span className="font-semibold">{correctCount}</span> /{' '}
                    {totalQuestions}
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    Note :{' '}
                    {scoreSur20.toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    / 20
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="px-4 py-2 rounded-full border border-slate-600 text-sm hover:bg-slate-700"
                >
                  Recommencer
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
