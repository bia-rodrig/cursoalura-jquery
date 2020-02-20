$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
  $("#spinner").toggle();
  //se der certo, executa troca frase
  $.get("http://localhost:3000/frases", trocaFraseAleatoria)
  .fail(function(){
    $("#erro").toggle();
    setTimeout(function(){
      $("#erro").toggle();
    }, 2000)
  })
  .always(function(){//always - sempre vai executar, independe se deu certo ou fail
    $("#spinner").toggle();
  });
  //se der erro, executa o fail
};


function trocaFraseAleatoria(data){
  var frase = $(".frase");

  var numAleatorio = Math.floor(Math.random() * data.length); //gera numero aleatório

  frase.text(data[numAleatorio].texto);

  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numAleatorio].tempo);
}


function buscaFrase(){
  $("#spinner").toggle();
  var fraseId = $("#frase-id").val(); //retorna o valor do input
  var dados = {id: fraseId}; //campo id - definido no ajax. fraseID - o numero que quer buscar

  //envia os dados e com a resposta, executa trocaFrase
  $.get("http://localhost:3000/frases",dados,trocaFrase)
  .fail(function(){
    $("#erro").toggle();
    setTimeout(function(){
      $("#erro").toggle();
    }, 2000);
  })
  .always(function(){
    $("#spinner").toggle();
  });
}

function trocaFrase(data){
 var frase = $(".frase");
 frase.text(data.texto); //texto é o campo do ajax. (id, texto e tempo)
 atualizaTamanhoFrase();
 atualizaTempoInicial(data.tempo);
}
