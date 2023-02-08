function getPadTime(time: number): string {
  return Math.ceil(time).toString().padStart(2, '0');
}

export default getPadTime;
