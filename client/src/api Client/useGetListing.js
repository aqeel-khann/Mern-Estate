

export const useGetUserListing = () => {
    
    const userListings = async(id) => {
        try {
          const response = await fetch(`/api/listing/get-listings/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

            const data = await response.json();
          if (data?.status === 200) {
              alert(data?.message);
               return data;
            }
            if (data.status===0) {
              alert(data?.message); 
            }
        } catch (error) {
          alert("Error while Getting User Listing");
          console.error(error);
        }
    }
    return {userListings}
}