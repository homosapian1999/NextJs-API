import fs from "fs";
import path from "path";

export function BuildPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function readandReturn(filePath) {
  const filedata = fs.readFileSync(filePath);
  const data = JSON.parse(filedata);
  return data;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, feedback } = req.body;
    // validations for email and feedback can be done;

    // create the api response;
    const apiResponse = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    // Read and write to the inhouse file;
    // Process=> create the path, readFile and writeFile
    const filePath = BuildPath();
    const data = readandReturn(filePath);
    data.push(apiResponse);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res
      .status(201)
      .json({ message: "Feedback submitted successfully", apiResponse });
  } else {
    const filePath = BuildPath();
    const data = readandReturn(filePath);
    return res.status(201).send({ feedback: data });
  }
}
