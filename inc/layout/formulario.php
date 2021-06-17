<?php if (!isset($contacto)) {
    $contacto = null;
}?>
<div class="campos">
        <?php if ($contacto) {
            echo '<input id="idcontacto" type="hidden" value="' . $contacto['id'] . '">';
        } ?>
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input id="nombre" type="text" placeholder="<?php echo ($contacto) ?  $contacto['nombre'] : 'Nombre Contacto' ?>"
        value="<?php echo ($contacto) ?  $contacto['nombre'] : '' ?>">
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input type="text" placeholder="<?php echo ($contacto) ?  $contacto['empresa'] : 'Empresa' ?>" id="empresa" 
        value="<?php echo ($contacto) ?  $contacto['empresa'] : '' ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input type="tel" placeholder="<?php echo ($contacto) ?  $contacto['telefono'] : 'Teléfono' ?>" id="telefono" 
        value="<?php echo ($contacto) ?  $contacto['telefono'] : '' ?>">
    </div>
</div>
<div class="campo enviar">
    <input type="hidden" value="<?php echo ($contacto) ?  'editar' : 'crear' ?>" id="accion">
    <input type="submit" value="<?php echo ($contacto) ?  'Editar' : 'Añadir' ?>">
</div>