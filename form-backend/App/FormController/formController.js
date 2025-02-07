const {collectionForm,deleteCollection} = require("../FormModal/formModal")

// Data Insert
exports.createForm = async(req,res)=>{
    if (req.params.id==undefined) {
        
        try {
            const {name,email,phone,message} =req.body;
    
            const db = new collectionForm({
                name,
                email,
                phone,
                message
            });
    
            await db.save();
            return res.status(201).json({
                success:true,
                message:"Data Successfully insert..",
                data:db
            });
        } catch (error) {
            return res.status(501).json({
                success:false,
                message:"error submittion form",
                data:error.message
            });
        }
    }
// updated method 
    else{
        const db = await collectionForm.updateOne({_id:id},{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message,
        })
    }
}

// Data View
exports.viewFormData=async(req,res)=>{
    const db =await collectionForm.find();
    res.send(db)

}

// Data delete and other collection store in delete data
exports.deletFormData=async(req,res)=>{
    try {
        const formData = await collectionForm.findById(req.params.id);

        if (!formData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        // Save deleted data in the new collection
        const deletedData = new deleteCollection({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        });

        await deletedData.save();
        await collectionForm.deleteOne({ _id: req.params.id });

        res.json({ success: true, message: "Data deleted and stored in deleted collection", data: deletedData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting data", error: error.message });
    }
}

// updated method 1 fetch id
exports.updateFormData = async(req,res)=>{
    const db = await collectionForm.findOne({_id:req.params.id})
    res.send(db)
}

// view Delete Item
exports.viewDeleteData=async(req,res)=>{
    try {
        const DeleteData = await deleteCollection.find();
        res.json({success:true,message: "Data successfully Delete..",data:DeleteData})
        
    } catch (error) {
        res.status(500).json({success:false,error:" error fetching delete data..",error:error.message})
    }
}

// Restore Data Api

exports.restoreData = async(req,res)=>{
    try {
        const deleteData = await deleteCollection.findById(req.params.id)

        if (!deleteData) {
            return res.status(201).json({success: false, message: "Data not found in recycle bin" })
        }
        const restoredata = new collectionForm({
            name:deleteData.name,
            email:deleteData.email,
            phone:deleteData.phone,
            message:deleteData.message
        })
        await restoredata.save();
        await deleteCollection.deleteOne({ _id: req.params.id });

        res.json({success:true, message: "Data restored successfully",data:restoredata})
        
    } catch (error) {
        res.status(500).json({success:false,message:" error  restoring data..",error:error.message})
    }
}

// permanent Delete
exports.permanentDelete=async(req,res)=>{
    try {
        const deletedData = await deleteCollection.findById(req.params.id);

        if (!deletedData) {
            return res.status(404).json({ success: false, message: "Data not found in recycle bin" });
        }

        await deleteCollection.deleteOne({ _id: req.params.id });

        res.json({ success: true, message: "Data permanently deleted" });
    } catch (error) {
        res.status(500).json({success:false,message:"Error permanently deleting data..",error:error.message})
    }
}