import { supabase } from "./supabase"
/**
 * @function 
 * @name downloadFile
 * @param {string} path the path or file url to the file as retrieved from the database.
 * @param {string} storage_bucket The storage bucket in supabase where you want to store the file.
 * @returns {object} An object containing either and error message or an avatar url.
 */

export const downloadFile = async (path, storage_bucket) => {
    try {
        const { data, error } = await supabase.storage
            .from(storage_bucket)
            .download(path)

        if( error ) {
            return { error: error?.message }
        }
        
        const url = URL.createObjectURL(data)
        return {avatar_url: url}
    } catch ( error ) {
        return {error: error?.message}
    }
}

/**
 * @function 
 * @name uploadAvatar
 * @param {string} file the file that has been selected in the form to be uploaded.
 * @param {string} storage_bucket the storage bucket where you want to store the image.
 * @returns {Object} An object containing either an error or some data.
 */

 export const uploadFile = async ( file, storage_bucket ) => {
  const timestamp = new Date().getTime().toString()
  const fileExtension = file?.name.split('.').pop()
  console.log(file)

  try {
      const { error, data } = await supabase
          .storage
          .from(storage_bucket)
          .upload(`public/${timestamp}.${fileExtension}`, file)

      if( error ) {
          throw error
      } else {
          return data
      }

  } catch( error ) {
      return error 
  }

}