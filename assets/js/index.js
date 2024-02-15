import { createAndShowModalNotice, formatterDate, DATE_INVALID } from "./utils/utils.js";
import { DATA_INVOICES } from "./database/data.js";

const MESSAGE_NOT_IMPLEMENTATION = "Funcionalidade ainda não implementada.";
const MESSAGE_INPUT_NOT_EMPTY = "O campo não pode ser vazio.";
const MESSAGE_INTERVAL_QUARTER = "O intervalo de datas deve ser de 3 meses.";
const MONTH_OF_YEAR = 12;
const TYPE_CHART = "bar";
const TITLE_CHART = {
    expired: "Notas com Inadimplência",
    paid: "Faturamento"
};
const COLOR_CHART = {
    month: ['rgba(255,206,86,0.2)'],
    quarter: ['rgba(75,192,192,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)'],
    year: ['rgba(75,192,192,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(255,206,86,0.2)']
};

$(document).ready(function () {

    $("#btn-Search").click(function (e) {
        e.preventDefault();
        createAndShowModalNotice(MESSAGE_NOT_IMPLEMENTATION);
        $("#input-Search").val('');
    });

    $("#icon-user").click(function (e) {
        e.preventDefault();
        createAndShowModalNotice(MESSAGE_NOT_IMPLEMENTATION);
    });

    $("#select-periods").change(function (e) {
        let typeFilterSelect = $("#select-periods").val();
        $('#period1, #period2').val('');
        $('#table').addClass('d-none');

        switch (typeFilterSelect) {
            case "2":
                $("#period-container").removeClass('d-none');
                $('#period1').inputmask('99/9999');
                $('#period2').addClass('d-none');
                $('#label-a').addClass('d-none');
                break;
            case "3":
                $("#period-container").removeClass('d-none');
                $('#period2').removeClass('d-none');
                $('#period1, #period2').inputmask('99/9999');
                $('#label-a').removeClass('d-none');
                break;
            case "4":
                $("#period-container").removeClass('d-none');
                $('#period1').inputmask('9999');
                $('#period2').addClass("d-none");
                $('#label-a').addClass('d-none');
                break;
            default:
                $("#period-container").addClass("d-none");
                break;
        }
    });

    $("#btn-consult").click(function (e) {
        let optionFilterSelected = $("#select-periods").val();
        clearChart();
        formatDataToCreateCards(optionFilterSelected);
    });

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const dateToday = (month < 10 ? '0' : '') + month + '/' + year;
    createDataForMonth(dateToday);
});

function clearChart() {
    $("#container-chart").empty();
    const canvasElementExpired = $('<div class="w-50"><canvas id="chartInvoicesExpired" style="height: 600px;"></canvas></div>');
    const canvasElementPaid = $('<div class="w-50"><canvas id="chartInvoicesPaid" style="height: 800px;"></canvas></div>');
    $("#container-chart").append(canvasElementExpired);
    $("#container-chart").append(canvasElementPaid);
}

function formatDataToCreateCards(optionFilterSelected) {
    let dateBegin = $("#period1").val();
    let dateEnd = $("#period2").val();

    if (optionFilterSelected == 2) {
        createDataForMonth(dateBegin);
    } else if (optionFilterSelected == 3) {
        createDataForQuarter(dateBegin, dateEnd);
    } else if (optionFilterSelected == 4) {
        createDataForYear(dateBegin);
    }
}

function createDataForMonth(dateBegin) {
    let newData = [];

    if (dateBegin == '') {
        createAndShowModalNotice(MESSAGE_INPUT_NOT_EMPTY);
        return;
    }

    newData.push(formatDataForMonth(DATA_INVOICES, dateBegin));
    createInfoCards(newData);
}


function createDataForQuarter(dateBegin, dateEnd) {
    let newData = [];

    if (dateBegin == '' || dateEnd == '') {
        createAndShowModalNotice(MESSAGE_INPUT_NOT_EMPTY);
    }

    let rangeDates = getDateRange(dateBegin, dateEnd);

    if (rangeDates.length != 3) {
        createAndShowModalNotice(MESSAGE_INTERVAL_QUARTER);
        return;
    }

    if (rangeDates != undefined) {
        rangeDates.forEach(element => {
            newData.push(formatDataForMonth(DATA_INVOICES, element));
        });
    }
    createInfoCards(newData);
}

function createDataForYear(dateBegin) {
    let newData = [];

    if (dateBegin == '') {
        createAndShowModalNotice(MESSAGE_INPUT_NOT_EMPTY);
        return;
    }

    let rangeDates = getMonthsForYear(dateBegin);

    if (rangeDates != undefined) {
        rangeDates.forEach(element => {
            newData.push(formatDataForMonth(DATA_INVOICES, element));
        });
        createInfoCards(newData);
    }
}

