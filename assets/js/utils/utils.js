export const DATE_INVALID = "Data informada é inválida ou o ano é maior que o ano atual.";
export function createAndShowModalNotice(mensagem) {
  var modalHtml = `
      <div class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Aviso</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${mensagem}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    `;

  $(document.body).append(modalHtml);

  $(".modal").modal('show');

  $(".modal").on('hidden.bs.modal', function () {
    $(this).remove();
  });
}

export function formatterDate(monthYear) {
  let dateCurrent = new Date();
  let partesData = monthYear.split('/');
  let month = parseInt(partesData[0]);
  let year = parseInt(partesData[1]);

  if (year > dateCurrent.getFullYear() || month > 12) {
    throw new Error(DATE_INVALID);
  }
  
  let dateFilter = new Date(year, month - 1);

  return dateFilter;
}


export function createTable(data) {
  let tableHtml = `
    <table class="table table-striped">
      <thead>
          <tr>
              <th class="text-nowrap" scope="col">Nome do Pagador</th>
              <th class="text-nowrap" scope="col">Número da Nota</th>
              <th class="text-nowrap" scope="col">Data de Emissão</th>
              <th class="text-nowrap" scope="col">Data de Cobrança</th>
              <th class="text-nowrap" scope="col">Data do Pagamento</th>
              <th class="text-nowrap" scope="col">Valor da Nota</th>
              <th class="text-nowrap" scope="col">Documento Nota Fiscal</th>
              <th class="text-nowrap" scope="col">Documento Boleto Bancário</th>
              <th class="text-nowrap" scope="col">Status</th>
          </tr>
      </thead>
      <tbody>
          ${data == undefined ? `
              <tr>
                  <td colspan="9" class="text-center">Sem dados</td>
              </tr>
          ` :
      data.map(e => {
        let dateEmission = formatterDateDDMMYYYY(e.dataEmissao);
        let dateBilling = formatterDateDDMMYYYY(e.dataCobranca);
        let datePaid = formatterDateDDMMYYYY(e.dataPagamento);
        let valueNote = formatterCurrency(e.valorNota);
        let classStatus = '';
        if (e.status == 'Emitida') classStatus = 'bg-info';
        if (e.status == 'Cobrança realizada') classStatus = 'bg-secondary';
        if (e.status == 'Pagamento realizado') classStatus = 'bg-success';
        if (e.status == 'Pagamento em atraso') classStatus = 'bg-danger';
        return `
                <tr>
                    <td class="text-nowrap">${e.nomePagador}</td>
                    <td class="text-nowrap">${e.numeroNota}</td>
                    <td class="text-nowrap">${dateEmission}</td>
                    <td class="text-nowrap">${dateBilling}</td>
                    <td class="text-nowrap">${datePaid}</td>
                    <td class="text-nowrap">${valueNote}</td>
                    <td class="text-nowrap text-center">${e.documentoNota}</td>
                    <td class="text-nowrap text-center">${e.documentoBoleto}</td>
                    <td class="${classStatus} text-nowrap text-white">${e.status}</td>
                </tr>
            `;
      }).join('')}
      </tbody>
    </table>
  `;

  data === undefined ? $('#footer').addClass('footerNotData') : $('#footer').removeClass('footerNotData');

  $("#table").empty();
  $("#table").append(tableHtml);
};



function formatterCurrency(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatterDateDDMMYYYY(date) {
  const parts = date.split('/');
  const dateFormat = parts[2] + '/' + parts[1] + '/' + parts[0];
  return dateFormat;
}

export function compareAscendingRecords(a, b) {
  const dateA = a.split('/').join('');
  const dateB = b.split('/').join('');

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
}

export function compareDates(dateArray, dateSelected) {
  const newDateArray = new Date(dateArray);
  const yearDateArray = newDateArray.getFullYear();
  const monthDateArray = newDateArray.getMonth() + 1;
  const parts = dateSelected.split("/");

  const monthDateSelected = Number(parts[0]);
  const yearDateSelected = Number(parts[1]);

  return yearDateArray === yearDateSelected && monthDateArray === monthDateSelected;
}