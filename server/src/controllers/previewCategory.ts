import PreviewCategory from "../models/previewCategory";

const getAll = async (req, res) => {
  PreviewCategory.find()
    .exec()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default { getAll };
