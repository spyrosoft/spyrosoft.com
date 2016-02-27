(ql:quickload :hunchentoot)

(defpackage :spyrosoft
	(:use :common-lisp :hunchentoot))

(in-package :spyrosoft)

(setf hunchentoot::*show-lisp-errors-p* t)

(defvar *hunchentoot-directory*
  (pathname (directory-namestring #.(or *compile-file-pathname* *load-truename*))))

(defvar spyrosoft-server
	(make-instance 'hunchentoot:easy-acceptor
								 :document-root *hunchentoot-directory*
								 :error-template-directory (merge-pathnames "web-root/error-templates/" *hunchentoot-directory*)
								 :access-log-destination (merge-pathnames "logs/access.log" *hunchentoot-directory*)
								 :message-log-destination (merge-pathnames "logs/message.log" *hunchentoot-directory*)
								 :port 8080))

(load "packages/mailgun.lisp")
(load "private/credentials.lisp")
(load "routes.lisp")

(hunchentoot:start spyrosoft-server)