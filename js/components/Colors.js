const SPORTS_COLORS = {
  'SOCCER': 'pink',
  'BASKETBALL': '#a85803',
  'TENNIS': '#f2ff66',
  'FOOTBALL': '#683700',
  'MMA': 'black',
};

function colorForSport(sport: ?string): string {
  if (!sport) {
    return 'black';
  }

  var color = SPORTS_COLORS[sport.toUpperCase()];
  if (!color) {
    console.warn(`Location '${sport}' has no color`);
    color = 'black';
  }
  return color;
}

function colorForTopic(count: number, index: number): string {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}

module.exports = {
  actionText: '#3FB4CF',
  inactiveText: '#9B9B9B',
  darkText: '#032250',
  lightText: '#7F91A7',
  cellBorder: '#EEEEEE',
  darkBackground: '#183E63',
  colorForSport,
  colorForTopic,
};
