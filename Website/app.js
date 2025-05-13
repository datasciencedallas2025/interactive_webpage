// COVID-19 Data Visualization using Plotly.js
// Data Source: Maryland COVID-19 Hospitalization Data

// HTML Structure
const app = `
  <div id="app" class="p-4">
    <h1 class="text-2xl font-bold mb-4">COVID-19 Hospitalization Data in Maryland</h1>
    <div class="mb-4">
      <label for="dataSelect" class="mr-2">Select Data Type:</label>
      <select id="dataSelect" class="border p-2">
        <option value="acute">Acute Patients</option>
        <option value="icu">ICU Patients</option>
        <option value="total">Total Patients</option>
        <option value="adultAcute">Adult Acute Patients</option>
        <option value="adultICU">Adult ICU Patients</option>
        <option value="adultTotal">Adult Patients Total</option>
        <option value="pedsAcute">Pediatric Acute Patients</option>
        <option value="pedsICU">Pediatric ICU Patients</option>
        <option value="pedsTotal">Pediatric Patients Total</option>
      </select>
    </div>
    <div id="chart"></div>
  </div>
`;

document.body.innerHTML = app;

// Data Import
const dataUrl = 'covid_19.json';

async function fetchData() {
  const response = await fetch(dataUrl);
  const jsonData = await response.json();
  return jsonData.data.map(row => ({
    date: row[8],
    acute: parseInt(row[9]),
    icu: parseInt(row[10]),
    total: parseInt(row[11]),
    adultAcute: parseInt(row[12]),
    adultICU: parseInt(row[13]),
    adultTotal: parseInt(row[14]),
    pedsAcute: parseInt(row[15]),
    pedsICU: parseInt(row[16]),
    pedsTotal: parseInt(row[17]),
  }));
}

// Plotly Visualization
async function renderChart(dataType) {
  const data = await fetchData();
  const dates = data.map(item => item.date);
  const values = data.map(item => item[dataType]);

  const trace = {
    x: dates,
    y: values,
    mode: 'lines+markers',
    marker: { color: 'blue' },
    line: { color: 'blue' },
    type: 'scatter',
    name: dataType.toUpperCase()
  };

  const layout = {
    title: `COVID-19 ${dataType.toUpperCase()} Data in Maryland`,
    xaxis: { title: 'Date' },
    yaxis: { title: 'Patients Count' }
  };

  Plotly.newPlot('chart', [trace], layout);
}

// Event Listener for Dropdown
document.getElementById('dataSelect').addEventListener('change', (e) => {
  renderChart(e.target.value);
});

// Initial Load
renderChart('acute');
