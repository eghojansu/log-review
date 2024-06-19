<?php

defined('PROJECT_DIR') || exit(0);

// assets

function vite(string $entry): string {
    return vite_js($entry) . vite_preloads($entry) . vite_css($entry);
}

function vite_host(string $path = null): string {
    return rtrim(with_config('vite')['host'] ?? 'http://localhost:5133', '/') . '/' . ltrim($path, '/');
}

/**
 * Check if vite development active
 *
 * This method is very useful for the local server.
 * if we try to access it, and by any means, didn't started Vite yet
 * it will fallback to load the production files from manifest
 * so you still navigate your site as you intended!
 *
 * @param string $entry
 *
 * @return bool
 */
function vite_dev(string $entry): bool {
    static $dev;

    if (null !== $dev) {
        return $dev;
    }

    $dev = with_config('vite')['development'] ?? false;

    if (!$dev) {
        return $dev;
    }

    $handle = curl_init(vite_host($entry));

    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_NOBODY, true);
    curl_exec($handle);

    $dev = !curl_errno($handle);

    curl_close($handle);

    return $dev;
}

function vite_js(string $entry): string {
    $vite = '';

    if (vite_dev($entry)) {
        $url = vite_host($entry);

        if ($url) {
            $vite = tag('script', array('type' => 'module', 'src' => vite_host('@vite/client')));
        }
    } else {
        $url = vite_asset($entry);
    }

    return $url ? $vite . tag('script', array('type' => 'module', 'src' => $url)) : '';
}

function vite_preloads(string $entry): string {
    return vite_dev($entry) ? '' : array_reduce(
        vite_manifest($entry, 'imports', $vite) ?? array(),
        fn(string $line, string $import) => $line . tag('link', array(
            'rel' => 'modulepreload',
            'href' => $vite[$import]['file'],
        ), false),
        '',
    );
}

function vite_css(string $entry): string {
    return vite_dev($entry) ? '' : array_reduce(
        vite_manifest($entry, 'css') ?? array(),
        fn(string $line, string $url) => $line . tag('link', array(
            'rel' => 'stylesheet',
            'href' => $url,
        ), false),
        '',
    );
}

function vite_manifest(string $entry = null, string $key = null, array &$vite = null): mixed {
    static $manifest;

    if (null === $manifest) {
        $file = PUBLIC_DIR . '/manifest.json';
        $manifest = file_exists($file) ? json_decode(file_get_contents($file), true) : array();
    }

    $vite = $manifest;

    return match(true) {
        !$entry => $manifest,
        !$key => $manifest[$entry] ?? null,
        default => $manifest[$entry][$key] ?? null,
    };
}

function vite_asset(string $entry): string {
    return vite_manifest($entry, 'file') ?? '';
}

// html

function tag(string $name, array|string $attrs = null, array|string|bool $content = null): string {
    return (
        '<' . $name . tag_attrs($attrs) . match($content) {
            // auto-close
            true => ' />',
            // non-closed
            false => '>',
            // process content
            default => '>' . (
                (
                    is_array($content) ? implode(
                        '',
                        array_map(
                            fn(array $args) => tag(...$args),
                            $content,
                        )
                    ) : $content
                ) . '</' . $name . '>'
            )
        }
    );
}

function tag_attrs(array|string|null $attrs): string {
    return match(true) {
        !$attrs => '',
        is_string($attrs) => ' ' . trim($attrs),
        is_array($attrs) => array_reduce(
            array_keys($attrs),
            function (string $line, $attr) use ($attrs) {
                $value = $attrs[$attr];

                if (is_numeric($attr)) {
                    $attr = $value;
                    $value = true;
                }

                if (!is_string($attr) || null === $value || false === $value) {
                    return $line;
                }

                $line .= ' ' . $attr;

                if (is_scalar($value)) {
                    $line .= '="' . $value . '"';
                }

                return $line;
            },
            '',
        ),
        default => '',
    };
}

// auth

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

// concept

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
