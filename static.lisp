(defvar *this-file* (load-time-value
										 (or #.*compile-file-pathname* *load-pathname*)))

(push (create-static-file-dispatcher-and-handler
			 "/"
			 (make-pathname :directory "/home/spyrosoft/hunchentoot/static" :name "index" :type "html" :version nil :defaults *this-file*)
			 "text/html")
			*dispatch-table*)

(push (create-static-file-dispatcher-and-handler
			 "/about/"
			 (make-pathname :directory "/home/spyrosoft/hunchentoot/static" :name "about" :type "html" :version nil :defaults *this-file*)
			 "text/html")
			*dispatch-table*)

(push (create-static-file-dispatcher-and-handler
			 "/contact/"
			 (make-pathname :directory "/home/spyrosoft/hunchentoot/static" :name "contact" :type "html" :version nil :defaults *this-file*)
			 "text/html")
			*dispatch-table*)

(push (create-folder-dispatcher-and-handler
			 "/css/"
			 (make-pathname :directory "/home/spyrosoft/hunchentoot/static/css" :name nil :type nil :version nil :defaults *this-file*)
			 "text/css")
			*dispatch-table*)

(push (create-folder-dispatcher-and-handler
			 "/js/"
			 (make-pathname :directory "/home/spyrosoft/hunchentoot/static/js" :name nil :type nil :version nil :defaults *this-file*)
			 "text/javascript")
			*dispatch-table*)

(push (create-folder-dispatcher-and-handler
			 "/images/"
			 (make-pathname :directory "/home/spyrosoft/hunchentoot/static/images" :name nil :type nil :version nil :defaults *this-file*)
			 nil)
			*dispatch-table*)

(push (create-static-file-dispatcher-and-handler
			 "/robots.txt"
			 (make-pathname :directory "/home/spyrosoft/hunchentoot/static/" :name "robots" :type "txt" :version nil :defaults *this-file*)
			 "text/plain")
			*dispatch-table*)