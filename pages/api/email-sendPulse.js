const sendpulse = require("sendpulse-api");

const API_USER_ID = process.env.SEND_PULSE_ID;
const API_SECRET = process.env.SEND_PULSE_SECRET;
``;
const TOKEN_STORAGE = "/tmp/";

export default function handler(req, res) {
  var answerGetter = function (data) {
    res.send(data);
  };

  sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
    // sendpulse.listAddressBooks(answerGetter);
    sendpulse.listSenders(answerGetter);
    // sendpulse.getBookInfo(answerGetter,	519743);
    // sendpulse.getEmailsFromBook(answerGetter,519743);
    // sendpulse.addEmails(answerGetter, 519743, [{email:'charleskasasira01@gmail.com',variables:{name: "Charles Kasasira"}}]);
    var email = {
      html: "hello",
      text: "What do you see",
      subject: "Seeing is believing",
      from: {
        name: "Ablestate",
        email: "hello@theablestate.com",
      },
      to: [
        {
          name: "Charles Kasasira",
          email: "charleskasasira01@gmail.com",
        },
      ],
      bcc: [
        {
          name: "Ablestate",
          email: "theablestate@gmail.com",
        },
      ],
    };
    // sendpulse.smtpSendMail(answerGetter,email);
    // sendpulse.getBalance(answerGetter,'USD');
    // sendpulse.smtpListIP(answerGetter);
    // sendpulse.listEmailTemplates(answerGetter);
    // sendpulse.getEmailInfo(answerGetter,519743,'theablestate.com');
    // sendpulse.getEmailGlobalInfo(answerGetter,'hello@theablestate.com');
    // sendpulse.smtpListAllowedDomains(answerGetter);
  });
}
