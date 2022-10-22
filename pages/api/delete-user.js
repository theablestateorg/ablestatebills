// require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_TOLL

const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY_TOLL

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_TOLL;

const supabase = createClient(supabaseUrl, supabaseKey)
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const handler = async ( req, res ) => {
    try {
        const { userId, actor_id, username, roles } = req.body

        // console.log(`user id is ${userId}, actor_id is ${actor_id}, username is ${username}`)
        const response = await supabaseClient.from("profiles")
                  .delete()
                  .eq("id", userId)

        if (response?.error) {
          console.log("reached error")
          throw error
        }
        else {
          console.log("reached here")
          const { data, user, error } = await supabase.auth.api.deleteUser(userId);

        if ( error ) throw error
        const { id } = user

          const response = { "Status": "Success", "Details": "Memeber successfully deleted"}
          res.status(200).json(response)
        
          if(data){
            const response = await supabaseClient.from("logs")
                  .insert({
                    "description": `Deleted ${username} - ${roles}`,
                    "actor": actor_id,
                    "status": "Successful"
                  })
                  .eq("id", id)
          }

        }
    } catch ( error ){
      
        const response = {"Status":"Failure", "Details":error}
        return res.status(400).json(response)      
    }
    return;
}

export default handler;