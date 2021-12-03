<?php
    include "dbVars.php";

    $con = mysqli_connect($host, $user, $pass, $bank);
    if(!mysqli_error($con)){
        //echo "Conectado ao banco.";
    }else{
        echo ("Erro ao conectar. " + mysqli_errno($con));
    }
?>