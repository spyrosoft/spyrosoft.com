(define-easy-handler (contact-form
                      :uri "/contact-ajax/"
                      :default-request-type :post)
    (name email message)
  (if message
      (progn
        (mailgun:send-message
         *contact-form-recipient*
         "spyrosoft.com/contact"
         (format nil "~A~%~%From: ~A <~A>~%~%IP Address: ~A" message name email (real-remote-addr)))
        "{\"success\":true}")
      "{\"success\":false}")
  )