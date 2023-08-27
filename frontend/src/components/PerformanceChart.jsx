import { Doughnut } from "react-chartjs-2";
import ChartJs from "chart.js/auto";

function Chart({ chartData }) {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-64 h-64">
        <Doughnut
          data={chartData}
          options={{
            animation: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: true
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default Chart;