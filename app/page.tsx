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
      '
