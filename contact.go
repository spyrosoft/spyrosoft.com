package main

import (
	"bytes"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/julienschmidt/httprouter"
	"golang.org/x/crypto/openpgp"
	"golang.org/x/crypto/openpgp/armor"
	"golang.org/x/crypto/openpgp/packet"
)

func contactSubmission(responseWriter http.ResponseWriter, request *http.Request, requestParameters httprouter.Params) {
	if request.PostFormValue("token") != "FXa8T!jZpA" {
		fmt.Fprint(responseWriter, "{\"success\":true}")
		return
	}
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
	encrypted, err := encryptMessage(message)
	if err != nil {
		message = "Encryption Failed: " + err.Error() + "\n\n" + message
	} else {
		message = encrypted
	}
	sendEmail(siteData.ContactEmail, "Contact Submission - spyrosoft.com", message)
	fmt.Fprint(responseWriter, "{\"success\":true}")
}

func newClientSubmission(responseWriter http.ResponseWriter, request *http.Request, requestParameters httprouter.Params) {
	if request.PostFormValue("token") != "FXa8T!jZpA" {
		fmt.Fprint(responseWriter, "{\"success\":true}")
		return
	}
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
	encrypted, err := encryptMessage(message)
	if err != nil {
		message = "Encryption Failed: " + err.Error() + "\n\n" + message
	} else {
		message = encrypted
	}
	sendEmail(siteData.ContactEmail, "New Client - spyrosoft.com", message)
	fmt.Fprint(responseWriter, "{\"success\":true}")
}

func encryptMessage(message string) (encrypted string, err error) {
	privateKey, err := armor.Decode(
		bytes.NewBufferString(siteData.NoReplyKey),
	)
	if err != nil {
		return
	}
	if privateKey.Type != openpgp.PrivateKeyType {
		err = errors.New("from key type: " + privateKey.Type)
		return
	}

	fromEntity, err := openpgp.ReadEntity(
		packet.NewReader(privateKey.Body),
	)
	if err != nil {
		return
	}

	publicKey, err := armor.Decode(
		bytes.NewBufferString(siteData.ContactEmailKey),
	)
	if err != nil {
		return
	}

	toEntity, err := openpgp.ReadEntity(
		packet.NewReader(publicKey.Body),
	)
	if err != nil {
		return
	}

	buf := bytes.NewBuffer(nil)
	w, err := openpgp.Encrypt(buf, []*openpgp.Entity{toEntity}, fromEntity, nil, nil)
	if err != nil {
		return
	}
	_, err = w.Write([]byte(message))
	if err != nil {
		return
	}
	err = w.Close()
	if err != nil {
		return
	}

	encryptedBytes, err := ioutil.ReadAll(buf)

	buf = bytes.NewBuffer(nil)
	w, err = armor.Encode(buf, "PGP MESSAGE", map[string]string{})
	if err != nil {
		return
	}
	_, err = w.Write(encryptedBytes)
	if err != nil {
		return
	}
	err = w.Close()
	if err != nil {
		return
	}

	encrypted = string(buf.Bytes())
	return
}
