<?php
    //Configurando a timezone do banco de dados
    date_default_timezone_set('America/Belem');

    //Função de checar o login
    function getLogin($login){
        include_once "dbCon.php";
        $a = sprintf(
            "SELECT id, nome, senha FROM users WHERE login = '%s'",
            mysqli_real_escape_string($con, $login)
        );
        $query = mysqli_query($con, $a);
        if(!$query){
            return 0;
        }else{
            $return = mysqli_fetch_array($query);
            return $return;
        }
        mysqli_close($con);
    }

    //ATENDIMENTOS
    //Set
    function setAtend($atend){
        include_once "dbCon.php";
        $a = sprintf(
            "INSERT INTO atendimentos (id_user, local, descricao, solicitante)
            VALUES ('%s', '%s', '%s', '%s')",
            $atend['id_user'],
            $atend['local'],
            $atend['descricao'],
            $atend['solicitante']
        );
        $query = mysqli_query($con, $a);
        if(!$query){
            echo $query;
            //return 0;
        }else{
            return 'ok';
        }
        mysqli_close($con);
    }
    //Get by local, solicitante
    function getAtend($atend){
        include_once "dbCon.php";
        $a = sprintf(
            "SELECT descricao, solicitante, data_criacao 
            FROM atendimentos 
            WHERE local = '%s'", $atend
        );
        $query = mysqli_query($con, $a);
        //echo $a;
        if(mysqli_num_rows($query)< 1){
            //echo "not query";
            return 0;
        }else{
            $return = mysqli_fetch_all($query);
            //echo implode(" ", $return);
            return $return;
        }
        mysqli_close($con);
    }
    //Update
    function updateAtend($atend){
        include_once "dbCon.php";
        $a = sprintf(
            "UPDATE atendimentos
            SET local = '%s', descricao = '%s', solicitante = '%s'
            WHERE id = '%s'",
            $atend['local'],
            $atend['descricao'],
            $atend['solicitante'],
            $atend['id']
        );
        $query = mysqli_query($con,$a);
        if(!$query){
            return 0;
        }else{
            return 'ok';
        }
        mysqli_close($con);
    }
    //Delete by id
    function deleteAtendById($atend){
        include_once "dbCon.php";
        $a = sprintf(
            "DELETE FROM atendimentos WHERE id = '%s'",
            $atend
        );
        $query = mysqli_query($con,$a);
        if(!$query){
            return 0;
        }else{
            return 'ok';
        }
        mysqli_close($con);
    }
?>