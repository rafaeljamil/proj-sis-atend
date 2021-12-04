$(document).ready(function(){
    //LOGIN
    $("#form-login").submit(function(e){
        e.preventDefault()
        let form = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "./core/controller/login/ctlLogin.php?op=login",
            data: form,
            dataType: "text",
            success: function(res){
                if(res == 'ok'){
                    window.location.href = "index.php?pg="
                    //console.log(res)
                }else{
                    alert ("Erro")
                }
            }
        })
    })
    //LOGOUT
    $("#logout").click(function(e){
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "./core/controller/login/ctlLogin.php?op=logout",
            success: function(res){
                if(res == 'ok'){
                    window.location.href = "login.html"
                }
            }
        })
    })
    //ATENDIMENTO
    //Button Logic
    $("#btn-buscar").click(function(){
        if($("#form-buscar").hasClass("hidden")){
            $("#form-buscar").slideDown(300)
            $("#form-novo").slideUp(300)
            $("#busca").trigger('reset')
        }
    })
    $("#btn-novo").click(function(){
        if($("#form-novo").hasClass("hidden")){
            $("#form-novo").slideDown(300)
            $("#form-buscar").slideUp(300)
            $("#resultado").html("") // retorna o resultado da busca pra vazio 
            $("#novo").trigger('reset')
        }
    })
    //GET ATENDIMENTO
    $("#busca").submit(function(e){
        e.preventDefault()
        let form = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "./core/controller/ctlAtend.php?op=get",
            data: form,
            dataType: "json",
            success: function(res){
                //alert(res)
                if(res == 'err-busca'){
                    $("p.alert-danger").html("Sem resultados para a busca de " + form.split("=")[1]);
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                }else{
                    $("p.alert-success").html("Mostrando resultados para a busca de " + form.split("=")[1]);
                    $("div.success").slideDown(300).delay(2500).slideUp(300);
                    //Criar tabela:
                    let nRows = res.length
                    let nCols = 3
                    let tBody = '<table class="table" >'
                    tBody += '<tr><td>Descrição</td><td>Solicitante</td><td>Data</td></tr>'
                    for(let i = 0; i < nRows; i++){
                        a = res[i][0]
                        b = res[i][1]
                        c = res[i][2]
                        let newRes = [a,b,c]
                        for(let j = 0; j < nCols; j++){
                            tBody += "<td>"
                            tBody += newRes[j]
                            tBody +="</td>"
                        }
                        //tBody += "<td>teste</td>"
                        tBody += "</tr>"
                    }
                    tBody += "</table>"
                    $("#resultado").html(tBody)
                }
            }
        })
    })
    //SET ATENDIMENTO
    $("#novo").submit(function(e){
        e.preventDefault()
        let form = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "./core/controller/ctlAtend.php?op=set",
            data: form,
            dataType: 'json',
            success: function(res){
                //alert(res)
                if(res == 'err-atend'){
                    $("p.alert-danger").html("Algo deu errado...");
                    $("div.error").slideDown(300).delay(2500).slideUp(300);
                }else{
                    $("p.alert-success").html("Atendimento registrado com sucesso.");
                    $("div.success").slideDown(300).delay(2500).slideUp(300);
                    $("#novo")[0].reset();
                }
            }
        })
    })
})