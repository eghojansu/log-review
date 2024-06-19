<?php

defined('PROJECT_DIR') || exit(0);

// Helpers here serve as example. Change to suit your needs.
const VITE_HOST = 'http://localhost:5133';

// For a real-world example check here:
// https://github.com/wp-bond/bond/blob/master/src/Tooling/Vite.php
// https://github.com/wp-bond/boilerplate/tree/master/app/themes/boilerplate

// you might check @vitejs/plugin-legacy if you need to support older browsers
// https://github.com/vitejs/vite/tree/main/packages/plugin-legacy



// Prints all the html entries needed for Vite

function vite(string $entry): string
{
    return "\n" . jsTag($entry)
        . "\n" . jsPreloadImports($entry)
        . "\n" . cssTag($entry);
}


// Some dev/prod mechanism would exist in your project

function isDev(string $entry): bool
{
    // This method is very useful for the local server
    // if we try to access it, and by any means, didn't started Vite yet
    // it will fallback to load the production files from manifest
    // so you still navigate your site as you intended!

    static $exists = null;
    if ($exists !== null) {
        return $exists;
    }
    $handle = curl_init(VITE_HOST . '/' . $entry);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_NOBODY, true);

    curl_exec($handle);
    $error = curl_errno($handle);
    curl_close($handle);

    return $exists = !$error;
}


// Helpers to print tags

function jsTag(string $entry): string
{
    $url = isDev($entry)
        ? VITE_HOST . '/' . $entry
        : assetUrl($entry);

    if (!$url) {
        return '';
    }
    if (isDev($entry)) {
        return '<script type="module" src="' . VITE_HOST . '/@vite/client"></script>' . "\n"
            . '<script type="module" src="' . $url . '"></script>';
    }
    return '<script type="module" src="' . $url . '"></script>';
}

function jsPreloadImports(string $entry): string
{
    if (isDev($entry)) {
        return '';
    }

    $res = '';
    foreach (importsUrls($entry) as $url) {
        $res .= '<link rel="modulepreload" href="'
            . $url
            . '">';
    }
    return $res;
}

function cssTag(string $entry): string
{
    // not needed on dev, it's inject by Vite
    if (isDev($entry)) {
        return '';
    }

    $tags = '';
    foreach (cssUrls($entry) as $url) {
        $tags .= '<link rel="stylesheet" href="'
            . $url
            . '">';
    }
    return $tags;
}


// Helpers to locate files

function getManifest(): array
{
    $content = file_get_contents(__DIR__ . '/dist/.vite/manifest.json');
    return json_decode($content, true) ?? array();
}

function assetUrl(string $entry): string
{
    $manifest = getManifest();

    return isset($manifest[$entry])
        ? '/dist/' . $manifest[$entry]['file']
        : '';
}

function importsUrls(string $entry): array
{
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['imports'])) {
        foreach ($manifest[$entry]['imports'] as $imports) {
            $urls[] = '/dist/' . $manifest[$imports]['file'];
        }
    }
    return $urls;
}

function cssUrls(string $entry): array
{
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['css'])) {
        foreach ($manifest[$entry]['css'] as $file) {
            $urls[] = '/dist/' . $file;
        }
    }
    return $urls;
}

// config

function with_config(Closure|string $key = null): mixed {
    static $config;

    if (null === $config && defined('PROJECT_DIR')) {
        $config = load_config(constant('PROJECT_DIR') . '/config.ini');
    }

    if (is_string($key)) {
        return $config[$key] ?? null;
    }

    return $key ? $key($config ?? array()) : $config ?? array();
}

function basic_authenticated() {
    return with_config(fn(array $config) => (
        isset($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW'])
        && 0 === strcmp($config['username'], $_SERVER['PHP_AUTH_USER'])
        && 0 === strcmp($config['password'], $_SERVER['PHP_AUTH_PW'])
    ));
}

function basic_guard() {
    if (!basic_authenticated()) {
        header('WWW-Authenticate: Basic realm="Protected area"');
        header('HTTP/1.0 401 Unauthorized');

        exit('Please enter your credentials.');
    }
}

function load_config(string $path): array {
    $fallback = array(
        'extensions' => array('log', 'txt'),
        'directories' => array(),
    );

    if (file_exists($path)) {
        $config = parse_ini_file($path, true, INI_SCANNER_TYPED);

        array_walk(
            $config,
            function(&$value, $key) {
                if ('extensions' == $key) {
                    $value = is_string($value) ? to_array($value) : (
                        is_array($value) ? $value : array()
                    );
                } elseif ('directories' == $key) {
                    $value = is_array($value) ? array_map(
                        function ($value) {
                            $parts = is_string($value) ? to_array($value) : (
                                is_array($value) ? $value : array()
                            );

                            return array(fixslash(array_shift($parts)), $parts);
                        },
                        $value,
                    ) : array();
                }
            },
        );
    }

    return ($config ?? array()) + $fallback;
}

function file_real(string|null $name, string|null $read): string|null {
    return with_config(
        fn(array $config) => (
            $name
            && $read
            && isset($config['directories'][$name][0])
            && file_exists($file = $config['directories'][$name][0] . '/' . $read)
        ) ? $file : null
    );
}

function files_from(string $name): array {
    static $caches = array();

    return $caches[$name] ?? ($caches[$name] = with_config(function(array $config) use ($name) {
        $extensions = $config['extensions'];
        $map = $config['directories'][$name] ?? array();
        $dir = $map[0] ?? null;
        $addExtensions = $map[1] ?? null;

        if (!$dir) {
            return array();
        }

        if ($addExtensions) {
            array_push($extensions, ...$addExtensions);
        }

        return glob($dir . '/*.{' . implode(',', $extensions) . '}', GLOB_BRACE);
    }));
}

function files_paginate(string $name, string|null $search, int $page = 1, int $size = 20): array {
    $files = files_from($name);

    if ($search) {
        $files = array_filter(
            $files,
            fn($file) => str_contains(basename($file), $search),
        );
    }

    $total = count($files);
    $pages = ceil($total / $size);
    $page = max(1, min($pages, $page));
    $start = 0;
    $from = 0;
    $to = 0;
    $items = array();

    if ($files) {
        $start = ($page - 1) * $size;
        $from = $start + 1;
        $to = min($total, $start + $size);
        $items = array_map(
            fn($file) => array(
                'name' => basename($file),
                'path' => $file,
                'size' => filesize($file),
                'mtime' => date('Y-m-d H:i:s', filemtime($file))
            ),
            array_slice($files, $start, $size),
        );
    }

    return compact('total', 'pages', 'size', 'from', 'to', 'page', 'items');
}

function send_json(array|object|string $data): void {
    header('Content-Type: application/json');

    echo is_string($data) ? $data : json_encode($data);
    exit(0);
}

function receive_json(): array {
    $input = file_get_contents('php://input');

    return $input ? json_decode($input, true) : array();
}

// pure

function fixslash(string $txt): string {
    return strtr($txt, '\\', '/');
}

function to_array(string $line): array {
    return array_filter(array_map('trim', preg_split('/[\,]/', $line, -1, PREG_SPLIT_NO_EMPTY)));
}

function dd(...$args): void {
    echo '<pre>';
    var_dump(...$args);
    echo '<pre>';
    exit(0);
}
