package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
)

type SuccessMessage struct {
	Success bool
	Message string
}

func (successMessage *SuccessMessage) SetMessage(success bool, message string) {
	successMessage.Success = success
	successMessage.Message = message
}

func paymentSubmission(responseWriter http.ResponseWriter, request *http.Request, requestParameters httprouter.Params) {
	successMessage := SuccessMessage{true, ""}
	stripeToken := request.PostFormValue("stripe-token")
	paymentAmountInCents, _ := strconv.Atoi(request.PostFormValue("payment-amount-in-cents"))
	if siteData.LiveOrDev == "live" {
		stripe.Key = siteData.StripeLiveSecretKey
	} else {
		stripe.Key = siteData.StripeTestSecretKey
	}
	chargeParams := &stripe.ChargeParams{
		Amount:   uint64(paymentAmountInCents),
		Currency: "usd",
		Desc:     "$ - spyrosoft.com",
	}
	chargeParams.SetSource(stripeToken)
	_, err := charge.New(chargeParams)
	if err != nil {
		successMessage.SetMessage(false, err.Error())
	}
	json.NewEncoder(responseWriter).Encode(successMessage)
}
