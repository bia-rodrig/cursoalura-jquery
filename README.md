# jQuery - ALURA

Projeto desenvolvido: jogo de velocidade de digitação.



**Tópicos:**

* Escutando eventos com jQuery;
* GameOver com eventos;
* Reiniciando o jogo;
* Funções que auxiliam os estilos;
* Criando e Manipulando elementoa com jQuery;
* Animações com jQuery;
* Requisições AJAX;
* Tratamento de erros;
* Enviando dados com AJAX;
* Enviando dados com POST;
* Same Origin Policy e Cors;
* Plugins do jQuery  (slider, selectize, tooltipster);

## Sobre o jQuery

* HTML - Serve para estruturar a página
* CSS - para estilizar
* JavaScript - interatividade do usuário com o navegador
* jQuery - tradutor de código JavaScript e adapta para todos os navegadores. E tambem ajuda com a produtividade (escreve menos e faz mais).

![jQuery_telainicial](https://github.com/bia-rodrig/cursoalura-jquery/blob/master/imagens_readme/jQuery_telainicial.png)



![](https://github.com/bia-rodrig/cursoalura-jquery/blob/master/imagens_readme/jQuery_jogoplacar.png)



Pasta *servidor* fornecida pelo curso.

Para iniciar servidor: *npm start server.js*

Para acessar a página: localhost:3000

## Adicionar jQuery ao projeto

https://jquery.com/



**Versões:**

Slim - não da suporte ao ajax e animações.

Uncompressed - sem compressão (versão mais pesada)

Compressed - tudo concatenado (mais leve)



**Versão de produção**

A versão de produção é minificada, tem arquivo com tamanho reduzido (30% menor).

É muito impotante disponibilizar essa versão para o usuário final, pois usa menos banda do usuário.



**Importar jQuery**

Ao importar o script do jQuery, ele deve ser o primeiro na lista de scripts, para que os outros consigam utiliza-lo.



## Selecionar elementos HTML

Existem duas formas:

```javascript
jQuery(".nome_da_classe");
//ou
$(".nome_da_classe");
```

o símbolo **$** é uma abreviação para o nome jQuery.

Ao selecionar um elemento, é retornado um objeto jQuery como resposta. 

Se buscar pelo HTML, retorna todos os elementos da página.

```javascript
$("html");
```

Exemplos de seleção de elementos:

```javascript
var paragrafo = $("#id");
var paragrafo = jQuery(".classe");
var paragrafo = $(".classe#id"); //para pegar um item específico
```



## Eventos no jQuery

### Adicionar eventos

#### Evento de click:

```javascript
elemento_jquery.on("click", function(){});
//ou
$("#id_ou_.classe").click(function(){}); //atalho para a função acima
```



#### Evento de input (digitação):

```javascript
elemento_jquery.on("input", function(){});
```



#### Acessar conteúdo dos textos

Textos de TAGs (p, h1, etc)

```javascript
campo.text();
```

Textos dentro de inputs:

```javascript
campo.val();
```

#### Quebrar frases nos espaços:

```javascript
var frase = $(".frase").text(); //elemento html
var palavras = frase.split(" ").length;
var palavras = frase.split(/\S+/); //código busca espaços e quebras de linha
var totalCaracteres = frase.replace(/\S+/g, '') //remove os espaços, para não serem contados como caracteres
```



#### Quando um elemento é clicado via click do mouse ou via tab:

```javascript
elemento_selecionado.on("focus", function(){})
//ou
$("#id_ou_.classe").focus(function(){});
```



#### Executar função uma única vez:

```javascript
elemento_selecionado.one("focus", function(){});
```



#### Executar função em um determinado intervalo (1000 ms):

```javascript
setInterval(function(){}, 1000)
```

Todo **setInterval**, retorna o seu próprio ID. Para parar a execução da função, utilizar:

```javascript
clearInterval(id);
```



#### Alterar valor de um atributo:

```javascript
elemento_selecionado.attr(atributo, valor);
```

Exemplos: 

* Alterar o tamanho de colunas de um textbox:

```x.attr("rows", 10)```

* Desabilitar um item:

```x.attr("disabled", true);```



#### Reiniciar eventos

Só executa a função quando todos os elementos da página estiverem prontos (espera a página carregar)

```javascript
$(document).ready(function(){
    //colocar todas a funções a serem chamas ao iniciar a página
});

// ou a versão reduzida:
$(function(){
    //colocar todas a funções a serem chamas ao iniciar a página
});
```

## Funções que auxiliam na estilização

### Função CSS

```elemento_selecionado.css("o_que_quer_alterar", "o_valor");```

Exemplo de alterar cor do fundo:

```javascript
campo.css("background-color", "lightblue");
```



### Adicionar classe

Essa função **.css** não é uma boa prática, pois não é recomendável fazer estilizações no JavaScript.  O ideal é criar uma classe com o estilo desejado, dentro do arquivo css e então adicionar o elemento à classe.

```campo.addClass("nome-da-classe");```



### Remover classe

```campo.removeClass("nome-da-classe");```



### Adicionar classe, se tiver, e vice-versa

campo.toggleClass("nome-da-classe");



### Adicionar íconer de frameworks online

Importar o link do framework desejado no cabeçado. 

Exemplo: 

* Link para os ícones:

```html
<link rel="stylesheet" href="css/libs/google-fonts.css">
```

* Utilizar o link:

```html
<i class=" small material-icons">insert_chart</i>
<!--Consultar o site do framework -->
```



### Criar substring

```frase.substr(pos_inicial, pos_final);```



### Pegar um valor CSS (ou mais)

```javascript
var cor = $("div").css("background-color"); //unico valor
var valores = $("div").css(["background-color", "width"]); //pega cor e largura e retorna array
```



## ECMA Script 6

É uma evolução do JavaScript, porém o navegador precisa suporta-lo.

Para verificar se uma string faz parte de outra string:

```javascript
frase.startsWith(digitado); //verifica se digitado é o início da frase
```

Essa função retorna *true* ou *false*.



### Buscar um elemento dentro de outro

Exemplo: Buscar uma table dentro do elemento com classe *placar* (pode ser uma section ou div)

```javascript
var tabela = $(".placar").find("tbody");
```



### Criar um objeto Query (elemento)

Para criar um elemento:

```javascript
function novaLinha(usuario, numPalavras){
  	//cria <tr>
    var linha = $("<tr>");
    //cria <td>
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
	//cria <a>
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    //cria <i> - input
  	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

      link.append(icone);//icone dentro do link

      colunaRemover.append(link); //td colunaRemover recebe link
        //adiciona itens ao <tr>
      linha.append(colunaUsuario); 
      linha.append(colunaPalavras);
      linha.append(colunaRemover);
      return linha;
}
```



### Remover objeto

Remove o proprio elemento

```javascript
$(this).remove();
```

Remove o pai:

```javascript
$(this).parent().remove();
```

Remove o avô:

```javascript
$(this).parent().parent().remove();
```

Exemplo:

```javascript
$(".botao-remover").click(removeLinha); //elemento clicado na linha
function removeLinha(event){
  event.preventDefault(); //remove comportamento padrão do botão
  $(this).parent().parent().remove(); //remove o avô (linha)
}
```

Link - próprio elemento

td - célula da tabela - elemento pai

tr - linha da tabema - elemento avô



## Animações jQuery

Reservar espaço do scroll, para não deslocar a página.

```javascript
css: overflow: scroll;
```



### Animações básicas

* Animação que exibe texto aos poucos de cima para baixo

```javascript
$(".placar").slideDown(1000);
```



* Animação que exibe texto aos poucos de baixo para cima

```javascript
$(".placar").slideUp(1000);
```



* Animação que exibe ou esconde texto aos poucos

``` javascript
$(".placar").slideToggle(600);
```



### Remover com fade

**fadeOut**: não remove, só altera o display para none. Então é preciso dar o remove após o fadeOut terminar (dentro de um setTimeout)

Exemplo:

```javascript
$(this).parent().parent().fadeOut();
//colocar a função remover dentro da função fadeOut()
$('li').dblclick(function(){
    var $this = $(this);
    $this.fadeOut(function(){
      $this.remove();
    })
});
```

Outras animações: **fadeIn**, **fadeToggle**.



### Parar animação

Adicionar ```.stop()```. Vai parar a animação atual e já pula para a próxima.

### Animação do Scroll

1 - Saber para onde quer dar o scroll. Utilizar a função **offset**:

```javascript
$(.placar).offset();
```

Retorna objeto com informações do elemento selecionado.

2 - Pegar a posição inicial do elemento em relação ao topo da página:

```javascript
var posicaoPlacar = $(".placar").offset().top;
```

3 - Usar função animate

```javascript
function scrollPlacar(){
  var posicaoPlacar = $(".placar").offset().top;
  $("html, body").animate(
  {
    scrollTop: posicaoPlacar
  }, 1000);
}
```



## Exibir/Ocultar um elemento

### Opção 1

O jQuery possui a função *is* que permite consultar uma pseudo class. Toda vez que um elemento esta com display diferente de none ele ganha a pseudo classe *:visible*. A função *is* retorna true caso o elemento esteja visível. Se ele estiver visível, precisamos escondê-lo e isso é feito através da função hide. Para exibir o elemento, é usada a função *show*.

```javascript
$("#botao-promocao").click(function(){
    var promocoes = $(".promocoes"); //pega uma lista de itens em promocao
    if (promocoes.is(":visible")){
        promocoes.hide();
    } else{
        promocoes.show();
    }
});
```



### Opção 2

 o jQuery possui a função hasClass que retorna true se um elemento possui ou não uma classe. Na condição, removemos a classe invisivel caso o elemento já a tenha e a adicionamos caso ele não a tenha. Todo esse processo é feito a cada clique do usuário.

```javascript
$("#botao-promocao").click(function(){
    var promocoes = $('.promocoes');
    if(promocoes.hasClass("invisivel")){
        promocoes.removeClass('invisivel');
    }else{
        promocoes.addClass('invisivel');
    }
});
```



## Identificar posição mouse (hoover)

**mouseenter** e **mouseleave**

Identifica quando o usuário está com o mouse em cima do elemento.

```javascript
$("#dropdown").stop().mouseenter(function(){ //animar o que deseja })
ou

$("#dropdown").stop().mouseleave(function(){ //animar o que deseja })
```



## Reseta valor

```clearInterval(var_que_deseja_zerar)```

 Exemplo:

```javascript
function inicializaCronometro(){
  var tempoRestante = $("#tempo-digitacao").text();
  $("#botao-reiniciar").attr("disabled", true);
  campo.one("focus", function(){
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
```



## AJAX

Requisição assincrona

* Fazer requisição e receber uma resposta

```javascript
$.get("endereço", função(data))
```

onde *data* é o objeto que o servidor retorna.
Para acessar uma determinada informação desse objeto, utilizar:

```javascript
data[x].atributo;
data[0].texto;
```

0 - posição do primeiro objeto da resposta

texto - é o nome de um dos atributos que foi retornado



### Numero aleatorio

Devolve um numero entre 0 e 1. Multiplicar pela quantidade de itens.

```javascript
Math.random() * lenght_itens;
```

Arredonda para inteiro inferior:

```javascript
Math.floor();
```



### Tratamento de erros

* **.get** -para fazer a requisição;
* **.fail** - erro
* **.always** - executa indepenende do resultado do get (sucesso ou erro)

Exemplo: Um botão que faz requisição Ajax de uma frase ao servidor.

```javascript
$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){
  $("#spinner").toggle();
  //se der certo, executa troca frase
  $.get("http://localhost:3000/frases", trocaFraseAleatoria) //requisição
  .fail(function(){ //erro
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
```



#### Buscar um dado específico

na função **.get**, passar o dado que deseja buscar:

```javascript
var fraseId = $("#frase-id").val(); //pega o numero do id inserido pelo usuario

var dados = {id: fraseId}; //no Ajax, tem um campo de nome id. montar um objeto com o campo "id" e o valor inserido pelo usuário

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
```



### Enviar dados com POST

Sincronizar o placar com os dados salvos no servidor, utilizando requisição AJAX de **POST**.

*POST* -só pode ser realizado com um objeto ou string.

1 - criar um array de objetos

2 - criar um objeto com as informações

3 - inserir os objetos criados no array de objetos

4 - Criar um objeto com esse array de objetos

5 - fazer o **POST**

```javascript
var placar = []; //1 - array de objetos

var score = { //2 - objeto com as informações
  usuario: usuario,
  pontos: palavras
};

placar.push(score); //3 - insere o objeto ao array

var dados = { //4 - cria um objeto com o array
  placar: placar  
};

//5 - faz o post
$.post("http://localhost:3000/placar",dados, function(){
  console.log("Salvou dados no servidor");
});

//Enviando um objeto direto no GET
$.post('http://xyzzzww.com.br/produtos', { nome: 'Guarará', preco: 4.50}, function() {

    alert('Produto enviado com sucesso');
});
```

## Erro

* XMLHttpRequest cannot load
Quando não consegue fazer uma requisição AJAX para um outro servidor.

### Same origin Policy (SOP)

Proteção do Browser contra scrips maliciosos, não sabemos a origem.

Quando não é considerado a mesma origem:
* Quando o HOST é diferente (é um IP de um outro servidor)
* Quando é em uma porta diferente da que o servidor está rodando
* Quando usa protocolo diferente (https://)

Mesma origem:
* Mesmo protocolo: http
* Mesmo host: localhost
* Mesma porta: 3000

### CORS - Cross origin Resource Sharing (Compartilhamento de recursos entre diferentes origens)

Serve para contornar o Same origin policy, mantendo a privacidade dos dados

Acess-Control-Allow-Origin - o servidor com essa configuração CORS, só aceita conexão direta.
Só aceita AJAX do próprio host (mesmo domínio).

### Receber conexões de outras origens

é preciso habilitar no SERVIDOR, de quais sites vai aceitar requisições.
para aceitar de todos os hosts, utilizar *

CORS - é uma informação especial no header de resposta do servidor.

Ver jQuery-Parte 2 - Aula 6 - topico 4 e 5



### Habilitando CORS no projeto servidor

alura-typer-servidor-cors
cors/servidor/config

```javascript
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-control-Allor-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```



## Plugins


### Slider - carrossel
Passa imagens suavemente

Carrossel - Slick

- dar nome ao div com a lista das imagens dentro
- download do slick (https://kenwheeler.github.io/slick/).
copiar pasta slick apenas e colar dentro da pasta public
- copiar código do site para o head
- adicionar script depois do jquery no final do tbody
```
<script src="slick/slick.min.js"></script>
```
- para ver se o slick está OK, recarregar pagina index, F12 > Sources - ver se o Slick está lá

- ativar o slick:
```
$(function() {
  $(".slider").slick();
})
```

- adicionar configuração do slick, de acordo com o que escolher na pagina DEMOS do site do Slick
```
$(function() {
  $(".slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });
})

```

- No CSS, ajustar a altura da div de acordo com o tamanho da imagem
```CSS
.slider{
	height: auto;
}
```

- alterar cor da seta
- inspecionar a pagina, achar a seta (:: before e :: next)
```CSS
.slick-prev:before, .slick-next:before{
	color: black;
}
```



### Usuarios com Selectize

Escolher qual usuário quer jogar

Plugin: https://selectize.github.io/selectize.js/

melhora o input do tipo select

Single Item Select


baixar o plugin - no github
> pata dist

dist - distribuição


https://github.com/selectize/selectize.js/blob/master/dist/js/standalone/selectize.js
botão direito em RAW - colocar dentro da pasta JS

Baixar CSS selectize.default.css e colocar na pasta css



### Tooltipster

Balões com informações
```javascript
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
```
