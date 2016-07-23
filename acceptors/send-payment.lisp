(defun payment-gateway-errors (payment-gateway-response-json)
  (let ((error-messages '()))
    (handler-case (jsown:val payment-gateway-response-json "id")
      (error nil
        (handler-case (push (jsown:val (jsown:val payment-gateway-response-json "error") "message") error-messages)
          (error nil (push "An error has occurred while obtaining your payment number from the payment gateway. This likely means that the payment gateway is temporarily down. You have not been charged. I recommend waiting and trying again. There isn't much else that can be done when this happens. Thank you for your patience." error-messages)))))
    error-messages
    ))

(defun stripe-payment (shopify-token payment-amount-in-cents)
  (let ((stripe-key
         (if (eq *live-or-dev* 'dev)
             *stripe-test-secret-key*
             *stripe-live-secret-key*)))
    (jsown:parse
     (flexi-streams:octets-to-string
      (drakma:http-request
       "https://api.stripe.com/v1/charges"
       :method :post
       :basic-authorization (list stripe-key "")
       :parameters (list (cons "amount" payment-amount-in-cents)
                         (cons "currency" "usd")
                         (cons "source" shopify-token)))))))

(define-easy-handler (send-payment
                      :uri "/send-payment-ajax/"
                      :default-request-type :post)
    (shopify-token payment-amount-in-cents)
  (let* ((payment-gateway-response (stripe-payment shopify-token payment-amount-in-cents))
         (error-messages (payment-gateway-errors payment-gateway-response)))
    (if error-messages
        (jsown:to-json (jsown:new-js ("success" :false)
                                     ("errors" error-messages)))
        (jsown:to-json (jsown:new-js ("success" :true))))
    ))