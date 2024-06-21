const farmModel = require("../model/farmModel.js");


const register = async (req, res) => {
    try {
        const {age, name, breed, color} = req.body;
        let matured = true
        let sold = false
        if (age <= 5){
            matured = false,
            sold = true
        }
        const animal = await farmModel.create({
            name,
            breed,
            age,
            color,
            isMatured: matured,
            isSold: sold
        });
        res.status(201).json({
            message: `Animal profile has been created successfully.`,
            data: animal
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const getAll = async (req, res) => {
    try {
        const allAnimals = await farmModel.find();
        if(allAnimals.length === 0) {
            return res.status(200).json({
                message: `Database currently empty.`
            })
        } else {
            res.status(200).json({
                message: `The list of all animals in this database in total is: ${allAnimals.length}`,
                data: allAnimals
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const getOne = async (req, res) => {
    try {
        const {id} = req.params
        const animal = await farmModel.findById(id);
        if(!animal) {
            return res.status(404).json({
                message: `Animal with ID: ${id} not found.`
            })
        } else {
            res.status(200).json({
                message: `Animal found.`,
                data: animal
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id
        const animal = await farmModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!animal) {
            return res.status(404).json({
                message: `Animal with ID: ${id} not found.`
            })
        } else {
            res.status(200).json({
                message: `Animal with ID: ${id} has been updated.`,
                data: animal
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const toDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const animal = await farmModel.findByIdAndDelete(id);
        if (!animal){
            res.status(404).json({
                message: `Animal with ID: ${id} was not found.`
            })
        } else {
            res.status(200).json({
                message: `Animal with ID: ${id} has been deleted.`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const getAllMature = async (req, res) => {
    try {
        const matured = {isMatured: true};
        allMature = await farmModel.find(matured);
        if(allMature) {
            return res.status(200).json({
                message: `These are the number of animals that are matured.`,
                data: allMature,
                totalNumber: allMature.length
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const yetToBeSold = async (req, res) => {
    try {
        const soldAnimal = {isSold: true};
        allSold = await farmModel.find(soldAnimal);
        if(!allSold) {
            return res.status(200).json({
                message: `These are the number of animals that are for sale.`,
                data: allSold,
                totalNumber: !allSold.length
            })
        } else {
            return res.status(200).json({
                message: `These are the number of animals for sale.`,
                data: allSold,
                totalNumber: allSold.length
            }) 
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

// const toDelete = async (req, res) => {
//     const id = req.params.id;
//     if(!id) {
//         res.status(404).json({
//             message: `Animal with id: ${id} not found.`
//         })
//     }else {
//         const animal = await farmModel.findByIdAndDelete(id);
//         res.status(200).json({
//         message: `The animal with id: ${id} has been deleted.`,
//     })
//     }
// }

module.exports = {
    register,
    getAll,
    getOne,
    update,
    toDelete,
    getAllMature,
    yetToBeSold
};

