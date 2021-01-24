// <!-- Recieved help from Florin Pop Youtuber who explains how to work on ScatterPlot Graph from this youtube channel: https://www.youtube.com/watch?v=eSd47rSgfJw&t=3155s&ab_channel=FlorinPop 
// I reccomend likeing and subscribeing he explains things really well! -->


const tooltip = document.getElementById('tooltip');

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json') // data needs to be formated correctly, ensure that links have information correct otherwise code wont run
.then(res => res.json()).
then(res => {

  createStuff(res.map(r => [convertMinAndSec(r.Time), r.Year]));
});
//2010 01 00:${r.time} displays time from 2010 but timing is what matters which is displayed on the graph

function convertMinAndSec(str) {
  return new Date(`2010 01 01 00:${str}`);
}

function createStuff(data) {
  const width = 800;
  const height = 400;
  const padding = 40;

  const circleRadius = 5;

  const yScale = d3.scaleTime().
  domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])]).
  range([padding, height - padding]);

  // xAxisGenerator.tickFormat(d3.format(".2s"));
  // const ticks = yScale.ticks(5),
  // tickFormat = yScale.tickFormat("%M:%S");

  const xScale = d3.scaleTime().
  domain([
  d3.min(data, d => new Date(d[1] - 1)),
  d3.max(data, d => new Date(d[1] + 1))]).

  range([padding, width - padding]);


  const svg = d3.select('#container').append('svg').
  attr('width', width).
  attr('height', height);

  //create the graph
  svg.selectAll('circle').
  data(data).
  enter().
  append('circle').
  attr('class', 'dot').
  attr('data-xvalue', d => d[1]).
  attr('data-yvalue', d => d[0]).
  attr('cx', d => xScale(d[1])).
  attr('cy', d => yScale(d[0])).
  attr('r', circleRadius).
  on('mouseover', (d, i) => {

    tooltip.classList.add('show');
    tooltip.style.left = xScale(d[1]) + 10 + 'px';
    tooltip.style.top = yScale(d[0]) - 10 + 'px';
    tooltip.setAttribute('data-year', d[1]);

    tooltip.innerHTML = `
        this is a tool tip
      `;
  }).on('mouseout', () => {
    tooltip.classList.remove('show');
  });
  // this formates data x and y axises correctly
  const timeFormatForMinAndSec = d3.timeFormat('%M:%S');
  const timeFormaForYear = d3.format('d');

  // create axis
  const xAxis = d3.axisBottom(xScale).
  tickFormat(timeFormaForYear);
  const yAxis = d3.axisLeft(yScale).
  tickFormat(timeFormatForMinAndSec);

  // yAxis.timeFormat(d3.format("%M:%S"))


  //   var xAxis = d3.axisBottom(x).tickFormat(d3.format('d'));

  //   var yAxis = d3.axisLeft(y).tickFormat(timeFormat);

  svg.append('g').
  attr('id', 'x-axis').
  attr('transform', `translate(0, ${height - padding})`).
  call(xAxis);

  svg.append('g').
  attr('id', 'y-axis').
  attr('transform', `translate(${padding}, 0)`).
  call(yAxis);


}