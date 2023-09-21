import { BuildPath, readandReturn } from "./feedback";

export default function handler(req, res) {
  // Get the query, then data and then return
  const feebackId = req.query.feedbackId;
  const filePath = BuildPath();
  const feedbackItems = readandReturn(filePath);
  const selectedFeeback = feedbackItems.find(
    (feedback) => feedback.id === feebackId
  );
  return res.status(200).send({ feedback: selectedFeeback });
}
