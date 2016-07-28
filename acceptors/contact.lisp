(defun send-contact-message (name email message)
  (when (not (equal "" name))
    (setq message
          (concatenate 'string message
                       (format nil "~%~%Name: ~A" name))))
  (when (not (equal "" email))
    (setq message
          (concatenate 'string message
                       (format nil "~%~%Contact Info: ~A" email))))
  (setq message
        (concatenate 'string message
                     (format nil "~%~%IP Address: ~A" (real-remote-addr))))
  (handler-case
      (cl-smtp:send-email *outgoing-email-host*
                      *contact-form-sender*
                      *contact-form-recipient*
                      "New message via spyrosoft.com"
                      message
                      :ssl :tls
											:authentication (list
                                       :login
                                       *outgoing-email-user*
                                       *outgoing-email-pass*)
                      :extra-headers '(("User-Agent" . ("Mozilla/5.0 (X11; Linux x86_64; rv:38.0) Gecko/20100101
 Thunderbird/38.6.0"))))
    (error nil nil)
    ))

(define-easy-handler (contact-form
                      :uri "/contact-ajax/"
                      :default-request-type :post)
    (name email message)
  (if message
      (progn
        (if (send-contact-message name email message)
            "{\"success\":true}"
            "{\"success\":false,\"error\":\"The message sending process failed. Please notify Bennett by other means if you can.\"}"))
      "{\"success\":false,\"error\":\"The message field is required.\"}"))