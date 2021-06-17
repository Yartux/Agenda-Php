<?php

/* creará registro */
if ($_POST['accion'] === 'crear') {
    /* llama bd */
    require_once('../funciones/bd.php');

    /* validación */
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

    try {
        $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $empresa, $telefono);
        $stmt->execute();
        if ($stmt->affected_rows === 1) {
            $respuesta = array(
                'creado' => true,
                'datos' => array(
                    'id' => $stmt->insert_id,
                    'nombre' => $nombre,
                    'empresa' => $empresa,
                    'telefono' => $telefono,
                )
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}

if ($_POST['accion'] === 'borrar') {
    require_once('../funciones/bd.php');
    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
    try {
        $stmt = $conn->prepare("DELETE FROM contactos WHERE id = (?)");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->affected_rows === 1) {
            $respuesta = array(
                'borrado' => true
            );
        } else{
            $respuesta = array(
                'borrado' => false
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }
    echo json_encode($respuesta);
}

if ($_POST['accion'] === 'editar') {
    /* llama bd */
    require_once('../funciones/bd.php');

    /* validación */
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
    try {
        $stmt = $conn->prepare("UPDATE contactos SET nombre = (?), empresa = (?), telefono = (?) WHERE id = (?)");
        $stmt->bind_param("sssi", $nombre, $empresa, $telefono, $id);
        $stmt->execute();
        if ($stmt->affected_rows === 1) {
            $respuesta = array(
                'editado' => true,
                'datos' => array(
                    'id' => $stmt->insert_id,
                    'nombre' => $nombre,
                    'empresa' => $empresa,
                    'telefono' => $telefono,
                )
            );
        }
        $stmt->close();
        $conn->close();
        echo json_encode($respuesta);
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }
}
