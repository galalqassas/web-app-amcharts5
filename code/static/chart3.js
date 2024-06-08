function fetchDataAndUpdateChart3() {
    fetch('/get-cost-profit-revenue-by-branch')
        .then(response => response.json())
        .then(data => {
            updateChart3(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart3(data_df) {
    am5.ready(function () {
        var root3 = am5.Root.new("chartdiv3");
        root3.setThemes([
            am5themes_Animated.new(root3)
        ]);
        var chart3 = root3.container.children.push(am5xy.XYChart.new(root3, {
            panX: false,
            panY: false,
            paddingLeft: 0,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root3.verticalLayout
        }));
        var legend = chart3.children.push(
            am5.Legend.new(root3, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        // Use data_df list instead of data array
        var data = data_df.map(function (item) {
            return {
                "branch": item.branch,
                "cost": item.cost,
                "profit": item.profit,
                "revenue": item.revenue
            };
        });

        var xRenderer = am5xy.AxisRendererX.new(root3, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minorGridEnabled: true
        })

        var xAxis = chart3.xAxes.push(am5xy.CategoryAxis.new(root3, {
            categoryField: "branch",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root3, {})
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(data);

        var yAxis = chart3.yAxes.push(am5xy.ValueAxis.new(root3, {
            renderer: am5xy.AxisRendererY.new(root3, {
                strokeOpacity: 0.1
            })
        }));

        function makeSeries(name, fieldName) {
            var series = chart3.series.push(am5xy.ColumnSeries.new(root3, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "branch"
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}:{valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            series.data.setAll(data);
            series.appear();
            series.bullets.push(function () {
                return am5.Bullet.new(root3, {
                    locationY: 0,
                    sprite: am5.Label.new(root3, {
                        text: "{valueY}",
                        fill: root3.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        makeSeries("Cost", "cost");
        makeSeries("Profit", "profit");
        makeSeries("Revenue", "revenue");
        chart3.appear(1000, 100);

    }); // end am5.ready()
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart3()
});
 