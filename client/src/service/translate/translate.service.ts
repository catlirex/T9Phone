const connectionAPI = `${process.env.REACT_APP_ENDPOINT_URL}`;

export const getNonPredictWord = async (numSting: string) =>
  await fetch(`${connectionAPI}nonPredict/${numSting}`).then((res) =>
    res.json()
  );

export const getPredictWord = async (numSting: string) =>
  await fetch(`${connectionAPI}predict/${numSting}`).then((res) => res.json());
