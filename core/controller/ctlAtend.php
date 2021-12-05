<?php
$op = $_GET['op'];
if($op == 'set'){
    session_start();
    $atend = [];
    include 'db/dbFunc.php';
    $atend['id_user'] = $_SESSION['id'];
    $atend['local'] = $_POST['local'];
    $atend['descricao'] = $_POST['descricao'];
    $atend['solicitante'] = $_POST['solicitante'];
    $a = setAtend($atend);
    if($a == 0){
        echo json_encode($a);
        //echo json_encode("err-set-atend");
    }else{
        echo json_encode($a); //Se salvar corretamente a função retorna 'ok', então basta escrever o retorno.
    }
}elseif($op == 'get'){
    session_start();
    include 'db/dbFunc.php';
    $busca = $_POST['busca'];
    //echo $busca;
    //echo json_encode($busca);
    $a = getAtend($busca, $_SESSION['id']);
    if($a === 0){
        echo json_encode('err-busca');
        //echo json_encode('err-busca');
    }else{
        //echo json_encode($a, JSON_UNESCAPED_UNICODE); //usando a opção json_unescaped_unicode permite os acentos
        echo json_encode($a);
    }
}