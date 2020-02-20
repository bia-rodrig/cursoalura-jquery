$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);


function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  var usuario = $('#usuarios').val(); //selectize é input
  var numPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);
  $(".placar").slideDown(500);
  scrollPlacar();
}

function scrollPlacar(){
  var posicaoPlacar = $(".placar").offset().top;
  $("html, body").animate(
  {
    scrollTop: posicaoPlacar
  }, 1000);
}

function novaLinha(usuario, numPalavras){
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(numPalavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone);

  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

$(".botao-remover").click(removeLinha);
function removeLinha(event){
  event.preventDefault();
  var linha = $(this).parent().parent();
  linha.fadeOut(600);
  setTimeout(function(){
    linha.remove()
  }, 600);
}

function mostraPlacar(){
  $(".placar").stop().slideToggle(600);
}

//enviando dados requisição AJAX de POST
function sincronizaPlacar(){
   //criar um array com os dados da tabela placar
   //cada linha vai ser um objeto dentro do array e esse objeto terá 3 informações (usuario, pontos, id)
   var placar =[];

   //Pegar as TRs que são filhar diretas de tbody (table-row)
   var linhas = $("tbody>tr");

   //Montar um objeto para cada linha (each(para cada linha)(){executa function})
   //como linhas, são elementos html, não é possível utilizar funções (find por exemplo) de jQuery nelas.
   //Utiliza-se $(this), para que o elemento html receba os "poderes" jQuery
   //dentro do tr, vai achar (find) o td conforme iteração
   linhas.each(function(){
     var usuario = $(this).find("td:nth-child(1)").text(); //pega o primeiro td do tr (que é nome do usuario)
     var palavras = $(this).find("td:nth-child(2)").text(); //CSS avançado - nth-child(2)

     //Criar objeto
     var score = {
       usuario: usuario,
       pontos: palavras
     };

     //Adicionar no array Placar
     placar.push(score);
   });
   //não pode enivar um array diretamente. Somente String ou Objeto JavaScript
   //transformar array placar em Objeto
   var dados = {
     placar: placar
   }

   //faz um post, para o endereço de POST, com os dados, e finaliza com função
   $.post("http://localhost:3000/placar",dados, function(){
     $(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao sincronizar");; //mostra o balão
   })
   .fail(function(){
     $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
   })
   .always(function(){
     setTimeout(function(){
       $(".tooltip").tooltipster("close");
     }, 1200);
   })
}

function atualizaPlacar(){
  //pega todo o placar
  $.get("http://localhost:3000/placar", function(data){
    $(data).each(function(){
      //pega os dados do placar
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha); //adiciona evento de click de remover linha
      //adiciona na corpo Tabela
      $("tbody").append(linha);

      //chamar função ao abrir a página - colocar no main.js, dentro da $(function(){})
    })
  })
}

/*
** data.each is not a function
.each - função jquery
então significa que data não tem acesso ao jquery

$(data).each - dá os poderes de jQuery

*/
