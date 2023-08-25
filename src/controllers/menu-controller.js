import { CustomError } from "../helpers/error.helper.js";
import MenuItem from "../models/menu-model.js";


export const  getMenusItems =async (req,res,next)=>{

    try {
        const {category} = req.query

        let allMenuItems;

        if(category){

            allMenuItems = await MenuItem.find({category})

        }else{

            allMenuItems = await MenuItem.find()

        }


        return res.status(201).json({

            success:true,
            data: allMenuItems

        })
        


    } catch (error) {
        next(error)
    }


}

export const  getMenuItem =async (req,res,next)=>{

    const {id} = req.params;
    try {
        
        const menuItem = await MenuItem.findById(id);

        if(!menuItem){ throw new CustomError("menu item not found",404)}

        return res.status(200).json({

            success: true,
            data: menuItem

        })


    } catch (error) {
       
        next(error)
    }

}

export const  createMenuItem = async(req,res,next)=>{

    //reqbody
    const {name,price,category,description,ordersCount,pictureUrl}= req.body

    try{

        const menuItem = await MenuItem.create({name,price,description,category,ordersCount,pictureUrl})
        //chk for error
        if(!menuItem){throw new CustomError("unable to create new menu item",409)}

        return res.status(200).json({
            success:true,
            data: menuItem
        })


    }catch(err){
        next(err)
    }

}




export const  updateMenuItem =async (req,res,next)=>{

    const {name,price,category,description,ordersCount,pictureUrl}= req.body
    const {id}= req.params

    try{
        /////chk for menu
        console.log(id)
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id,{
        
            name,price,category,description,ordersCount,pictureUrl
        }, { new: true })
        console.log(updatedMenuItem)

        if(!updatedMenuItem){throw new CustomError ("menu does not exist",401)}

            return res.status(201).json({
                success:true,
                data: updatedMenuItem
            })


    }catch(err){

        next(err)


    }

}
export const  deleteMenuItem = async(req,res,next)=>{

    const {id} = req.params

    try {
        
        const deleteItem = await MenuItem.findById(id);

        if(!deleteItem){throw new CustomError (" menu item not found",404)}

        return res.status(201).json({
            success:true,
            message: "Menu item deleted successfully"
        })

    } catch (error) {
        
        next(error)


    }





}