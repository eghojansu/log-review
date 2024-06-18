<?php
define('CONFIG_FILE', __DIR__ . '/config.ini');

include __DIR__ . '/fun.php';

guard();

$open = $_GET['dir'] ?? null;
$read = $_GET['file'] ?? null;
$move = $_GET['move'] ?? null;
$confirm = $_GET['confirm'] ?? null;
$deleted = $_GET['deleted'] ?? null;
$file = file_real($open, $read);

if ($file && $move && $newFile = file_cursor($open, $read, $move)) {
  $read = $newFile;
  $file = file_real($open, $read);
}

if ('DELETE' === ($_SERVER['REQUEST_METHOD'])) {
  header('Content-Type: application/json');

  $result = array(
    'message' => 'File could not be deleted',
    'next' => file_cursor($open, $read, 'next'),
  );

  if (unlink($file)) {
    $result['message'] = 'File has been removed';
    $result['deleted'] = $read;
  }

  echo json_encode($result);

  exit(0);
}

$fileContent = $file ? htmlspecialchars(file_get_contents($file)) : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Log Review</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js"></script>
</head>
<body>
  <div class="row">
    <div class="col file-list">
      <p>Directories:</p>
      <ul>
        <?php foreach (with_config('directories') as $dirName => $_): ?>
          <li>
            <a href="?dir=<?php echo $dirName?>"><?php echo $dirName ?></a>

            <?php if ($dirName === $open): ?>
              <ul>
                <?php foreach (files_from($dirName) as $fileName => $filePath): ?>
                  <li>
                    <a href="?dir=<?php echo $dirName?>&file=<?php echo $fileName ?>" title="<?php echo $fileName ?>" <?php echo $fileName == $read ? 'class="open"' : null ?>><?php echo display_name($fileName, 18) ?></a>
                  </li>
                <?php endforeach ?>

                <?php if (empty($fileName)): ?>
                  <li><em>No files</em></li>
                <?php endif ?>
              </ul>
            <?php endif ?>
          </li>
        <?php endforeach ?>
      </ul>
    </div>
    <div class="col">
      <?php if ($deleted): ?>
        <div class="deleted">
          File has been deleted: <?php echo $deleted ?>
        </div>
      <?php endif ?>
      <?php if ($file): ?>
        <div class="file-control">
          <button type="button" data-action="delete">Delete</button>
          <label><input type="checkbox" <?php echo $confirm ? 'checked' : null ?>> Confirm deletion</label>
          <button type="button" data-action="prev">Prev</button>
          <button type="button" data-action="next">Next</button>
        </div>
        <p><em><?php echo $file ?></em></p>
        <div class="file-content">
          <?php echo $fileContent ?>
        </div>
      <?php else: ?>
        <p><em>Please select any file</em></p>
      <?php endif ?>
    </div>
  </div>
</body>
</html>
