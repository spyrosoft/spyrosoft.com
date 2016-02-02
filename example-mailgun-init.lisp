(mailgun-sender:set-credentials
 :api-key "key-abcdefghijklmnopqrstuvwxyz012345"
 :api-public-key "pubkey-abcdefghijklmnopqrstuvwxyz012345"
 :from-email-address "noreply@example.com"
 :post-url "https://api.mailgun.net/v3/mailgun.example.com/messages")

(defvar *contact-form-recipient* "you@example.com")