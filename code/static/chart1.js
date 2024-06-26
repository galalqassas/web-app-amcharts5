function fetchDataAndUpdateChart1() {
    fetch('/get-profit-by-month')
        .then(response => response.json())
        .then(data => {
            updateChart1(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart1(data_df) {

am5.ready(function () {
    var root = am5.Root.new("chartdiv1");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1
    }));

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    var xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        minorGridEnabled: true,
        labels: {
            rotation: -90, // Rotates the x-axis labels by 90 degrees
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        }
    });

    xRenderer.grid.template.setAll({
        location: 1
    });

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "month",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    var yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer
    }));

    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "month",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
        })
    }));

    series.columns.template.setAll({cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0});
    series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    xAxis.data.setAll(data_df);
    series.data.setAll(data_df);

    series.appear(1000);
    chart.appear(1000, 100);
}); // end am5.ready()

}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart1()
});
 