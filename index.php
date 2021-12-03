<?php
    session_start();
    if(!isset($_SESSION['id'])){
        header("location: login.html");
    }
    if($_COOKIE['login'] != 'acessoGarantido'){
        header('location: login.html');
    }
    $nome = $_SESSION['nome'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="public/css/bootstrap.css">
    <link rel="stylesheet" href="public/css/style.css">
    <script src="public/js/jquery-3.6.0.js"></script>
    <script src="public/js/bootstrap.js"></script>
    <script src="public/js/app.js"></script>
    <script src=""></script>
    <title>SiA-TI</title>
</head>
<body class="mt-4" style="background-color:#f1f1f1">
    <div class="container text-center" style="background-color:#f1f1f1">
        <div class="top-barra">
            <div class="row">
                <div class="col"><h3>Bem-vindo, <?php echo($nome); ?></h3></div>
            </div>
        </div>
        <div class="barra my-2 mx-2">
            <a class="btn btn-secondary mx-1 my-1" href="index.php?pg=home">Home</a>
            <a class="btn btn-secondary mx-1 my-1" href="index.php?pg=atend">Atendimentos</a>
            <a class="btn btn-secondary mx-1 my-1" href="index.php?pg=admin">Administração</a>
            <button id="logout" class="btn btn-warning mx-1 my-1">Sair</button>
        </div>
        <div>
            <?php 
            
                $pg = $_GET['pg'];

                if($pg == 'atend'){
                    include "core/views/atendimento.html";
                }elseif($pg == 'admin'){
                    include "core/views/administracao.html";
                }elseif($pg == 'home' || $pg == ''){
                    include "core/views/home.html";
                }
            
            // include __DIR__ . "/core/views/home.html" 
            
            ?>
        </div>
        <div>
            <?php //include __DIR__ . "/core/controller/db/dbCon.php" ?>
        </div>

        <footer><p><?php echo(date('Y')); ?>. Jamil Pinheiro. Todos os direitos reservados</p></footer>
    </div>

</body>
</html>