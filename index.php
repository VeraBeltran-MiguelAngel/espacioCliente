<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost:3306";
$usuario = "olympus";
$contrasenia = "wLbLYCRckNzK2yk0";
$nombreBaseDatos = "olympus";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

if (isset($_GET["credenciales"])) {
    // echo 'Hola estamos validando tus datos';
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    // $password_hash = password_hash($data->password, PASSWORD_DEFAULT);
    $pass = $data->password;

    $consulta = "SELECT * FROM Cliente WHERE email='" . $username . "' and pass='" . $pass . "'";
    // echo $consulta;
    $sqlData = mysqli_query(
        $conexionBD,
        $consulta
    );
    if (mysqli_num_rows($sqlData) > 0) { //Usuario existe en la tabla Clientes
        //Validar que usuario exista se encuentre en la tabla detalle cliente
        mysqli_next_result($conexionBD);//sirve para ejecutar el siguiente query en caso de haber 2 o más
        $query = "SELECT dm.idDetMem FROM DetalleMembresia AS dm, Cliente AS c WHERE dm.Cliente_ID_Cliente=c.ID_Cliente AND c.pass='".$pass."' AND c.email='".$username."'";
        $existDetalleMmebresia = mysqli_query($conexionBD, $query);

        if(mysqli_num_rows($existDetalleMmebresia) > 0){ //Validar si existe 
            $userData = mysqli_fetch_all($sqlData, MYSQLI_ASSOC);
            echo json_encode($userData);
            exit;
        } else { //En caso de no existir el usuario dentro de la tabla detalle membresia
            http_response_code(401);
            echo json_encode(["message" => "Cuenta inactiva"]);
            exit;
        }
        
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Login invalido"]);
        exit;
    }
}