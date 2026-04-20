// Wait for data
fetch('/data/data.json')
  .then(res => res.json())
  .then(data => {

    // 🛑 SAFETY CHECK (important)
    if (!data.charts || !data.charts.profileVisit) {
      document.querySelector("#chart-profile-visit").innerHTML = "No data available";
      return;
    }

    // ----------------------
    // 1. MAIN BAR CHART (DYNAMIC)
    // ----------------------
    const profileVisitOptions = {
      series: [{
        name: "Visits",
        data: data.charts.profileVisit
      }],
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800
        }
      },
      colors: ["#435ebe"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "50%"
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: data.charts.months
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (val) => val + " visits"
        }
      }
    };

    const chartEl = document.querySelector("#chart-profile-visit");

let chart = new ApexCharts(chartEl, profileVisitOptions);
chart.render();
const filter = document.getElementById("chartFilter");

if (filter) {
  filter.addEventListener("change", (e) => {
    if (e.target.value === "weekly") {
      chart.updateOptions({
        series: [{
          data: [5, 10, 8, 12, 7, 9, 11]
        }],
        xaxis: {
          categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
        }
      });
    } else {
      chart.updateOptions({
        series: [{
          data: data.charts.profileVisit
        }],
        xaxis: {
          categories: data.charts.months
        }
      });
    }
  });
}

    // ----------------------
    // 2. MINI CHARTS
    // ----------------------
    function createMiniChart(id, color, chartData) {
      const options = {
        series: [{ data: chartData }],
        chart: {
          type: "area",
          height: 80,
          sparkline: { enabled: true }
        },
        stroke: {
          curve: "smooth",
          width: 2
        },
        fill: {
          opacity: 0.3
        },
        colors: [color],
        tooltip: {
          theme: "dark"
        }
      };

      new ApexCharts(document.querySelector(id), options).render();
    }

    createMiniChart("#chart-europe", "#435ebe", data.charts.europe);
    createMiniChart("#chart-america", "#28a745", data.charts.america);
    createMiniChart("#chart-india", "#ffc107", data.charts.india);
    createMiniChart("#chart-indonesia", "#dc3545", data.charts.indonesia);


    // ----------------------
    // 3. DONUT CHART
    // ----------------------
    const visitorOptions = {
      series: data.charts.visitors,
      labels: ["Male", "Female"],
      chart: {
        type: "donut",
        height: 250
      },
      colors: ["#435ebe", "#55c6e8"],
      legend: {
        position: "bottom"
      },
      dataLabels: {
        enabled: true
      }
    };

    new ApexCharts(
      document.querySelector("#chart-visitors-profile"),
      visitorOptions
    ).render();


    // ----------------------
    // 4. SMOOTH CARD HOVER (clean version)
    // ----------------------
    document.querySelectorAll(".card").forEach(card => {
      card.style.transition = "all 0.25s ease";
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
      });
    });

  })
  .catch(err => console.error("Data load error:", err));