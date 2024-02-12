
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