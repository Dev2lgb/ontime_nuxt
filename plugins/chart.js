import Vue from "vue";
import { Line, Doughnut, Bar, Radar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  RadialLinearScale,
);

Vue.component("line-chart", {
  extends: Line,
});

Vue.component("doughnut-chart", {
  extends: Doughnut,
});

Vue.component("bar-chart", {
  extends: Bar,
});


Vue.component("radar-chart", {
  extends: Radar,
});
