//  función para crear y renderizar el gráfico circular utilizando Chart.js
function createCircularChart(chartId, dataValue, color) {
  const canvasElement = document.getElementById(chartId);
  const percentageElement = canvasElement.previousElementSibling;

  new Chart(canvasElement, {
    type: "doughnut",
    data: {
      labels: ["", ""],
      datasets: [
        {
          data: [dataValue, 100 - dataValue],
          backgroundColor: [color, "#e3e3e3"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "60%",
      responsive: false,
      maintainAspectRatio: false,
      animation: {
        onComplete: function () {
          percentageElement.textContent = dataValue + "%";
        },
      },
    },
  });
}






