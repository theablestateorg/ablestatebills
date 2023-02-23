function EditForm({ editMode, toggleEditMode, responses, toggleResponse }) {
  const handleSubmit = async () => {};

  console.log(responses)

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center justify-center">
      <div
        className=" px-5 py-2 text-white rounded-full shadow hover:shadow-lg cursor-pointer mb-2 bg-gray-800"
        onClick={() => {
          toggleResponse((prev) => !prev);
        }}
      >
        {responses ? "Questions" : "View Responses"}
      </div>
      <div
        className=" px-5 py-2 text-white rounded-full shadow hover:shadow-lg cursor-pointer bg-gray-800"
        onClick={() => {
          toggleEditMode((prev) => !prev);
        }}
      >
        {editMode ? "View Form" : "Edit Form"}
      </div>
    </div>
  );
}

export default EditForm;
