const express = require('express');
const router  = express.Router();
const mailer = require('../helpers/mailer');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('form');
});

router.post('/', (req, res, next) => {
  let options = req.body;
  options.filename = 'verify';
  mailer.send(options)
  .then(() => {
    res.status(200).send('El correo ya llegó, anunciando su canción');
    
  })
  .catch(err => {
    console.log('Algo salió mal', err);
    res.status(500).json({err, 'msg': 'Algo salió mal'});
  })
});

module.exports = router;
