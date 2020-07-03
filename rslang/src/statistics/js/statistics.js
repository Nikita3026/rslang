import Chart from 'chart.js';

const elementNumberWords = document.querySelector('.number-words');
const speedCanvas = document.getElementById('speedChart');

const MIN_NUMBER = 0;
const NEXT_NUMBER = 1;
const NUMBER_DATES = 5;
const NUMBER_STEP_SIZE = 360;
const NUMBER_ONE_PERCENT = 36;
const MAX_WORDS = 3600;

let saveStatistic = JSON.parse(localStorage.getItem('statistic'));
if (!saveStatistic) {
  saveStatistic = {};
  const date = new Date().toLocaleDateString();
  saveStatistic[`${date}`] = 0;
}

let days = [];
let words = [];
let numberWords = 0;

function createDataWords() {
  const statistics = Object.entries(saveStatistic);
  statistics.sort((first, second) => first[NEXT_NUMBER] - second[NEXT_NUMBER]);
  days = statistics.map((element) => element[MIN_NUMBER]);
  words = statistics.map((element) => element[NEXT_NUMBER]);
  numberWords = words.slice(-NEXT_NUMBER);
  elementNumberWords.innerText = numberWords;
}

function createLabels() {
  createDataWords();
  const NUMBER_FOR_LABELS = Math.round(days.length / NUMBER_DATES);
  const dataLabels = days.map((day, index) => {
    let currentDay = '';
    if (index % NUMBER_FOR_LABELS === MIN_NUMBER) {
      currentDay = day;
    }
    return currentDay;
  });
  return dataLabels;
}

const speedData = {
  labels: createLabels(),
  datasets: [{
    label: 'Изученные слова',
    data: words,
    borderColor: 'rgba(255,45,45,1)',
    backgroundColor: 'rgba(255,90,90,0.5)',
  }],
};

const chartOptions = {
  tooltips: {
    enabled: true,
    titleFontSize: MIN_NUMBER,
    callbacks: {
      label(tooltipItem, data) {
        let label = data.datasets[tooltipItem.datasetIndex].label || '';
        label = `${days[tooltipItem.index]}, количество слов: ${words[tooltipItem.index]}`;
        return label;
      },
    },
  },
  scales: {
    yAxes: [{
      ticks: {
        suggestedMin: MIN_NUMBER,
        stepSize: NUMBER_STEP_SIZE,
        max: MAX_WORDS,
        callback(value) {
          return `${value / NUMBER_ONE_PERCENT}%`;
        },
      },
    }],
  },
};

const lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions,
});
lineChart.update();
