function getPadTime(time: number): string {
  return Math.trunc(time).toString().padStart(2, '0');
}

export default getPadTime;
