var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//executa essas funções após a pagina html ter sido carregada
/*$(document).ready(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
  atualizaPlacar();
})*/

//Forma abreviada
$(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
  atualizaPlacar();
  $('#usuarios').selectize({
    create: true,
    sortField: 'text'
  });
   $('.tooltip').tooltipster({
     trigger: "custom"
   });
});

function atualizaTempoInicial(tempo){
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase(){
  var frase = $(".frase").text(); //pega a frase
  var numeroPalavras = frase.split(" ").length;
  //quebra a frase em espaços e retorna um array com cada palavra e conta tamanho do array
  var tamanhoFrase = $("#tamanho-frase"); //pega o elemento com id tamanho-frase
  tamanhoFrase.text(numeroPalavras); //insere no conteudo do elemento, o que estiver dentro de text.
}

function inicializaContadores(){
  campo.on("input", function(){

    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length-1;
    var conteudoSemEspaco = conteudo.replace(/\s+/g,'');

    $("#contador-palavras").text(qtdPalavras);

    //var qtdCaracteres = conteudo.length;
    var qtdCaracteresSemEspaco = conteudoSemEspaco.length;

    //$("#contador-caracteres").text(qtdCaracteres);
    $("#contador-caracteres").text(qtdCaracteresSemEspaco);
  });
}

function inicializaCronometro(){

  $("#botao-reiniciar").attr("disabled", true);
  campo.one("focus", function(){
    var tempoRestante = $("#tempo-digitacao").text();
    var cronometroID = setInterval(function(){
      tempoRestante--;

      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1){
        clearInterval(cronometroID);
        finalizaJogo();
      }
    }, 1000);
  });
}
function finalizaJogo(){
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserePlacar();
}

function inicializaMarcadores(){

  campo.on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0 , digitado.length);
    if (digitado == comparavel){
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}

function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");

    campo.removeClass("borda-vermelha"); //novo
    campo.removeClass("borda-verde"); //novo
}
