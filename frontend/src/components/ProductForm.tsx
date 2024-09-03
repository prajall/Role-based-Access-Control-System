import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          title: data.title,
          description: data.description,
          price: parseFloat(data.price),
          category: data.category,
          image: data.image,
          rating: {
            rate: parseFloat(data.rating),
            count: 0,
          },
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Product added successfully!");
        reset(); // Reset form fields after successful submission
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            {...register("title", { required: "Title is Required" })}
            placeholder="Enter product title"
            className={`${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is Required",
            })}
            placeholder="Enter product description"
            className={`${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price">Price</label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { required: "Price is Required" })}
            placeholder="Enter product price"
            className={`${errors.price ? "border-red-500" : ""}`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.price.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="category">Category</label>
          <Input
            id="category"
            {...register("category", { required: "Category is Required" })}
            placeholder="Enter product category"
            className={`${errors.category ? "border-red-500" : ""}`}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="file"
            {...register("image", { required: "Image is Required" })}
            placeholder="Enter product image URL"
            className={`${errors.image ? "border-red-500" : ""}`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message?.toString()}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full bg-teal-600 text-white">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
