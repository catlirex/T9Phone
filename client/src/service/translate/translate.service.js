const connectionAPI = `${process.env.REACT_APP_ENDPOINT_URL}`;

export const getNonPredictWord = async (numSting) =>
  await fetch(`${connectionAPI}nonPredict/${numSting}`).then((res) =>
    res.json()
  );

export const getPredictWord = async (numSting) =>
  await fetch(`${connectionAPI}predict/${numSting}`).then((res) =>
    // res.json()
    ["cat", "eat", "hello"]
  );
