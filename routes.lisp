(load "utilities/routing.lisp")

(route-file "/generate-clementine-playlists/" "generate-clementine-playlists/" "index" "html" "text/html")
(route-directory "/generate-clementine-playlists/css/" "generate-clementine-playlists/css/" "text/css")
(route-directory "/generate-clementine-playlists/js/" "generate-clementine-playlists/js/" "text/javascript")

(load "acceptors/contact.lisp")

;; Route / to index.html and serve it as text/html
(route-file "/" "/" "index" "html" "text/html")

;; Route everything in /css/ to the /css directory and serve it as text/html
(route-directory "/css/" "css/" "text/css")

;; Route everything in /js/ to the /js directory and serve it as text/javascript
(route-directory "/js/" "js/" "text/javascript")

;; Route everything in /images/ to the /images directory and serve it as whatever mime type is appropriate
(route-directory "/images/" "images/")

;; Route /robots.txt to the actual file and serve it as text/plain
(route-file "/robots.txt" "/" "robots" "txt" "text/plain")