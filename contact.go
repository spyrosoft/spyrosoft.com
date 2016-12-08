package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/julienschmidt/httprouter"
)

func contactSubmission(responseWriter http.ResponseWriter, request *http.Request, requestParameters httprouter.Params) {
	message := ""
	nameValue := request.PostFormValue("name")
	emailValue := request.PostFormValue("email")
	messageValue := request.PostFormValue("message")
	if nameValue != "" {
		message += "Name: " + nameValue + "\r\n\r\n"
	}
	if emailValue != "" {
		message += "From: " + emailValue + "\r\n\r\n"
	}
	if messageValue != "" {
		message += messageValue + "\r\n\r\n"
	}
	ipAddresses := strings.Split(request.Header.Get("x-forwarded-for"), ", ")
	message += "IP Address: " + ipAddresses[0]
	sendEmail(siteData.ReplyAddress, "Contact Submission - spyrosoft.com", message)
	fmt.Fprint(responseWriter, "{\"success\":true}")
}
