

// export default ResellerAddForm;
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

export default function ResellerAddForm({  }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Mutation for Signup
  const signUpMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reseller/register`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "রেজিস্ট্রেশন সফল!");
     navigate("/admin/resellers/all")
    },
    onError: (error) => {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
    },
  });

  // Form Submit Handler
  const handleUserSignup = async (data) => {
    console.log("Signup Data:", data);
 // ইমেইল ফিল্ড খালি থাকলে null সেট করুন
 if (!data.email) {
  data.email = undefined
}
    // Show loading toast
    const loadingToast = toast.loading("অপেক্ষা করুন...");

    try {
      await signUpMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      // Hide the loading toast after the mutation finishes
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div>
         <h2 className="text-center my-2 font-semibold text-xl">Create Reseller </h2>
    
    <div className="flex justify-center items-center min-h-screen  border">
   
      <form
        onSubmit={handleSubmit(handleUserSignup)}
        className="w-full  bg-white p-2 md:p-8 rounded-lg shadow-lg "
      >
    

        {/* Name Field */}
        <div className="w-full mt-2">
          <label className="text-slate-600 text-sm font-medium flex items-center gap-1">
            নাম <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "নাম দেওয়া আবশ্যক" })}
            className="w-full mt-1 px-2 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="আপনার নাম লিখুন"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="w-full mt-2">
          <label className="text-slate-600 text-sm font-medium flex items-center gap-1">
            ইমেইল
          </label>
          <input
  type="email"
  {...register("email", {
    validate: (value) => {
      if (!value) return true; // Optional field
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email pattern
      return emailRegex.test(value) || "সঠিক ইমেইল ঠিকানা দিন।";
    },
  })}
  className="w-full mt-1 px-2 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="আপনার ইমেইল লিখুন (অপসনাল)"
/>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="w-full mt-2">
          <label className="text-slate-600 text-sm font-medium flex items-center gap-1">
            ফোন নম্বর <span className="text-red-500">*</span>
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "ফোন নম্বর দেওয়া আবশ্যক" }}
            render={({ field, fieldState }) => (
              <>
                <PhoneInput
                  {...field}
                  defaultCountry="bd"
                  onChange={(phone) => field.onChange(phone)}
                  className={`p-2 border ${
                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    fieldState.invalid
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Password Field */}
        <div className="w-full mt-4 relative">
          <label className="text-slate-600 text-sm font-medium flex items-center gap-1">
            পাসওয়ার্ড <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "পাসওয়ার্ড দেওয়া আবশ্যক" })}
            className="w-full mt-1 px-2 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="আপনার পাসওয়ার্ড লিখুন"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-10 right-3 cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-2">
        <label className="text-slate-600 text-sm font-medium">
  রেফার কোড <span className="text-red-500">*</span>
</label>
<p className="text-slate-800 text-xs  mt-1">
  যদি কোনো রেফার কোড ব্যবহার না করেন, তাহলে "Relifemart" কোডটি ব্যবহার করুন।
</p>

          <input
            {...register("referredBy")}
            defaultValue="Relifemart"
            placeholder="রেফার কোড"
            className="w-full px-2 py-1.5 rounded-lg border border-gray-300"
          />
          {errors.referredBy && (
            <p className="text-red-500 text-sm mt-1">
              {errors.referredBy.message}
            </p>
          )}
        </div>

        <div className="mt-2">
  <label className="text-slate-600 text-sm font-medium">
    আপনি কি হিসেবে জয়েন করতে চান? <span className="text-red-500">*</span>
  </label>
  <select
    {...register("role", { required: "আপনাকে অবশ্যই একটি পরিচয়  নির্বাচন করতে হবে।" })}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
  >
    <option value="" disabled selected>
    পরিচয়  নির্বাচন করুন
    </option>
    <option value="উদ্যোক্তা">উদ্যোক্তা</option>
    <option value="ডিজিটালমার্কেটার">ডিজিটাল মার্কেটার</option>
    <option value="ব্যসিক">ব্যসিক</option>
  </select>
  {errors.role && (
    <p className="text-red-500 text-sm mt-1">
      {errors.role.message}
    </p>
  )}
</div>


<div className="mt-2">
  <label className="text-slate-600 text-sm font-medium">
    ইউজার লেভেল <span className="text-red-500">*</span>
  </label>
  <select
    {...register("platformUsage")}
    className="w-full px-2 py-1.5 rounded-lg border border-gray-300 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    defaultValue=""
  >
  
    <option value="Mobile">মোবাইল</option>
    <option value="PC">কম্পিউটার</option>
    <option value="Both">উভয়ই</option>
  </select>
  {errors.platformUsage && (
    <p className="text-red-500 text-sm mt-1">
      {errors.platformUsage.message}
    </p>
  )}
</div>

<div className="mt-4">
  <label className="text-slate-600 text-sm font-medium">
    আপনার কি ফেইসবুক পেইজ আছে? <span className="text-red-500">*</span>
  </label>
  <div className="flex gap-4 mt-2">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="yes"
        {...register("hasFacebookPage")}
        className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
      />
      হ্যাঁ
    </label>
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="no"
        {...register("hasFacebookPage")}
        className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
      />
      না
    </label>
  </div>
  {errors.hasFacebookPage && (
    <p className="text-red-500 text-sm mt-1">
      {errors.hasFacebookPage.message}
    </p>
  )}

  {/* Conditional Input Field */}
  {watch("hasFacebookPage") === "yes" && (
   
   <div className="mt-2">
   <label className="text-slate-600 text-sm font-medium">
     ফেসবুক পেজ <span className="text-red-500">*</span>
   </label>
   <input
     {...register("facebookPageLink", {
      required: watch("hasFacebookPage") === "yes"
        ? "ফেইসবুক পেজের লিংক আবশ্যক।"
        : false,
    })}
     placeholder="ফেইসবুক পেজের লিংক"
     className="w-full px-2 py-1.5 rounded-lg border border-gray-300"
   />
 </div>
  )}
</div>

        {/* Optional Fields */}
        <div className="mt-2">
          <label className="text-slate-600 text-sm font-medium">
            হোয়াটসঅ্যাপ নম্বর
          </label>
          <input
            {...register("whatsappNumber")}
            placeholder="ঐচ্ছিক"
            className="w-full px-2 py-1.5 rounded-lg border border-gray-300"
          />
        </div>
       
        <div className="mt-2">
          <label className="text-slate-600 text-sm font-medium">ঠিকানা</label>
          <input
            {...register("address")}
            placeholder="ঐচ্ছিক"
            className="w-full px-2 py-1.5 rounded-lg border border-gray-300"
          />
        </div>

   
        
 <div className="mt-4">
        <label htmlFor="avatar-upload" className="block text-sm font-medium text-gray-700 mb-2">
          অ্যাভাটার
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <Upload className="w-5 h-5 mr-2 -ml-1" />
              ছবি আপলোড করুন
            </label>
            <input
              id="avatar-upload"
              type="file"
              {...register("avatar")}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setAvatarPreview(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF সর্বোচ্চ 1MB</p>
          </div>
        </div>
      </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={signUpMutation.isLoading}
          className="w-full mt-6 p-2 rounded-lg  font-semibold text-white bg-orange-600 hover:bg-orange-700 transition duration-300"
        >
          {signUpMutation.isLoading ? "রেজিস্ট্রেশন হচ্ছে..." : "রেজিস্টার"}
        </button>
      </form>
    </div>
    </div>
  );
}
