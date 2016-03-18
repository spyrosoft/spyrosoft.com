(in-package :cl-smtp)

(fmakunbound 'send-mail-headers)

(defun send-mail-headers (stream 
                          &key from to cc reply-to 
                          extra-headers display-name subject 
                          (external-format :utf-8))
  "Send email headers according to the given arguments to the SMTP
   server connected to on STREAM.  The server is expected to have
   previously accepted the DATA SMTP command."
  (write-to-smtp stream (format nil "Date: ~A" (get-email-date-string)))
  (if display-name
      (write-to-smtp stream (format nil "From: ~A <~A>" 
                                    (rfc2045-q-encode-string 
                                     display-name :external-format external-format)
                                    from))
    (write-to-smtp stream (format nil "From: ~A" from)))
  (write-to-smtp stream (format nil "To: ~{ ~a~^,~}" to))
  (when cc
    (write-to-smtp stream (format nil "Cc: ~{ ~a~^,~}" cc)))
  (write-to-smtp stream (format nil "Subject: ~A" 
                                (rfc2045-q-encode-string 
                                 subject :external-format external-format)))
  (when reply-to
    (write-to-smtp stream (format nil "Reply-To: ~A" 
                                  (rfc2045-q-encode-string 
                                   reply-to :external-format external-format))))
  (when (and extra-headers
             (listp extra-headers))
    (dolist (l extra-headers)
      (write-to-smtp stream 
                     (format nil "~A: ~{~a~^,~}" (car l) (rest l)))))
  (write-to-smtp stream "Mime-Version: 1.0"))