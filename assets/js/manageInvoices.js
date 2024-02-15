import { DATA_INVOICES } from "./database/data.js";
import { createTable } from "./utils/utils.js";

$(document).ready(function () {
    createDataForPagination();
});

const renderizedTable = (arraysDivididos) => createTable(arraysDivididos);

function createDataForPagination() {
    const arraysDivididos = [];
    const tamanhoSubarray = 50;

    for (let i = 0; i < DATA_INVOICES.length; i += tamanhoSubarray) {
        const subarray = DATA_INVOICES.slice(i, i + tamanhoSubarray);
        arraysDivididos.push(subarray);
    }
    renderizedTable(arraysDivididos[0]);
    createHTMLPagination(arraysDivididos);
    console.log(arraysDivididos);
}

function createHTMLPagination(arraysDivididos) {
    let listPaginationHTML = `
    <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Anterior</a></li>`;

    for (let i = 0; i < arraysDivididos.length; i++) {
        listPaginationHTML += `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`;
    }

    listPaginationHTML += `
    <li class="page-item"><a class="page-link" href="#">Próximo</a></li>
  </ul>`;

    $("#pagination").empty();
    $("#pagination").append(listPaginationHTML);
}
