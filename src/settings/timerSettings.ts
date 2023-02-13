const SOUND_PATH = '/sounds/';

export const alarmSounds = [
  { name: 'Digital', path: `${SOUND_PATH}alarm_digital.mp3` },
  { name: 'Ding 1', path: `${SOUND_PATH}alarm_ding-1.mp3` },
  { name: 'Ding 2', path: `${SOUND_PATH}alarm_ding-2.mp3` },
];

export const ambientSounds = [
  { name: 'Ticking slow', path: `${SOUND_PATH}ambient_ticking-slow.mp3` },
  { name: 'Ticking fast', path: `${SOUND_PATH}ambient_ticking-fast.mp3` },
  { name: 'Office', path: `${SOUND_PATH}ambient_office.wav` },
];

export const minTimeInMinutes = 1;
export const maxTimeInMinutes = 480;
export const minLongBreakInterval = 1;
export const maxLongBreakInterval = 90;
