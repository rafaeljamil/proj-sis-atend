$(document).ready(function(){

//LOGIN
    $("#formLogin").submit(function(e){
        e.preventDefault()
        var form = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: 'core/control/loginCtl.php?op=login',
            data: form,
            dataType: 'text',
            success: function(res){
                if(res == 'ok'){
                    //alert('Logado com sucesso')
                    window.location.href = 'index.php'
                }else if(res == 'err-user'){
                    $("p.alert-danger").html("Login inválido.");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                    //alert('Opa, erro em login')
                }else if(res == 'err-pass'){
                    $("p.alert-danger").html("Senha inválida.");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                    //alert('Opa, erro na senha')
                }else{
                    $("p.alert-danger").html("Algo de errado não está certo...");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                    //alert('Parece que houve um erro inesperado...'+res)
                }
            }
        })
    })
    $("#logout").click(function(e){
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'core/control/loginCtl.php?op=logout',
            dataType: 'text',
            success:function(res){
                if(res == 'ok'){
                    window.location.href = 'login.html'
                }
            }
        })
    })

//EVERYTHING ELSE

//CADASTRO
    //Controle de visibilidade de formulário
    $("#novoCadastro").click(function(){
        if($("#novoCadastroForm").hasClass('hidden')){
            $("#novoCadastroForm").slideDown(300)
            $("#buscaForm").slideUp(300)
            $("#buscaResultado").slideUp(300)
            $("#novoCadastroForm")[0].reset()
        }
    })
    $("#buscaCadastro").click(function(){
        if($("#buscaForm").hasClass('hidden')){
            $("#buscaForm").slideDown(300)
            $("#novoCadastroForm").slideUp(300)
            $("#buscaResultado").slideUp(300)
        }
    })

    //Novo Cadastro
    $("#novoCadastroForm").submit(function(e){
        e.preventDefault()
        var form = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: 'core/control/recepcaoCtl.php?op=novo',
            data: form,
            dataType: 'text',
            success:function(res){
                alert(res)
                if(res == 'err-user'){
                    $("p.alert-danger").html("Algo deu errado");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                }else if(res == 'ok'){
                    $("p.alert-success").html("Usuário registrado com sucesso");
                    $("div.success").slideDown(300).delay(2500).slideUp(300);
                    $("#novoCadastroForm")[0].reset();
                }
            }
        })
    })

    //Busca
    $("#buscaForm").submit(function(e){
        e.preventDefault()
        var form = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: 'core/control/recepcaoCtl.php?op=busca',
            data: form,
            dataType: 'json',
            success:function(res){
                //Envia e recebe json, não mais texto. Agora tem como tratar e mostrar
                //mais de um array de resultado de busca.
                //Cria uma tabela e adiciona linhas para cada resultado
                
                if(res == 'err-busca'){
                    $("p.alert-danger").html("A busca não retornou resultados");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                }else{
                    //Criando a tabela
                    var nRows = res.length;
                    var nCols = 3;
                    var tBody = '<table class="table w-50 text-center" >';
                    //Adicionando o nome das colunas da tabela
                    tBody += '<tr><td>Nome</td><td>Endereço</td><td>CPF</td></tr>'
                    //Iteração que cria uma linha de tabela para cada resultado e
                    //alimenta a tabela com nome(0), endereço(4) e CPF(2)
                    for(i = 0; i < nRows; i++){
                        tBody += "<tr>"
                        //console.log(res[i])
                        a = res[i][0]
                        b = res[i][4]
                        c = res[i][2]
                        newRes = [a, b, c]
                        
                        console.log(newRes)
                        for(j = 0; j < nCols; j++){
                            console.log(newRes[j])
                            
                            tBody += "<td>"
                            tBody += newRes[j]
                            tBody +="</td>"
                        }
                        //Ao final de cada linha vai um botão que manda a requisição de acessar
                        //a página específica do cadastro com o CPF do usuário encontrado
                        tBody += `<td><a href="acompanhamentoCtl.php?cpf=${c}" class="btn btn-primary">Ver</a></td>`
                        tBody += "</tr>"
                    }
                    //Fechando a tabela
                    tBody += "</table>"
                    //Adicionando a tabela pronta ao div resultado
                    $("#resultado").html(tBody)
                    //$("resultado").slideDown(300)
                    
                }
            }
        })
    })

//ACOMPANHAMENTO


//GARAGEM
    //Controle de visibilidade de formulário
    $("#novoCarro").click(function(){
        if($("#novoCarroForm").hasClass('hidden')){
            $("#novoCarroForm").slideDown(300)
            $("#novaRotaForm").slideUp(300)
            $("#novoCarroForm")[0].reset()
        }
    })
    $("#novaRota").click(function(){
        if($("#novaRotaForm").hasClass('hidden')){
            $("#novaRotaForm").slideDown(300)
            $("#novoCarroForm").slideUp(300)
        }
    })

    //Novo carro
    $("#novoCarroForm").submit(function(e){
        e.preventDefault()
        var form = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: 'core/control/garagemCtl.php?op=nc',
            data: form,
            dataType: 'text',
            success: function(res){
                if(res == 'ok'){
                    $("p.alert-success").html("Veículo registrado com sucesso.");
                    $("div.success").slideDown(300).delay(2500).slideUp(300);
                    $("#novoCarroForm")[0].reset();
                    //alert ("Veículo salvo na base de dados.")
                }else if(res == 'err-vehicle'){
                    $("p.alert-danger").html("Erro ao salvar veículo");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                    //alert("Erro ao salvar veículo")
                }else if(res == 'exists'){
                    $("p.alert-danger").html("Veículo já existe");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                    //alert ("Veículo já existe.")
                }else{
                    $("p.alert-danger").html("Algo deu errado...");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                    //alert ("Algo deu errado..." + res)
                }
            }
        })
    })

    //Nova Rota
    $("#novaRotaForm").submit(function(e){
        e.preventDefault()
        var form = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: 'core/control/garagemCtl.php?op=nr',
            data: form,
            dataType: 'text',
            success: function(res){
                if(res == 'ok'){
                    $("p.alert-success").html("Rota criada com sucesso");
                    $("div.success").slideDown(300).delay(2500).slideUp(300);
                    $("#novaRotaForm")[0].reset();
                    //alert ("Rota salva na base de dados.")
                }else{
                    $("p.alert-danger").html("Algo deu errado");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                    //alert ("Algo deu errado...")
                }
            }
        })
    })
})