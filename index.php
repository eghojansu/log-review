<?php
define('CONFIG_FILE', __DIR__ . '/config.ini');
define('RELEASE_VERSION', 'v20240618153100');

include __DIR__ . '/fun.php';

guard();

$open = $_GET['dir'] ?? null;
$read = $_GET['file'] ?? null;
$move = $_GET['move'] ?? null;
$confirm = $_GET['confirm'] ?? null;
$deleted = $_GET['deleted'] ?? null;
$success = $_GET['success'] ?? null;
$perPage = max(10, min(50, intval($_GET['size'] ?? 20)));
$file = file_real($open, $read);

if ($file && $move && $newFile = file_cursor($open, $read, $move)) {
  $read = $newFile;
  $file = file_real($open, $read);
}

if ('DELETE' === ($_SERVER['REQUEST_METHOD'])) {
  header('Content-Type: application/json');

  $result = array(
    'success' => 0,
    'next' => file_cursor($open, $read, 'next'),
    'deleted' => $read,
  );

  if (is_writable($file) && unlink($file)) {
    $result['success'] = 1;
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
  <link rel="stylesheet" href="style.css?<?php echo RELEASE_VERSION ?>">
  <script src="script.js?<?php echo RELEASE_VERSION ?>"></script>
</head>
<body>
  <div class="row">
    <div class="col file-list">
      <p>Directories:</p>
      <p>
        Pages
        <?php foreach (range(10, 50, 10) as $size): ?>
          | <a href="<?php echo url(array('dir' => $open, 'size' => $size)) ?>" <?php echo $size == $perPage ? 'class="open"' : null ?>><?php echo $size ?></a>
        <?php endforeach ?>
      </p>
      <ul>
        <?php foreach (file_list($open, $read, $perPage) as $item): ?>
          <li>
            <a href="<?php echo url(array('dir' => $item['name'], 'size' => $perPage)) ?>"><?php echo $item['name'] ?> (<?php echo $item['info'] ?>)</a>

            <ul>
              <?php foreach ($item['files'] as $fileName => $filePath): ?>
                <li>
                  <a href="<?php echo url(array('dir' => $item['name'], 'file' => $fileName, 'size' => $perPage)) ?>" title="<?php echo $fileName ?>" <?php echo $fileName == $read ? 'class="open"' : null ?>><?php echo display_name($fileName, 18) ?></a>
                </li>
              <?php endforeach ?>

              <?php if (empty($item['files'])): ?>
                <li><em>No files</em></li>
              <?php endif ?>
            </ul>
          </li>
        <?php endforeach ?>
      </ul>
      <br>
      <br>
    </div>
    <div class="col">
      <?php if ($deleted): ?>
        <div class="deleted">
          File delete: <?php echo $deleted ?> (<?php echo 1 == $success ? 'Success' : 'Failed' ?>)
        </div>
      <?php endif ?>
      <?php if ($file): ?>
        <div class="file-control" data-current="<?php echo $read ?>">
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
