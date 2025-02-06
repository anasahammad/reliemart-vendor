import { useForm } from "react-hook-form";
import ResellerOrderReportTable from "./ResellerOrderReportTable";


const ResellerOrders = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      console.log("Form Data:", data);
      // Perform search logic here
    };
    return (
        <div data-aos="fade-down"  className="p-0">
      <div className="flex justify-center items-center mb-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-md p-3 flex flex-col md:flex-row items-center gap-4 max-w-[500px] w-full"
        >
          {/* Year Select */}
          <div className="w-full">
            <select
              {...register("year", { required: true })}
              className="w-full   border rounded-md focus:ring-2 focus:ring-[#27374D] focus:outline-none p-2"
            >
              <option value="">বছর নির্বাচন করুন</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2021">2019</option>
              <option value="2021">2018</option>
              <option value="2021">2017</option>
              <option value="2021">2016</option>
              <option value="2021">2015</option>
              <option value="2021">2014</option>
              <option value="2021">2013</option>
              <option value="2021">2012</option>
              <option value="2021">2011</option>
              <option value="2021">2010</option>
              <option value="2021">2009</option>
              <option value="2021">2008</option>
              <option value="2021">2007</option>
              <option value="2021">2006</option>
              <option value="2021">2005</option>
              <option value="2021">2004</option>
            </select>
          </div>

          {/* Month Select */}
          <div className="w-full">
            <select
              {...register("month", { required: true })}
              className="w-full border   rounded-md focus:ring-2 focus:ring-[#27374D] focus:outline-none p-2"
            >
              <option value="">মাস নির্বাচন করুন</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-[#F4511E] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
             সার্চ  
            </button>
          </div>
        </form>
      </div>

      {/* Order Report Table */}
      <ResellerOrderReportTable />
    </div>
    );
};

export default ResellerOrders;