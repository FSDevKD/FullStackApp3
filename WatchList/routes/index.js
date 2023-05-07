const express = require("express");
const router = express.Router();
const item = require("../models/item");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", (req, res) => res.render("index"));
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const items = await item.find({user: req.user.id}).sort({ date: -1 });
    res.render('dashboard', { user: req.user, items });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.post('/item', ensureAuthenticated, async (req, res) =>{
    const { itemName, itemCost, imageUrl } = req.body;
    const newItem = new item({user: req.user.id, itemName, itemCost, imageUrl});
    try{
        await newItem.save();
        res.redirect('/dashboard');
    }catch(err){
        console.log("Error saving:",err);
        res.redirect('/dashboard');
    }
});

router.post('/items/:itemId/delete', ensureAuthenticated, async (req, res) => {
  try {
    // Find the item by id and remove it from the database
    await item.findByIdAndRemove(req.params.itemId);

    // Redirect to the dashboard after successful deletion
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

router.get('/items/:itemId/edit', ensureAuthenticated, async (req, res) => {
  try {
    const itemToEdit = await item.findById(req.params.itemId);
    res.render('edit', { item: itemToEdit });
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

router.post('/items/:itemId/edit', ensureAuthenticated, async (req, res) => {
  try {
    const { itemName, itemCost, imageUrl } = req.body;
    await item.findByIdAndUpdate(req.params.itemId, { itemName, itemCost, imageUrl });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});




module.exports = router;
