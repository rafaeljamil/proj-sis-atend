<?php
    $op = $_GET["op"];
    if($op =='login'){
        setcookie("login"," ");
        session_start();
        $login = $_POST['login'];
        $pass = $_POST['pass'];

        include "../db/dbFunc.php";

        $a = getLogin($login);
        if($a == 0){
            echo 'err-login';
        }else{
            if(password_verify($pass, $a['senha'])){
                echo 'ok';
                $firstName = explode(" ", $a['nome']);
                setcookie("login", "acessoGarantido", time() + (60 * 60), "/");

                $_SESSION['nome'] = $firstName[0];
                $_SESSION['id'] = $a['id'];
            }
        }
    }
    if($op == 'logout'){
        session_start();
        setcookie("login", "sessaoEncerrada",time() -1, "/");
        session_destroy();
        echo 'ok';
    }
?>