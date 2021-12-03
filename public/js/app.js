$(document).ready(function(){
    //LOGIN
    $("#form-login").submit(function(e){
        e.preventDefault()
        let form = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "core/controller/login/ctlLogin.php?op=login",
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
            url: "core/controller/login/ctlLogin.php?op=logout",
            success: function(res){
                if(res == 'ok'){
                    window.location.href = "login.html"
                }
            }
        })
    })
    //GET ATENDIMENTO
    $("#busca").submit(function(e){
        e.preventDefault()
        let form = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "core/controller/ctlAtend.php?op=get",
            data: form,
            dataType: "JSON",
            success: function(res){
                alert(res)
            }
        })
    })
})