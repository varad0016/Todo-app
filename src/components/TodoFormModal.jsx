import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  text: z.string().min(1, "Task cannot be empty").max(50, "Task is too long"),
});

const TodoFormModal = ({ onOperation , onClose , group , formSubLabel  ,formLabel , formbutton }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data form modal : -"  , data.text);
    onOperation(data.text);
    reset(); // Clear the form
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{formLabel}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Todo Input */}
          <div>
            <label className="block text-gray-700">{formSubLabel}</label>
            <input
              type="text"
              {...register("text")}
              className={`w-full p-2 border rounded ${
                errors.text ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.text && (
              <p className="text-red-500 text-sm">{errors.text.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {formbutton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoFormModal;
