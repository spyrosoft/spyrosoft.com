(ql:quickload :hunchentoot)
(ql:quickload :cl-smtp)

(defpackage :spyrosoft
	(:use :common-lisp :hunchentoot))

(in-package :spyrosoft)

(setf hunchentoot::*show-lisp-errors-p* t)

(defvar *hunchentoot-directory*
  (pathname (directory-namestring #.(or *compile-file-pathname* *load-truename*))))

(defvar *web-root-directory* (merge-pathnames "web-root/" *hunchentoot-directory*))

(defvar spyrosoft-server
	(make-instance 'hunchentoot:easy-acceptor
								 :document-root *web-root-directory*
								 :error-template-directory (merge-pathnames "error-templates/" *web-root-directory*)
								 :access-log-destination (merge-pathnames "logs/access.log" *hunchentoot-directory*)
								 :message-log-destination (merge-pathnames "logs/message.log" *hunchentoot-directory*)
								 :port 8080))

(load "private/credentials.lisp")
(load "packages/cl-smtp.lisp")
(load "routes.lisp")

(hunchentoot:start spyrosoft-server)