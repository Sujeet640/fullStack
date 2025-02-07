const express = require('express');
const { createForm, viewFormData, deletFormData, updateFormData, viewDeleteData, restoreData, permanentDelete } = require('../FormController/formController');

let formRouting = express.Router()

formRouting.post('/insertData/:id?',createForm)

formRouting.get('/viewData',viewFormData)

formRouting.get('/deleteFormdata/:id',deletFormData)

formRouting.get('/updateFormData/:id',updateFormData)

formRouting.get('/viewDeletedata',viewDeleteData)

formRouting.post('/restoreDeleteItem/:id',restoreData)

formRouting.get('/permanent-delete/:id',permanentDelete)

module.exports = formRouting;