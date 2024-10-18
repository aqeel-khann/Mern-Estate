import React, { useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from "../firebase";
import { useCreateList } from "../api Client/useCreateListing";

export default function CreateListing() {
  const [files, setFiles] = useState([])
  const {creatList}=useCreateList()
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,  
    furnished: false, 
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });
  console.log(formData);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7 ) {
      const promises = [];

     for (let i = 0; i < files.length; i++) {
       promises.push(storeImage(files[i]));
     }
      Promise.all(promises).then((urls) => {
        setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
      }).catch((err) => {
        alert("Error uploading images (file size < 2Mb)")
      })
    }
    else {
      alert("you can upload only 6 images per Listing  ")
    }
  }

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Progress",progress);
          
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((dowloadUrl) => {
              resolve(dowloadUrl)
          })
        }
      )
    })
  }

  //delete images
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=> i!==index)
    }
    )
  }
  //handlechange

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;  

    if (id === "sale" || id === "rent") {
      setFormData({ ...formData, type: id });  
    } else if (id === "parking" || id === "furnished" || id === "offer") {
      setFormData({ ...formData, [id]: checked });  
    } else if (type === "number" || type === "text" || type === "textarea") {
      setFormData({ ...formData, [id]: value });  
    }
  };

  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) return alert("Select at least one image for Listing")
    if (+formData.regularPrice < +formData.discountPrice) return alert("Regular Price must be higher than discount price")

    return creatList(formData)
  }

  
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <input
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95"
          >
            Upload
          </button>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">
            Create listing
          </button>
        </div>
      </form>
    </main>
  );
}
