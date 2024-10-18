import { ErrorResponse, successResponseWithData } from "../helper/apiResponse.js"
import Listing from "../model/Listing.js"
import { createListingService, deleteListingService, getListingService, listingService, updateListingService } from "../services/ListingService.js"
import { errorHandler } from "../utils/errorHandler.js"



export const createListing = async (req, res, next) => {
    try {
        const list = await  createListingService(req.body)
        //console.log("back",list);
        successResponseWithData(res,"List Created Successfully",list,201)
    } catch (error) {
        next(error)
    }
}

//listing by userId

export const getUserListing = async (req, res, next) => {
    if (req.params.id !== req.user.id) return next(errorHandler(401, "you can only see your own listing"))
    try {
        const getListings = await getListingService(req.params.id)
        if (getListings.length===0) {
            return ErrorResponse(res,"Listings is not found")
        }
        successResponseWithData(res,"Getting User List Successfully",getListings,200)
    } catch (error) {
       next(error) 
    }
};


export const deleteListing = async (req, res, next) => {
    try {
        //console.log("req.params",req.params.id);
        
        const deleteList = await deleteListingService(req.params.id)
        if (!deleteList) {
            return ErrorResponse(res,"Listing is not found")
        }
        successResponseWithData(res,"List Deleted successfully",deleteList,200)
    } catch (error) {
        next(error)
    }
}

export const updateListing = async(req, res, next) => {
    try {
        const updated = await updateListingService(req.params.id, req.body)
        if (!updated) {
          return ErrorResponse(res, "Listing is not found");
        }
        successResponseWithData(res,"List update successfully",updated,201)
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {
    //console.log("req is",req.params.id);
    
    try {
        const lists = await listingService(req.params.id)
        if (!lists) {
            return next(errorHandler(401,"List not found"))
        }
        return successResponseWithData(res,"List successfully fetch",lists,200)
    } catch (error) {
        next(error)
    }
}


export const getSearchList = async(req, res, next) => {
      try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
      successResponseWithData(res,"success",listings,200)

  } catch (error) {
    next(error);
  }
}