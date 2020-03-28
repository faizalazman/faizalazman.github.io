window.addEventListener("load", () => {
    makeChart();
    getNews();
});


async function makeChart() {
    const covidData = await getData();


    covidData.countryList.forEach(selectionCountry)

    function selectionCountry(country) {
        var x = document.getElementById("select");
        var option = document.createElement("option");
        option.text = country;
        x.add(option);
    }

    let y = $('table').find('tbody')
    for (let i= 0 ; i < covidData.countryList.length ; i++) {
        y.append(`<tr><td>${covidData.countryList[i]}</td><td>${covidData.confirmed_case_today[i]}</td><td>${covidData.death_today[i]}</td><td>${covidData.recovered_until_today[i]}</td><td>${ (covidData.death_today[i] / covidData.confirmed_case_today[i] * 100).toFixed(2)}</td></tr>`);
    }

    $(document).ready(function () {
        $('#zero-config').DataTable({
            "oLanguage": {
                "oPaginate": { "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' },
                "sInfo": "Showing page _PAGE_ of _PAGES_",
                "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                "sSearchPlaceholder": "Search...",
               "sLengthMenu": "Results :  _MENU_",
            },
            "stripeClasses": [],
            "lengthMenu": [5, 10, 20, 50],
            "pageLength": 5 
        });
        $('.dataTables_length').addClass('bs-select');
      });

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
             | Options
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



    document.getElementById('select').addEventListener('change', () => {
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
            data: death
        }, {
            data: recovered
        }]);
        document.getElementById("death").innerHTML = (death_toll / reported_cases_now * 100).toFixed(2) + '%';
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
    const confirmed_case_today = []
    const death_today = []
    const recovered_until_today = []
    data['Afghanistan'].forEach(function(item, index) {
        date.push(item["date"]);
        confirmed.push(item["confirmed"]);
        death.push(item["deaths"]);
        recovered.push(item["recovered"]);
    });
    var death_toll = death[death.length - 1];
    var recovered_today = recovered[recovered.length - 1];
    var reported_cases_now = confirmed[confirmed.length - 1];
    var countryList = Object.keys(data)


    countryList.forEach(function(country,index) {
        confirmed_case_today.push(data[country][data[country].length - 1]['confirmed'])
        death_today.push(data[country][data[country].length - 1]['deaths'])
        recovered_until_today.push(data[country][data[country].length - 1]['recovered'])
    })

    const newArr = [countryList, confirmed_case_today,death_today, recovered_until_today]
    console.log(newArr)

    return {
        countryList,
        data,
        date,
        confirmed,
        death,
        recovered,
        death_toll,
        recovered_today,
        reported_cases_now,
        confirmed_case_today,
        death_today, 
        recovered_until_today
    };
}


//f6a1d6ea77354f8b96a6b6938ce8618a


async function getNews() {
    var url = `https://newsapi.org/v2/top-headlines?country=my&q=covid&apiKey=f6a1d6ea77354f8b96a6b6938ce8618a`;
    let response = await fetch(url);
    let data = await response.json()

    // Date
    var dateStr1 = new Date(data.articles[0].publishedAt)
    document.getElementById('date1').innerText = dateStr1.toDateString();
    var dateStr2 = new Date(data.articles[0].publishedAt)
    document.getElementById('date2').innerText = dateStr2.toDateString();
    var dateStr3 = new Date(data.articles[0].publishedAt)
    document.getElementById('date3').innerText = dateStr3.toDateString();

    // Image
    document.getElementById('img1').src = data.articles[0].urlToImage;
    document.getElementById('img2').src = data.articles[1].urlToImage;
    document.getElementById('img3').src = data.articles[2].urlToImage;

    // Title
    document.getElementById('title1').innerText = data.articles[0].title;
    document.getElementById('title2').innerText = data.articles[1].title;
    document.getElementById('title3').innerText = data.articles[2].title;


    // Content
    document.getElementById('text1').innerText = data.articles[0].description;
    document.getElementById('text2').innerText = data.articles[1].description;
    document.getElementById('text3').innerText = data.articles[2].description;

    // Author
    document.getElementById('author1').innerText = data.articles[0].author;
    document.getElementById('author2').innerText = data.articles[1].author;
    document.getElementById('author3').innerText = data.articles[2].author;


    // Author
    document.getElementById('link1').href = data.articles[0].url;
    document.getElementById('link2').href = data.articles[1].url;
    document.getElementById('link3').href = data.articles[2].url;
};