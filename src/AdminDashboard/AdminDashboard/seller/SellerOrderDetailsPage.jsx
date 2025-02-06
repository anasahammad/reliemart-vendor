import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import OrderDetails from "../../../_components/OrderDetails";


const SellerOrderDetailsPage = () => {
    const {id} = useParams()

const {data: order = [], isLoading, refetch} = useQuery({
  queryKey: ["order"],
  queryFn: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/resellerOrder/orders/${id}`, {withCredentials: true});
    return response.data;
  }
})


    return (
        <div>
            <OrderDetails refetch={refetch} order={order} />

           
        </div>
    );
};

export default SellerOrderDetailsPage;