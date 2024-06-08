function fetchDataAndUpdateChart4() {
    fetch('/get-profit-by-product')
        .then(response => response.json())
        .then(data => {
            updateChart4(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart4(data_df) {
    am5.ready(function () {
        var root = am5.Root.new("chartdiv4");
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5percent.PieChart.new(root, {
            radius: am5.percent(90),
            innerRadius: am5.percent(50),
            layout: root.horizontalLayout
        }));

        var series = chart.series.push(am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "profit",
            categoryField: "product"
        }));

        series.data.setAll(data_df);
        series.labels.template.set("visible", false);
        series.ticks.template.set("visible", false);
        series.slices.template.set("strokeOpacity", 0);
        series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
            stops: [{
                brighten: -0.8
            }, {
                brighten: -0.8
            }, {
                brighten: -0.5
            }, {
                brighten: 0
            }, {
                brighten: -0.5
            }]
        }));

        var legend = chart.children.push(am5.Legend.new(root, {
            centerY: am5.percent(50),
            y: am5.percent(50),
            layout: root.verticalLayout
        }));
        legend.valueLabels.template.setAll({textAlign: "right"})
        legend.labels.template.setAll({
            maxWidth: 140,
            width: 140,
            oversizedBehavior: "wrap"
        });
        legend.data.setAll(series.dataItems);
        series.appear(1000, 100);
    }); // end am5.ready()
}
document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart4()
});
 