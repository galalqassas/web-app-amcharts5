function fetchDataAndUpdateChart1() {
    fetch('/get-datachart1')
        .then(response => response.json())
        .then(data => {
            updateChart5(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart5(data_df) {
    am5.ready(function () {
        var root = am5.Root.new("chartdiv7");
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        var chart = root.container.children.push(am5radar.RadarChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            startAngle: -90,
            endAngle: 270,
            innerRadius: am5.percent(40)
        }));

        const cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
            behavior: "zoomX"
        }));
        cursor.lineY.set("forceHidden", true);

        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal",
            exportable: false
        }));

        var xRenderer = am5radar.AxisRendererCircular.new(root, {
            minGridDistance: 30
        });
        xRenderer.grid.template.set("forceHidden", true);
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "month",
            renderer: xRenderer
        }));

        var yRenderer = am5radar.AxisRendererRadial.new(root, {});
        yRenderer.labels.template.set("centerX", am5.p50);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            min: 0,
            renderer: yRenderer
        }));

        var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
            name: "Series 1",
            sequencedInterpolation: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "month"
        }));

        series.columns.template.setAll({
            cornerRadius: 5,
            tooltipText: "{categoryX}: {valueY}"
        });

        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        var data = [{'month': 'January', 'value': 1321838}, {'month': 'February', 'value': 872013}, {
            'month': 'March',
            'value': 1029984
        }, {'month': 'April', 'value': 1122878}, {'month': 'May', 'value': 1214253}, {
            'month': 'June',
            'value': 1008408
        }, {'month': 'July', 'value': 871354}, {'month': 'August', 'value': 639075}, {
            'month': 'September',
            'value': 852397
        }, {'month': 'October', 'value': 1127357}, {'month': 'November', 'value': 801084}, {
            'month': 'December',
            'value': 980807
        }];

        xAxis.data.setAll(data);
        series.data.setAll(data);
        series.appear(1000);
        chart.appear(1000, 100);
    }); // end am5.ready()
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart1()
});
