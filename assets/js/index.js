import { createAndShowModalNotice } from "./utils/utils.js";

const MESSAGE_NOT_IMPLEMENTATION = "Funcionalidade ainda não implementada.";

$(document).ready(function () {

    $("#btn-Search").click(function (e) {
        e.preventDefault();
        createAndShowModalNotice(MESSAGE_NOT_IMPLEMENTATION);
        $("#input-Search").val("");
    });

    $("#icon-user").click(function (e) {
        e.preventDefault();
        createAndShowModalNotice(MESSAGE_NOT_IMPLEMENTATION);
    });

});