window.addEventListener("load", makeChart);


async function makeChart() {
    const covidData = await getData();

    document.getElementById("death").innerHTML = (covidData.death_toll / covidData.reported_cases_now * 100).toFixed(2) + '%';
    document.getElementById("report").innerHTML = covidData.reported_cases_now;
    document.getElementById("recover").innerHTML = covidData.recovered_today;

    var d_1options1 = {
        chart: {
            id: 'chart1',
            height: 400,
            type: 'area',
            zoom: {
                enabled: true,
                type: 'xy',
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: '#515365',
                opacity: 0.3,
            }
        },
        colors: ['#357ffa'],
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 10,
                height: 10,
            },
            itemMargin: {
                horizontal: 0,
                vertical: 8
            }
        },
        grid: {
            borderColor: '#191e3a',
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [{
            name: 'Confirmed Cases',
            data: covidData.confirmed
        }],
        xaxis: {
            type: 'datetime',
            categories: covidData.date,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.8,
                stops: [0, 100]
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(val) {
                    return val
                }
            }
        }
    }



    /*
        ===================================
            Unique Visitors | Options
        ===================================
    */

    var d_1options2 = {
        chart: {
            id: 'chart2',
            height: 400,
            type: 'area',
            zoom: {
                enabled: true,
                type: 'xy',
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: '#515365',
                opacity: 0.3,
            }
        },
        colors: ['#8B0000', '#BFFF00'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 10,
                height: 10,
            },
            itemMargin: {
                horizontal: 0,
                vertical: 8
            }
        },
        grid: {
            borderColor: '#191e3a',
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [{
            name: 'Death Counts',
            data: covidData.death
        }, {
            name: 'Number of Patients That Recover',
            data: covidData.recovered
        }],
        xaxis: {
            type: 'datetime',
            categories: covidData.date,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.8,
                stops: [0, 100]
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(val) {
                    return val
                }
            }
        }
    }
    var d_1C_3 = new ApexCharts(
        document.getElementById("uniqueVisits1"),
        d_1options1
    );
    d_1C_3.render();


    var d_1C_4 = new ApexCharts(
        document.getElementById("uniqueVisits2"),
        d_1options2
    );
    d_1C_4.render();

    document.getElementById('select').addEventListener('click', () => {
        countryValue = document.getElementById('select').value
        const confirmed = [];
        const death = [];
        const recovered = [];
        covidData.data[countryValue].forEach(function(item, index) {
            confirmed.push(item["confirmed"]);
            death.push(item["deaths"]);
            recovered.push(item["recovered"]);
        });
        var death_toll = death[death.length - 1];
        var recovered_today = recovered[recovered.length - 1];
        var reported_cases_now = confirmed[confirmed.length - 1];
        ApexCharts.exec('chart1', "updateSeries", [{
            data: confirmed
        }]);

        ApexCharts.exec('chart2', "updateSeries", [{
            data: recovered
        }, {
            data: death
        }]);

        document.getElementById("death").innerHTML = (death_toll / covidData.reported_cases_now * 100).toFixed(2) + '%';
        document.getElementById("report").innerHTML = reported_cases_now;
        document.getElementById("recover").innerHTML = recovered_today;
    })

}


async function getData() {
    let response = await fetch(
        "https://pomber.github.io/covid19/timeseries.json"
    );
    let data = await response.json();
    const labels = Object.keys(data);
    const date = [];
    const confirmed = [];
    const death = [];
    const recovered = [];
    data['Malaysia'].forEach(function(item, index) {
        date.push(item["date"]);
        confirmed.push(item["confirmed"]);
        death.push(item["deaths"]);
        recovered.push(item["recovered"]);
    });
    var death_toll = death[death.length - 1];
    var recovered_today = recovered[recovered.length - 1];
    var reported_cases_now = confirmed[confirmed.length - 1];
    return {
        data,
        date,
        confirmed,
        death,
        recovered,
        death_toll,
        recovered_today,
        reported_cases_now
    };
}