<?php
define('PROJECT_DIR', realpath(__DIR__ . '/..'));
define('PUBLIC_DIR', realpath(__DIR__));

require PROJECT_DIR . '/src/fun.php';
require PROJECT_DIR . '/src/app.php';

start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo with_config('app')['title'] ?></title>
  <?php echo vite('resources/app/main.js') ?>

</head>

<body>
  <noscript>
    <h1>Please enable javascript</h1>
  </noscript>
</body>

</html>
