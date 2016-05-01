(define-easy-handler (print-request
                      :uri "/print-request/")
    ()
  (print (real-remote-addr))
  )