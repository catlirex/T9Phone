const connectionAPI = `${process.env.REACT_APP_ENDPOINT_URL}`;

export const getNonPredictWord = async (numSting) =>
  await fetch(`${connectionAPI}nonPredict/${numSting}`).then((res) =>
    res.json()
  );
