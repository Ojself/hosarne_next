import axios from "axios";

export default function handler(req, res) {
  if (req.method === "POST") {
    const config = {
      method: "post",
      url: "https://connect.mailerlite.com/api/subscribers/",
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE}`,
        ContentType: "application/json",
        Accept: "application/json",
      },
      data: { email: req.body?.email },
    };
    return axios(config)
      .then((results) => res.status(results.status).json(results.data))
      .catch((error) => res.status(error.status).json(error.response.data));
  } else {
    console.log("method not allowed for this route");
  }
}
