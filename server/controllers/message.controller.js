import {Conversation} from "../models/conversation.model.js"
import {Message} from "../models/message.model.js"
import { asyncHandler } from "../utilities/asyncHandler.utitlity.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import {apiResponse} from "../utilities/apiResponse.utility.js"
import { getSocketId, io } from "../socket/socket.js";


export const sendMessage = asyncHandler(async(req,res)=>{

    const senderId = req.user
    const receiverId = req.params.receiverId
    const message = req.body.message


    if(!senderId || !receiverId || !message){
        throw new errorHandler(404,"All fields are required")
    }

    let conversation = await Conversation.findOne({
        participents:{$all:[senderId,receiverId]}
    })

    if(!conversation){
        conversation = await Conversation.create({
            participents : [senderId,receiverId]
        })
    }
    if (!conversation) {
        return res.status(200).json(new apiResponse(200, { messages: [] })); // Ensure messages is always an array
    }


    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }
    //soket.io
    const socketId =  getSocketId(receiverId)
    io.to(socketId).emit("newMessage",newMessage)


    res.status(200).json(
        new apiResponse(200,newMessage)
    )

})

export const getMessage = asyncHandler(async (req,res)=>{
    const myid = req.user
    const otherParticipentId = req.params.otherParticipentId
    // const { page = 1, limit = 10 } = req.query; 


    if(!myid || !otherParticipentId){
        throw new errorHandler(404,"All fields are required") 
    }
    const conversation  = await Conversation.findOne({
        participents : { $all : [myid,otherParticipentId]}
    }).populate({
        path: "messages",
        // options: {
        //     sort: { createdAt: -1 }, // Latest messages first
        //     limit: parseInt(limit),
        //     skip: (parseInt(page) - 1) * parseInt(limit),
        // }
    })


    if (conversation === null) {
        throw new errorHandler(404, "No conversation found");
    }
    
    res.status(200).json(
        new apiResponse(200,conversation)
    )
})