<h1>Sistema de Gerenciamento de Notas Fiscais</h1> 

<p align="center">
  <img src="https://uploaddeimagens.com.br/images/004/413/679/full/javacript.png?1680281578"/> 
  <img src="https://uploaddeimagens.com.br/images/004/525/525/full/bootstrap.png?1688056332"/>
  <img src="https://uploaddeimagens.com.br/images/004/741/159/original/jquery-original-wordmark-svg_%281%29.png?1708093912"/>
</p>

Status do Projeto: :heavy_check_mark: <!-- > :heavy_check_mark:--> Concluído <!-- > :warning:-->

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto-pencil)

:small_blue_diamond: [Funcionalidades](#funcionalidades-wrench)

:small_blue_diamond: [Layout](#layout-dash)

<!-- :small_blue_diamond: [Pré-requisitos](#pré-requisitos) -->

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

<!-- :small_blue_diamond: [Dependencias e libs utilizadas](#dependencias-e-libs-utilizadas-books) -->

## Descrição do projeto :pencil:

<p align="justify">
  Sistema Invoice Soft versão 1.0.0 traz uma dashboard para análise de dados e uma listagem das notas fiscais. 
</p>

## Funcionalidades :wrench:

:heavy_check_mark: Na página de dashboard é possível filtrar por mês, trimestre e ano e obter uma soma total por tipos de operações que aparecem nos cards e dois gráficos que focam na inadimplência e faturamento.

:heavy_check_mark: Na página listagem de notas uma tabela com as notas é exibida com paginação conforme quantidade de dados, também possui filtros por data de emissão, cobrança, pagamento e por status.



## Layout :dash:


![N|Solid](https://uploaddeimagens.com.br/images/004/741/171/full/Screenshot_1.png?1708094419)


:heavy_check_mark: Tela inicial que no primeiro carregamento traz os dados do mês atual  se houver. Nos cards é mostrado o total de notas por situação.


![N|Solid](https://uploaddeimagens.com.br/images/004/741/173/full/Screenshot_6.png?1708094546)


:heavy_check_mark: No filtro da dashboard tem as opções por mês, trimestre e ano sendo necessário clicar no botão consultar. Em seguida cards e gráficos são atualizados com período selecionado.


![N|Solid](https://uploaddeimagens.com.br/images/004/741/179/full/Screenshot_2.png?1708094671)


:heavy_check_mark: Gráficos utilizados.


![N|Solid](https://uploaddeimagens.com.br/images/004/741/182/full/Screenshot_3.png?1708094727)


:heavy_check_mark: Menu lateral da página, somente as páginas Dashboard e Gerenciar Notas Fiscais foram implementadas nessa versão, as demais mostrarão uma mensagem de implementação em andamento.


![N|Solid](https://uploaddeimagens.com.br/images/004/741/187/full/Screenshot_4.png?1708094849)


:heavy_check_mark: Visão inicial da página Gerenciar Notas Fiscais, é renderizado as notas se já houver dados. A título de mostrar informações de exemplo, criei um array de dados fictícios que no código fonte está em js/database.


![N|Solid](https://uploaddeimagens.com.br/images/004/741/190/full/Screenshot_7.png?1708095015)


:heavy_check_mark: Filtro da página Gerenciar Notas Fiscais, ao clicar em uma opção acima, um novo select é aberto com mais opções de escolha, as mesmas são obtidas dos dados fictícios, não sendo necessário digitar um período e sim escolher apenas aqueles que possuem dados. O botão limpar filtro limpa os filtros e retorna ao estado inicial.


![N|Solid](https://uploaddeimagens.com.br/images/004/741/199/original/Screenshot_5.png?1708095324)


:heavy_check_mark: Por fim, temos uma paginação de acordo com a quantidade de dados, renderizado 50 itens por vez.


<!-- ## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)

...

Liste todas as dependencias e libs que o usuário deve ter instalado na máquina antes de rodar a aplicação  -->

## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
$ git clone https://github.com/jessicaagrs/desafio-dashboard-notasFiscais.git
$ code .

Utilizar Live Server para executar o projeto no navegador.

```

Para acessar a página agora mesmo no navegador [CLIQUE AQUI](https://desafio-dashboard-notas-fiscais.vercel.app/)
<!-- ## Como rodar os testes

Coloque um passo a passo para executar os testes

```
$ npm test, rspec, etc 
```

## Casos de Uso

Explique com mais detalhes como a sua aplicação poderia ser utilizada. O uso de **gifs** aqui seria bem interessante. 

Exemplo: Caso a sua aplicação tenha alguma funcionalidade de login apresente neste tópico os dados necessários para acessá-la.

## JSON :floppy_disk:

### Usuários: 

|name|email|password|token|avatar|
| -------- |-------- |-------- |-------- |-------- |
|Lais Lima|laislima98@hotmail.com|lais123|true|https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-U_HbQAipum9lWln3APcBIwng7T46hdBA42EJv8Hf6Z4fDT3&usqp=CAU|

... 

Se quiser, coloque uma amostra do banco de dados 

## Iniciando/Configurando banco de dados

Se for necessário configurar algo antes de iniciar o banco de dados insira os comandos a serem executados  -->

<!-- ## Dependencias e libs utilizadas :books:

- [JSPDF](https://artskydj.github.io/jsPDF/docs/jsPDF.html) -->

<!-- ## Resolvendo Problemas :exclamation:

Em [issues]() foram abertos alguns problemas gerados durante o desenvolvimento desse projeto e como foram resolvidos.  -->

<!-- ## Tarefas em aberto

Se for o caso, liste tarefas/funcionalidades que ainda precisam ser implementadas na sua aplicação

:memo: Tarefa 1 

:memo: Tarefa 2 

:memo: Tarefa 3  -->

## Licença 

Copyright :copyright: 2023 - Jessica Aguiar