const formatDataForMonth = (data, monthYear) => {
    try {
        let monthDateFilter = formatterDate(monthYear).getMonth() + 1;
        let yearDateFilter = formatterDate(monthYear).getFullYear();

        let notesIssued = data.filter(d => {
            let dateIssuance = new Date(d.dataEmissao);
            return dateIssuance.getMonth() + 1 === monthDateFilter && dateIssuance.getFullYear() === yearDateFilter;
        }).length;

        let notesToCollect = data.filter(d => {
            let dateIssuance = new Date(d.dataEmissao);
            return dateIssuance.getMonth() + 1 === monthDateFilter && dateIssuance.getFullYear() === yearDateFilter && d.cobranca === false;
        }).length;

        let notesExpired = data.filter(d => {
            let dateIssuance = new Date(d.dataEmissao);
            return dateIssuance.getMonth() + 1 === monthDateFilter && dateIssuance.getFullYear() === yearDateFilter && d.status === 'Pagamento em atraso';
        }).length;

        let notesPaid = data.filter(d => {
            let dateIssuance = new Date(d.dataEmissao);
            return dateIssuance.getMonth() + 1 === monthDateFilter && dateIssuance.getFullYear() === yearDateFilter && d.status === 'Pagamento realizado';
        }).length;

        let notesDue = data.filter(d => {
            let dateIssuance = new Date(d.dataEmissao);
            let datePayment = new Date(d.dataPagamento);
            return dateIssuance.getMonth() + 1 === monthDateFilter && dateIssuance.getFullYear() === yearDateFilter && datePayment.getTime() > dateIssuance.getTime();
        }).length;

        let totalValueNotesPaid = data.reduce((total, d) => {
            let dateIssuance = new Date(d.dataEmissao);
            if (dateIssuance.getMonth() + 1 === monthDateFilter && dateIssuance.getFullYear() === yearDateFilter && d.status === 'Pagamento realizado') {
                return Number(total + parseFloat(d.valorNota).toFixed(2));
            } else {
                return Number(total);
            }
        }, 0);

        return {
            period: `${monthDateFilter}/${yearDateFilter}`,
            notesIssued,
            notesToCollect,
            notesExpired,
            notesPaid,
            notesDue,
            totalValueNotesPaid
        };

    } catch (error) {
        createAndShowModalNotice(error.message);
    }
};

function getDateRange(dateBegin, dateEnd) {
    try {
        let monthDateBeginFilter = formatterDate(dateBegin).getMonth() + 1;
        let yearDateBeginFilter = formatterDate(dateBegin).getFullYear();
        let monthDateEndFilter = formatterDate(dateEnd).getMonth() + 1;
        let yearDateEndFilter = formatterDate(dateEnd).getFullYear();

        let newDateBegin = new Date(`${yearDateBeginFilter}/${monthDateBeginFilter}/01`);
        let newDateEnd = new Date(`${yearDateEndFilter}/${monthDateEndFilter}/01`);

        let arrDateRange = [];

        for (let month = new Date(newDateBegin); month <= newDateEnd; month.setMonth(month.getMonth() + 1)) {
            let monthYear = new Date(month);
            arrDateRange.push(`${monthYear.getMonth() + 1}/${monthYear.getFullYear()}`);
        }

        return arrDateRange;

    } catch (error) {
        createAndShowModalNotice(error.message);
    }
}

function getMonthsForYear(year) {
    try {
        let dateCurrent = new Date();
        let arrMonths = [];
        let month = 1;

        if (year > dateCurrent.getFullYear()) {
            throw new Error(DATE_INVALID);
        }

        while (month <= MONTH_OF_YEAR) {
            arrMonths.push(`${month}/${year}`);
            month++;
        }

        return arrMonths;
    } catch (error) {
        createAndShowModalNotice(error.message);
    }
}

function createInfoCards(data) {
    if (data.length > 0) {
        let totalNotesIssued = 0;
        let totalNotesToCollect = 0;
        let totalNotesExpired = 0;
        let totalNotesPaid = 0;
        let totalNotesDue = 0;

        data.forEach(item => {
            totalNotesIssued += item.notesIssued;
            totalNotesToCollect += item.notesToCollect;
            totalNotesExpired += item.notesExpired;
            totalNotesPaid += item.notesPaid;
            totalNotesDue += item.notesDue;
        });

        $('#card-totalNotesIssued').text(totalNotesIssued);
        $('#card-totalNotesToCollect').text(totalNotesToCollect);
        $('#card-totalNotesExpired').text(totalNotesExpired);
        $('#card-totalNotesPaid').text(totalNotesPaid);
        $('#card-totalNotesDue').text(totalNotesDue);
        createDataNotesExpiredChart(data);
        createDataNotesPaidChart(data);
    }
};

function createCharts(data, container, type, title) {
    if (data != undefined) {

        let colorChart = [];
        if (data.months.length == 12) colorChart = COLOR_CHART.year;
        else if (data.months.length == 3) colorChart = COLOR_CHART.quarter;
        else if (data.months.length == 1) colorChart = COLOR_CHART.month;
        else colorChart = COLOR_CHART.month;

        new Chart(container, {
            type: type,
            data: {
                labels: data.months,
                datasets: [{
                    label: 'Quantidade total por Mês',
                    data: data.values,
                    borderWidth: 2,
                    backgroundColor: colorChart,
                    borderColor: '#A3CCAB'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: title,
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });
    }
}
function createDataNotesExpiredChart(data) {
    if (data.length > 0) {

        const ctx = $('#chartInvoicesExpired');
        const months = [];
        const values = [];

        data.forEach(item => {
            months.push(item.period);
            values.push(item.notesExpired);
        });

        const contentChart = {
            months,
            values
        };

        createCharts(contentChart, ctx, TYPE_CHART, TITLE_CHART.expired);
    }
}

function createDataNotesPaidChart(data) {
    if (data.length > 0) {

        const ctx = $('#chartInvoicesPaid');
        const months = [];
        const values = [];

        data.forEach(item => {
            months.push(item.period);
            values.push(item.totalValueNotesPaid);
        });

        const contentChart = {
            months,
            values
        };

        createCharts(contentChart, ctx, TYPE_CHART, TITLE_CHART.paid);
    }
}




