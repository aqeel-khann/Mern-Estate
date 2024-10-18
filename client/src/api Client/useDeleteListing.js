


export const useDeleteListing = () => {
    
    const deleteList = async (listId) => {
        try {
      const response = await fetch(`/api/listing/delete/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

            const data = await response.json(); 
      console.log("Delete data",data);
            

      if (data.status === 200) {
          alert(data.message);
          return data;
          
      }
    } catch (error) {
      alert("Error while Deleting User");
      console.error(error);
    }
    }

    return {deleteList}
}