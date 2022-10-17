const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [Product,{
        model: Product,
        through: ProductTag
      }]
    });
    res.json(tagData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [Product,{
        model: Product,
        through: ProductTag
      }]
    });
    res.json(singleTagData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.json(newTag)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    res.json(updatedTag)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
