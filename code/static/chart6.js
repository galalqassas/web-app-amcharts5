function fetchDataAndUpdateChart8() {
    fetch('/get-revenue-by-year-product')
        .then(response => response.json())
        .then(data => {
            updateChart8(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart8(data_df) {
    am5.ready(function () {
        var root = am5.Root.new("chartdiv6");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0,
            layout: root.verticalLayout
        }));
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));

        var xRenderer = am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true
        });
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "year",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(data_df);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));
        var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        }));

        function makeSeries(name, fieldName) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                stacked: true,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "year"
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}: {valueY}",
                tooltipY: am5.percent(10)
            });
            series.data.setAll(data_df);
            series.appear();
            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: am5.p50,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });
            legend.data.push(series);
        }
        makeSeries("Alpha", "Alpha");
        makeSeries("Beta", "Beta");
        makeSeries("Gamma", "Gamma");
        makeSeries("Delta", "Delta");
        chart.appear(1000, 100);
    }); // end am5.ready()
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart8()
});
 