import { Order } from "../models/orderModel.js"
import { Product } from "../models/productModel.js"



// add order
export const addAdminOrder = async(req,res,next)=>{
    try {
        const{mobile,products,paymentMethod,adminId}=req.body

     
      let totalPrice=0
        
        if(!mobile || !products || !paymentMethod ){
            return res.status(400).json({message:"all fields required"})
        }

        if(!adminId){
            return res.status(401).json({message:"Admin not authorized"})
        }


        if(Array.isArray(products) || products.length===0){
            return res.status(400).json({message:"Product array is empty"})
        }

        if(products.quantity===0){
            return res.status(400).json({message:"choose product quantity"})
        }

        for (item of products){

            const product = await Product.findById(item.productId)
        

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
    
        totalPrice = totalPrice+(product.price  *  item.quantity)
    }

        const newOrder = new Order({
            adminId,
            products,
            mobile,
            paymentMethod,
           totalAmount : totalPrice,
            status:"pending",
        })


        const saveOrder = await newOrder.save()

        res.status(201).json({data:saveOrder,message:"order placed successfully"})
    } catch (error) {
        res.status(error.statuscode || 500 ).json({message:error.message || "internal server error"})
    }
}











export const addOrder = async(req,res,next)=>{
    try {
        const{mobile,products,paymentMethod,userId}=req.body

     
      let totalPrice=0
        
        if(!mobile || !products || !paymentMethod ){
            return res.status(400).json({message:"all fields required"})
        }

        if(!userId){
            return res.status(401).json({message:"User not authorized"})
        }


        if(Array.isArray(products) || products.length===0){
            return res.status(400).json({message:"Product array is empty"})
        }

        if(products.quantity===0){
            return res.status(400).json({message:"choose product quantity"})
        }

        for (item of products){

            const product = await Product.findById(item.productId)
        

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
    
        totalPrice = totalPrice+(product.price  *  item.quantity)
    }

        const newOrder = new Order({
           userId,
            products,
            mobile,
            paymentMethod,
           totalAmount : totalPrice,
            status:"pending",
        })


        const saveOrder = await newOrder.save()

        res.status(201).json({data:saveOrder,message:"order placed successfully"})
    } catch (error) {
        res.status(error.statuscode || 500 ).json({message:error.message || "internal server error"})
    }
}
// delete order 

export const deleteOrder = async (req,res)=>{
  try {
    const {id} = req.body

    const orderDelete = await Order.deleteOne({id})

    res.status(200).json({data:orderDelete,message:"Order deleted"})
  } catch (error) {
    res.status(500).json({message:"Internal server error ",error})
  }
}

// update order


export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, mobile, status, paymentMethod, paymentStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Update products safely
    if (Array.isArray(products) && products.length > 0) {
      products.forEach((updatedProduct) => {
        const existingProduct = order.products.find(
          (p) => p.productId.toString() === updatedProduct.productId
        );

        if (existingProduct) {
          if (updatedProduct.price)
            existingProduct.price = updatedProduct.price;
          if (updatedProduct.quantity)
            existingProduct.quantity = updatedProduct.quantity;
        } else {
          order.products.push(updatedProduct);
        }
      });

      // ✅ Recalculate total
      order.totalAmount = order.products.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
      );
    }

    // ✅ Update other fields
    if (mobile) order.mobile = mobile;
    if (status) order.status = status;
    if (paymentMethod) order.paymentMethod = paymentMethod;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    // ✅ Save
    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
