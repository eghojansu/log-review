<?php

defined('PROJECT_DIR') || exit(0);

function start(): void {
    basic_guard();

    $route = strtolower(
        $_SERVER['REQUEST_METHOD'] . '_' . ($_GET['action'] ?? 'default')
    );

    match($route) {
        'post_init' => loadInitials(),
        'post_directory' => loadDirectory(),
        'post_file' => loadFile(),
        'post_delete' => handleDelete(),
        default => handleDefault($route),
    };
}

function handleDefault(string $route): void {
    if ('get_default' === $route) {
        return;
    }

    header('HTTP/1.0 404 Not Found');
    exit(0);
}

function loadInitials(): void {
    $config = with_config();
    $data = array(
        'directories' => array_keys($config['directories']),
    );

    send_json($data);
}

function loadDirectory(): void {
    $name = $_GET['directory'] ?? null;
    $search = $_GET['search'] ?? null;
    $page = intval($_GET['page'] ?? 0);
    $size = intval($_GET['size'] ?? 10);

    $files = $name ? files_paginate($name, $search, $page, $size) : array();

    send_json($files);
}

function loadFile(): void {
    $open = $_GET['directory'] ?? null;
    $read = $_GET['file'] ?? null;
    $file = file_real($open, $read);

    $data = array(
        'name' => $read,
        'content' => $file ? file_get_contents($file) : null,
        'exists' => !!$file,
    );

    send_json($data);
}

function handleDelete(): void {
    $data = receive_json();
    $deletes = $data['files'] ?? null;
    $open = $_GET['delete'] ?? null;
    $deleted = 0;
    $total = 0;

    if ($open && $deletes && is_array($deletes)) {
        $total = count($deletes);

        array_walk(
            $deletes,
            function ($read) use (&$deleted, $open) {
                $file = file_real($open, $read);

                if (is_writable($file) && unlink($file)) {
                    $deleted++;
                }
            },
        );
    }

    $result = array(
        'success' => $deleted > 0,
        'message' => match(true) {
            $deleted < 1, $total < 1 => 'No file has been deleted',
            $deleted < $total => 'Some file has been deleted (' . $deleted . ')',
            default => 'File has been deleted (' . $deleted . ')',
        },
    );

    send_json($result);
}
