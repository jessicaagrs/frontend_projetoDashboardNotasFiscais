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
              <th scope="col">Período</th>
              <th scope="col">Notas Emitidas</th>
              <th scope="col">Notas a Cobrar</th>
              <th scope="col">Notas Vencidas</th>
              <th scope="col">Notas a Vencer</th>
              <th scope="col">Notas Pagas</th>
          </tr>
      </thead>
      <tbody>
          ${data.map(e => `
              <tr>
                  <td>${e.period}</td>
                  <td>${e.notesIssued}</td>
                  <td>${e.notesToCollect}</td>
                  <td>${e.notesExpired}</td>
                  <td>${e.notesPaid}</td>
                  <td>${e.notesDue}</td>
              </tr>
          `).join('')}
      </tbody>
  </table>
`;

  $("#table").empty();
  $("#table").removeClass("d-none");
  $("#table").append(tableHtml);
};
