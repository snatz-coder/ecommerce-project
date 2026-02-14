import "./TrackingPage.css";
import { useState, useEffect} from 'react';
import { Header } from "../components/Header";
import { useParams } from "react-router";
import axios from 'axios';
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [ order, setOrder ] = useState(null);

  useEffect(() => {
    const fetchOrderData = async() => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

  fetchOrderData();
  }, [orderId])

  if(!order) {return null; }

  const orderedProduct = order.products.find((product) => {
    return product.productId === productId;
  })

  const totalDeliveryTimeMs = orderedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }
 
  return ( orderedProduct && 
    <>
      <Header cart={ cart }/>
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">{deliveryPercent >= 100 ? 'Delivered On': 'Ariving On'} {dayjs(orderedProduct.orderTimeMs).format('dddd, MMMM D')}</div>

          <div className="product-info">
            {orderedProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderedProduct.quantity}</div>

          <img
            className="product-image"
            src={orderedProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
             <div className="progress-bar" style={{
              width: `${deliveryPercent}%`
            }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

