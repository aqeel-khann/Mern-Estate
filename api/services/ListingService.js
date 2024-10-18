import Listing from "../model/Listing.js"


export const createListingService = async(data) => {
try {
    const listCreated = await Listing.create(data);
    if (!listCreated) {
        console.log("List is Undefined");   
    };
    return listCreated;
} catch (error) {
    throw new Error(`Error While Creating Listing ${error.message}`)
}     
    
}


export const getListingService = async (id) => {
    try {
        const listings = await  Listing.find({ userRef: id })
         return listings;
    } catch (error) {
    throw new Error(`Error While Getting Listing ${error.message}`);
        
    }
}

export const deleteListingService = async(id) => {
    try {
        const list = await Listing.findByIdAndDelete(id)
        //console.log("service",list);
        
        return list
    } catch (error) {
    throw new Error(`Error While Deleting Listing ${error.message}`);  
    }
}

export const updateListingService = async (id, data) => {
    try {
        const updatedList = await Listing.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )
        return updatedList;
    } catch (error) {
    throw new Error(`Error While Updating Listing ${error.message}`);   
    }
}


export const listingService = async (id) => {
    try {        
        const getList = await Listing.findById(id)
        return getList;
    } catch (error) {
    throw new Error(`Error While fetchig Listing ${error.message}`);   
        
    }
}