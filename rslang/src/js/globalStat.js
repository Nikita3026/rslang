import apiService from './GetData';

export const getStatistics = async () => {
  const data = await apiService.getStatistics()
    .then((response) => {
      if (!response) return;
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return data.data;
};

export const createStatData = async (amount, appToSet, dateToSet) => {
  let newStat = null;
  await apiService.getStatistics()
    .then((response) => {
      if (!response) return;
      console.log(response);
      const newLearnedWords = response.data.learnedWords + amount;
      const index = Object.keys(response.data.optional).length + 1;
      newStat = {
        learnedWords: newLearnedWords,
        optional: {
          ...response.data.optional,
          [index]: {
            words: 15,
            app: appToSet,
            date: dateToSet,
          },
        },
      };
    });
  await apiService.upsetStatistics(newStat)
    .then((response) => {
      if (!response) return;
      console.log(response);
    });

  return newStat;
};

export default {};
