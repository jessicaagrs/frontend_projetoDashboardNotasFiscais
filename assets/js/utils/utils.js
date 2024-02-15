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
          ${data.map(e => `
              <tr>
                  <td class="text-nowrap">${e.nomePagador}</td>
                  <td class="text-nowrap">${e.numeroNota}</td>
                  <td class="text-nowrap">${e.dataEmissao}</td>
                  <td class="text-nowrap">${e.dataCobranca}</td>
                  <td class="text-nowrap">${e.dataPagamento}</td>
                  <td class="text-nowrap">${e.valorNota}</td>
                  <td class="text-nowrap">${e.documentoNota}</td>
                  <td class="text-nowrap">${e.documentoBoleto}</td>
                  <td class="text-nowrap">${e.status}</td>
              </tr>
          `).join('')}
      </tbody>
  </table>
`;

  $("#table").empty();
  $("#table").append(tableHtml);
};
