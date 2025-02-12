/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../Context/OrderContext";

export default function AllOrders() {
  const { getAllOrders } = useContext(OrderContext);
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handelGetAllOrders(cartId) {
    setIsLoading(true);
    const res = await getAllOrders(cartId);
    console.log(res.data);
    console.log(res);
    if (res.status == 200) {
      setAllOrders(res.data);
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    handelGetAllOrders(localStorage.getItem("ownerId"));
  }, []);

  return (
    <section className="mt-14">
      <header>
        <h1 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
          All <br /> Orders.
        </h1>
      </header>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {" "}
          {allOrders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </>
      )}
    </section>
  );
}

function Order({ order }) {
  return (
    <main className="border my-4 px-5">
      <header className="row justify-between border-b-2 border-[#0aad0a] my-10 py-6">
        <h2 className=" text-2xl text-gray-600">
          Total Price :{" "}
          <span className="text-[#0aad0a]">{order.totalOrderPrice} EGP</span>
        </h2>
        <h3 className="text-gray-600 text-2xl">
          Payment :{" "}
          <span className="text-[#0aad0a]">{order.paymentMethodType}</span>
        </h3>
      </header>
      {order.cartItems.map((item) => (
        <OrderItems key={item._id} item={item} />
      ))}
    </main>
  );
}

function OrderItems({ item }) {
  return (
    <div className="row justify-between [&:not(:last-of-type)]:border-b-2  items-center">
      <header>
        <h3 className="text-gray-600 text-2xl">
          Quantity : <span className="text-[#0aad0a]">{item.count}</span>
        </h3>
        <h4 className="text-gray-600 text-2xl">
          Price : <span className="text-[#0aad0a]">{item.price}</span>
        </h4>
      </header>
      <figure className="row justify-between items-center gap-2">
        <img
          className="w-[70px] h-[100px] object-cover"
          src={item?.product.imageCover}
          alt={item?.product.title}
        />
        <figcaption>
          <h3 className="text-gray-600 w-[100px]">
            {item?.product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
        </figcaption>
      </figure>
    </div>
  );
}
