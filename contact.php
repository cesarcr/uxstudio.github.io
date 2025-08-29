
<?php
// PHP 8+ contacto - envía correo a cruizcassola@gmail.com
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Honeypot
if (!empty($_POST['company'])) {
  echo json_encode(['ok' => false, 'msg' => 'spam']); exit;
}

$nombre = trim($_POST['nombre'] ?? '');
$email  = trim($_POST['email'] ?? '');
$tipo   = trim($_POST['tipo'] ?? '');
$mensaje= trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $email === '' || $tipo === '') {
  echo json_encode(['ok' => false, 'msg' => 'Campos obligatorios']); exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['ok' => false, 'msg' => 'Email inválido']); exit;
}

// Saneamos para cabeceras
$clean = fn($s) => preg_replace('/[\r\n]+/', ' ', strip_tags($s));

$to = 'cruizcassola@gmail.com';
$subject = 'correo de UXstudio';
$body = "Nombre: {$clean($nombre)}\nEmail: {$clean($email)}\nTipo de proyecto: {$clean($tipo)}\n\nMensaje:\n{$mensaje}\n";
$headers = [
  'From' => 'no-reply@uxstudio.example',
  'Reply-To' => $clean($email),
  'Content-Type' => 'text/plain; charset=UTF-8'
];

$headers_str = '';
foreach ($headers as $k => $v) {
  $headers_str .= "$k: $v\r\n";
}

// Enviar
$sent = @mail($to, $subject, $body, $headers_str);

echo json_encode(['ok' => (bool)$sent]);
