const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const handler = async (req, res) => {
  try {
    const { userId, actor, username } = req.body;

    const response = await supabaseClient
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (response?.error) {
      throw error;
    } else {
      const { data, user, error } = await supabase.auth.api.deleteUser(userId);

      if (error) throw error;
      const { id } = user;

      const response = {
        Status: "Success",
        Details: "Memeber successfully deleted",
      };
      res.status(200).json(response);

      if (data) {
        await supabaseClient
          .from("logs")
          .insert({
            name: `[Deleted] ${username}`,
            details: `deleted by ${actor}`,
            status: "success",
          })
          .eq("id", id);
      }
    }
  } catch (error) {
    const response = { Status: "Failure", Details: error };
    return res.status(400).json(response);
  }
  return;
};

export default handler;
