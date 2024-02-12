import { createAndShowModalNotice, formatterDate, createTable, DATE_INVALID } from "./utils/utils.js";
import { DATA_INVOICES } from "./database/data.js";

const MESSAGE_NOT_IMPLEMENTATION = "Funcionalidade ainda não implementada.";
const MESSAGE_INPUT_NOT_EMPTY = "O campo não pode ser vazio.";
const MESSAGE_INTERVAL_QUARTER = "O intervalo de datas deve ser de 3 meses.";
const MONTH_OF_YEAR = 12;

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
                break;
            case "3":
                $("#period-container").removeClass('d-none');
                $('#period2').removeClass('d-none');
                $('#period1, #period2').inputmask('99/9999');
                break;
            case "4":
                $("#period-container").removeClass('d-none');
                $('#period1').inputmask('9999');
                $('#period2').addClass("d-none");
                break;
            default:
                $("#period-container").addClass("d-none");
                break;
        }
    });

    $("#btn-consult").click(function (e) {
        let optionFilterSelected = $("#select-periods").val();
        formatDataToCreateTable(optionFilterSelected);
    });

});

function formatDataToCreateTable(optionFilterSelected) {
    let dateBegin = $("#period1").val();
    let dateEnd = $("#period2").val();
    let newData = [];

    if (optionFilterSelected == 2) {
        createDataForMonth(dateBegin, newData);
    } else if (optionFilterSelected == 3) {
        createDataForQuarter(dateBegin, dateEnd, newData);
    } else if (optionFilterSelected == 4) {
        createDataForYear(dateBegin, newData);
    }
}

function createDataForMonth(dateBegin, newData) {
    if (dateBegin == '') {
        createAndShowModalNotice(MESSAGE_INPUT_NOT_EMPTY);
    }

    newData.push(formatDataForMonth(DATA_INVOICES, dateBegin));
    createTable(newData);
}


function createDataForQuarter(dateBegin, dateEnd, newData) {
    if (dateBegin == '' || dateEnd == '') {
        createAndShowModalNotice(MESSAGE_INPUT_NOT_EMPTY);
    }

    let rangeDates = getDateRange(dateBegin, dateEnd);

    if (rangeDates.length > 3) {
        createAndShowModalNotice(MESSAGE_INTERVAL_QUARTER);
    }

    if (rangeDates != undefined) {
        rangeDates.forEach(element => {
            newData.push(formatDataForMonth(DATA_INVOICES, element));
        });
    }
    createTable(newData);
}

function createDataForYear(dateBegin, newData) {
    if (dateBegin == '') {
        createAndShowModalNotice(MESSAGE_INPUT_NOT_EMPTY);
    }

    let rangeDates = getMonthsForYear(dateBegin);

    if (rangeDates != undefined) {
        rangeDates.forEach(element => {
            newData.push(formatDataForMonth(DATA_INVOICES, element));
        });
        createTable(newData);
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

        return {
            period: `${monthDateFilter}/${yearDateFilter}`,
            notesIssued,
            notesToCollect,
            notesExpired,
            notesPaid,
            notesDue
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



