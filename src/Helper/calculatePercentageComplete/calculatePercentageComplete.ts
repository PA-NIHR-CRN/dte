const calculatePercentageComplete = (step: number, totalSteps: number) => {
  return Math.round((step / totalSteps) * 100);
};

export default calculatePercentageComplete;
