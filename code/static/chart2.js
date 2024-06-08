function fetchDataAndUpdateChart2() {
    fetch('/get-profit-by-region')
        .then(response => response.json())
        .then(data => {
            updateChart2(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart2(data_df) {

    //console.log(data_df)

    var root2 = am5.Root.new("chartdiv2");
    am5.ready(function () {
        root2.setThemes([am5themes_Animated.new(root2)]);

        const chart2 = root2.container.children.push(am5percent.PieChart.new(root2, {
            layout: root2.verticalLayout
        }));

        var series2 = chart2.series.push(am5percent.PieSeries.new(root2, {
            valueField: "value", categoryField: "region"
        }));

        series2.data.setAll(data_df);
        series2.appear(1000, 100);
    }); // end am5.ready()
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart2()
});
 