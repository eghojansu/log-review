<?php

defined('CONFIG_FILE') || exit(0);

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

function with_config(Closure|string $key = null): mixed {
    static $config;

    if (null === $config && defined('CONFIG_FILE')) {
        $config = load_config(constant('CONFIG_FILE'));
    }

    if (is_string($key)) {
        return $config[$key] ?? null;
    }

    return $key ? $key($config ?? array()) : $config ?? array();
}

function authenticated() {
    return with_config(fn(array $config) => (
        isset($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW'])
        && 0 === strcmp($config['username'], $_SERVER['PHP_AUTH_USER'])
        && 0 === strcmp($config['password'], $_SERVER['PHP_AUTH_PW'])
    ));
}

function guard() {
    if (!authenticated()) {
        header('WWW-Authenticate: Basic realm="Protected area"');
        header('HTTP/1.0 401 Unauthorized');

        exit('Please enter your credentials.');
    }
}

function file_real(string|null $name, string|null $file): string|null {
    return with_config(
        fn(array $config) => (
            $name
            && $file
            && isset($config['directories'][$name][0])
            && file_exists($tmp = $config['directories'][$name][0] . '/' . $file)
        ) ? $tmp : null
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

        return listing_files($dir, $extensions);
    }));
}

function file_cursor(string $name, string $file, string $move): string|null {
    $files = files_from($name);
    $keys = array_keys($files);
    $found = array_search($file, $keys);
    $add = match($move) {
        'next' => 1,
        'prev' => -1,
        default => 0,
    };

    return $add ? $keys[$found + $add] : null;
}

function file_list(string|null $open, string|null $file, int $perPage = 20): array {
    return array_map(
        function(string $name) use ($open, $file, $perPage) {
            $files = $name === $open ? files_from($name) : array();
            $total = count($files);
            $pages = ceil($total / $perPage);
            $page = 0;
            $start = 0;
            $from = 0;
            $to = 0;

            if ($files) {
                $keys = array_keys($files);
                $pos = array_search($file, $keys);
                $page = ceil(($pos + 1) / $perPage);
                $start = ($page - 1) * $perPage;
                $from = $start + 1;
                $to = min($total, $start + $perPage);
            }

            return array(
                'name' => $name,
                'total' => $total,
                'pages' => $pages,
                'page' => $page,
                'files' => array_slice($files, $start, $perPage),
                'info' => $files ? "({$page}) {$from}-{$to} of {$total}" : null,
            );
        },
        array_keys(with_config('directories')),
    );
}

function url(array $args): string {
    return '?' . http_build_query($args);
}

// pure

function fixslash(string $txt): string {
    return strtr($txt, '\\', '/');
}

function to_array(string $line): array {
    return array_filter(array_map('trim', preg_split('/[\,]/', $line, -1, PREG_SPLIT_NO_EMPTY)));
}

function listing_files(string $dir, array $extensions): array {
    return array_reduce(
        glob($dir . '/*.{' . implode(',', $extensions) . '}', GLOB_BRACE),
        function (array $map, $file) {
            $map[basename($file)] = $file;

            return $map;
        },
        array(),
    );
}

function display_name(string $file, int $max): string {
    return substr($file, 0, $max) . (isset($file[$max]) ? '...' : '');
}

function dd(...$args): void {
    echo '<pre>';
    var_dump(...$args);
    echo '<pre>';
    exit(0);
}
