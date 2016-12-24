package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/julienschmidt/httprouter"
)

type SiteData struct {
	LiveOrDev             string            `json:"live-or-dev"`
	URLPermanentRedirects map[string]string `json:"url-permanent-redirects"`
	NoReplyAddressName    string            `json:"no-reply-address-name"`
	NoReplyAddress        string            `json:"no-reply-address"`
	NoReplyPassword       string            `json:"no-reply-password"`
	Host                  string            `json:"no-reply-host"`
	Port                  string            `json:"no-reply-port"`
	ReplyAddress          string            `json:"reply-address"`
	StripeTestSecretKey   string            `json:"stripe-test-secret-key"`
	StripeLiveSecretKey   string            `json:"stripe-live-secret-key"`
}

var (
	webRoot        = "awestruct/_site"
	siteData       = SiteData{}
	siteDataLoaded = false
)

func main() {
	loadSiteData()
	router := httprouter.New()
	router.POST("/contact-ajax/", contactSubmission)
	router.POST("/send-payment-ajax/", paymentSubmission)
	router.POST("/what-is-my-ip-address/", whatIsMyIPAddress)
	router.NotFound = http.HandlerFunc(requestCatchAll)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func whatIsMyIPAddress(responseWriter http.ResponseWriter, request *http.Request, requestParameters httprouter.Params) {
	ipAddresses := strings.Split(request.Header.Get("x-forwarded-for"), ", ")
	fmt.Fprint(responseWriter, ipAddresses[0])
}
