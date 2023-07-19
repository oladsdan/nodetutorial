const express = require('express')
const router = express.Router();
//we want to use the controller
const employeesController = require('../../controllers/employeesController')
// const path = require('path');
// const data = {};
const Roles_List = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles')


// data.employees = require('../../data/employees.json')

// router.route('/')
//     .get((req, res) => {
//         res.json(data.employees);
//     })
//     .post((req, res) => {
//         res.json({
//             "firstname": req.body.firstname,
//             "lastname":req.body.lastname
//         });
//     })
//     .put((req, res) => {
//         res.json({
            
//             "firstname": req.body.firstname,
//             "lastname": req.body.lastname
//         })
//     })
//     .delete((req, res) => {
//         res.json({
//             "id" : req.body.id
//         })
//     })

// router.route('/:id').get((req, res) => {
//     res.json({ "id" :req.paraq.id})
// })

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(Roles_List.Admin, Roles_List.Editor), employeesController.createNewEmployee)
    .put(verifyRoles(Roles_List.Admin, Roles_List.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(Roles_List.Admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;