<?php
    //Configurando a timezone do banco de dados
    date_default_timezone_set('America/Belem');

    //Função de checar o login
    function getLogin($login){
        include_once "dbCon.php";
        $a = sprintf("SELECT id, nome, senha FROM users WHERE login = '%s'",
            mysqli_real_escape_string($con, $login));
        $query = mysqli_query($con, $a);
        if(!$query){
            return 0;
        }else{
            $return = mysqli_fetch_array($query);
            return $return;
        }
        mysqli_close($con);
    }
?>