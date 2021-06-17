<?php
include 'inc/layout/header.php';
include 'inc/funciones/funciones.php';

$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
if (!$id) {
    die('No es válido');
}
$contacto = obtenerContacto($id)->fetch_assoc();
?>

<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1 id="h1edit">Editar Contacto</h1>
    </div>
    <button id="darkmode"><i class="far fa-moon"></i></button>
</div>

<div class="bg-secu contenedor sombra">
    <form action="#" id="contacto">
        <legend>Edite el Contacto <span></span></legend>
        <?php include 'inc/layout/formulario.php' ?>
    </form>
</div>

<?php include 'inc/layout/footer.php' ?>