<?php
include 'inc/funciones/funciones.php';
include 'inc/layout/header.php';
?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
    <button id="darkmode"><i class="far fa-moon"></i></button>
</div>

<div class="bg-secu contenedor sombra">
    <form action="#" id="contacto">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>
        <?php include 'inc/layout/formulario.php' ?>
    </form>
</div>
<div class="contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <?php $contactos = obtenerContactos(); ?>
        <input type="text" id="buscar" class="buscador" placeholder="Buscar Contactos...">
        <p class="total-contactos"><span><?php 
            if ($contactos->num_rows) {
            echo $contactos->num_rows;}
            else {echo "0";}
            ?></span> Contactos</p>
        <div class="contenedor-tabla">
            <table class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if ($contactos->num_rows) {
                        foreach ($contactos as $contacto) {
                    ?>
                            <tr id="contactoTr<?php echo $contacto['id']?>">
                                <td><?php echo $contacto['nombre'] ?></td>
                                <td><?php echo $contacto['empresa'] ?></td>
                                <td><?php echo $contacto['telefono'] ?></td>
                                <td>
                                    <a href="editar.php?id=<?php echo $contacto['id'] ?>" class="btn-editar btn">
                                        <i class="fas fa-pencil-alt"></i>
                                    </a>
                                    <button data-id="<?php echo $contacto['id'] ?>" class="btn-borrar btn">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>

                    <?php

                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php include 'inc/layout/footer.php'; ?>