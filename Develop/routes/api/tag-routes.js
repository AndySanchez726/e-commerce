const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag,
      as: 'tag_products'
    }] 
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET a single tag by its `id` and associated Product data
router.get('/:id', (req, res) => {
  Tag.findAll({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      through: ProductTag,
      as: 'tag_products'
    }] 
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// CREATE a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// UPDATE a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No tag with this id was found.'});
      return;
    }
    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No tag with this id was found.'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(500).json(err);
  });
});

module.exports = router;
