import { randomUUID } from "crypto";

export function generateRandomNickname(email: string): string {
  const tourismWords: string[] = [
    'adventure', 'explorer', 'journey', 'wanderlust', 'curiosity',
    'expedition', 'nomad', 'voyager', 'discovery', 'traveler',  'seeker', 
  ];

  const randomWord = tourismWords[Math.floor(Math.random() * tourismWords.length)];
  const suffix = randomUUID().slice(0, 6);
  const emailPrefix = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

  return `${emailPrefix}_${randomWord}_${suffix}`;
}
