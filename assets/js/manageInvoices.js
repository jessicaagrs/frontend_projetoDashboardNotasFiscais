import { DATA_INVOICES } from "./database/data.js";
import { createTable, compareAscendingRecords, compareDates } from "./utils/utils.js";

let newDataInvoices = [];
let currentPageIndex = 0;

$(document).ready(function () {

    createDataForTable();

    $("#selectOptions").change(function (e) {
        let option = $('#selectOptions').val();
        $('#selectEmissionDate').addClass('d-none');
        $('#selectBillingDate').addClass('d-none');
        $('#selectPaidDate').addClass('d-none');
        $('#selectStatus').addClass('d-none');
        switch (option) {
            case "2":
                $('#selectEmissionDate').removeClass('d-none');
                break;
            case "3":
                $('#selectBillingDate').removeClass('d-none');
                break;
            case "4":
                $('#selectPaidDate').removeClass('d-none');
                break;
            case "5":
                $('#selectStatus').removeClass('d-none');
                break;
            default:
                break;
        }
    });

    $("#selectEmissionDate").change(function (e) {
        let option = $('#selectEmissionDate').val();
        let type = $('#selectOptions').val();

        createDataForTable(type, option);
    });

    $("#selectBillingDate").change(function (e) {
        let option = $('#selectBillingDate').val();
        let type = $('#selectOptions').val();

        createDataForTable(type, option);
    });

    $("#selectPaidDate").change(function (e) {
        let option = $('#selectPaidDate').val();
        let type = $('#selectOptions').val();

        createDataForTable(type, option);
    });

    $("#selectStatus").change(function (e) {
        let option = $('#selectStatus').val();
        let type = $('#selectOptions').val();

        createDataForTable(type, option);
    });

    $("#btn-clearFilter").click(function (e) {
        createDataForTable();
        $('#selectEmissionDate').addClass('d-none');
        $('#selectBillingDate').addClass('d-none');
        $('#selectPaidDate').addClass('d-none');
        $('#selectStatus').addClass('d-none');
        $('#selectOptions').val('')
    });

});

const renderizedTable = (arraysDivididos) => createTable(arraysDivididos);

function createDataForTable(typeFilter = '', contentFilter = '') {
    const sizeSubarray = 50;

    newDataInvoices = [];

    let dataToProcess = DATA_INVOICES;

    if (typeFilter !== '' && contentFilter !== '') {
        if (typeFilter === '2') {
            dataToProcess = DATA_INVOICES.filter(invoice => {
                return compareDates(invoice.dataEmissao, contentFilter);
            });
        } else if (typeFilter === '3') {
            dataToProcess = DATA_INVOICES.filter(invoice => {
                return compareDates(invoice.dataCobranca, contentFilter);
            });
        } else if (typeFilter === '4') {
            dataToProcess = DATA_INVOICES.filter(invoice => {
                return compareDates(invoice.dataPagamento, contentFilter);
            });
        } else if (typeFilter === '5') {
            dataToProcess = DATA_INVOICES.filter(invoice => {
                return invoice.status === contentFilter;
            });
        }
    }

    for (let i = 0; i < dataToProcess.length; i += sizeSubarray) {
        const subarray = dataToProcess.slice(i, i + sizeSubarray);
        newDataInvoices.push(subarray);
    }

    if (newDataInvoices.length > 0) {
        createSelectEmissionDate();
        createSelectBillingDate();
        createSelectPaidDate();
        createSelectStatus();
        renderizedTable(newDataInvoices[0]);
        createHTMLPagination(newDataInvoices);
    } else {
        renderizedTable(newDataInvoices[0]);
    }
}

