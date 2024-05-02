// const express = require("express");
// const app = express();
// const nodemailer = require("nodemailer");
// const Mailgen = require('mailgen');

// let regMail = (role, person) => {
//     return new Promise((resolve, reject) => {
//         let config = {
//             service: 'gmail',
//             auth: {
//                 user: "rxshoesonline@gmail.com",
//                 pass: "djxt npbw mbmd ftbc" // Use the generated app password here
//             }
//         };
//         let transporter = nodemailer.createTransport(config);

//         let MailGenerator = new Mailgen({
//             theme: "salted", // Using "salted" theme for a modern and stylish look
//             product: {
//                 name: "Rx ecommerce",
//                 link: 'https://mailgen.js/'
//             }
//         });

//         let response = {
//             body: {
//                 name: person,
//                 intro: Thank you for registering on our Rx E-commerce website as ${role}.,
//                 table: {
//                     data: [
//                         {
//                             item: "Rebook Green Sneaker",
//                             description: "Green Reebok Sneaker built with soft string",
//                             price: "₹999"
//                         },
//                         {
//                             item: "Adidas Blue Sneaker",
//                             description: "Blue Adidas Sneaker built with soft string",
//                             price: "₹999"
//                         },
//                         {
//                             item: "Heels XL Green",
//                             description: "Green Heels built with soft string",
//                             price: "₹699"
//                         },
//                         {
//                             item: "Nike Red Sneaker",
//                             description: "Red Nike Sneaker built with soft string",
//                             price: "₹399"
//                         },
//                     ]
//                 },
//                 outro: "you have any questions or need assistance, our dedicated customer support team is just an email or phone call away.<br>" +
//                     "Thank you for choosing RX E-commerce Website. We appreciate your trust in us to deliver quality and style right to your feet.<br>" +
//                     "Happy Stepping!<br>" +
//                     "Best Regards"
//             }
//         };

//         let mail = MailGenerator.generate(response);

//         let message = {
//             from: "rxshoesonline@gmail.com",
//             to: "siddhant.bhandari.edu@gmail.com",
//             subject: "Registered Successfully",
//             html: mail
//         };

//         transporter.sendMail(message)
//             .then(() => {
//                 resolve(1); // Resolve with success
//             })
//             .catch(error => {
//                 console.log(error);
//                 reject(error); // Reject with error
//             });
//     });
// };

// //registration
// app.get("/regMail", (req, res) => {
//     let role = "Customer"; // Role can be "Customer" or "Seller"
//     let name = "Rupesh Jha";
//     regMail(role, name)
//         .then(() => {
//             res.send("Email sent successfully");
//         })
//         .catch(error => {
//             res.send("Failed to send email:", error);
//         });
// });

// app.get("/", (req, res) => {
//     res.send("Hello World! test.js");
// });

// app.listen(4000, () => {
//     console.log("Example app listening on port 4000!");
// });

const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

let regMail = (productList, username, gmailId) => {
  return new Promise((resolve, reject) => {
    let config = {
      service: "gmail",
      auth: {
        user: "rxshoesonline@gmail.com",
        pass: "djxt npbw mbmd ftbc", // Use the generated app password here
      },
    };
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "salted", // Using "salted" theme for a modern and stylish look
      product: {
        name: "Rx ecommerce",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: username,
        table: {
          // data: [
          //     {
          //         item: "Rebook Green Sneaker",
          //         description: "Green Reebok Sneaker built with soft string",
          //         price: "₹999"
          //     },
          //     {
          //         item: "Adidas Blue Sneaker",
          //         description: "Blue Adidas Sneaker built with soft string",
          //         price: "₹999"
          //     },
          //     {
          //         item: "Heels XL Green",
          //         description: "Green Heels built with soft string",
          //         price: "₹699"
          //     },
          //     {
          //         item: "Nike Red Sneaker",
          //         description: "Red Nike Sneaker built with soft string",
          //         price: "₹399"
          //     },
          // ]
          data: productList,
        },
        outro:
          "you have any questions or need assistance, our dedicated customer support team is just an email or phone call away.<br>" +
          "Thank you for choosing RX E-commerce Website. We appreciate your trust in us to deliver quality and style right to your feet.<br>" +
          "Happy Stepping!<br>" +
          "Best Regards",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: "rxshoesonline@gmail.com",
      to: gmailId,
      subject: "Registered Successfully",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        resolve(1); // Resolve with success
      })
      .catch((error) => {
        console.log(error);
        reject(error); // Reject with error
      });
  });
};

//registration
app.post("/userOrder", (req, res) => {
  let role = "Customer || Seller"; // Role can be "Customer" or "Seller"
  let name = "Rupesh Jha";
  let { username, gmailId } = req.body;

  console.log(username, gmailId);
  let productList = [
    {
      item: "Rebook Green Sneaker",
      description: "Green Reebok Sneaker built with soft string",
      price: "₹999",
    },
    {
      item: "Adidas Blue Sneaker",
      description: "Blue Adidas Sneaker built with soft string",
      price: "₹999",
    },
    {
      item: "Heels XL Green",
      description: "Green Heels built with soft string",
      price: "₹699",
    },
    {
      item: "Nike Red Sneaker",
      description: "Red Nike Sneaker built with soft string",
      price: "₹399",
    },
  ];

  regMail(productList, username, gmailId)
    .then(() => {
      res.send("Email sent successfully");
    })
    .catch((error) => {
      res.send("Failed to send email:", error.message);
    });

  //   res.send("ok");
});

app.get("/", (req, res) => {
  res.send("Hello World! test.js");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
