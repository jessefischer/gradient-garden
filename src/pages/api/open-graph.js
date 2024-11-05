import ogs from "open-graph-scraper";

export default function handler(req, res) {
  const { url } = req.query;
  ogs({ url })
    .then(({ error, result }) => {
      if (error) {
        res.status(500).json(result);
      }
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
}