function createHTMLPagination(arraysDivided) {
    let listPaginationHTML = `
    <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Anterior</a></li>`;

    for (let i = 0; i < arraysDivided.length; i++) {
        listPaginationHTML += `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`;
    }

    listPaginationHTML += `
    <li class="page-item"><a class="page-link" href="#">Próximo</a></li>
  </ul>`;

    $("#pagination").empty();
    $("#pagination").append(listPaginationHTML);

    $("#pagination").on("click", "li.page-item", renderizedPage);
}

function renderizedPage() {
    const pageNumber = $(this).find("a.page-link")[0].text;
    currentPageIndex = pageNumber != 'Anterior' && pageNumber != 'Próximo' ? parseInt(pageNumber) : currentPageIndex;

    if (pageNumber == 'Anterior') {
        if (currentPageIndex == 1) {
            renderizedTable(newDataInvoices[0]);
        } else {
            renderizedTable(newDataInvoices[currentPageIndex - 2]);
        }
    } else if (pageNumber == 'Próximo') {
        if (currentPageIndex == newDataInvoices.length) {
            renderizedTable(newDataInvoices[0]);
        } else {
            renderizedTable(newDataInvoices[currentPageIndex]);
        }
    } else {
        renderizedTable(newDataInvoices[currentPageIndex - 1]);
    }
}

function createSelectEmissionDate() {
    const uniqueMonthsSet = new Set();

    DATA_INVOICES.forEach(date => {
        const [year, month] = date.dataEmissao.split('/');
        const formattedMonth = month.padStart(2, '0');
        const monthYear = `${formattedMonth}/${year}`;
        uniqueMonthsSet.add(monthYear);
    });

    const dateEmission = Array.from(uniqueMonthsSet);

    dateEmission.sort(compareAscendingRecords);

    const select = $("#selectEmissionDate");
    const numberOfOptions = select.find('option').length;

    if (numberOfOptions < dateEmission.length) {
        dateEmission.forEach((element) => {
            let optionSelectHTML = `<option>${element}</option>`;
            select.append(optionSelectHTML);
        });
    }
}

function createSelectBillingDate() {
    const uniqueMonthsSet = new Set();

    DATA_INVOICES.forEach(date => {
        const [year, month] = date.dataEmissao.split('/');
        const formattedMonth = month.padStart(2, '0');
        const monthYear = `${formattedMonth}/${year}`;
        uniqueMonthsSet.add(monthYear);
    });

    const dateBilling = Array.from(uniqueMonthsSet);

    dateBilling.sort(compareAscendingRecords);

    const select = $("#selectBillingDate");
    const numberOfOptions = select.find('option').length;

    if (numberOfOptions < dateBilling.length) {
        dateBilling.forEach((element) => {
            let optionSelectHTML = `<option>${element}</option>`;
            select.append(optionSelectHTML);
        });
    }
}

function createSelectPaidDate() {
    const uniqueMonthsSet = new Set();

    DATA_INVOICES.forEach(date => {
        const [year, month] = date.dataEmissao.split('/');
        const formattedMonth = month.padStart(2, '0');
        const monthYear = `${formattedMonth}/${year}`;
        uniqueMonthsSet.add(monthYear);
    });

    const datePaid = Array.from(uniqueMonthsSet);

    datePaid.sort(compareAscendingRecords);

    const select = $("#selectPaidDate");
    const numberOfOptions = select.find('option').length;

    if (numberOfOptions < datePaid.length) {
        datePaid.forEach((element) => {
            let optionSelectHTML = `<option>${element}</option>`;
            select.append(optionSelectHTML);
        });
    }
}

function createSelectStatus() {
    const dateSet = new Set();

    DATA_INVOICES.forEach(e => {
        dateSet.add(e.status);
    });

    const status = Array.from(dateSet);

    status.sort(compareAscendingRecords);

    const select = $("#selectStatus");
    const numberOfOptions = select.find('option').length;

    if (numberOfOptions != 5) {
        status.forEach((element) => {
            let optionSelectHTML = `<option>${element}</option>`;
            select.append(optionSelectHTML);
        });
    }
}


